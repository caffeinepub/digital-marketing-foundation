import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Award,
  CheckCircle,
  Copy,
  Download,
  ExternalLink,
  Linkedin,
  Share2,
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

    // Try actor method if available
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
      // Fallback: try getMyCertificates (needs auth)
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
        className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6"
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
        className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-5">
            <Award className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
            Certificate Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            This certificate link is invalid or has expired. Please check the
            URL and try again.
          </p>
          <Button
            data-ocid="certificate.primary_button"
            onClick={() => nav.navigate("landing")}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-6"
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          type="button"
          data-ocid="certificate.link"
          onClick={() => nav.navigate("dashboard")}
          className="no-print flex items-center gap-2 text-[#075E54] hover:text-[#25D366] text-sm font-medium mb-8 transition-colors"
        >
          ← Back to Dashboard
        </button>

        {/* Certificate Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          data-ocid="certificate.card"
          className="print-cert relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2"
          style={{
            borderColor: "#c9a84c",
            background:
              "linear-gradient(135deg, #fffdf5 0%, #ffffff 50%, #f0faf4 100%)",
          }}
        >
          {/* Gold border accent top */}
          <div
            className="h-3 w-full"
            style={{
              background:
                "linear-gradient(90deg, #c9a84c, #e8d27a, #c9a84c, #e8d27a, #c9a84c)",
            }}
          />

          <div className="px-8 md:px-16 py-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "#075E54" }}
                >
                  <Award className="w-7 h-7 text-yellow-300" />
                </div>
              </div>
              <h1
                className="text-xl md:text-2xl font-extrabold tracking-wide mb-1"
                style={{ color: "#075E54" }}
              >
                The Digital Marketing Foundation
              </h1>
              <p className="text-xs text-gray-400 tracking-widest uppercase">
                India's AI-Powered Digital Marketing Learning Platform
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px" style={{ background: "#c9a84c" }} />
              <Award className="w-5 h-5" style={{ color: "#c9a84c" }} />
              <div className="flex-1 h-px" style={{ background: "#c9a84c" }} />
            </div>

            {/* Certificate title */}
            <div className="text-center mb-8">
              <h2
                className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6"
                style={{ color: "#1a1a1a" }}
              >
                Certificate of Completion
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                This is to certify that
              </p>
              <p
                className="text-4xl md:text-5xl font-extrabold mb-4"
                style={{
                  fontFamily: "'Plus Jakarta Sans', serif",
                  color: "#075E54",
                  letterSpacing: "-0.01em",
                }}
              >
                {cert.studentName}
              </p>
              <p className="text-gray-500 text-sm mb-2">
                has successfully completed
              </p>
              <p
                className="text-xl md:text-2xl font-bold mb-6"
                style={{ color: "#1a1a1a" }}
              >
                {cert.courseTitle}
              </p>

              {/* Seal */}
              <div className="flex items-center justify-center mb-6">
                <div
                  className="w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-lg"
                  style={{ borderColor: "#c9a84c", background: "#fffcf0" }}
                >
                  <CheckCircle
                    className="w-9 h-9"
                    style={{ color: "#c9a84c" }}
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px" style={{ background: "#c9a84c" }} />
              <Award className="w-4 h-4" style={{ color: "#c9a84c" }} />
              <div className="flex-1 h-px" style={{ background: "#c9a84c" }} />
            </div>

            {/* Meta info */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Date Issued
                </p>
                <p className="font-semibold text-gray-800 text-sm">
                  {issuedDate}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Credential ID
                </p>
                <p
                  className="font-mono text-sm font-semibold"
                  style={{ color: "#075E54" }}
                >
                  {credentialId}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Issued by
                </p>
                <p className="font-semibold text-gray-800 text-sm">
                  Digital Marketing Foundation
                </p>
              </div>
            </div>
          </div>

          {/* Gold border accent bottom */}
          <div
            className="h-3 w-full"
            style={{
              background:
                "linear-gradient(90deg, #c9a84c, #e8d27a, #c9a84c, #e8d27a, #c9a84c)",
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
          {/* Add to LinkedIn */}
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

          {/* Download / Print */}
          <Button
            data-ocid="certificate.secondary_button"
            onClick={handlePrint}
            variant="outline"
            className="flex items-center gap-2 border-[#25D366] text-[#075E54] hover:bg-green-50 rounded-full px-6 font-semibold text-sm"
          >
            <Download className="w-4 h-4" />
            Download / Print
          </Button>

          {/* Share Link */}
          <Button
            data-ocid="certificate.secondary_button"
            onClick={handleCopyLink}
            variant="outline"
            className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-6 font-semibold text-sm"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
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
          className="no-print mt-8 p-5 bg-blue-50 border border-blue-100 rounded-2xl max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Linkedin className="w-5 h-5 text-[#0A66C2]" />
            <span className="font-semibold text-blue-900 text-sm">
              How to add this to LinkedIn
            </span>
          </div>
          <p className="text-xs text-blue-700 leading-relaxed">
            Click <strong>"Add to LinkedIn"</strong> above. LinkedIn will open
            with all your certificate details pre-filled — just click{" "}
            <strong>Save</strong> to add it to your profile's Licenses &amp;
            Certifications section. Anyone clicking{" "}
            <strong>"View Certificate"</strong> on your profile will see this
            certificate page.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
