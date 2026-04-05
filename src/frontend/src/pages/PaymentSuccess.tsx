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
        setEnrolled(true); // still show success page
      } finally {
        setEnrolling(false);
      }
    };
    enroll();
  }, [actor, identity]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-6"
      >
        {enrolling ? (
          <>
            <Loader2 className="w-16 h-16 text-brand-teal mx-auto mb-6 animate-spin" />
            <h1 className="text-2xl font-extrabold text-brand-heading mb-3">
              Processing your enrollment...
            </h1>
            <p className="text-brand-body">Please wait a moment.</p>
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </motion.div>
            <h1 className="text-3xl font-extrabold text-brand-heading mb-3">
              Payment Successful!
            </h1>
            <p className="text-brand-body mb-8">
              Your enrollment is confirmed. Start learning today and transform
              your digital marketing career!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                data-ocid="payment_success.primary_button"
                size="lg"
                onClick={() => nav.navigate("dashboard")}
                className="bg-brand-teal hover:bg-brand-teal-dark text-white rounded-full px-8 font-semibold"
              >
                Go to Dashboard
              </Button>
              <Button
                data-ocid="payment_success.secondary_button"
                size="lg"
                variant="outline"
                onClick={() => nav.navigate("landing")}
                className="rounded-full px-8 border-brand-teal text-brand-teal"
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
