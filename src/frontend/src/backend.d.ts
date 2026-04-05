import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Video {
    id: string;
    moduleId: string;
    title: string;
    description: string;
    durationMinutes: bigint;
    orderPos: bigint;
    courseId: string;
}
export interface PromptTemplate {
    id: string;
    title: string;
    createdAt: bigint;
    promptText: string;
    description: string;
    category: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface QuizQuestion {
    id: string;
    correctIndex: bigint;
    questionText: string;
    options: Array<string>;
    videoId: string;
}
export interface Enrollment {
    id: string;
    userId: Principal;
    tier: CourseTier;
    enrolledAt: bigint;
    stripeSessionId: string;
    courseId: string;
}
export interface AssignmentSubmission {
    id: string;
    userId: Principal;
    submittedAt: bigint;
    giftCardCode?: string;
    assignmentId: string;
    submissionText: string;
    reviewed: boolean;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface CourseModule {
    id: string;
    title: string;
    orderPos: bigint;
    courseId: string;
}
export interface Course {
    id: string;
    title: string;
    thumbnailUrl: string;
    tier: CourseTier;
    description: string;
    totalModules: bigint;
    totalVideos: bigint;
    priceInr: bigint;
}
export interface AIMessage {
    content: string;
    role: string;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface VideoWithBlob {
    id: string;
    moduleId: string;
    title: string;
    description: string;
    durationMinutes: bigint;
    blobId: string;
    orderPos: bigint;
    courseId: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface QuizAttempt {
    id: string;
    userId: Principal;
    answers: Array<bigint>;
    score: bigint;
    attemptedAt: bigint;
    passed: boolean;
    videoId: string;
}
export interface Assignment {
    id: string;
    title: string;
    description: string;
    weekNumber: bigint;
    courseId: string;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface Certificate {
    id: string;
    studentName: string;
    userId: Principal;
    issuedAt: bigint;
    courseTitle: string;
    courseId: string;
}
export interface UserProfile {
    id: Principal;
    age: bigint;
    otpCode: string;
    otpVerified: boolean;
    name: string;
    email: string;
    passwordHash: string;
    contactNumber: string;
    registeredAt: bigint;
}
export enum CourseTier {
    advanced = "advanced",
    professional = "professional",
    basic = "basic"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    adminCreateAssignment(courseId: string, weekNumber: bigint, title: string, description: string): Promise<Assignment>;
    adminCreateCourse(title: string, description: string, tier: CourseTier, priceInr: bigint, thumbnailUrl: string): Promise<Course>;
    adminCreateModule(courseId: string, title: string, orderPos: bigint): Promise<CourseModule>;
    adminCreateQuizQuestion(videoId: string, questionText: string, options: Array<string>, correctIndex: bigint): Promise<QuizQuestion>;
    adminCreateVideo(moduleId: string, courseId: string, title: string, description: string, durationMinutes: bigint, orderPos: bigint): Promise<Video>;
    adminDeleteQuizQuestion(questionId: string): Promise<void>;
    adminGetAllEnrollments(): Promise<Array<Enrollment>>;
    adminGetAllSubmissions(): Promise<Array<AssignmentSubmission>>;
    adminGetAllUsers(): Promise<Array<UserProfile>>;
    adminGetPaymentSettings(): Promise<{
        keyId: string;
        keySecret: string;
    }>;
    adminReviewSubmission(submissionId: string, giftCardCode: string | null): Promise<void>;
    adminSetPaymentSettings(keyId: string, keySecret: string): Promise<void>;
    adminUpdateCourse(courseId: string, title: string, description: string, priceInr: bigint, thumbnailUrl: string): Promise<void>;
    adminUpdateVideoBlobId(videoId: string, blobId: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    chatWithAI(userMessage: string, history: Array<AIMessage>): Promise<string>;
    claimCertificate(courseId: string, studentName: string): Promise<Certificate>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deletePromptTemplate(templateId: string): Promise<void>;
    enrollInCourse(courseId: string, razorpayOrderId: string, razorpayPaymentId: string): Promise<Enrollment>;
    generateAIContent(contentType: string, topic: string): Promise<string>;
    getAssignmentsForCourse(courseId: string): Promise<Array<Assignment>>;
    getCallerUserRole(): Promise<UserRole>;
    getCertificateById(certId: string): Promise<Certificate | null>;
    getCompletedVideos(courseId: string): Promise<Array<string>>;
    getCourse(courseId: string): Promise<Course | null>;
    getCourses(): Promise<Array<Course>>;
    getModulesForCourse(courseId: string): Promise<Array<CourseModule>>;
    getMyCertificates(): Promise<Array<Certificate>>;
    getMyEnrollments(): Promise<Array<Enrollment>>;
    getMyProfile(): Promise<UserProfile | null>;
    getMyQuizAttempts(videoId: string): Promise<Array<QuizAttempt>>;
    getMySubmissions(): Promise<Array<AssignmentSubmission>>;
    getPromptTemplates(): Promise<Array<PromptTemplate>>;
    getQuizQuestionsForVideo(videoId: string): Promise<Array<QuizQuestion>>;
    getRazorpayKeyId(): Promise<string>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVideosForCourse(courseId: string): Promise<Array<VideoWithBlob>>;
    getVideosForModule(moduleId: string): Promise<Array<VideoWithBlob>>;
    hasPassedQuiz(videoId: string): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isEnrolled(courseId: string): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    loginWithEmail(email: string, passwordHash: string): Promise<UserProfile | null>;
    markVideoComplete(videoId: string, courseId: string): Promise<void>;
    registerUser(email: string, name: string, age: bigint, contactNumber: string, passwordHash: string): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    savePromptTemplate(title: string, description: string, promptText: string, category: string): Promise<PromptTemplate>;
    seedSampleData(): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    submitAssignment(assignmentId: string, submissionText: string): Promise<AssignmentSubmission>;
    submitQuiz(videoId: string, answers: Array<bigint>): Promise<QuizAttempt>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    verifyOtp(email: string, otpCode: string): Promise<boolean>;
}
