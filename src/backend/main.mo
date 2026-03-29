import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";

actor {
  // ─── Authorization ─────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ─── State ─────────────────────────────────────────────────
  var nextId : Nat = 1;
  func genId() : Text {
    let id = nextId;
    nextId += 1;
    id.toText();
  };

  // Courses
  public type CourseTier = { #basic; #professional; #advanced };
  public type Course = {
    id : Text;
    title : Text;
    description : Text;
    tier : CourseTier;
    priceInr : Nat;
    thumbnailUrl : Text;
    totalModules : Nat;
    totalVideos : Nat;
  };
  let courses = Map.empty<Text, Course>();

  // Modules
  public type CourseModule = {
    id : Text;
    courseId : Text;
    title : Text;
    orderPos : Nat;
  };
  let modules = Map.empty<Text, CourseModule>();

  // Videos
  public type Video = {
    id : Text;
    moduleId : Text;
    courseId : Text;
    title : Text;
    description : Text;
    durationMinutes : Nat;
    orderPos : Nat;
  };
  let videos = Map.empty<Text, Video>();

  // Quiz questions
  public type QuizQuestion = {
    id : Text;
    videoId : Text;
    questionText : Text;
    options : [Text];
    correctIndex : Nat;
  };
  let quizQuestions = Map.empty<Text, QuizQuestion>();

  // Quiz attempts
  public type QuizAttempt = {
    id : Text;
    userId : Principal;
    videoId : Text;
    answers : [Nat];
    score : Nat; // 0-100
    passed : Bool;
    attemptedAt : Int;
  };
  let quizAttempts = Map.empty<Text, QuizAttempt>();

  // Enrollments
  public type Enrollment = {
    id : Text;
    userId : Principal;
    courseId : Text;
    tier : CourseTier;
    stripeSessionId : Text;
    enrolledAt : Int;
  };
  let enrollments = Map.empty<Text, Enrollment>();

  // Video completions
  public type VideoCompletion = {
    userId : Principal;
    videoId : Text;
    courseId : Text;
    completedAt : Int;
  };
  let videoCompletions = Map.empty<Text, VideoCompletion>(); // key = userId#videoId

  // Assignments
  public type Assignment = {
    id : Text;
    courseId : Text;
    weekNumber : Nat;
    title : Text;
    description : Text;
  };
  let assignments = Map.empty<Text, Assignment>();

  // Assignment submissions
  public type AssignmentSubmission = {
    id : Text;
    userId : Principal;
    assignmentId : Text;
    submissionText : Text;
    submittedAt : Int;
    giftCardCode : ?Text;
    reviewed : Bool;
  };
  let submissions = Map.empty<Text, AssignmentSubmission>();

  // Certificates
  public type Certificate = {
    id : Text;
    userId : Principal;
    courseId : Text;
    courseTitle : Text;
    studentName : Text;
    issuedAt : Int;
  };
  let certificates = Map.empty<Text, Certificate>();

  // ─── Course Queries ─────────────────────────────────────────
  public query func getCourses() : async [Course] {
    courses.values().toArray();
  };

  public query func getCourse(courseId : Text) : async ?Course {
    courses.get(courseId);
  };

  public query func getModulesForCourse(courseId : Text) : async [CourseModule] {
    let result = List.empty<CourseModule>();
    for (m in modules.values()) {
      if (m.courseId == courseId) { result.add(m) };
    };
    result.toArray();
  };

  public query func getVideosForModule(moduleId : Text) : async [Video] {
    let result = List.empty<Video>();
    for (v in videos.values()) {
      if (v.moduleId == moduleId) { result.add(v) };
    };
    result.toArray();
  };

  public query func getQuizQuestionsForVideo(videoId : Text) : async [QuizQuestion] {
    let result = List.empty<QuizQuestion>();
    for (q in quizQuestions.values()) {
      if (q.videoId == videoId) { result.add(q) };
    };
    result.toArray();
  };

  // ─── Enrollment ─────────────────────────────────────────────
  public shared ({ caller }) func enrollInCourse(courseId : Text, stripeSessionId : Text) : async Enrollment {
    let courseOpt = courses.get(courseId);
    switch (courseOpt) {
      case (null) { assert false; loop {} };
      case (?course) {
        let id = genId();
        let enrollment : Enrollment = {
          id;
          userId = caller;
          courseId;
          tier = course.tier;
          stripeSessionId;
          enrolledAt = Time.now();
        };
        enrollments.add(id, enrollment);
        enrollment;
      };
    };
  };

  public query ({ caller }) func getMyEnrollments() : async [Enrollment] {
    let result = List.empty<Enrollment>();
    for (e in enrollments.values()) {
      if (e.userId == caller) { result.add(e) };
    };
    result.toArray();
  };

  public query ({ caller }) func isEnrolled(courseId : Text) : async Bool {
    for (e in enrollments.values()) {
      if (e.userId == caller and e.courseId == courseId) { return true };
    };
    false;
  };

  // ─── Video Progress ──────────────────────────────────────────
  public shared ({ caller }) func markVideoComplete(videoId : Text, courseId : Text) : async () {
    let key = caller.toText() # "#" # videoId;
    let completion : VideoCompletion = {
      userId = caller;
      videoId;
      courseId;
      completedAt = Time.now();
    };
    videoCompletions.add(key, completion);
  };

  public query ({ caller }) func getCompletedVideos(courseId : Text) : async [Text] {
    let result = List.empty<Text>();
    for (c in videoCompletions.values()) {
      if (c.userId == caller and c.courseId == courseId) { result.add(c.videoId) };
    };
    result.toArray();
  };

  // ─── Quiz ────────────────────────────────────────────────────
  public shared ({ caller }) func submitQuiz(videoId : Text, answers : [Nat]) : async QuizAttempt {
    let questions = List.empty<QuizQuestion>();
    for (q in quizQuestions.values()) {
      if (q.videoId == videoId) { questions.add(q) };
    };
    let total = questions.size();
    var correct = 0;
    let qArr = questions.toArray();
    for (i in qArr.keys()) {
      if (i < answers.size() and answers[i] == qArr[i].correctIndex) {
        correct += 1;
      };
    };
    let score = if (total == 0) { 100 } else { (correct * 100) / total };
    let passed = score >= 70;
    let id = genId();
    let attempt : QuizAttempt = {
      id;
      userId = caller;
      videoId;
      answers;
      score;
      passed;
      attemptedAt = Time.now();
    };
    quizAttempts.add(id, attempt);
    attempt;
  };

  public query ({ caller }) func hasPassedQuiz(videoId : Text) : async Bool {
    for (a in quizAttempts.values()) {
      if (a.userId == caller and a.videoId == videoId and a.passed) { return true };
    };
    false;
  };

  public query ({ caller }) func getMyQuizAttempts(videoId : Text) : async [QuizAttempt] {
    let result = List.empty<QuizAttempt>();
    for (a in quizAttempts.values()) {
      if (a.userId == caller and a.videoId == videoId) { result.add(a) };
    };
    result.toArray();
  };

  // ─── Assignments ─────────────────────────────────────────────
  public query func getAssignmentsForCourse(courseId : Text) : async [Assignment] {
    let result = List.empty<Assignment>();
    for (a in assignments.values()) {
      if (a.courseId == courseId) { result.add(a) };
    };
    result.toArray();
  };

  public shared ({ caller }) func submitAssignment(assignmentId : Text, submissionText : Text) : async AssignmentSubmission {
    let id = genId();
    let sub : AssignmentSubmission = {
      id;
      userId = caller;
      assignmentId;
      submissionText;
      submittedAt = Time.now();
      giftCardCode = null;
      reviewed = false;
    };
    submissions.add(id, sub);
    sub;
  };

  public query ({ caller }) func getMySubmissions() : async [AssignmentSubmission] {
    let result = List.empty<AssignmentSubmission>();
    for (s in submissions.values()) {
      if (s.userId == caller) { result.add(s) };
    };
    result.toArray();
  };

  // ─── Certificates ────────────────────────────────────────────
  public shared ({ caller }) func claimCertificate(courseId : Text, studentName : Text) : async Certificate {
    // Check enrollment
    var enrolled = false;
    for (e in enrollments.values()) {
      if (e.userId == caller and e.courseId == courseId) { enrolled := true };
    };
    assert enrolled;
    // Check no duplicate
    for (c in certificates.values()) {
      if (c.userId == caller and c.courseId == courseId) { assert false };
    };
    let courseOpt = courses.get(courseId);
    let courseTitle = switch (courseOpt) {
      case (?c) { c.title };
      case (null) { "Digital Marketing Course" };
    };
    let id = genId();
    let cert : Certificate = {
      id;
      userId = caller;
      courseId;
      courseTitle;
      studentName;
      issuedAt = Time.now();
    };
    certificates.add(id, cert);
    cert;
  };

  public query ({ caller }) func getMyCertificates() : async [Certificate] {
    let result = List.empty<Certificate>();
    for (c in certificates.values()) {
      if (c.userId == caller) { result.add(c) };
    };
    result.toArray();
  };

  // ─── Admin: Course Management ────────────────────────────────
  public shared ({ caller }) func adminCreateCourse(title : Text, description : Text, tier : CourseTier, priceInr : Nat, thumbnailUrl : Text) : async Course {
    assert AccessControl.isAdmin(accessControlState, caller);
    let id = genId();
    let course : Course = { id; title; description; tier; priceInr; thumbnailUrl; totalModules = 0; totalVideos = 0 };
    courses.add(id, course);
    course;
  };

  public shared ({ caller }) func adminUpdateCourse(courseId : Text, title : Text, description : Text, priceInr : Nat, thumbnailUrl : Text) : async () {
    assert AccessControl.isAdmin(accessControlState, caller);
    let existing = switch (courses.get(courseId)) {
      case (?c) { c };
      case (null) { assert false; loop {} };
    };
    let updated : Course = { existing with title; description; priceInr; thumbnailUrl };
    courses.add(courseId, updated);
  };

  public shared ({ caller }) func adminCreateModule(courseId : Text, title : Text, orderPos : Nat) : async CourseModule {
    assert AccessControl.isAdmin(accessControlState, caller);
    let id = genId();
    let m : CourseModule = { id; courseId; title; orderPos };
    modules.add(id, m);
    m;
  };

  public shared ({ caller }) func adminCreateVideo(moduleId : Text, courseId : Text, title : Text, description : Text, durationMinutes : Nat, orderPos : Nat) : async Video {
    assert AccessControl.isAdmin(accessControlState, caller);
    let id = genId();
    let v : Video = { id; moduleId; courseId; title; description; durationMinutes; orderPos };
    videos.add(id, v);
    v;
  };

  public shared ({ caller }) func adminCreateQuizQuestion(videoId : Text, questionText : Text, options : [Text], correctIndex : Nat) : async QuizQuestion {
    assert AccessControl.isAdmin(accessControlState, caller);
    let id = genId();
    let q : QuizQuestion = { id; videoId; questionText; options; correctIndex };
    quizQuestions.add(id, q);
    q;
  };

  public shared ({ caller }) func adminCreateAssignment(courseId : Text, weekNumber : Nat, title : Text, description : Text) : async Assignment {
    assert AccessControl.isAdmin(accessControlState, caller);
    let id = genId();
    let a : Assignment = { id; courseId; weekNumber; title; description };
    assignments.add(id, a);
    a;
  };

  public shared ({ caller }) func adminReviewSubmission(submissionId : Text, giftCardCode : ?Text) : async () {
    assert AccessControl.isAdmin(accessControlState, caller);
    let existing = switch (submissions.get(submissionId)) {
      case (?s) { s };
      case (null) { assert false; loop {} };
    };
    let updated : AssignmentSubmission = { existing with reviewed = true; giftCardCode };
    submissions.add(submissionId, updated);
  };

  public query ({ caller }) func adminGetAllEnrollments() : async [Enrollment] {
    assert AccessControl.isAdmin(accessControlState, caller);
    enrollments.values().toArray();
  };

  public query ({ caller }) func adminGetAllSubmissions() : async [AssignmentSubmission] {
    assert AccessControl.isAdmin(accessControlState, caller);
    submissions.values().toArray();
  };

  // Seed sample data for demo
  public shared ({ caller }) func seedSampleData() : async () {
    assert AccessControl.isAdmin(accessControlState, caller);
    if (courses.size() > 0) { return };

    let c1 = genId();
    courses.add(c1, {
      id = c1;
      title = "Digital Marketing Basics";
      description = "Master the fundamentals of digital marketing, SEO, social media, and content strategy.";
      tier = #basic;
      priceInr = 4999;
      thumbnailUrl = "/assets/course-basic.jpg";
      totalModules = 3;
      totalVideos = 9;
    });

    let c2 = genId();
    courses.add(c2, {
      id = c2;
      title = "Professional Digital Marketing";
      description = "Advanced strategies including paid advertising, email marketing, analytics, and conversion optimization.";
      tier = #professional;
      priceInr = 9999;
      thumbnailUrl = "/assets/course-pro.jpg";
      totalModules = 5;
      totalVideos = 18;
    });

    let c3 = genId();
    courses.add(c3, {
      id = c3;
      title = "Advanced Digital Marketing Mastery";
      description = "Complete end-to-end digital marketing mastery including agency-level strategies, automation, and leadership.";
      tier = #advanced;
      priceInr = 24999;
      thumbnailUrl = "/assets/course-advanced.jpg";
      totalModules = 8;
      totalVideos = 32;
    });

    // Module for course 1
    let m1 = genId();
    modules.add(m1, { id = m1; courseId = c1; title = "Introduction to Digital Marketing"; orderPos = 1 });
    let m2 = genId();
    modules.add(m2, { id = m2; courseId = c1; title = "SEO Fundamentals"; orderPos = 2 });
    let m3 = genId();
    modules.add(m3, { id = m3; courseId = c1; title = "Social Media Marketing"; orderPos = 3 });

    // Videos for m1
    let v1 = genId();
    videos.add(v1, { id = v1; moduleId = m1; courseId = c1; title = "What is Digital Marketing?"; description = "Overview of digital marketing channels and strategies."; durationMinutes = 12; orderPos = 1 });
    let v2 = genId();
    videos.add(v2, { id = v2; moduleId = m1; courseId = c1; title = "Digital Marketing Ecosystem"; description = "Understanding the full digital marketing ecosystem."; durationMinutes = 15; orderPos = 2 });
    let v3 = genId();
    videos.add(v3, { id = v3; moduleId = m1; courseId = c1; title = "Setting Marketing Goals"; description = "How to set SMART goals for your marketing campaigns."; durationMinutes = 10; orderPos = 3 });

    // Quiz for v1
    let q1 = genId();
    quizQuestions.add(q1, {
      id = q1;
      videoId = v1;
      questionText = "Which of the following is NOT a digital marketing channel?";
      options = ["Social Media", "Email Marketing", "Billboard Advertising", "SEO"];
      correctIndex = 2;
    });
    let q2 = genId();
    quizQuestions.add(q2, {
      id = q2;
      videoId = v1;
      questionText = "What does SEO stand for?";
      options = ["Social Engagement Optimization", "Search Engine Optimization", "Site Engagement Overview", "Search Experience Optimization"];
      correctIndex = 1;
    });

    // Assignment for course 1
    let a1 = genId();
    assignments.add(a1, {
      id = a1;
      courseId = c1;
      weekNumber = 1;
      title = "Create Your First Social Media Strategy";
      description = "Write a 500-word social media strategy for a brand of your choice. Include target audience, platform selection, content themes, and posting frequency.";
    });
  };
};
