import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Check, GraduationCap, Linkedin, Printer } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { AppNav } from "../App";
import { useCertificateById } from "../hooks/useQueries";

interface Props {
  nav: AppNav;
  certId: string;
}

function formatDate(nanoseconds: bigint): {
  display: string;
  year: number;
  month: number;
} {
  const ms = Number(nanoseconds) / 1_000_000;
  const date = new Date(ms);
  return {
    display: date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
}

export default function CertificatePage({ nav, certId }: Props) {
  const { data: cert, isLoading } = useCertificateById(certId);
  const [copied, setCopied] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Certificate link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const buildLinkedInUrl = () => {
    if (!cert) return "#";
    const { year, month } = formatDate(cert.issuedAt);
    const certUrl = window.location.href;
    const params = new URLSearchParams({
      startTask: "CERTIFICATION_NAME",
      name: cert.courseTitle,
      organizationName: "Digital Marketing Foundation",
      issueYear: String(year),
      issueMonth: String(month),
      certUrl,
      certId: cert.id,
    });
    return `https://www.linkedin.com/profile/add?${params.toString()}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Skeleton
          data-ocid="certificate.loading_state"
          className="h-10 w-64 mb-6"
        />
        <Skeleton className="h-[500px] w-full rounded-2xl" />
      </div>
    );
  }

  if (!cert) {
    return (
      <div
        data-ocid="certificate.error_state"
        className="min-h-[60vh] flex items-center justify-center"
      >
        <div className="text-center max-w-sm">
          <Award className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-brand-heading mb-3">
            Certificate Not Found
          </h2>
          <p className="text-brand-body mb-6">
            This certificate does not exist or has been removed.
          </p>
          <Button
            data-ocid="certificate.button"
            variant="outline"
            onClick={() => nav.navigate("landing")}
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const dateInfo = formatDate(cert.issuedAt);

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8 print:hidden">
          <Button
            data-ocid="certificate.button"
            variant="outline"
            size="sm"
            onClick={() => nav.navigate("landing")}
            className="text-brand-body"
          >
            Back to Home
          </Button>
          <div className="flex-1" />
          <Button
            data-ocid="certificate.button"
            size="sm"
            onClick={() => window.open(buildLinkedInUrl(), "_blank")}
            className="bg-[#0A66C2] hover:bg-[#004182] text-white gap-1.5"
          >
            <Linkedin className="w-4 h-4" />
            Add to LinkedIn
          </Button>
          <Button
            data-ocid="certificate.button"
            size="sm"
            variant="outline"
            onClick={handleCopyLink}
            className="border-brand-teal text-brand-teal hover:bg-brand-wash gap-1.5"
          >
            {copied ? <Check className="w-4 h-4" /> : null}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
          <Button
            data-ocid="certificate.button"
            size="sm"
            variant="outline"
            onClick={handlePrint}
            className="gap-1.5"
          >
            <Printer className="w-4 h-4" />
            Print / Download
          </Button>
        </div>

        {/* Certificate Document */}
        <div
          ref={certRef}
          data-ocid="certificate.card"
          className="bg-white rounded-2xl shadow-2xl overflow-hidden relative"
          style={{ border: "12px solid oklch(0.596 0.164 152)" }}
        >
          {/* Inner border accent */}
          <div
            className="absolute inset-2 pointer-events-none"
            style={{
              border: "2px solid oklch(0.820 0.100 152)",
              borderRadius: "8px",
            }}
          />

          {/* Header gradient */}
          <div className="gradient-teal px-8 py-8 text-center relative">
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 border-2 border-white/30 rounded-full" />
            <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/30 rounded-full" />

            <div className="flex justify-center mb-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <GraduationCap className="w-9 h-9 text-white" />
              </div>
            </div>
            <div className="text-white/80 text-sm font-semibold tracking-[0.15em] uppercase mb-1">
              Digital Marketing Foundation
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
              Certificate of Completion
            </h1>
          </div>

          {/* Body */}
          <div className="px-10 py-10 text-center">
            <p className="text-brand-body text-base mb-3">
              This certifies that
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold mb-4"
              style={{
                color: "oklch(0.424 0.118 152)",
                fontFamily: '"Plus Jakarta Sans", serif',
              }}
            >
              {cert.studentName}
            </h2>
            <p className="text-brand-body text-base mb-2">
              has successfully completed the course
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-brand-heading mb-8">
              {cert.courseTitle}
            </h3>

            {/* Divider */}
            <div className="flex items-center gap-4 max-w-xs mx-auto mb-8">
              <div className="flex-1 h-px bg-brand-teal/30" />
              <Award className="w-6 h-6 text-brand-orange" />
              <div className="flex-1 h-px bg-brand-teal/30" />
            </div>

            {/* Date & Credential */}
            <div className="grid grid-cols-2 gap-8 max-w-xs mx-auto">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-1">
                  Issue Date
                </div>
                <div className="text-sm font-semibold text-brand-heading">
                  {dateInfo.display}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-teal mb-1">
                  Credential ID
                </div>
                <div className="text-xs font-mono text-brand-body break-all">
                  {cert.id.slice(0, 12)}...
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-10 pb-8 text-center">
            {/* Seal */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-brand-teal/40 mx-auto mb-4">
              <div className="w-14 h-14 rounded-full bg-brand-teal/10 flex items-center justify-center">
                <Award className="w-7 h-7 text-brand-teal" />
              </div>
            </div>
            <p className="text-xs text-brand-body">
              This certificate is uniquely verifiable at{" "}
              <span className="text-brand-teal font-medium">
                {window.location.href}
              </span>
            </p>
          </div>
        </div>

        {/* LinkedIn CTA */}
        <div className="mt-6 text-center print:hidden">
          <p className="text-sm text-brand-body mb-3">
            Share your achievement with the world!
          </p>
          <Button
            data-ocid="certificate.primary_button"
            size="lg"
            onClick={() => window.open(buildLinkedInUrl(), "_blank")}
            className="bg-[#0A66C2] hover:bg-[#004182] text-white rounded-full px-8 gap-2"
          >
            <Linkedin className="w-5 h-5" />
            Add to LinkedIn Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
