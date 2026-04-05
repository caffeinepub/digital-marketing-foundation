import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Assignment,
  AssignmentSubmission,
  backendInterface as BackendAPI,
  Certificate,
  Course,
  CourseModule,
  EmailUser,
  Enrollment,
  Option,
  QuizQuestion,
  VideoWithBlob,
} from "../backend.d";
import { useActor } from "./useActor";

function api(actor: unknown): BackendAPI {
  return actor as unknown as BackendAPI;
}

export function useCourses() {
  const { actor, isFetching } = useActor();
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      return api(actor).getCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCourse(courseId: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      if (!actor || !courseId) return null;
      const result = await api(actor).getCourse(courseId);
      return result.__kind__ === "Some" ? result.value : null;
    },
    enabled: !!actor && !isFetching && !!courseId,
  });
}

export function useModulesForCourse(courseId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<CourseModule[]>({
    queryKey: ["modules", courseId],
    queryFn: async () => {
      if (!actor || !courseId) return [];
      return api(actor).getModulesForCourse(courseId);
    },
    enabled: !!actor && !isFetching && !!courseId,
  });
}

export function useVideosForModule(moduleId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<VideoWithBlob[]>({
    queryKey: ["videos", moduleId],
    queryFn: async () => {
      if (!actor || !moduleId) return [];
      return api(actor).getVideosForModule(moduleId);
    },
    enabled: !!actor && !isFetching && !!moduleId,
  });
}

export function useVideosForCourse(courseId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<VideoWithBlob[]>({
    queryKey: ["videosForCourse", courseId],
    queryFn: async () => {
      if (!actor || !courseId) return [];
      return api(actor).getVideosForCourse(courseId);
    },
    enabled: !!actor && !isFetching && !!courseId,
  });
}

export function useQuizQuestions(videoId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<QuizQuestion[]>({
    queryKey: ["quiz", videoId],
    queryFn: async () => {
      if (!actor || !videoId) return [];
      return api(actor).getQuizQuestionsForVideo(videoId);
    },
    enabled: !!actor && !isFetching && !!videoId,
  });
}

export function useMyEnrollments() {
  const { actor, isFetching } = useActor();
  return useQuery<Enrollment[]>({
    queryKey: ["enrollments"],
    queryFn: async () => {
      if (!actor) return [];
      return api(actor).getMyEnrollments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsEnrolled(courseId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isEnrolled", courseId],
    queryFn: async () => {
      if (!actor || !courseId) return false;
      return api(actor).isEnrolled(courseId);
    },
    enabled: !!actor && !isFetching && !!courseId,
  });
}

export function useRazorpayKeyId() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["razorpayKeyId"],
    queryFn: async () => {
      if (!actor) return "";
      return api(actor).getRazorpayKeyId();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCompletedVideos(courseId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["completedVideos", courseId],
    queryFn: async () => {
      if (!actor || !courseId) return [];
      return api(actor).getCompletedVideos(courseId);
    },
    enabled: !!actor && !isFetching && !!courseId,
  });
}

export function useMySubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery<AssignmentSubmission[]>({
    queryKey: ["mySubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return api(actor).getMySubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyCertificates() {
  const { actor, isFetching } = useActor();
  return useQuery<Certificate[]>({
    queryKey: ["myCertificates"],
    queryFn: async () => {
      if (!actor) return [];
      return api(actor).getMyCertificates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAssignmentsForCourse(courseId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Assignment[]>({
    queryKey: ["assignments", courseId],
    queryFn: async () => {
      if (!actor || !courseId) return [];
      return api(actor).getAssignmentsForCourse(courseId);
    },
    enabled: !!actor && !isFetching && !!courseId,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return api(actor).isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminAllEnrollments() {
  const { actor, isFetching } = useActor();
  return useQuery<Enrollment[]>({
    queryKey: ["adminEnrollments"],
    queryFn: async () => {
      if (!actor) return [];
      return api(actor).adminGetAllEnrollments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminAllSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery<AssignmentSubmission[]>({
    queryKey: ["adminSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return api(actor).adminGetAllSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCertificateById(certId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Certificate | null>({
    queryKey: ["certificate", certId],
    queryFn: async () => {
      if (!actor || !certId) return null;
      const result = await api(actor).getCertificateById(certId);
      return result.__kind__ === "Some" ? result.value : null;
    },
    enabled: !!actor && !isFetching && !!certId,
  });
}

export function useAdminGetAllEmailUsers() {
  const { actor, isFetching } = useActor();
  return useQuery<EmailUser[]>({
    queryKey: ["adminEmailUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return api(actor).adminGetAllEmailUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

// Mutations
export function useEnrollInCourse() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      courseId,
      razorpayOrderId,
      razorpayPaymentId,
    }: {
      courseId: string;
      razorpayOrderId: string;
      razorpayPaymentId: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).enrollInCourse(
        courseId,
        razorpayOrderId,
        razorpayPaymentId,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["enrollments"] });
      qc.invalidateQueries({ queryKey: ["isEnrolled"] });
    },
  });
}

export function useMarkVideoComplete() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      videoId,
      courseId,
    }: { videoId: string; courseId: string }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).markVideoComplete(videoId, courseId);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["completedVideos", vars.courseId] });
    },
  });
}

export function useSubmitQuiz() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      videoId,
      answers,
    }: { videoId: string; answers: bigint[] }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).submitQuiz(videoId, answers);
    },
  });
}

