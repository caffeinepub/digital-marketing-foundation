import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { motion } from "motion/react";
import type { AppNav } from "../App";

interface Props {
  nav: AppNav;
}

export default function PaymentFailure({ nav }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
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
          className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle className="w-12 h-12 text-red-500" />
        </motion.div>
        <h1 className="text-3xl font-extrabold text-brand-heading mb-3">
          Payment Cancelled
        </h1>
        <p className="text-brand-body mb-8">
          Your payment was not completed. No charges were made. You can try
          again whenever you're ready.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            data-ocid="payment_failure.primary_button"
            size="lg"
            onClick={() => nav.navigate("landing")}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full px-8 font-semibold shadow-orange"
          >
            Try Again
          </Button>
          <Button
            data-ocid="payment_failure.secondary_button"
            size="lg"
            variant="outline"
            onClick={() => nav.navigate("landing")}
            className="rounded-full px-8 border-brand-teal text-brand-teal"
          >
            Browse Courses
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
