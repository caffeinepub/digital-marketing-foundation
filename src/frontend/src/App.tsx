import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminPanel from "./pages/AdminPanel";
import CourseDetailPage from "./pages/CourseDetailPage";
import LandingPage from "./pages/LandingPage";
import StudentDashboard from "./pages/StudentDashboard";
import VideoPlayerPage from "./pages/VideoPlayerPage";

export type PageName =
  | "landing"
  | "course-detail"
  | "video-player"
  | "dashboard"
  | "admin";

export interface AppNav {
  navigate: (page: PageName, params?: Partial<AppParams>) => void;
}

export interface AppParams {
  courseId: string;
  videoId: string;
  moduleId: string;
}

export default function App() {
  const [page, setPage] = useState<PageName>("landing");
  const [params, setParams] = useState<Partial<AppParams>>({});

  const navigate = (nextPage: PageName, nextParams?: Partial<AppParams>) => {
    setPage(nextPage);
    setParams(nextParams || {});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nav: AppNav = { navigate };

  const renderPage = () => {
    switch (page) {
      case "landing":
        return <LandingPage nav={nav} />;
      case "course-detail":
        return <CourseDetailPage nav={nav} courseId={params.courseId || ""} />;
      case "video-player":
        return (
          <VideoPlayerPage
            nav={nav}
            videoId={params.videoId || ""}
            courseId={params.courseId || ""}
          />
        );
      case "dashboard":
        return <StudentDashboard nav={nav} />;
      case "admin":
        return <AdminPanel nav={nav} />;
      default:
        return <LandingPage nav={nav} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header nav={nav} currentPage={page} />
      <main className="flex-1">{renderPage()}</main>
      <Footer nav={nav} />
      <Toaster richColors position="top-right" />
    </div>
  );
}
