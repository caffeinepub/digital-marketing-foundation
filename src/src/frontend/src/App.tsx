import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminPanel from "./pages/AdminPanel";
import BlogArticlePage from "./pages/BlogArticlePage";
import BlogsPage from "./pages/BlogsPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import LandingPage from "./pages/LandingPage";
import NewsArticlePage from "./pages/NewsArticlePage";
import NewsPage from "./pages/NewsPage";
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
  | "payment-failure"
  | "blogs"
  | "news"
  | "blog-article"
  | "news-article";

export interface AppNav {
  navigate: (page: PageName, params?: Partial<AppParams>) => void;
}

export interface AppParams {
  courseId: string;
  videoId: string;
  moduleId: string;
  articleId: string;
}

function getInitialPage(): { page: PageName; params: Partial<AppParams> } {
  const path = window.location.pathname;
  if (path === "/payment-success" || path.includes("payment-success"))
    return { page: "payment-success", params: {} };
  if (path === "/payment-failure" || path.includes("payment-failure"))
    return { page: "payment-failure", params: {} };
  if (path === "/blogs") return { page: "blogs", params: {} };
  if (path === "/news") return { page: "news", params: {} };
  const blogMatch = path.match(/^\/blog\/(\d+)/);
  if (blogMatch)
    return { page: "blog-article", params: { articleId: blogMatch[1] } };
  const newsMatch = path.match(/^\/news\/(\d+)/);
  if (newsMatch)
    return { page: "news-article", params: { articleId: newsMatch[1] } };
  return { page: "landing", params: {} };
}

export default function App() {
  const initial = getInitialPage();
  const [page, setPage] = useState<PageName>(initial.page);
  const [params, setParams] = useState<Partial<AppParams>>(initial.params);

  useEffect(() => {
    const { page: p, params: pr } = getInitialPage();
    setPage(p);
    setParams(pr);
  }, []);

  const navigate = (nextPage: PageName, nextParams?: Partial<AppParams>) => {
    setPage(nextPage);
    setParams(nextParams || {});
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (nextPage === "payment-success") {
      window.history.pushState({}, "", "/payment-success");
    } else if (nextPage === "payment-failure") {
      window.history.pushState({}, "", "/payment-failure");
    } else if (nextPage === "blogs") {
      window.history.pushState({}, "", "/blogs");
    } else if (nextPage === "news") {
      window.history.pushState({}, "", "/news");
    } else if (nextPage === "blog-article") {
      window.history.pushState({}, "", `/blog/${nextParams?.articleId || ""}`);
    } else if (nextPage === "news-article") {
      window.history.pushState({}, "", `/news/${nextParams?.articleId || ""}`);
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
      case "blogs":
        return <BlogsPage nav={nav} />;
      case "news":
        return <NewsPage nav={nav} />;
      case "blog-article":
        return (
          <BlogArticlePage nav={nav} articleId={params.articleId || "1"} />
        );
      case "news-article":
        return (
          <NewsArticlePage nav={nav} articleId={params.articleId || "1"} />
        );
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