export function useSubmitAssignment() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      assignmentId,
      text,
    }: { assignmentId: string; text: string }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).submitAssignment(assignmentId, text);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["mySubmissions"] });
    },
  });
}

export function useClaimCertificate() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      courseId,
      name,
    }: { courseId: string; name: string }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).claimCertificate(courseId, name);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myCertificates"] });
    },
  });
}

export function useSeedSampleData() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return api(actor).seedSampleData();
    },
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
}

export function useAdminReviewSubmission() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      submissionId,
      giftCardCode,
    }: { submissionId: string; giftCardCode: Option<string> }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).adminReviewSubmission(submissionId, giftCardCode);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminSubmissions"] });
    },
  });
}

export function useAdminCreateCourse() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      description: string;
      tier: import("../backend.d").CourseTier;
      priceInr: bigint;
      thumbnailUrl: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).adminCreateCourse(
        params.title,
        params.description,
        params.tier,
        params.priceInr,
        params.thumbnailUrl,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useAdminCreateModule() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      courseId: string;
      title: string;
      orderPos: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).adminCreateModule(
        params.courseId,
        params.title,
        params.orderPos,
      );
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["modules", vars.courseId] });
    },
  });
}

export function useAdminCreateVideo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      moduleId: string;
      courseId: string;
      title: string;
      description: string;
      durationMinutes: bigint;
      orderPos: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).adminCreateVideo(
        params.moduleId,
        params.courseId,
        params.title,
        params.description,
        params.durationMinutes,
        params.orderPos,
      );
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["videos", vars.moduleId] });
    },
  });
}

export function useAdminUpdateVideoBlobId() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      videoId,
      blobId,
      moduleId: _moduleId,
    }: { videoId: string; blobId: string; moduleId: string }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).adminUpdateVideoBlobId(videoId, blobId);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["videos", vars.moduleId] });
    },
  });
}

export function useAdminCreateQuizQuestion() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      videoId: string;
      questionText: string;
      options: string[];
      correctIndex: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).adminCreateQuizQuestion(
        params.videoId,
        params.questionText,
        params.options,
        params.correctIndex,
      );
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["quiz", vars.videoId] });
    },
  });
}

export function useAdminDeleteQuizQuestion() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      questionId,
      videoId: _videoId,
    }: { questionId: string; videoId: string }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).adminDeleteQuizQuestion(questionId);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["quiz", vars.videoId] });
    },
  });
}

export function useAdminSetPaymentSettings() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      keyId,
      keySecret,
    }: { keyId: string; keySecret: string }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).adminSetPaymentSettings(keyId, keySecret);
    },
  });
}

export function useAdminCreateAssignment() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      courseId: string;
      weekNumber: bigint;
      title: string;
      description: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return api(actor).adminCreateAssignment(
        params.courseId,
        params.weekNumber,
        params.title,
        params.description,
      );
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["assignments", vars.courseId] });
    },
  });
}
