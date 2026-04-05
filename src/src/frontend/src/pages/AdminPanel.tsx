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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  ClipboardList,
  CreditCard,
  Database,
  FileQuestion,
  Gift,
  Loader2,
  Plus,
  ShieldCheck,
  Trash2,
  Upload,
  Users,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { AppNav } from "../App";
import type { CourseTier } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAdminAllEnrollments,
  useAdminAllSubmissions,
  useAdminCreateAssignment,
  useAdminCreateCourse,
  useAdminCreateModule,
  useAdminCreateQuizQuestion,
  useAdminCreateVideo,
  useAdminDeleteQuizQuestion,
  useAdminReviewSubmission,
  useAdminSetPaymentSettings,
  useAdminUpdateVideoBlobId,
  useAssignmentsForCourse,
  useCourses,
  useIsAdmin,
  useModulesForCourse,
  useQuizQuestions,
  useSeedSampleData,
  useVideosForModule,
} from "../hooks/useQueries";

interface Props {
  nav: AppNav;
}

function SeedButton() {
  const seedMutation = useSeedSampleData();
  return (
    <Button
      data-ocid="admin.primary_button"
      onClick={() =>
        seedMutation.mutate(undefined, {
          onSuccess: () => toast.success("Sample data seeded!"),
          onError: () => toast.error("Seed failed."),
        })
      }
      disabled={seedMutation.isPending}
      className="bg-brand-teal hover:bg-brand-teal-dark text-white"
    >
      {seedMutation.isPending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Seeding...
        </>
      ) : (
        <>
          <Database className="w-4 h-4 mr-2" />
          Seed Sample Data
        </>
      )}
    </Button>
  );
}

