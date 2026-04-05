import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { AppNav } from "../App";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface Props {
  nav: AppNav;
}

export default function PaymentSuccess({ nav }: Props) {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const [enrolling, setEnrolling] = useState(true);
  const [_enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const enroll = async () => {
      if (!actor || !identity) {
        setEnrolling(false);
        return;
      }
      try {
        const courseId = sessionStorage.getItem("pending_course_id") || "";
        const sessionId =
          new URLSearchParams(window.location.search).get("session_id") ||
          "stripe-session";
        if (courseId) {
          await (actor as any).enrollInCourse(courseId, sessionId);
          sessionStorage.removeItem("pending_course_id");
        }
        setEnrolled(true);
        toast.success("You're now enrolled! Welcome to the course.");
      } catch (err) {
        console.error(err);
        setEnrolled(true);
      } finally {
        setEnrolling(false);
      }
    };
    enroll();
  }, [actor, identity]);

  return (
    <div
      className="min-h-screen flex items-center justify-center neural-grid"
      style={{ background: "oklch(5% 0.01 250)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-6"
      >
        {enrolling ? (
          <>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "oklch(60% 0.25 230 / 0.15)",
                border: "1px solid oklch(60% 0.25 230 / 0.4)",
              }}
            >
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground mb-3">
              Processing your enrollment...
            </h1>
            <p style={{ color: "oklch(55% 0.01 250)" }}>
              Please wait a moment.
            </p>
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 glow-blue"
              style={{
                background: "oklch(60% 0.25 230 / 0.15)",
                border: "2px solid oklch(60% 0.25 230 / 0.6)",
              }}
            >
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </motion.div>
            <h1 className="text-3xl font-extrabold text-foreground mb-3">
              Payment Successful!
            </h1>
            <p className="mb-8" style={{ color: "oklch(55% 0.01 250)" }}>
              Your enrollment is confirmed. Start learning today and transform
              your digital marketing career!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                data-ocid="payment_success.primary_button"
                size="lg"
                onClick={() => nav.navigate("dashboard")}
                className="btn-gold rounded-full px-8 font-semibold glow-blue"
              >
                Go to Dashboard
              </Button>
              <Button
                data-ocid="payment_success.secondary_button"
                size="lg"
                variant="outline"
                onClick={() => nav.navigate("landing")}
                className="rounded-full px-8 border-primary/30 text-primary hover:bg-primary/10"
              >
                Browse More Courses
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
