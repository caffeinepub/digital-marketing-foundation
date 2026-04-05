import type { ActorConfig, Agent, HttpAgentOptions } from "@icp-sdk/core/agent";
import type { Principal } from "@icp-sdk/core/principal";
import type { ExternalBlob } from "./backend";
import type {
  Assignment,
  AssignmentSubmission,
  Certificate,
  Course,
  CourseModule,
  CourseTier,
  Enrollment,
  Option,
  QuizAttempt,
  QuizQuestion,
  UserRole,
  Video,
  backendInterface,
} from "./backend.d";

// Full backend interface with all methods
export interface FullBackendInterface {
  _initializeAccessControlWithSecret(userSecret: string): Promise<void>;
  getCallerUserRole(): Promise<UserRole>;
  isCallerAdmin(): Promise<boolean>;
  assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
  getCourses(): Promise<Course[]>;
  getCourse(courseId: string): Promise<Option<Course>>;
  getModulesForCourse(courseId: string): Promise<CourseModule[]>;
  getVideosForModule(moduleId: string): Promise<Video[]>;
  getQuizQuestionsForVideo(videoId: string): Promise<QuizQuestion[]>;
  enrollInCourse(
    courseId: string,
    stripeSessionId: string,
  ): Promise<Enrollment>;
  getMyEnrollments(): Promise<Enrollment[]>;
  isEnrolled(courseId: string): Promise<boolean>;
  markVideoComplete(videoId: string, courseId: string): Promise<void>;
  getCompletedVideos(courseId: string): Promise<string[]>;
  submitQuiz(videoId: string, answers: bigint[]): Promise<QuizAttempt>;
  hasPassedQuiz(videoId: string): Promise<boolean>;
  getMyQuizAttempts(videoId: string): Promise<QuizAttempt[]>;
  getAssignmentsForCourse(courseId: string): Promise<Assignment[]>;
  submitAssignment(
    assignmentId: string,
    submissionText: string,
  ): Promise<AssignmentSubmission>;
  getMySubmissions(): Promise<AssignmentSubmission[]>;
  claimCertificate(courseId: string, studentName: string): Promise<Certificate>;
  getMyCertificates(): Promise<Certificate[]>;
  adminCreateCourse(
    title: string,
    description: string,
    tier: CourseTier,
    priceInr: bigint,
    thumbnailUrl: string,
  ): Promise<Course>;
  adminUpdateCourse(
    courseId: string,
    title: string,
    description: string,
    priceInr: bigint,
    thumbnailUrl: string,
  ): Promise<void>;
  adminCreateModule(
    courseId: string,
    title: string,
    orderPos: bigint,
  ): Promise<CourseModule>;
  adminCreateVideo(
    moduleId: string,
    courseId: string,
    title: string,
    description: string,
    durationMinutes: bigint,
    orderPos: bigint,
  ): Promise<Video>;
  adminCreateQuizQuestion(
    videoId: string,
    questionText: string,
    options: string[],
    correctIndex: bigint,
  ): Promise<QuizQuestion>;
  adminCreateAssignment(
    courseId: string,
    weekNumber: bigint,
    title: string,
    description: string,
  ): Promise<Assignment>;
  adminReviewSubmission(
    submissionId: string,
    giftCardCode: Option<string>,
  ): Promise<void>;
  adminGetAllEnrollments(): Promise<Enrollment[]>;
  adminGetAllSubmissions(): Promise<AssignmentSubmission[]>;
  seedSampleData(): Promise<void>;
}

declare module "./backend" {
  interface backendInterface extends FullBackendInterface {}

  interface CreateActorOptions {
    agent?: Agent;
    agentOptions?: HttpAgentOptions;
    actorOptions?: ActorConfig;
    processError?: (error: unknown) => never;
  }

  function createActor(
    canisterId: string,
    uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
    downloadFile: (file: Uint8Array) => Promise<ExternalBlob>,
    options?: CreateActorOptions,
  ): backendInterface;
}
