import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { motion } from "motion/react";
import type { AppNav } from "../App";

interface Props {
  nav: AppNav;
}

export default function PaymentFailure({ nav }: Props) {
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
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{
            background: "oklch(55% 0.2 25 / 0.15)",
            border: "2px solid oklch(55% 0.2 25 / 0.5)",
          }}
        >
          <XCircle className="w-12 h-12 text-destructive" />
        </motion.div>
        <h1 className="text-3xl font-extrabold text-foreground mb-3">
          Payment Cancelled
        </h1>
        <p className="mb-8" style={{ color: "oklch(55% 0.01 250)" }}>
          Your payment was not completed. No charges were made. You can try
          again whenever you're ready.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            data-ocid="payment_failure.primary_button"
            size="lg"
            onClick={() => nav.navigate("landing")}
            className="btn-gold rounded-full px-8 font-semibold glow-blue"
          >
            Try Again
          </Button>
          <Button
            data-ocid="payment_failure.secondary_button"
            size="lg"
            variant="outline"
            onClick={() => nav.navigate("landing")}
            className="rounded-full px-8 border-primary/30 text-primary hover:bg-primary/10"
          >
            Browse Courses
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
