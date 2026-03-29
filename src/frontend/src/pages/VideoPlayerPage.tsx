import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  PlayCircle,
  Trophy,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { AppNav } from "../App";
import {
  useMarkVideoComplete,
  useQuizQuestions,
  useSubmitQuiz,
} from "../hooks/useQueries";

interface VideoPlayerPageProps {
  nav: AppNav;
  videoId: string;
  courseId: string;
}

type Phase = "watching" | "quiz" | "complete";

export default function VideoPlayerPage({
  nav,
  videoId,
  courseId,
}: VideoPlayerPageProps) {
  const [phase, setPhase] = useState<Phase>("watching");
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [quizResult, setQuizResult] = useState<{
    score: number;
    passed: boolean;
  } | null>(null);
  const [marking, setMarking] = useState(false);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  const { data: quizQuestions, isLoading: quizLoading } =
    useQuizQuestions(videoId);
  const markComplete = useMarkVideoComplete();
  const submitQuiz = useSubmitQuiz();

  const handleMarkWatched = async () => {
    setMarking(true);
    try {
      await markComplete.mutateAsync({ videoId, courseId });
      if (quizQuestions && quizQuestions.length > 0) {
        setPhase("quiz");
      } else {
        setPhase("complete");
        toast.success("Video marked as complete!");
      }
    } catch {
      toast.error("Failed to mark video. Please try again.");
    } finally {
      setMarking(false);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!quizQuestions) return;
    setSubmittingQuiz(true);
    try {
      const answers = quizQuestions.map((q) => {
        const selected = selectedAnswers[q.id];
        return BigInt(selected !== undefined ? selected : 0);
      });
      const result = await submitQuiz.mutateAsync({ videoId, answers });
      setQuizResult({ score: Number(result.score), passed: result.passed });
      setPhase("complete");
    } catch {
      toast.error("Failed to submit quiz. Please try again.");
    } finally {
      setSubmittingQuiz(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl py-8">
        {/* Back */}
        <button
          type="button"
          data-ocid="video.link"
          onClick={() => nav.navigate("course-detail", { courseId })}
          className="flex items-center gap-1 text-brand-body hover:text-brand-teal text-sm mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Course
        </button>

        {/* Video Player Area */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-100 mb-6">
          {/* Fake video player */}
          <div className="aspect-video bg-brand-heading flex items-center justify-center relative">
            <div className="text-center text-white">
              <div className="w-20 h-20 rounded-full bg-brand-teal/30 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-brand-teal/50 transition-colors">
                <PlayCircle className="w-10 h-10 text-white" />
              </div>
              <p className="text-sm text-white/60">Video Player</p>
              <p className="text-xs text-white/40 mt-1">Click to play</p>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/40 rounded-lg px-4 py-2 flex items-center gap-3">
              <div className="flex-1 h-1 bg-white/20 rounded-full">
                <div className="w-1/3 h-full bg-brand-teal rounded-full" />
              </div>
              <span className="text-white/60 text-xs">5:32 / 18:00</span>
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-xl font-bold text-brand-heading mb-2">
              Video Lesson
            </h1>
            <p className="text-sm text-brand-body">Video ID: {videoId}</p>
          </div>
        </div>

        {/* Phases */}
        <AnimatePresence mode="wait">
          {phase === "watching" && (
            <motion.div
              key="watching"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl p-6 border border-gray-100"
            >
              <h2 className="font-semibold text-brand-heading mb-2">
                Finished watching?
              </h2>
              <p className="text-sm text-brand-body mb-5">
                Mark this video as watched to track your progress.
                {quizQuestions &&
                  quizQuestions.length > 0 &&
                  " A short quiz will follow."}
              </p>
              <Button
                data-ocid="video.primary_button"
                onClick={handleMarkWatched}
                disabled={marking}
                className="bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl font-semibold"
              >
                {marking ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Marking...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Mark as Watched
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {phase === "quiz" && quizQuestions && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-6">
                <Badge className="bg-brand-orange/10 text-brand-orange border-brand-orange/20">
                  Quick Quiz
                </Badge>
                <span className="text-sm text-brand-body">
                  {quizQuestions.length} question
                  {quizQuestions.length !== 1 ? "s" : ""}
                </span>
              </div>

              {quizLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {quizQuestions.map((q, qi) => (
                    <div key={q.id} data-ocid={`quiz.item.${qi + 1}`}>
                      <p className="font-semibold text-brand-heading mb-3 text-sm">
                        {qi + 1}. {q.questionText}
                      </p>
                      <RadioGroup
                        value={selectedAnswers[q.id]?.toString() || ""}
                        onValueChange={(val) =>
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [q.id]: Number.parseInt(val),
                          }))
                        }
                        className="space-y-2"
                      >
                        {q.options.map((opt, oi) => (
                          <div
                            key={opt}
                            className="flex items-center space-x-2 p-3 rounded-lg border border-gray-100 hover:border-brand-teal/40 hover:bg-brand-wash transition-colors"
                          >
                            <RadioGroupItem
                              data-ocid="quiz.radio"
                              value={oi.toString()}
                              id={`${q.id}-${oi}`}
                            />
                            <Label
                              htmlFor={`${q.id}-${oi}`}
                              className="cursor-pointer text-sm text-brand-body"
                            >
                              {opt}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}

                  <Button
                    data-ocid="quiz.submit_button"
                    onClick={handleSubmitQuiz}
                    disabled={
                      submittingQuiz ||
                      quizQuestions.some(
                        (q) => selectedAnswers[q.id] === undefined,
                      )
                    }
                    className="bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl font-semibold w-full"
                  >
                    {submittingQuiz ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Submitting...
                      </>
                    ) : (
                      "Submit Quiz"
                    )}
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {phase === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 text-center"
            >
              {quizResult ? (
                <>
                  {quizResult.passed ? (
                    <Trophy className="w-14 h-14 text-brand-orange mx-auto mb-4" />
                  ) : (
                    <XCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
                  )}
                  <h2 className="text-2xl font-extrabold text-brand-heading mb-2">
                    {quizResult.passed ? "Quiz Passed! 🎉" : "Quiz Not Passed"}
                  </h2>
                  <p className="text-brand-body mb-2">
                    You scored {quizResult.score}%
                  </p>
                  {!quizResult.passed && (
                    <p className="text-sm text-brand-body mb-4">
                      Review the video and try again next time.
                    </p>
                  )}
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-14 h-14 text-brand-teal mx-auto mb-4" />
                  <h2 className="text-2xl font-extrabold text-brand-heading mb-2">
                    Video Complete!
                  </h2>
                  <p className="text-brand-body mb-4">
                    Great job! Keep up the momentum.
                  </p>
                </>
              )}

              <div className="flex gap-3 justify-center mt-6">
                <Button
                  data-ocid="video.link"
                  variant="outline"
                  onClick={() => nav.navigate("course-detail", { courseId })}
                  className="border-brand-teal text-brand-teal hover:bg-brand-wash rounded-xl"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Course
                </Button>
                <Button
                  data-ocid="video.primary_button"
                  onClick={() => nav.navigate("dashboard")}
                  className="bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl"
                >
                  My Dashboard
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
