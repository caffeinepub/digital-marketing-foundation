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
  performance: "Performance",
};

const TIER_COLORS: Record<string, string> = {
  basic: "bg-primary/10 text-primary border-primary/20",
  professional: "bg-primary/10 text-primary border-primary/20",
  advanced: "bg-secondary/10 text-secondary border-secondary/20",
  performance: "bg-accent/10 text-accent border-accent/20",
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
    return (
      <div className="text-sm py-2" style={{ color: "oklch(50% 0.01 250)" }}>
        No videos yet.
      </div>
    );

  return (
    <ul className="space-y-2">
      {videos.map((video) => {
        const done = completedVideos.includes(video.id);
        return (
          <li
            key={video.id}
            className="flex items-center gap-3 p-2 rounded-lg group"
            style={{ transition: "background 0.2s" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "oklch(60% 0.25 230 / 0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {done ? (
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
            ) : isEnrolled ? (
              <PlayCircle
                className="w-5 h-5 flex-shrink-0"
                style={{ color: "oklch(50% 0.01 250)" }}
              />
            ) : (
              <Lock
                className="w-5 h-5 flex-shrink-0"
                style={{ color: "oklch(35% 0.01 250)" }}
              />
            )}
            <span
              className="text-sm flex-1"
              style={{
                color: done
                  ? "oklch(65% 0.22 230)"
                  : isEnrolled
                    ? "oklch(70% 0.01 250)"
                    : "oklch(35% 0.01 250)",
              }}
            >
              {video.title}
            </span>
            <span
              className="text-xs flex-shrink-0 flex items-center gap-1"
              style={{ color: "oklch(40% 0.01 250)" }}
            >
              <Clock className="w-3 h-3" />
              {Number(video.durationMinutes)}m
            </span>
            {isEnrolled && !done && (
              <Button
                data-ocid="video.button"
                size="sm"
                variant="ghost"
                onClick={() => onWatch(video.id)}
                className="opacity-0 group-hover:opacity-100 text-primary hover:bg-primary/10 text-xs px-2 py-1 h-auto"
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
                className="text-primary hover:bg-primary/10 text-xs px-2 py-1 h-auto"
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

const COURSE_IMAGE_MAP: Record<string, string> = {
  "Digital Marketing":
    "/assets/generated/course-digital-marketing.dim_800x450.jpg",
  SEO: "/assets/generated/course-seo.dim_800x450.jpg",
  "SEO Mastery": "/assets/generated/course-seo.dim_800x450.jpg",
  "Social Media Marketing":
    "/assets/generated/course-social-media.dim_800x450.jpg",
  "Performance Marketing":
    "/assets/generated/course-performance-marketing.dim_800x450.jpg",
  "Performance Marketing Mastery":
    "/assets/generated/course-performance-marketing.dim_800x450.jpg",
  "Learn the Art of Designing":
    "/assets/generated/course-designing.dim_800x450.jpg",
  "Learn the Art of Sales": "/assets/generated/course-sales.dim_800x450.jpg",
  "MS Office": "/assets/generated/course-ms-office.dim_800x450.jpg",
  "MS Office Complete Course":
    "/assets/generated/course-ms-office.dim_800x450.jpg",
  "Google Ads": "/assets/generated/course-google-ads.dim_800x450.jpg",
};

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
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Could not load payment gateway. Please try again.");
      setEnrolling(false);
      return;
    }
    const amount = course ? Number(course.priceInr) * 100 : 2499900;
    const razorpay = new window.Razorpay({
      key: razorpayKeyId,
      amount,
      currency: "INR",
      name: "Digital Marketing Foundation",
      description: course?.title || "Course Enrollment",
      handler: async (response) => {
        try {
          await enrollMutation.mutateAsync({
            courseId,
            razorpayOrderId: response.razorpay_order_id || "",
            razorpayPaymentId: response.razorpay_payment_id,
          });
          toast.success("Enrollment successful! Welcome to the course.");
          nav.navigate("dashboard");
        } catch {
          toast.error("Enrollment failed. Please contact support.");
        } finally {
          setEnrolling(false);
        }
      },
      theme: { color: "#0066FF" },
      modal: { ondismiss: () => setEnrolling(false) },
    });
    razorpay.open();
  };

  const handleWatchVideo = (videoId: string) => {
    nav.navigate("video-player", { videoId, courseId });
  };

  if (courseLoading) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "oklch(5% 0.01 250)" }}
      >
        <div className="container mx-auto px-4 max-w-5xl py-12 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(5% 0.01 250)" }}
      >
        <div className="text-center">
          <p className="text-foreground">Course not found.</p>
          <Button
            data-ocid="course.link"
            onClick={() => nav.navigate("landing")}
            className="mt-4 btn-gold rounded-full"
          >
            Browse Courses
          </Button>
        </div>
      </div>
    );
  }

  const rawTier = course.tier;
  const tierKey =
    typeof rawTier === "string"
      ? rawTier
      : rawTier && typeof rawTier === "object"
        ? Object.keys(rawTier as object)[0]
        : "professional";
  const tierLabel = TIER_LABELS[tierKey] || "Professional";
  const tierColor = TIER_COLORS[tierKey] || TIER_COLORS.professional;
  const progress =
    course.totalVideos > BigInt(0)
      ? Math.round((completedVideos.length / Number(course.totalVideos)) * 100)
      : 0;

  return (
    <div className="min-h-screen" style={{ background: "oklch(5% 0.01 250)" }}>
      {/* Course Hero */}
      <div
        className="py-10 neural-grid"
        style={{
          background: "oklch(6% 0.012 250)",
          borderBottom: "1px solid oklch(60% 0.25 230 / 0.15)",
        }}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <button
            type="button"
            data-ocid="course.link"
            onClick={() => nav.navigate("landing")}
            className="flex items-center gap-1 text-primary hover:text-accent text-sm mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Courses
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold ${tierColor} mb-3`}
              >
                {tierLabel}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                {course.title}
              </h1>
              <p
                className="leading-relaxed mb-6"
                style={{ color: "oklch(60% 0.01 250)" }}
              >
                {course.description}
              </p>
              <div
                className="flex flex-wrap gap-4 text-sm"
                style={{ color: "oklch(50% 0.01 250)" }}
              >
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
              className="glass-card rounded-2xl p-6"
            >
              <img
                src={
                  course.thumbnailUrl ||
                  COURSE_IMAGE_MAP[course.title] ||
                  "/assets/generated/course-digital-marketing.dim_800x450.jpg"
                }
                alt={course.title}
                className="w-full h-32 object-cover rounded-xl mb-4 opacity-80"
              />
              <div className="text-3xl font-extrabold text-primary font-mono mb-1">
                Rs.{Number(course.priceInr).toLocaleString("en-IN")}
              </div>
              <div
                className="text-xs mb-4"
                style={{ color: "oklch(45% 0.01 250)" }}
              >
                One-time payment · Lifetime access
              </div>

              {isEnrolled ? (
                <>
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span style={{ color: "oklch(50% 0.01 250)" }}>
                        Your Progress
                      </span>
                      <span className="font-mono font-semibold text-primary">
                        {progress}%
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: "oklch(20% 0.02 250)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${progress}%`,
                          background: "oklch(60% 0.25 230)",
                        }}
                      />
                    </div>
                  </div>
                  <Badge
                    className={`w-full justify-center py-2 rounded-xl ${tierColor}`}
                  >
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
                  className="w-full btn-gold rounded-xl font-semibold glow-blue"
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
              <p
                className="text-xs text-center mt-3"
                style={{ color: "oklch(40% 0.01 250)" }}
              >
                Secure payment via Razorpay · 30-day guarantee
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="container mx-auto px-4 max-w-5xl py-12">
        <h2 className="text-2xl font-extrabold text-foreground mb-6">
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
                className="glass-card rounded-xl overflow-hidden px-4"
                style={{ border: "1px solid oklch(60% 0.25 230 / 0.15)" }}
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full text-xs font-mono font-bold flex items-center justify-center text-primary"
                      style={{
                        background: "oklch(60% 0.25 230 / 0.1)",
                        border: "1px solid oklch(60% 0.25 230 / 0.25)",
                      }}
                    >
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-foreground text-sm">
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
          <div
            className="text-center py-12"
            style={{ color: "oklch(45% 0.01 250)" }}
          >
            <BookOpen
              className="w-12 h-12 mx-auto mb-3"
              style={{ color: "oklch(30% 0.01 250)" }}
            />
            <p>Curriculum will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
