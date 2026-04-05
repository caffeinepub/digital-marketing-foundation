import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Award,
  CheckCircle,
  Copy,
  Download,
  ExternalLink,
  Linkedin,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { AppNav } from "../App";
import type { Certificate } from "../backend.d";
import { useActor } from "../hooks/useActor";

interface Props {
  nav: AppNav;
  certId: string;
}

function formatDate(ns: bigint): string {
  const ms = Number(ns) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatIssueYear(ns: bigint): string {
  return new Date(Number(ns) / 1_000_000).getFullYear().toString();
}

function formatIssueMonth(ns: bigint): string {
  return (new Date(Number(ns) / 1_000_000).getMonth() + 1).toString();
}

function LinkedInShareUrl(cert: Certificate): string {
  const certUrl = encodeURIComponent(window.location.href);
  const certId = encodeURIComponent(`DMF-CERT-${cert.id}`);
  const orgName = encodeURIComponent("Digital Marketing Foundation");
  const courseName = encodeURIComponent(cert.courseTitle);
  const year = formatIssueYear(cert.issuedAt);
  const month = formatIssueMonth(cert.issuedAt);
  return `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${courseName}&organizationName=${orgName}&issueYear=${year}&issueMonth=${month}&certUrl=${certUrl}&certId=${certId}`;
}

export default function CertificatePage({ nav, certId }: Props) {
  const { actor } = useActor();
  const [cert, setCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!actor || !certId) return;
    setLoading(true);
    setError(false);

    const actorAny = actor as any;
    if (typeof actorAny.getCertificateById === "function") {
      actorAny
        .getCertificateById(certId)
        .then((result: [] | [Certificate]) => {
          const found = Array.isArray(result) ? result[0] : undefined;
          if (found) {
            setCert(found);
          } else {
            setError(true);
          }
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    } else {
      actorAny
        .getMyCertificates()
        .then((certs: Certificate[]) => {
          const found = certs.find((c: Certificate) => c.id === certId);
          if (found) {
            setCert(found);
          } else {
            setError(true);
          }
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [actor, certId]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Certificate link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link. Please copy the URL manually.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div
        data-ocid="certificate.loading_state"
        className="min-h-screen flex items-center justify-center p-6 neural-grid"
        style={{ background: "oklch(5% 0.01 250)" }}
      >
        <div className="w-full max-w-3xl">
          <Skeleton className="h-16 w-64 mx-auto mb-8 rounded-xl" />
          <Skeleton className="h-[440px] w-full rounded-2xl" />
          <div className="flex gap-3 justify-center mt-6">
            <Skeleton className="h-10 w-36 rounded-full" />
            <Skeleton className="h-10 w-36 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !cert) {
    return (
      <div
        data-ocid="certificate.error_state"
        className="min-h-screen flex items-center justify-center p-6 neural-grid"
        style={{ background: "oklch(5% 0.01 250)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{
              background: "oklch(55% 0.2 25 / 0.15)",
              border: "1px solid oklch(55% 0.2 25 / 0.35)",
            }}
          >
            <Award className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground mb-3">
            Certificate Not Found
          </h1>
          <p className="mb-6" style={{ color: "oklch(55% 0.01 250)" }}>
            This certificate link is invalid or has expired. Please check the
            URL and try again.
          </p>
          <Button
            data-ocid="certificate.primary_button"
            onClick={() => nav.navigate("landing")}
            className="btn-gold rounded-full px-6"
          >
            Go to Homepage
          </Button>
        </motion.div>
      </div>
    );
  }

  const issuedDate = formatDate(cert.issuedAt);
  const credentialId = `DMF-CERT-${cert.id}`;

  return (
    <div
      className="min-h-screen py-10 px-4 neural-grid"
      style={{ background: "oklch(5% 0.01 250)" }}
    >
      <div className="max-w-4xl mx-auto">
        <button
          type="button"
          data-ocid="certificate.link"
          onClick={() => nav.navigate("dashboard")}
          className="no-print flex items-center gap-2 text-primary hover:text-accent text-sm font-medium mb-8 transition-colors"
        >
          Back to Dashboard
        </button>

        {/* Certificate Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          data-ocid="certificate.card"
          className="print-cert relative rounded-2xl overflow-hidden"
          style={{
            background: "oklch(5% 0.01 250)",
            border: "2px solid oklch(60% 0.25 230 / 0.4)",
            boxShadow: "0 0 60px oklch(60% 0.25 230 / 0.15)",
          }}
        >
          {/* Electric blue top bar */}
          <div
            className="h-2 w-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(45% 0.22 290), oklch(60% 0.25 230), oklch(70% 0.2 200), oklch(60% 0.25 230), oklch(45% 0.22 290))",
            }}
          />

          <div className="px-8 md:px-16 py-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg glow-blue"
                  style={{
                    background: "oklch(60% 0.25 230 / 0.15)",
                    border: "2px solid oklch(60% 0.25 230 / 0.5)",
                  }}
                >
                  <Award className="w-7 h-7 text-primary" />
                </div>
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-wide mb-1 text-primary font-mono">
                The Digital Marketing Foundation
              </h1>
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: "oklch(40% 0.01 250)" }}
              >
                India's AI-Powered Digital Marketing Learning Platform
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-primary/30" />
              <Award className="w-5 h-5 text-primary" />
              <div className="flex-1 h-px bg-primary/30" />
            </div>

            {/* Certificate title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-foreground">
                Certificate of Completion
              </h2>
              <p
                className="text-sm mb-4"
                style={{ color: "oklch(50% 0.01 250)" }}
              >
                This is to certify that
              </p>
              <p
                className="text-4xl md:text-5xl font-extrabold mb-4 text-primary glow-blue-text"
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                {cert.studentName}
              </p>
              <p
                className="text-sm mb-2"
                style={{ color: "oklch(50% 0.01 250)" }}
              >
                has successfully completed
              </p>
              <p className="text-xl md:text-2xl font-bold mb-6 text-foreground">
                {cert.courseTitle}
              </p>

              <div className="flex items-center justify-center mb-6">
                <div
                  className="w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-lg glow-blue"
                  style={{
                    borderColor: "oklch(60% 0.25 230 / 0.6)",
                    background: "oklch(60% 0.25 230 / 0.1)",
                  }}
                >
                  <CheckCircle className="w-9 h-9 text-primary" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-primary/30" />
              <Award className="w-4 h-4 text-primary" />
              <div className="flex-1 h-px bg-primary/30" />
            </div>

            {/* Meta info */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div>
                <p
                  className="text-xs tracking-wider uppercase mb-1"
                  style={{ color: "oklch(40% 0.01 250)" }}
                >
                  Date Issued
                </p>
                <p className="font-semibold text-foreground text-sm">
                  {issuedDate}
                </p>
              </div>
              <div>
                <p
                  className="text-xs tracking-wider uppercase mb-1"
                  style={{ color: "oklch(40% 0.01 250)" }}
                >
                  Credential ID
                </p>
                <p className="font-mono text-sm font-semibold text-primary">
                  {credentialId}
                </p>
              </div>
              <div>
                <p
                  className="text-xs tracking-wider uppercase mb-1"
                  style={{ color: "oklch(40% 0.01 250)" }}
                >
                  Issued by
                </p>
                <p className="font-semibold text-foreground text-sm">
                  Digital Marketing Foundation
                </p>
              </div>
            </div>
          </div>

          {/* Blue bottom bar */}
          <div
            className="h-2 w-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(45% 0.22 290), oklch(60% 0.25 230), oklch(70% 0.2 200), oklch(60% 0.25 230), oklch(45% 0.22 290))",
            }}
          />
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="no-print mt-8 flex flex-wrap justify-center gap-4"
        >
          <a
            href={LinkedInShareUrl(cert)}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="certificate.primary_button"
            className="inline-flex items-center gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-colors text-sm"
          >
            <Linkedin className="w-4 h-4" />
            Add to LinkedIn
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          <Button
            data-ocid="certificate.secondary_button"
            onClick={handlePrint}
            variant="outline"
            className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/10 rounded-full px-6 font-semibold text-sm"
          >
            <Download className="w-4 h-4" />
            Download / Print
          </Button>

          <Button
            data-ocid="certificate.secondary_button"
            onClick={handleCopyLink}
            variant="outline"
            className="flex items-center gap-2 border-border text-foreground hover:bg-muted rounded-full px-6 font-semibold text-sm"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4 text-primary" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied!" : "Copy Share Link"}
          </Button>
        </motion.div>

        {/* LinkedIn instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="no-print mt-8 p-5 rounded-2xl max-w-2xl mx-auto text-center"
          style={{
            background: "oklch(60% 0.25 230 / 0.05)",
            border: "1px solid oklch(60% 0.25 230 / 0.2)",
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Linkedin className="w-5 h-5 text-primary" />
            <span className="font-mono font-semibold text-primary text-sm">
              How to add this to LinkedIn
            </span>
          </div>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "oklch(55% 0.01 250)" }}
          >
            Click <strong className="text-foreground">"Add to LinkedIn"</strong>{" "}
            above. LinkedIn will open with all your certificate details
            pre-filled — just click{" "}
            <strong className="text-foreground">Save</strong> to add it to your
            profile's Licenses &amp; Certifications section.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
