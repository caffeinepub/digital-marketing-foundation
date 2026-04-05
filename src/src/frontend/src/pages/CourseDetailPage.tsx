import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Loader2,
  Lock,
  PlayCircle,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { AppNav } from "../App";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCompletedVideos,
  useCourse,
  useEnrollInCourse,
  useIsEnrolled,
  useModulesForCourse,
  useRazorpayKeyId,
  useVideosForModule,
} from "../hooks/useQueries";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open(): void };
  }
}
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
  }) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

interface CourseDetailPageProps {
  nav: AppNav;
  courseId: string;
}

const TIER_LABELS: Record<string, string> = {
  basic: "Basic",
  professional: "Professional",
  advanced: "Advanced",
};

const TIER_COLORS: Record<string, string> = {
  basic: "bg-emerald-100 text-emerald-700",
  professional: "bg-blue-100 text-blue-700",
  advanced: "bg-purple-100 text-purple-700",
};

function ModuleSection({
  moduleId,
  isEnrolled,
  completedVideos,
  onWatch,
}: {
  moduleId: string;
  isEnrolled: boolean;
  completedVideos: string[];
  onWatch: (videoId: string) => void;
}) {
  const { data: videos, isLoading } = useVideosForModule(moduleId);

  if (isLoading)
    return (
      <div className="py-2">
        <Skeleton className="h-8 w-full" />
      </div>
    );
  if (!videos || videos.length === 0)
    return <div className="text-sm text-brand-body py-2">No videos yet.</div>;

  return (
    <ul className="space-y-2">
      {videos.map((video) => {
        const done = completedVideos.includes(video.id);
        return (
          <li
            key={video.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-brand-wash group"
          >
            {done ? (
              <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0" />
            ) : isEnrolled ? (
              <PlayCircle className="w-5 h-5 text-brand-body group-hover:text-brand-teal flex-shrink-0" />
            ) : (
              <Lock className="w-5 h-5 text-gray-300 flex-shrink-0" />
            )}
            <span
              className={`text-sm flex-1 ${
                done
                  ? "text-brand-teal font-medium"
                  : isEnrolled
                    ? "text-brand-body group-hover:text-brand-heading cursor-pointer"
                    : "text-gray-400"
              }`}
            >
              {video.title}
            </span>
            <span className="text-xs text-gray-400 flex-shrink-0 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {Number(video.durationMinutes)}m
            </span>
            {isEnrolled && !done && (
              <Button
                data-ocid="video.button"
                size="sm"
                variant="ghost"
                onClick={() => onWatch(video.id)}
                className="opacity-0 group-hover:opacity-100 text-brand-teal hover:bg-brand-teal/10 text-xs px-2 py-1 h-auto"
              >
                Watch
              </Button>
            )}
            {isEnrolled && done && (
              <Button
                data-ocid="video.button"
                size="sm"
                variant="ghost"
                onClick={() => onWatch(video.id)}
                className="text-brand-teal hover:bg-brand-teal/10 text-xs px-2 py-1 h-auto"
              >
                Rewatch
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function CourseDetailPage({
  nav,
  courseId,
}: CourseDetailPageProps) {
  const { data: course, isLoading: courseLoading } = useCourse(courseId);
  const { data: modules, isLoading: modulesLoading } =
    useModulesForCourse(courseId);
  const { data: isEnrolled } = useIsEnrolled(courseId);
  const { data: completedVideos = [] } = useCompletedVideos(courseId);
  const { identity, login } = useInternetIdentity();
  const enrollMutation = useEnrollInCourse();
  const { data: razorpayKeyId = "" } = useRazorpayKeyId();
  const [enrolling, setEnrolling] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleEnroll = async () => {
    if (!identity) {
      login();
      return;
    }
    if (!razorpayKeyId) {
      toast.error("Payment gateway not configured. Please contact support.");
      return;
    }
    setEnrolling(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Failed to load payment gateway. Please try again.");
        setEnrolling(false);
        return;
      }
      const options: RazorpayOptions = {
        key: razorpayKeyId,
        amount: Number(course?.priceInr || 0) * 100,
        currency: "INR",
        name: "The Digital Marketing Foundation",
        description: course?.title || "Course Enrollment",
        handler: async (response) => {
          try {
            await enrollMutation.mutateAsync({
              courseId,
              razorpayOrderId: response.razorpay_order_id || "",
              razorpayPaymentId: response.razorpay_payment_id,
            });
            toast.success("Payment successful! Welcome to the course.");
            nav.navigate("dashboard");
          } catch {
            toast.error(
              "Enrollment failed after payment. Please contact support.",
            );
          } finally {
            setEnrolling(false);
          }
        },
        prefill: { name: "", email: "", contact: "" },
        theme: { color: "#0F172A" },
        modal: {
          ondismiss: () => {
            setEnrolling(false);
            toast.info("Payment cancelled.");
          },
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error("Could not initiate payment. Please try again.");
      setEnrolling(false);
    }
  };

  const handleWatchVideo = (videoId: string) => {
    nav.navigate("video-player", { videoId, courseId });
  };

  if (courseLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-brand-heading mb-4">
          Course not found
        </h2>
        <Button onClick={() => nav.navigate("landing")} variant="outline">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Courses
        </Button>
      </div>
    );
  }

  const tierKey = course.tier.__kind__ as string;
  const tierLabel = TIER_LABELS[tierKey] || tierKey;
  const tierColor = TIER_COLORS[tierKey] || TIER_COLORS.basic;
  const progress =
    course.totalVideos > BigInt(0)
      ? Math.round((completedVideos.length / Number(course.totalVideos)) * 100)
      : 0;

  return (
    <div className="bg-white min-h-screen">
      {/* Course Hero */}
      <div className="bg-brand-heading py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <button
            type="button"
            data-ocid="course.link"
            onClick={() => nav.navigate("landing")}
            className="flex items-center gap-1 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Courses
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${tierColor} mb-3`}
              >
                {tierLabel}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-white/70 leading-relaxed mb-6">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {Number(course.totalModules)} modules
                </span>
                <span className="flex items-center gap-1.5">
                  <PlayCircle className="w-4 h-4" />
                  {Number(course.totalVideos)} videos
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  Certificate included
                </span>
              </div>
            </div>

            {/* Enrollment Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-xl"
            >
              <img
                src={
                  course.thumbnailUrl ||
                  "/assets/generated/course-social-media.dim_400x240.jpg"
                }
                alt={course.title}
                className="w-full h-32 object-cover rounded-xl mb-4"
              />
              <div className="text-3xl font-extrabold text-brand-heading mb-1">
                ₹{Number(course.priceInr).toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-brand-body mb-4">
                One-time payment · Lifetime access
              </div>

              {isEnrolled ? (
                <>
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-brand-body">Your Progress</span>
                      <span className="font-semibold text-brand-teal">
                        {progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-teal rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <Badge className="w-full justify-center py-2 bg-brand-teal/10 text-brand-teal border-brand-teal/20 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Enrolled
                  </Badge>
                </>
              ) : (
                <Button
                  data-ocid="course.primary_button"
                  size="lg"
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white rounded-xl font-semibold shadow-orange"
                >
                  {enrolling ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Processing...
                    </>
                  ) : (
                    "Enroll Now — Pay with Razorpay"
                  )}
                </Button>
              )}
              <p className="text-xs text-center text-brand-body mt-3">
                Secure payment via Razorpay · 30-day guarantee
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="container mx-auto px-4 max-w-5xl py-12">
        <h2 className="text-2xl font-extrabold text-brand-heading mb-6">
          Course Curriculum
        </h2>
        {modulesLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        ) : modules && modules.length > 0 ? (
          <Accordion
            type="multiple"
            defaultValue={[modules[0]?.id || ""]}
            className="space-y-3"
          >
            {modules.map((mod, idx) => (
              <AccordionItem
                key={mod.id}
                value={mod.id}
                className="border border-gray-100 rounded-xl overflow-hidden px-4 data-[state=open]:shadow-xs"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-brand-heading text-sm">
                      {mod.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ModuleSection
                    moduleId={mod.id}
                    isEnrolled={!!isEnrolled}
                    completedVideos={completedVideos}
                    onWatch={handleWatchVideo}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12 text-brand-body">
            <BookOpen className="w-12 h-12 mx-auto text-gray-200 mb-3" />
            <p>Curriculum will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
