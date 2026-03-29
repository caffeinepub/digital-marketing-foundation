import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminPanel from "./pages/AdminPanel";
import CourseDetailPage from "./pages/CourseDetailPage";
import LandingPage from "./pages/LandingPage";
import PaymentFailure from "./pages/PaymentFailure";
import PaymentSuccess from "./pages/PaymentSuccess";
import StudentDashboard from "./pages/StudentDashboard";
import VideoPlayerPage from "./pages/VideoPlayerPage";

export type PageName =
  | "landing"
  | "course-detail"
  | "video-player"
  | "dashboard"
  | "admin"
  | "payment-success"
  | "payment-failure";

export interface AppNav {
  navigate: (page: PageName, params?: Partial<AppParams>) => void;
}

export interface AppParams {
  courseId: string;
  videoId: string;
  moduleId: string;
}

function getInitialPage(): PageName {
  const path = window.location.pathname;
  if (path === "/payment-success" || path.includes("payment-success"))
    return "payment-success";
  if (path === "/payment-failure" || path.includes("payment-failure"))
    return "payment-failure";
  return "landing";
}

export default function App() {
  const [page, setPage] = useState<PageName>(getInitialPage);
  const [params, setParams] = useState<Partial<AppParams>>({});

  // Handle browser back/forward and direct URL access
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/payment-success" || path.includes("payment-success")) {
      setPage("payment-success");
    } else if (
      path === "/payment-failure" ||
      path.includes("payment-failure")
    ) {
      setPage("payment-failure");
    }
  }, []);

  const navigate = (nextPage: PageName, nextParams?: Partial<AppParams>) => {
    setPage(nextPage);
    setParams(nextParams || {});
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Update URL for payment pages
    if (nextPage === "payment-success") {
      window.history.pushState({}, "", "/payment-success");
    } else if (nextPage === "payment-failure") {
      window.history.pushState({}, "", "/payment-failure");
    } else if (nextPage === "landing") {
      window.history.pushState({}, "", "/");
    }
  };

  const nav: AppNav = { navigate };

  const isPaymentPage =
    page === "payment-success" || page === "payment-failure";

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
      case "payment-success":
        return <PaymentSuccess nav={nav} />;
      case "payment-failure":
        return <PaymentFailure nav={nav} />;
      default:
        return <LandingPage nav={nav} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!isPaymentPage && <Header nav={nav} currentPage={page} />}
      <main className="flex-1">{renderPage()}</main>
      {!isPaymentPage && <Footer nav={nav} />}
      <Toaster richColors position="top-right" />
    </div>
  );
}
