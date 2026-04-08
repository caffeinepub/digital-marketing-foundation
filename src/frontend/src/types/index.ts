// Domain types for the Digital Marketing Foundation platform
// These types represent the data model used throughout the frontend.

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: bigint;
  contactNumber: string;
  registeredAt: bigint;
  otpVerified?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  tier: string;
  priceInr: bigint;
  thumbnailUrl?: string;
  totalModules?: number;
  totalVideos?: number;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  order: bigint;
  orderPos?: number;
}

export interface Video {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  description: string;
  order: bigint;
  blobId?: string;
  durationMinutes?: number;
}

export interface VideoWithBlob extends Video {
  blobUrl?: string;
  durationMinutes?: number;
}

export interface QuizQuestion {
  id: string;
  videoId: string;
  question: string;
  /** @deprecated use `question` */
  questionText?: string;
  options: string[];
  correctIndex: bigint;
}

export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  enrolledAt: bigint;
  tier: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  userId: string;
  content: string;
  /** @deprecated use `content` */
  submissionText?: string;
  submittedAt: bigint;
  score?: bigint;
  feedback?: string;
  reviewed: boolean;
  giftCardCode?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  userName: string;
  /** @deprecated use `userName` */
  studentName?: string;
  issuedAt: bigint;
  tier: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  weekNumber: bigint;
  rewardInr: bigint;
}

export interface PromptTemplate {
  id: string;
  title: string;
  prompt: string;
  category: string;
}

export type CourseTierKey = "professional" | "advanced" | "performance";
