import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock,
  ExternalLink,
  Gift,
  GraduationCap,
  Loader2,
  LogIn,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { AppNav } from "../App";
import type {
  AssignmentSubmission,
  Certificate,
  Enrollment,
} from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAssignmentsForCourse,
  useClaimCertificate,
  useCompletedVideos,
  useCourse,
  useMyCertificates,
  useMyEnrollments,
  useMySubmissions,
  useSubmitAssignment,
} from "../hooks/useQueries";

interface Props {
  nav: AppNav;
}

function EnrolledCourseCard({
  enrollment,
  nav,
}: { enrollment: Enrollment; nav: AppNav }) {
  const { data: course } = useCourse(enrollment.courseId);
  const { data: completed = [] } = useCompletedVideos(enrollment.courseId);
  const { data: certs = [] } = useMyCertificates();
  const claimCert = useClaimCertificate();
  const [certDialogOpen, setCertDialogOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [claiming, setClaiming] = useState(false);

  if (!course) return null;

  const total = Number(course.totalVideos);
  const done = completed.length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;
  const allDone = total > 0 && done >= total;
  const hasCert = certs.some((c) => c.courseId === enrollment.courseId);

  const handleClaimCert = async () => {
    if (!studentName.trim()) return;
    setClaiming(true);
    try {
      await claimCert.mutateAsync({
        courseId: enrollment.courseId,
        name: studentName.trim(),
      });
      toast.success("Certificate claimed! 🎉");
      setCertDialogOpen(false);
    } catch {
      toast.error("Failed to claim certificate.");
    } finally {
      setClaiming(false);
    }
  };

  return (
    <Card
      data-ocid="dashboard.card"
      className="border border-gray-100 shadow-xs"
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-brand-heading mb-1">
              {course.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-brand-body">
                {done}/{total} videos
              </span>
              {hasCert && (
                <Badge className="bg-brand-orange/10 text-brand-orange border-brand-orange/20 text-xs">
                  <Award className="w-3 h-3 mr-1" />
                  Certified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-xs font-semibold text-brand-teal w-10 text-right">
                {progress}%
              </span>
            </div>
          </div>
          <Button
            data-ocid="dashboard.button"
            size="sm"
            variant="outline"
            onClick={() =>
              nav.navigate("course-detail", { courseId: enrollment.courseId })
            }
            className="border-brand-teal text-brand-teal hover:bg-brand-wash flex-shrink-0"
          >
            Continue
          </Button>
        </div>

        {allDone && !hasCert && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Dialog open={certDialogOpen} onOpenChange={setCertDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  data-ocid="dashboard.open_modal_button"
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full text-sm font-semibold"
                  size="sm"
                >
                  <Trophy className="w-4 h-4 mr-1" />
                  Claim Certificate
                </Button>
              </DialogTrigger>
              <DialogContent data-ocid="dashboard.dialog">
                <DialogHeader>
                  <DialogTitle>Claim Your Certificate</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 py-2">
                  <Label htmlFor="student-name">
                    Your full name (as it will appear on the certificate)
                  </Label>
                  <Input
                    data-ocid="dashboard.input"
                    id="student-name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                  />
                </div>
                <DialogFooter>
                  <Button
                    data-ocid="dashboard.cancel_button"
                    variant="outline"
                    onClick={() => setCertDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    data-ocid="dashboard.confirm_button"
                    onClick={handleClaimCert}
                    disabled={claiming || !studentName.trim()}
                    className="bg-brand-orange text-white"
                  >
                    {claiming ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Claim Certificate"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AssignmentsSection({ courseId }: { courseId: string }) {
  const { data: assignments = [] } = useAssignmentsForCourse(courseId);
  const { data: mySubmissions = [] } = useMySubmissions();
  const submitAssignment = useSubmitAssignment();
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [texts, setTexts] = useState<Record<string, string>>({});

  const handleSubmit = async (assignmentId: string) => {
    const text = texts[assignmentId];
    if (!text?.trim()) return;
    setSubmitting(assignmentId);
    try {
      await submitAssignment.mutateAsync({ assignmentId, text: text.trim() });
      toast.success("Assignment submitted!");
      setTexts((prev) => ({ ...prev, [assignmentId]: "" }));
    } catch {
      toast.error("Failed to submit assignment.");
    } finally {
      setSubmitting(null);
    }
  };

  if (assignments.length === 0) {
    return (
      <p className="text-sm text-brand-body py-4">
        No assignments for this course yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {assignments.map((a, i) => {
        const submitted = mySubmissions.find((s) => s.assignmentId === a.id);
        return (
          <Card
            data-ocid={`assignments.item.${i + 1}`}
            key={a.id}
            className="border border-gray-100"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <Badge variant="outline" className="text-xs mb-1">
                    Week {Number(a.weekNumber)}
                  </Badge>
                  <h4 className="font-semibold text-brand-heading text-sm">
                    {a.title}
                  </h4>
                  <p className="text-xs text-brand-body mt-1">
                    {a.description}
                  </p>
                </div>
                {submitted && (
                  <Badge
                    className={
                      submitted.reviewed
                        ? "bg-brand-teal/10 text-brand-teal border-brand-teal/20"
                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }
                  >
                    {submitted.reviewed ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Reviewed
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </>
                    )}
                  </Badge>
                )}
              </div>
              {submitted ? (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-brand-body italic">
                    {submitted.submissionText}
                  </p>
                  {submitted.giftCardCode.__kind__ === "Some" && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-brand-orange font-semibold">
                      <Gift className="w-3 h-3" />
                      Gift Card: {submitted.giftCardCode.value}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-3 space-y-2">
                  <Textarea
                    data-ocid="assignments.textarea"
                    placeholder="Write your submission here..."
                    value={texts[a.id] || ""}
                    onChange={(e) =>
                      setTexts((prev) => ({ ...prev, [a.id]: e.target.value }))
                    }
                    rows={3}
                    className="text-sm"
                  />
                  <Button
                    data-ocid="assignments.submit_button"
                    size="sm"
                    onClick={() => handleSubmit(a.id)}
                    disabled={submitting === a.id || !texts[a.id]?.trim()}
                    className="bg-brand-teal hover:bg-brand-teal-dark text-white rounded-lg"
                  >
                    {submitting === a.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Submit Assignment"
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function CertificateCard({ cert, i }: { cert: Certificate; i: number }) {
  const issuedDate = new Date(
    Number(cert.issuedAt) / 1_000_000,
  ).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      data-ocid={`certificates.item.${i + 1}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="relative rounded-2xl border-2 border-brand-teal/30 bg-gradient-to-br from-brand-wash to-white p-6 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full -translate-y-8 translate-x-8" />
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Award className="w-6 h-6 text-brand-orange" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-brand-teal font-semibold uppercase tracking-wide mb-1">
            Certificate of Completion
          </div>
          <h3 className="font-bold text-brand-heading mb-1">
            {cert.courseTitle}
          </h3>
          <p className="text-sm text-brand-body">
            Awarded to:{" "}
            <span className="font-semibold text-brand-teal">
              {cert.studentName}
            </span>
          </p>
          <p className="text-xs text-brand-body mt-1">Issued: {issuedDate}</p>
        </div>
        <Button
          data-ocid="certificates.button"
          size="sm"
          variant="outline"
          className="border-brand-teal text-brand-teal hover:bg-brand-wash flex-shrink-0"
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          View
        </Button>
      </div>
    </motion.div>
  );
}

export default function StudentDashboard({ nav }: Props) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: enrollments = [], isLoading: enrollmentsLoading } =
    useMyEnrollments();
  const { data: certificates = [], isLoading: certsLoading } =
    useMyCertificates();
  const { data: submissions = [] } = useMySubmissions();
  const isLoggingIn = loginStatus === "logging-in";

  if (!identity) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-sm mx-auto px-4"
        >
          <div className="w-16 h-16 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <GraduationCap className="w-8 h-8 text-brand-teal" />
          </div>
          <h2 className="text-2xl font-extrabold text-brand-heading mb-3">
            My Learning Dashboard
          </h2>
          <p className="text-brand-body mb-6">
            Login to track your course progress, view certificates, and submit
            assignments.
          </p>
          <Button
            data-ocid="dashboard.primary_button"
            size="lg"
            onClick={() => login()}
            disabled={isLoggingIn}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full px-8 font-semibold shadow-orange"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging in...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" /> Login to Continue
              </>
            )}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://www.w3schools.com/howto/rain.mp4"
      >
        <source
          src="https://www.w3schools.com/howto/rain.mp4"
          type="video/mp4"
        />
      </video>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65 z-10" />
      {/* Content */}
      <div className="relative z-20 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-extrabold text-white">
              My Learning Dashboard
            </h1>
            <p className="text-white/70 mt-1">
              Principal:{" "}
              <span className="font-mono text-xs text-cyan-300">
                {identity.getPrincipal().toString().slice(0, 20)}...
              </span>
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Enrolled Courses",
                value: enrollments.length,
                icon: BookOpen,
                color: "text-brand-teal",
              },
              {
                label: "Certificates",
                value: certificates.length,
                icon: Award,
                color: "text-brand-orange",
              },
              {
                label: "Submissions",
                value: submissions.length,
                icon: ClipboardList,
                color: "text-blue-500",
              },
              {
                label: "Reviewed",
                value: submissions.filter((s) => s.reviewed).length,
                icon: CheckCircle2,
                color: "text-green-500",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card
                key={label}
                className="border border-white/20 shadow-xs bg-white/10 backdrop-blur-sm"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-2xl font-extrabold ${color}`}>
                        {value}
                      </div>
                      <div className="text-xs text-white/70 mt-0.5">
                        {label}
                      </div>
                    </div>
                    <Icon className={`w-6 h-6 ${color} opacity-40`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList
              data-ocid="dashboard.tab"
              className="bg-white/10 border border-white/20 backdrop-blur-sm"
            >
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses">
              {enrollmentsLoading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                  ))}
                </div>
              ) : enrollments.length === 0 ? (
                <div
                  data-ocid="dashboard.empty_state"
                  className="text-center py-16"
                >
                  <BookOpen className="w-12 h-12 mx-auto text-gray-200 mb-4" />
                  <h3 className="font-semibold text-brand-heading mb-2">
                    No courses yet
                  </h3>
                  <p className="text-sm text-brand-body mb-5">
                    Enroll in a course to start your learning journey.
                  </p>
                  <Button
                    data-ocid="dashboard.primary_button"
                    onClick={() => nav.navigate("landing")}
                    className="bg-brand-teal text-white rounded-full px-6"
                  >
                    Explore Courses
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrollments.map((e, i) => (
                    <div data-ocid={`dashboard.item.${i + 1}`} key={e.id}>
                      <EnrolledCourseCard enrollment={e} nav={nav} />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments">
              {enrollments.length === 0 ? (
                <div
                  data-ocid="dashboard.empty_state"
                  className="text-center py-10 text-brand-body"
                >
                  <ClipboardList className="w-10 h-10 mx-auto text-gray-200 mb-3" />
                  <p>Enroll in a course to see assignments.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {enrollments.map((e) => (
                    <div key={e.id}>
                      <h3 className="font-semibold text-brand-heading text-sm mb-3">
                        Assignments for enrolled course
                      </h3>
                      <AssignmentsSection courseId={e.courseId} />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Certificates Tab */}
            <TabsContent value="certificates">
              {certsLoading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                  ))}
                </div>
              ) : certificates.length === 0 ? (
                <div
                  data-ocid="certificates.empty_state"
                  className="text-center py-16"
                >
                  <Trophy className="w-12 h-12 mx-auto text-gray-200 mb-4" />
                  <h3 className="font-semibold text-brand-heading mb-2">
                    No certificates yet
                  </h3>
                  <p className="text-sm text-brand-body">
                    Complete a course to earn your certificate.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {certificates.map((cert, i) => (
                    <CertificateCard key={cert.id} cert={cert} i={i} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Submissions Tab */}
            <TabsContent value="submissions">
              {submissions.length === 0 ? (
                <div
                  data-ocid="submissions.empty_state"
                  className="text-center py-16"
                >
                  <ClipboardList className="w-12 h-12 mx-auto text-gray-200 mb-4" />
                  <h3 className="font-semibold text-brand-heading mb-2">
                    No submissions yet
                  </h3>
                  <p className="text-sm text-brand-body">
                    Submit assignments to see them here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((sub, i) => (
                    <Card
                      data-ocid={`submissions.item.${i + 1}`}
                      key={sub.id}
                      className="border border-gray-100"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="text-sm text-brand-body">
                              {sub.submissionText}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(
                                Number(sub.submittedAt) / 1_000_000,
                              ).toLocaleDateString("en-IN")}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              className={
                                sub.reviewed
                                  ? "bg-brand-teal/10 text-brand-teal border-brand-teal/20"
                                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
                              }
                            >
                              {sub.reviewed ? "Reviewed" : "Pending"}
                            </Badge>
                            {sub.giftCardCode.__kind__ === "Some" && (
                              <div className="flex items-center gap-1 text-xs text-brand-orange font-semibold">
                                <Gift className="w-3 h-3" />
                                {sub.giftCardCode.value}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