function CoursesTab() {
  const { data: courses = [], isLoading } = useCourses();
  const createCourse = useAdminCreateCourse();
  const [form, setForm] = useState({
    title: "",
    description: "",
    tier: "professional",
    price: "",
    thumbnailUrl: "",
  });
  const [open, setOpen] = useState(false);

  const handleCreate = async () => {
    if (!form.title || !form.price) return;
    try {
      const tierMap: Record<string, CourseTier> = {
        professional: { __kind__: "professional" },
        advanced: { __kind__: "advanced" },
      };
      await createCourse.mutateAsync({
        title: form.title,
        description: form.description,
        tier: tierMap[form.tier],
        priceInr: BigInt(Number.parseInt(form.price)),
        thumbnailUrl: form.thumbnailUrl,
      });
      toast.success("Course created!");
      setForm({
        title: "",
        description: "",
        tier: "professional",
        price: "",
        thumbnailUrl: "",
      });
      setOpen(false);
    } catch {
      toast.error("Failed to create course.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-brand-heading">
          Courses ({courses.length})
        </h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              data-ocid="admin.open_modal_button"
              size="sm"
              className="bg-brand-teal text-white"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="admin.dialog">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div>
                <Label>Title</Label>
                <Input
                  data-ocid="admin.input"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Course title"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  data-ocid="admin.textarea"
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={2}
                />
              </div>
              <div>
                <Label>Tier</Label>
                <Select
                  value={form.tier}
                  onValueChange={(v) => setForm((p) => ({ ...p, tier: v }))}
                >
                  <SelectTrigger data-ocid="admin.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price (₹)</Label>
                <Input
                  data-ocid="admin.input"
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, price: e.target.value }))
                  }
                  placeholder="4999"
                />
              </div>
              <div>
                <Label>Thumbnail URL</Label>
                <Input
                  data-ocid="admin.input"
                  value={form.thumbnailUrl}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, thumbnailUrl: e.target.value }))
                  }
                  placeholder="https://..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                data-ocid="admin.cancel_button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                data-ocid="admin.confirm_button"
                onClick={handleCreate}
                disabled={createCourse.isPending}
                className="bg-brand-teal text-white"
              >
                {createCourse.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Create Course"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <Skeleton className="h-40 w-full" />
      ) : (
        <div className="rounded-xl border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Title</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Modules</TableHead>
                <TableHead>Videos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-brand-body py-8"
                  >
                    No courses. Seed sample data or add manually.
                  </TableCell>
                </TableRow>
              ) : (
                courses.map((c, i) => (
                  <TableRow data-ocid={`admin.row.${i + 1}`} key={c.id}>
                    <TableCell className="font-medium text-sm">
                      {c.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {c.tier.__kind__}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      ₹{Number(c.priceInr).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>{Number(c.totalModules)}</TableCell>
                    <TableCell>{Number(c.totalVideos)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function ModulesTab() {
  const { data: courses = [] } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState("");
  const { data: modules = [] } = useModulesForCourse(selectedCourse);
  const createModule = useAdminCreateModule();
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreate = async () => {
    if (!title || !selectedCourse) return;
    try {
      await createModule.mutateAsync({
        courseId: selectedCourse,
        title,
        orderPos: BigInt(modules.length + 1),
      });
      toast.success("Module created!");
      setTitle("");
      setOpen(false);
    } catch {
      toast.error("Failed.");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger data-ocid="admin.select" className="w-64">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedCourse && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                data-ocid="admin.open_modal_button"
                size="sm"
                className="bg-brand-teal text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Module
              </Button>
            </DialogTrigger>
            <DialogContent data-ocid="admin.dialog">
              <DialogHeader>
                <DialogTitle>Add Module</DialogTitle>
              </DialogHeader>
              <div className="py-2">
                <Label>Module Title</Label>
                <Input
                  data-ocid="admin.input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Introduction to SEO"
                />
              </div>
              <DialogFooter>
                <Button
                  data-ocid="admin.cancel_button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  data-ocid="admin.confirm_button"
                  onClick={handleCreate}
                  disabled={createModule.isPending}
                  className="bg-brand-teal text-white"
                >
                  {createModule.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {selectedCourse && (
        <div className="rounded-xl border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>#</TableHead>
                <TableHead>Module Title</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center py-8 text-brand-body"
                  >
                    No modules yet.
                  </TableCell>
                </TableRow>
              ) : (
                modules.map((m, i) => (
                  <TableRow data-ocid={`admin.row.${i + 1}`} key={m.id}>
                    <TableCell>{Number(m.orderPos)}</TableCell>
                    <TableCell className="font-medium text-sm">
                      {m.title}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function VideoUploadCell({
  videoId,
  moduleId,
  blobId,
}: { videoId: string; moduleId: string; blobId: string }) {
  const updateBlobId = useAdminUpdateVideoBlobId();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setProgress(0);
    try {
      const { loadConfig } = await import("../config");
      const { StorageClient } = await import("../utils/StorageClient");
      const { HttpAgent } = await import("@icp-sdk/core/agent");
      const config = await loadConfig();
      const agent = new HttpAgent({
        host: config.backend_host || "https://ic0.app",
      });
      const storageClient = new StorageClient(
        config.bucket_name,
        config.storage_gateway_url || "https://blob.caffeine.ai",
        config.backend_canister_id,
        config.project_id,
        agent,
      );
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { hash } = await storageClient.putFile(bytes, (pct) =>
        setProgress(Math.round(pct)),
      );
      await updateBlobId.mutateAsync({ videoId, blobId: hash, moduleId });
      toast.success("Video uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
    e.target.value = "";
  };

  return (
    <div className="flex items-center gap-2">
      {blobId ? (
        <span className="text-xs text-brand-teal font-medium flex items-center gap-1">
          <Video className="w-3 h-3" /> Uploaded
        </span>
      ) : (
        <span className="text-xs text-gray-400">No file</span>
      )}
      <label className="cursor-pointer">
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <Button
          data-ocid="admin.upload_button"
          size="sm"
          variant="outline"
          className="text-xs h-7 px-2 pointer-events-none"
          disabled={uploading}
          asChild={false}
        >
          {uploading ? (
            <>
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              {progress}%
            </>
          ) : (
            <>
              <Upload className="w-3 h-3 mr-1" />
              {blobId ? "Replace" : "Upload"}
            </>
          )}
        </Button>
      </label>
    </div>
  );
}

function VideosTab() {
  const { data: courses = [] } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState("");
  const { data: modules = [] } = useModulesForCourse(selectedCourse);
  const [selectedModule, setSelectedModule] = useState("");
  const { data: videos = [] } = useVideosForModule(selectedModule);
  const createVideo = useAdminCreateVideo();
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
  });
  const [open, setOpen] = useState(false);

  const handleCreate = async () => {
    if (!form.title || !selectedModule || !selectedCourse) return;
    try {
      await createVideo.mutateAsync({
        moduleId: selectedModule,
        courseId: selectedCourse,
        title: form.title,
        description: form.description,
        durationMinutes: BigInt(Number.parseInt(form.duration) || 10),
        orderPos: BigInt(videos.length + 1),
      });
      toast.success("Video created!");
      setForm({ title: "", description: "", duration: "" });
      setOpen(false);
    } catch {
      toast.error("Failed.");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <Select
          value={selectedCourse}
          onValueChange={(v) => {
            setSelectedCourse(v);
            setSelectedModule("");
          }}
        >
          <SelectTrigger data-ocid="admin.select" className="w-52">
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedCourse && (
          <Select value={selectedModule} onValueChange={setSelectedModule}>
            <SelectTrigger data-ocid="admin.select" className="w-52">
              <SelectValue placeholder="Select module" />
            </SelectTrigger>
            <SelectContent>
              {modules.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {selectedModule && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                data-ocid="admin.open_modal_button"
                size="sm"
                className="bg-brand-teal text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Video
              </Button>
            </DialogTrigger>
            <DialogContent data-ocid="admin.dialog">
              <DialogHeader>
                <DialogTitle>Add Video</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <div>
                  <Label>Title</Label>
                  <Input
                    data-ocid="admin.input"
                    value={form.title}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, title: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    data-ocid="admin.textarea"
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Duration (minutes)</Label>
                  <Input
                    data-ocid="admin.input"
                    type="number"
                    value={form.duration}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, duration: e.target.value }))
                    }
                    placeholder="15"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  data-ocid="admin.cancel_button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  data-ocid="admin.confirm_button"
                  onClick={handleCreate}
                  disabled={createVideo.isPending}
                  className="bg-brand-teal text-white"
                >
                  {createVideo.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {selectedModule && (
        <div className="rounded-xl border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Title</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Video File</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videos.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center py-8 text-brand-body"
                  >
                    No videos yet.
                  </TableCell>
                </TableRow>
              ) : (
                videos.map((v, i) => (
                  <TableRow data-ocid={`admin.row.${i + 1}`} key={v.id}>
                    <TableCell className="font-medium text-sm">
                      {v.title}
                    </TableCell>
                    <TableCell>{Number(v.durationMinutes)}m</TableCell>
                    <TableCell>
                      <VideoUploadCell
                        videoId={v.id}
                        moduleId={selectedModule}
                        blobId={v.blobId}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function QuizzesTab() {
  const { data: courses = [] } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState("");
  const { data: modules = [] } = useModulesForCourse(selectedCourse);
  const [selectedModule, setSelectedModule] = useState("");
  const { data: videos = [] } = useVideosForModule(selectedModule);
  const [selectedVideo, setSelectedVideo] = useState("");
  const { data: questions = [] } = useQuizQuestions(selectedVideo);
  const createQ = useAdminCreateQuizQuestion();
  const deleteQ = useAdminDeleteQuizQuestion();
  const [form, setForm] = useState({
    question: "",
    opt0: "",
    opt1: "",
    opt2: "",
    opt3: "",
    correct: "0",
  });
  const [open, setOpen] = useState(false);

  const handleCreate = async () => {
    if (!form.question || !selectedVideo) return;
    try {
      await createQ.mutateAsync({
        videoId: selectedVideo,
        questionText: form.question,
        options: [form.opt0, form.opt1, form.opt2, form.opt3].filter(Boolean),
        correctIndex: BigInt(Number.parseInt(form.correct)),
      });
      toast.success("Question created!");
      setForm({
        question: "",
        opt0: "",
        opt1: "",
        opt2: "",
        opt3: "",
        correct: "0",
      });
      setOpen(false);
    } catch {
      toast.error("Failed.");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <Select
          value={selectedCourse}
          onValueChange={(v) => {
            setSelectedCourse(v);
            setSelectedModule("");
            setSelectedVideo("");
          }}
        >
          <SelectTrigger data-ocid="admin.select" className="w-44">
            <SelectValue placeholder="Course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedCourse && (
          <Select
            value={selectedModule}
            onValueChange={(v) => {
              setSelectedModule(v);
              setSelectedVideo("");
            }}
          >
            <SelectTrigger data-ocid="admin.select" className="w-44">
              <SelectValue placeholder="Module" />
            </SelectTrigger>
            <SelectContent>
              {modules.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {selectedModule && (
          <Select value={selectedVideo} onValueChange={setSelectedVideo}>
            <SelectTrigger data-ocid="admin.select" className="w-44">
              <SelectValue placeholder="Video" />
            </SelectTrigger>
            <SelectContent>
              {videos.map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  {v.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {selectedVideo && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                data-ocid="admin.open_modal_button"
                size="sm"
                className="bg-brand-teal text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent data-ocid="admin.dialog">
              <DialogHeader>
                <DialogTitle>Add Quiz Question</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <div>
                  <Label>Question</Label>
                  <Textarea
                    data-ocid="admin.textarea"
                    value={form.question}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, question: e.target.value }))
                    }
                    rows={2}
                  />
                </div>
                {(["opt0", "opt1", "opt2", "opt3"] as const).map((k, i) => (
                  <div key={k}>
                    <Label>Option {i + 1}</Label>
                    <Input
                      data-ocid="admin.input"
                      value={form[k]}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [k]: e.target.value }))
                      }
                    />
                  </div>
                ))}
                <div>
                  <Label>Correct Option (0–3)</Label>
                  <Select
                    value={form.correct}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, correct: v }))
                    }
                  >
                    <SelectTrigger data-ocid="admin.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3].map((i) => (
                        <SelectItem key={i} value={i.toString()}>
                          Option {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  data-ocid="admin.cancel_button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  data-ocid="admin.confirm_button"
                  onClick={handleCreate}
                  disabled={createQ.isPending}
                  className="bg-brand-teal text-white"
                >
                  {createQ.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {selectedVideo && (
        <div className="space-y-3">
          {questions.length === 0 ? (
            <p className="text-sm text-brand-body py-4">
              No quiz questions yet.
            </p>
          ) : (
            questions.map((q, i) => (
              <Card
                data-ocid={`admin.item.${i + 1}`}
                key={q.id}
                className="border border-gray-100"
              >
                <CardContent className="p-4">
                  <p className="font-medium text-sm text-brand-heading mb-2">
                    {i + 1}. {q.questionText}
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {q.options.map((opt, oi) => (
                      <span
                        key={opt}
                        className={`text-xs px-2 py-1 rounded ${oi === Number(q.correctIndex) ? "bg-brand-teal/10 text-brand-teal font-semibold" : "text-brand-body"}`}
                      >
                        {oi + 1}. {opt}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-end">
                    <Button
                      data-ocid={`admin.delete_button.${i + 1}`}
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        deleteQ.mutate(
                          { questionId: q.id, videoId: selectedVideo },
                          {
                            onSuccess: () => toast.success("Question deleted."),
                            onError: () => toast.error("Failed."),
                          },
                        )
                      }
                      disabled={deleteQ.isPending}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs h-7 px-2"
                    >
                      <Trash2 className="w-3 h-3 mr-1" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function AssignmentsAdminTab() {
  const { data: courses = [] } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState("");
  const { data: assignments = [] } = useAssignmentsForCourse(selectedCourse);
  const createAssignment = useAdminCreateAssignment();
  const [form, setForm] = useState({ title: "", description: "", week: "1" });
  const [open, setOpen] = useState(false);

  const handleCreate = async () => {
    if (!form.title || !selectedCourse) return;
    try {
      await createAssignment.mutateAsync({
        courseId: selectedCourse,
        weekNumber: BigInt(Number.parseInt(form.week)),
        title: form.title,
        description: form.description,
      });
      toast.success("Assignment created!");
      setForm({ title: "", description: "", week: "1" });
      setOpen(false);
    } catch {
      toast.error("Failed.");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger data-ocid="admin.select" className="w-64">
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedCourse && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                data-ocid="admin.open_modal_button"
                size="sm"
                className="bg-brand-teal text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Assignment
              </Button>
            </DialogTrigger>
            <DialogContent data-ocid="admin.dialog">
              <DialogHeader>
                <DialogTitle>Add Assignment</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <div>
                  <Label>Week Number</Label>
                  <Input
                    data-ocid="admin.input"
                    type="number"
                    value={form.week}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, week: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    data-ocid="admin.input"
                    value={form.title}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, title: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    data-ocid="admin.textarea"
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  data-ocid="admin.cancel_button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  data-ocid="admin.confirm_button"
                  onClick={handleCreate}
                  disabled={createAssignment.isPending}
                  className="bg-brand-teal text-white"
                >
                  {createAssignment.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {selectedCourse && (
        <div className="space-y-3">
          {assignments.length === 0 ? (
            <p className="text-sm text-brand-body py-4">No assignments yet.</p>
          ) : (
            assignments.map((a, i) => (
              <Card
                data-ocid={`admin.item.${i + 1}`}
                key={a.id}
                className="border border-gray-100"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      Week {Number(a.weekNumber)}
                    </Badge>
                    <span className="font-medium text-sm text-brand-heading">
                      {a.title}
                    </span>
                  </div>
                  <p className="text-xs text-brand-body">{a.description}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function SubmissionsTab() {
  const { data: submissions = [], isLoading } = useAdminAllSubmissions();
  const reviewMutation = useAdminReviewSubmission();
  const [giftCodes, setGiftCodes] = useState<Record<string, string>>({});
  const [awarding, setAwarding] = useState<string | null>(null);

  const handleAward = async (submissionId: string) => {
    const code = giftCodes[submissionId]?.trim();
    if (!code) return;
    setAwarding(submissionId);
    try {
      await reviewMutation.mutateAsync({
        submissionId,
        giftCardCode: code
          ? { __kind__: "Some" as const, value: code }
          : { __kind__: "None" as const },
      });
      toast.success("Gift card awarded!");
    } catch {
      toast.error("Failed.");
    } finally {
      setAwarding(null);
    }
  };

  if (isLoading) return <Skeleton className="h-40 w-full" />;

  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Submission</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Gift Card</TableHead>
            <TableHead>Award</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-8 text-brand-body"
              >
                No submissions yet.
              </TableCell>
            </TableRow>
          ) : (
            submissions.map((sub, i) => (
              <TableRow data-ocid={`admin.row.${i + 1}`} key={sub.id}>
                <TableCell className="text-sm max-w-xs">
                  <p className="truncate">{sub.submissionText}</p>
                  <p className="text-xs text-gray-400">
                    {sub.assignmentId.slice(0, 8)}...
                  </p>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      sub.reviewed
                        ? "bg-brand-teal/10 text-brand-teal border-brand-teal/20"
                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }
                  >
                    {sub.reviewed ? "Reviewed" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {sub.giftCardCode.__kind__ === "Some" ? (
                    <span className="text-xs text-brand-orange font-semibold flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      {sub.giftCardCode.value}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {!sub.reviewed && (
                    <div className="flex items-center gap-2">
                      <Input
                        data-ocid="admin.input"
                        className="h-7 text-xs w-28"
                        placeholder="Gift code"
                        value={giftCodes[sub.id] || ""}
                        onChange={(e) =>
                          setGiftCodes((p) => ({
                            ...p,
                            [sub.id]: e.target.value,
                          }))
                        }
                      />
                      <Button
                        data-ocid="admin.primary_button"
                        size="sm"
                        onClick={() => handleAward(sub.id)}
                        disabled={awarding === sub.id}
                        className="h-7 text-xs bg-brand-orange text-white"
                      >
                        {awarding === sub.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          "Award"
                        )}
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function EnrollmentsTab() {
  const { data: enrollments = [], isLoading } = useAdminAllEnrollments();

  if (isLoading) return <Skeleton className="h-40 w-full" />;

  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>User (Principal)</TableHead>
            <TableHead>Course ID</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Enrolled At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-8 text-brand-body"
              >
                No enrollments yet.
              </TableCell>
            </TableRow>
          ) : (
            enrollments.map((e, i) => (
              <TableRow data-ocid={`admin.row.${i + 1}`} key={e.id}>
                <TableCell className="font-mono text-xs">
                  {e.userId.toString().slice(0, 16)}...
                </TableCell>
                <TableCell className="text-xs">
                  {e.courseId.slice(0, 12)}...
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {e.tier.__kind__}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">
                  {new Date(
                    Number(e.enrolledAt) / 1_000_000,
                  ).toLocaleDateString("en-IN")}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function RazorpayConfigTab() {
  const setSettings = useAdminSetPaymentSettings();
  const [keyId, setKeyId] = useState("");
  const [keySecret, setKeySecret] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      await setSettings.mutateAsync({ keyId, keySecret });
      setSaved(true);
      toast.success("Razorpay payment settings saved!");
    } catch {
      toast.error("Failed to save payment settings.");
    }
  };

  return (
    <div className="space-y-6 max-w-lg">
      <div className="flex items-center gap-3 mb-4">
        <CreditCard className="w-6 h-6 text-brand-teal" />
        <h3 className="text-lg font-bold text-brand-heading">
          Payment Gateway (Razorpay)
        </h3>
      </div>
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <div>
            <div className="font-semibold text-emerald-700 text-sm">
              Razorpay is configured
            </div>
            <div className="text-xs text-emerald-600 mt-0.5">
              Payment processing is active. Students can now pay for courses.
            </div>
          </div>
        </div>
      )}
      <p className="text-sm text-brand-body">
        Enter your Razorpay API keys to enable course payments. Find these in
        your Razorpay Dashboard → Settings → API Keys.
      </p>
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-brand-heading mb-1.5 block">
            Razorpay Key ID
          </Label>
          <Input
            data-ocid="payments.input"
            value={keyId}
            onChange={(e) => setKeyId(e.target.value)}
            placeholder="rzp_live_xxxxxxxxxxxx"
            className="font-mono text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">
            Starts with rzp_live_ or rzp_test_
          </p>
        </div>
        <div>
          <Label className="text-sm font-medium text-brand-heading mb-1.5 block">
            Razorpay Key Secret
          </Label>
          <Input
            data-ocid="payments.input"
            type="password"
            value={keySecret}
            onChange={(e) => setKeySecret(e.target.value)}
            placeholder="Your Razorpay secret key"
            className="font-mono text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">
            Keep this secret — never share it publicly.
          </p>
        </div>
        <Button
          data-ocid="payments.submit_button"
          onClick={handleSave}
          disabled={setSettings.isPending || !keyId || !keySecret}
          className="bg-brand-teal hover:bg-brand-teal-dark text-white"
        >
          {setSettings.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Save Payment Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default function AdminPanel({ nav }: Props) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const isLoggingIn = loginStatus === "logging-in";

  if (!identity) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-sm">
          <ShieldCheck className="w-14 h-14 text-brand-teal mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-brand-heading mb-3">
            Admin Panel
          </h2>
          <p className="text-brand-body mb-6">
            Please login to access the admin panel.
          </p>
          <Button
            data-ocid="admin.primary_button"
            onClick={() => login()}
            disabled={isLoggingIn}
            className="bg-brand-teal text-white rounded-full px-8"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-teal mx-auto" />
        <p className="text-brand-body mt-3">Checking admin access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div data-ocid="admin.error_state" className="text-center max-w-sm">
          <ShieldCheck className="w-14 h-14 text-red-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-brand-heading mb-3">
            Access Denied
          </h2>
          <p className="text-brand-body mb-6">
            You don't have admin privileges.
          </p>
          <Button onClick={() => nav.navigate("landing")} variant="outline">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-3xl font-extrabold text-brand-heading flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-brand-teal" />
              Admin Panel
            </h1>
            <p className="text-brand-body text-sm mt-1">
              Manage courses, content, and student activity
            </p>
          </div>
          <SeedButton />
        </motion.div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList
            data-ocid="admin.tab"
            className="bg-white border border-gray-100 flex-wrap h-auto gap-1 p-1"
          >
            <TabsTrigger value="courses" className="text-xs sm:text-sm">
              <BookOpen className="w-4 h-4 mr-1" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="modules" className="text-xs sm:text-sm">
              <BookOpen className="w-4 h-4 mr-1" />
              Modules
            </TabsTrigger>
            <TabsTrigger value="videos" className="text-xs sm:text-sm">
              <Video className="w-4 h-4 mr-1" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="text-xs sm:text-sm">
              <FileQuestion className="w-4 h-4 mr-1" />
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="assignments" className="text-xs sm:text-sm">
              <ClipboardList className="w-4 h-4 mr-1" />
              Assignments
            </TabsTrigger>
            <TabsTrigger value="submissions" className="text-xs sm:text-sm">
              <ClipboardList className="w-4 h-4 mr-1" />
              Submissions
            </TabsTrigger>
            <TabsTrigger value="enrollments" className="text-xs sm:text-sm">
              <Users className="w-4 h-4 mr-1" />
              Enrollments
            </TabsTrigger>
            <TabsTrigger value="payments" className="text-xs sm:text-sm">
              <CreditCard className="w-4 h-4 mr-1" />
              Payments
            </TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <TabsContent value="courses">
              <CoursesTab />
            </TabsContent>
            <TabsContent value="modules">
              <ModulesTab />
            </TabsContent>
            <TabsContent value="videos">
              <VideosTab />
            </TabsContent>
            <TabsContent value="quizzes">
              <QuizzesTab />
            </TabsContent>
            <TabsContent value="assignments">
              <AssignmentsAdminTab />
            </TabsContent>
            <TabsContent value="submissions">
              <SubmissionsTab />
            </TabsContent>
            <TabsContent value="enrollments">
              <EnrollmentsTab />
            </TabsContent>
            <TabsContent value="payments">
              <RazorpayConfigTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
