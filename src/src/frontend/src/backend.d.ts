import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;

// Keep #basic for backward compatibility with existing stored data
export type CourseTier = { __kind__: "basic" } | { __kind__: "professional" } | { __kind__: "advanced" };
export type UserRole = { __kind__: "admin" } | { __kind__: "user" } | { __kind__: "guest" };

export interface Course {
    id: string;
    title: string;
    description: string;
    tier: CourseTier;
    priceInr: bigint;
    thumbnailUrl: string;
    totalModules: bigint;
    totalVideos: bigint;
}

export interface CourseModule {
    id: string;
    courseId: string;
    title: string;
    orderPos: bigint;
}

// Base Video type (returned by adminCreateVideo)
export interface Video {
    id: string;
    moduleId: string;
    courseId: string;
    title: string;
    description: string;
    durationMinutes: bigint;
    orderPos: bigint;
}

// Video with blobId (returned by getVideosForModule / getVideosForCourse)
export interface VideoWithBlob extends Video {
    blobId: string;
}

export interface QuizQuestion {
    id: string;
    videoId: string;
    questionText: string;
    options: string[];
    correctIndex: bigint;
}

export interface QuizAttempt {
    id: string;
    userId: Principal;
    videoId: string;
    answers: bigint[];
    score: bigint;
    passed: boolean;
    attemptedAt: bigint;
}

export interface Enrollment {
    id: string;
    userId: Principal;
    courseId: string;
    tier: CourseTier;
    stripeSessionId: string;
    enrolledAt: bigint;
}

export interface Assignment {
    id: string;
    courseId: string;
    weekNumber: bigint;
    title: string;
    description: string;
}

export interface AssignmentSubmission {
    id: string;
    userId: Principal;
    assignmentId: string;
    submissionText: string;
    submittedAt: bigint;
    giftCardCode: Option<string>;
    reviewed: boolean;
}

export interface Certificate {
    id: string;
    userId: Principal;
    courseId: string;
    courseTitle: string;
    studentName: string;
    issuedAt: bigint;
}

export interface backendInterface {
    // Auth
    _initializeAccessControlWithSecret(userSecret: string): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;

    // Courses
    getCourses(): Promise<Course[]>;
    getCourse(courseId: string): Promise<Option<Course>>;
    getModulesForCourse(courseId: string): Promise<CourseModule[]>;
    getVideosForModule(moduleId: string): Promise<VideoWithBlob[]>;
    getVideosForCourse(courseId: string): Promise<VideoWithBlob[]>;
    getQuizQuestionsForVideo(videoId: string): Promise<QuizQuestion[]>;

    // Payment settings
    getRazorpayKeyId(): Promise<string>;

    // Enrollment - razorpay data stored in stripeSessionId internally
    enrollInCourse(courseId: string, razorpayOrderId: string, razorpayPaymentId: string): Promise<Enrollment>;
    getMyEnrollments(): Promise<Enrollment[]>;
    isEnrolled(courseId: string): Promise<boolean>;

    // Progress
    markVideoComplete(videoId: string, courseId: string): Promise<void>;
    getCompletedVideos(courseId: string): Promise<string[]>;

    // Quiz
    submitQuiz(videoId: string, answers: bigint[]): Promise<QuizAttempt>;
    hasPassedQuiz(videoId: string): Promise<boolean>;
    getMyQuizAttempts(videoId: string): Promise<QuizAttempt[]>;

    // Assignments
    getAssignmentsForCourse(courseId: string): Promise<Assignment[]>;
    submitAssignment(assignmentId: string, submissionText: string): Promise<AssignmentSubmission>;
    getMySubmissions(): Promise<AssignmentSubmission[]>;

    // Certificates
    claimCertificate(courseId: string, studentName: string): Promise<Certificate>;
    getMyCertificates(): Promise<Certificate[]>;

    // Admin
    adminCreateCourse(title: string, description: string, tier: CourseTier, priceInr: bigint, thumbnailUrl: string): Promise<Course>;
    adminUpdateCourse(courseId: string, title: string, description: string, priceInr: bigint, thumbnailUrl: string): Promise<void>;
    adminCreateModule(courseId: string, title: string, orderPos: bigint): Promise<CourseModule>;
    adminCreateVideo(moduleId: string, courseId: string, title: string, description: string, durationMinutes: bigint, orderPos: bigint): Promise<Video>;
    adminUpdateVideoBlobId(videoId: string, blobId: string): Promise<void>;
    adminCreateQuizQuestion(videoId: string, questionText: string, options: string[], correctIndex: bigint): Promise<QuizQuestion>;
    adminDeleteQuizQuestion(questionId: string): Promise<void>;
    adminCreateAssignment(courseId: string, weekNumber: bigint, title: string, description: string): Promise<Assignment>;
    adminReviewSubmission(submissionId: string, giftCardCode: Option<string>): Promise<void>;
    adminGetAllEnrollments(): Promise<Enrollment[]>;
    adminGetAllSubmissions(): Promise<AssignmentSubmission[]>;
    adminSetPaymentSettings(keyId: string, keySecret: string): Promise<void>;
    adminGetPaymentSettings(): Promise<{ keyId: string; keySecret: string }>;
    seedSampleData(): Promise<void>;
}
