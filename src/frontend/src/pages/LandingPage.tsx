import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  BarChart2,
  BookOpen,
  Bot,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileText,
  Globe,
  LineChart,
  Loader2,
  Mail,
  Megaphone,
  Monitor,
  Palette,
  PlayCircle,
  Search,
  Share2,
  ShoppingCart,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { toast } from "sonner";
import type { AppNav } from "../App";
import type { Course } from "../backend.d";
import GoldDivider from "../components/GoldDivider";
import StageSpotlight from "../components/StageSpotlight";
import { WhatsAppChatbotSection } from "../components/WhatsAppChatbot";
import { useEmailAuth } from "../hooks/useEmailAuth";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCourses } from "../hooks/useQueries";
import { useCreateCheckoutSession } from "../hooks/useStripe";

interface LandingPageProps {
  nav: AppNav;
}

const TIER_COLORS: Record<
  string,
  { badge: string; label: string; glow: string; hex: string }
> = {
  professional: {
    badge: "border border-primary/30 text-primary",
    label: "Professional",
    glow: "oklch(60% 0.25 230 / 0.3)",
    hex: "oklch(60% 0.25 230)",
  },
  advanced: {
    badge: "border border-secondary/30 text-secondary",
    label: "Advanced",
    glow: "oklch(45% 0.22 290 / 0.4)",
    hex: "oklch(45% 0.22 290)",
  },
  performance: {
    badge: "border border-accent/30 text-accent",
    label: "Performance",
    glow: "oklch(70% 0.2 200 / 0.45)",
    hex: "oklch(70% 0.2 200)",
  },
};

const STATIC_COURSES = [
  {
    id: "static-1",
    title: "Digital Marketing: SEO Mastery",
    description:
      "Rank on Google's first page with advanced SEO techniques, keyword research, and technical optimization — AI-powered.",
    tier: "professional",
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-seo.dim_800x450.jpg",
  },
  {
    id: "static-2",
    title: "Social Media Marketing Mastery",
    description:
      "Master Facebook, Instagram, LinkedIn & WhatsApp advertising with AI-powered targeting and creative tools.",
    tier: "professional",
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-social-media.dim_800x450.jpg",
  },
  {
    id: "static-3",
    title: "Digital Marketing: Google Ads & PPC Expert",
    description:
      "Run profitable Google, YouTube and Display Network campaigns with AI bidding strategies and smart automation.",
    tier: "advanced",
    priceInr: BigInt(34999),
    thumbnailUrl: "/assets/generated/course-google-ads.dim_800x450.jpg",
  },
  {
    id: "static-4",
    title: "Learn the Art of Designing",
    description:
      "From design basics to Photoshop, Illustrator, Figma & AI design tools. Create stunning visuals for any brand.",
    tier: "professional",
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-designing.dim_800x450.jpg",
  },
  {
    id: "static-5",
    title: "Learn the Art of Sales",
    description:
      "Master consultative selling, negotiation, and closing techniques. Includes AI-powered sales scripts and CRM training.",
    tier: "professional",
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-sales.dim_800x450.jpg",
  },
  {
    id: "static-6",
    title: "MS Office Complete Course",
    description:
      "Professional mastery of Word, Excel, PowerPoint & Teams with Microsoft Copilot AI features for modern workplace productivity.",
    tier: "professional",
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-ms-office.dim_800x450.jpg",
  },
  {
    id: "static-7",
    title: "Performance Marketing Mastery",
    description:
      "Master Google Ads, Meta Ads, ROI tracking, funnel optimization, CRO, retargeting and performance dashboards. AI-powered advanced course.",
    tier: "performance",
    priceInr: BigInt(74999),
    thumbnailUrl:
      "/assets/generated/course-performance-marketing.dim_800x450.jpg",
  },
];

const PRICING_PLANS = [
  {
    tier: "Professional",
    price: "Rs.24,999",
    tagline: "From Scratch to Professional Level",
    popular: true,
    priceId: "price_pro_24999",
    tierKey: "professional",
    accentVar: "--primary",
    features: [
      "All courses: Digital Marketing, Social Media, Design, Sales & MS Office",
      "AI-Powered Learning with personalized study paths",
      "Weekly assignments with gift card rewards",
      "Live Q&A sessions with industry experts",
      "Govt. recognized certification",
      "Priority email & WhatsApp support",
      "1-on-1 mentor session",
      "Course completion certificate",
      "Lifetime content access",
    ],
  },
  {
    tier: "Advanced",
    price: "Rs.34,999",
    tagline: "From Scratch to Master Level",
    popular: false,
    priceId: "price_advanced_34999",
    tierKey: "advanced",
    accentVar: "--secondary",
    features: [
      "Everything in Professional Course",
      "Advanced AI Tools & Automation Modules",
      "Live workshops, bootcamps & masterclasses",
      "Internship & placement support",
      "Portfolio review by industry experts",
      "Dedicated success manager",
      "Agency partnership opportunities",
      "Advanced certifications (Google, Meta)",
      "Lifetime content + future updates access",
    ],
  },
  {
    tier: "Performance Marketing",
    price: "Rs.74,999",
    tagline: "Master-Level Performance & ROI",
    popular: false,
    priceId: "price_performance_74999",
    tierKey: "performance",
    accentVar: "--accent",
    features: [
      "Everything in Advanced Course",
      "Google Ads & Meta Ads Expert Level",
      "ROI Tracking & Attribution Modeling",
      "Conversion Rate Optimization (CRO)",
      "A/B Testing & Funnel Optimization",
      "Retargeting & Lookalike Audiences",
      "Performance Dashboards & Reporting",
      "Agency-level campaign management",
      "1-on-1 Performance Coach sessions",
      "Advanced Google & Meta Certifications",
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Digital Marketing Manager at TechCorp",
    text: "The course completely changed my career trajectory. Within 3 months of completing the Advanced program, I landed a 40% salary hike. The hands-on assignments and mentor support are unmatched.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Rahul Verma",
    role: "Freelance Marketing Consultant",
    text: "I was skeptical at first, but the quality of content blew me away. The AI-powered learning path adapts to my pace, and the quizzes after every video keep you sharp!",
    rating: 5,
    avatar: "RV",
  },
  {
    name: "Ananya Patel",
    role: "Founder, GrowthLab Agency",
    text: "Best investment I've made in my career. The Govt. recognized certificate helped me close bigger clients. The AI tools training alone is worth the price.",
    rating: 5,
    avatar: "AP",
  },
];

const DM_CATEGORIES = [
  { icon: Search, name: "SEO", desc: "Search Engine Optimization" },
  {
    icon: Megaphone,
    name: "Google Ads / SEM",
    desc: "Pay-Per-Click Advertising",
  },
  {
    icon: Share2,
    name: "Social Media Ads",
    desc: "Facebook, Instagram & LinkedIn",
  },
  { icon: Mail, name: "Email Marketing", desc: "Campaigns & Automation" },
  {
    icon: FileText,
    name: "Content Marketing",
    desc: "Blogging, Copywriting & SEO",
  },
  {
    icon: Globe,
    name: "Affiliate Marketing",
    desc: "Passive Income Strategies",
  },
  {
    icon: Users,
    name: "Influencer Marketing",
    desc: "Nano to Mega Influencers",
  },
  { icon: Video, name: "Video Marketing", desc: "YouTube & Reels Strategy" },
  {
    icon: BarChart2,
    name: "Analytics & Data",
    desc: "GA4, Dashboards & Reporting",
  },
  {
    icon: ShoppingCart,
    name: "E-Commerce Marketing",
    desc: "Shopify, Amazon & D2C",
  },
];

const ALL_COURSES_LIST = [
  { icon: Search, name: "Digital Marketing: SEO", tier: "Pro" },
  { icon: Megaphone, name: "Digital Marketing: Google Ads", tier: "Advanced" },
  { icon: Share2, name: "Digital Marketing: Social Media Ads", tier: "Pro" },
  { icon: Mail, name: "Digital Marketing: Email Marketing", tier: "Pro" },
  { icon: FileText, name: "Digital Marketing: Content Marketing", tier: "Pro" },
  {
    icon: Globe,
    name: "Digital Marketing: Affiliate Marketing",
    tier: "Advanced",
  },
  { icon: Users, name: "Digital Marketing: Influencer Marketing", tier: "Pro" },
  { icon: Video, name: "Digital Marketing: Video Marketing", tier: "Pro" },
  {
    icon: LineChart,
    name: "Digital Marketing: Analytics & Data",
    tier: "Advanced",
  },
  {
    icon: ShoppingCart,
    name: "Digital Marketing: E-Commerce",
    tier: "Advanced",
  },
  { icon: Share2, name: "Social Media Marketing", tier: "Pro" },
  { icon: Palette, name: "Learn the Art of Designing", tier: "Pro" },
  { icon: Briefcase, name: "Learn the Art of Sales", tier: "Pro" },
  { icon: Monitor, name: "MS Office Complete Course", tier: "Pro" },
  { icon: TrendingUp, name: "Performance Marketing", tier: "Performance" },
];

const COURSE_IMAGE_MAP: Record<string, string> = {
  "Digital Marketing":
    "/assets/generated/course-digital-marketing.dim_800x450.jpg",
  SEO: "/assets/generated/course-seo.dim_800x450.jpg",
  "SEO Mastery": "/assets/generated/course-seo.dim_800x450.jpg",
  "Digital Marketing: SEO Mastery":
    "/assets/generated/course-seo.dim_800x450.jpg",
  "Social Media Marketing":
    "/assets/generated/course-social-media.dim_800x450.jpg",
  "Social Media Marketing Mastery":
    "/assets/generated/course-social-media.dim_800x450.jpg",
  "Performance Marketing":
    "/assets/generated/course-performance-marketing.dim_800x450.jpg",
  "Performance Marketing Mastery":
    "/assets/generated/course-performance-marketing.dim_800x450.jpg",
  "Learn the Art of Designing":
    "/assets/generated/course-designing.dim_800x450.jpg",
  "Learn the Art of Sales": "/assets/generated/course-sales.dim_800x450.jpg",
  "MS Office": "/assets/generated/course-ms-office.dim_800x450.jpg",
  "MS Office Complete Course":
    "/assets/generated/course-ms-office.dim_800x450.jpg",
  "Google Ads": "/assets/generated/course-google-ads.dim_800x450.jpg",
  "Digital Marketing: Google Ads & PPC Expert":
    "/assets/generated/course-google-ads.dim_800x450.jpg",
};

function CourseCard({
  course,
  onEnroll,
  isCheckingOut,
}: {
  course: Partial<Course> & {
    id: string;
    title: string;
    description: string;
    tier: string;
    priceInr: bigint;
    thumbnailUrl: string;
  };
  onEnroll: (id: string, tierKey: string) => void;
  isCheckingOut: boolean;
}) {
  const rawTier = course.tier;
  const baseTierKey =
    typeof rawTier === "string"
      ? rawTier
      : rawTier && typeof rawTier === "object"
        ? Object.keys(rawTier as object)[0]
        : "professional";
  const tierKey = (
    baseTierKey === "performance" || Number(course.priceInr) >= 74999
      ? "performance"
      : baseTierKey
  ) as keyof typeof TIER_COLORS;
  const tierInfo = TIER_COLORS[tierKey] || TIER_COLORS.professional;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="snap-start shrink-0 w-72 md:w-80"
    >
      <div
        className="glass-card rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300"
        style={{ minHeight: 380 }}
      >
        <div className="h-44 overflow-hidden relative">
          <img
            src={
              course.thumbnailUrl ||
              COURSE_IMAGE_MAP[course.title] ||
              "/assets/generated/course-digital-marketing.dim_800x450.jpg"
            }
            alt={course.title}
            className="w-full h-full object-cover opacity-75"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, oklch(5% 0.01 250 / 0.95) 100%)",
            }}
          />
          <div
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-background/60 backdrop-blur-sm ${tierInfo.badge}`}
          >
            {tierInfo.label}
          </div>
          <div
            className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1 backdrop-blur-sm"
            style={{
              background: "oklch(60% 0.25 230 / 0.15)",
              border: "1px solid oklch(60% 0.25 230 / 0.3)",
              color: "oklch(70% 0.2 200)",
            }}
          >
            <Bot className="w-3 h-3" /> AI
          </div>
        </div>
        <div className="flex-1 flex flex-col p-5">
          <h3
            className="font-bold text-base mb-1.5 line-clamp-2"
            style={{ color: "oklch(97% 0.005 250)" }}
          >
            {course.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-4 line-clamp-2"
            style={{ color: "oklch(55% 0.01 250)" }}
          >
            {course.description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="font-bold text-lg gold-text font-mono">
              Rs.{Number(course.priceInr).toLocaleString("en-IN")}
            </span>
            <Button
              data-ocid="courses.primary_button"
              size="sm"
              onClick={() => onEnroll(course.id, tierKey)}
              disabled={isCheckingOut}
              className="btn-gold rounded-full px-4 font-semibold text-xs"
            >
              {isCheckingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Enroll Now"
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LandingPage({ nav }: LandingPageProps) {
  const { identity, login } = useInternetIdentity();
  const { isEmailLoggedIn } = useEmailAuth();
  const isLoggedIn = !!identity || isEmailLoggedIn;
  const { data: courses, isLoading } = useCourses();
  const createCheckout = useCreateCheckoutSession();

  useEffect(() => {
    document.title =
      "Digital Marketing Course India | AI-Powered Training | The Digital Marketing Foundation";
    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      (meta as HTMLMetaElement).name = "description";
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "India's #1 AI-powered digital marketing course. Professional Rs.24,999 | Advanced Rs.34,999 | Performance Marketing Rs.74,999. Learn SEO, Google Ads, Meta Ads, Social Media, Performance Marketing. Govt. recognized certification. 35,000+ students.",
    );
  }, []);

  const TIER_PRICE_MAP: Record<
    string,
    { priceId: string; name: string; amount: number }
  > = {
    professional: {
      priceId: "price_pro_24999",
      name: "Professional Digital Marketing Course",
      amount: 2499900,
    },
    advanced: {
      priceId: "price_advanced_34999",
      name: "Advanced Digital Marketing Mastery",
      amount: 3499900,
    },
    performance: {
      priceId: "price_performance_74999",
      name: "Performance Marketing Mastery Course",
      amount: 7499900,
    },
  };

  const displayCourses =
    courses && courses.length > 0 ? courses : STATIC_COURSES;

  const handleEnroll = async (courseId: string, tierKey?: string) => {
    if (!isLoggedIn) {
      login();
      return;
    }
    const tier =
      tierKey === "basic" ? "professional" : tierKey || "professional";
    const tierInfo = TIER_PRICE_MAP[tier] || TIER_PRICE_MAP.professional;
    sessionStorage.setItem("pending_course_id", courseId);
    try {
      const session = await createCheckout.mutateAsync([
        {
          name: tierInfo.name,
          description: "Lifetime access to all course materials",
          amount: tierInfo.amount,
          currency: "inr",
          quantity: 1,
        },
      ]);
      if (!session?.url) throw new Error("Session missing url");
      window.location.href = session.url;
    } catch {
      nav.navigate("course-detail", { courseId });
    }
  };

  const handlePricingEnroll = async (tierKey: string) => {
    if (!isLoggedIn) {
      login();
      return;
    }
    const allCourses = courses && courses.length > 0 ? courses : STATIC_COURSES;
    const matchingCourse = allCourses.find(
      (c) =>
        (typeof c.tier === "string"
          ? c.tier
          : ((c.tier as unknown as { __kind__: string }).__kind__ ??
            c.tier)) === tierKey,
    );
    const courseId = matchingCourse?.id || `tier-${tierKey}`;
    await handleEnroll(courseId, tierKey);
  };

  const sectionMotion = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" } as const,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  };

  return (
    <div
      className="overflow-x-hidden"
      style={{ background: "oklch(5% 0.01 250)" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden neural-grid">
        <StageSpotlight />

        {/* Hero Content — staggered reveal */}
        <div
          className="container mx-auto px-4 relative text-center py-28"
          style={{ zIndex: 10 }}
        >
          {/* Badge — animate first */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center mb-7"
          >
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono font-semibold badge-pulse"
              style={{
                background: "oklch(60% 0.25 230 / 0.12)",
                border: "1px solid oklch(60% 0.25 230 / 0.4)",
                color: "oklch(75% 0.2 200)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                style={{ background: "oklch(70% 0.2 200)" }}
              />
              <Cpu className="w-3.5 h-3.5" />
              NEURAL &middot; AI &middot; POWERED
            </div>
          </motion.div>

          {/* Headline — delayed */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mb-6 tracking-tight"
          >
            {/* Line 1: small pre-qualifier */}
            <span
              className="block text-lg md:text-xl font-semibold mb-2 font-mono tracking-widest uppercase"
              style={{ color: "oklch(50% 0.01 250)" }}
            >
              India&apos;s #1 AI-Powered
            </span>
            {/* Line 2: the hero word */}
            <span className="block text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] gold-text glow-blue-text">
              Digital
              <br />
              Marketing
            </span>
            {/* Line 3: supporting */}
            <span
              className="block text-2xl md:text-3xl lg:text-4xl font-semibold mt-4"
              style={{ color: "oklch(72% 0.005 250)" }}
            >
              Training Platform
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ color: "oklch(55% 0.01 250)" }}
          >
            From beginner to certified professional. SEO, Google Ads, Meta Ads,
            Social Media, Design &amp; Performance Marketing — all AI-powered.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-14"
          >
            <Button
              data-ocid="hero.primary_button"
              size="lg"
              onClick={() =>
                document
                  .getElementById("courses")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-gold rounded-full px-10 py-6 font-semibold text-base h-auto"
            >
              Explore Courses <ChevronRight className="ml-1 w-5 h-5" />
            </Button>
            <Button
              data-ocid="hero.secondary_button"
              variant="outline"
              size="lg"
              onClick={() =>
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full px-10 py-6 font-semibold text-base h-auto border-primary/25 text-primary hover:bg-primary/10"
            >
              View Pricing
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.58 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {[
              { value: "35,000+", label: "Students" },
              { value: "4.9/5", label: "Rating" },
              { value: "100%", label: "Job Support" },
              { value: "15+", label: "AI Courses" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-2 rounded-full text-sm"
                style={{
                  background: "oklch(60% 0.25 230 / 0.06)",
                  border: "1px solid oklch(60% 0.25 230 / 0.15)",
                  color: "oklch(65% 0.01 250)",
                }}
              >
                <span className="text-primary font-mono font-bold">
                  {stat.value}
                </span>{" "}
                <span className="font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(transparent, oklch(5% 0.01 250))",
          }}
        />
      </section>

      {/* ===== STATS STRIP ===== */}
      <section
        className="py-8"
        style={{
          borderTop: "1px solid oklch(60% 0.25 230 / 0.1)",
          borderBottom: "1px solid oklch(60% 0.25 230 / 0.1)",
          background: "oklch(6% 0.012 250)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: "35,000+", label: "Active Students" },
              { icon: BookOpen, value: "15+", label: "AI-Powered Courses" },
              {
                icon: Award,
                value: "Govt. Recognized",
                label: "Certification",
              },
              { icon: Star, value: "Top Mentors", label: "Industry Experts" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "oklch(60% 0.25 230 / 0.1)",
                    border: "1px solid oklch(60% 0.25 230 / 0.2)",
                  }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-sm md:text-base font-mono text-primary">
                    {value}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(45% 0.01 250)" }}
                  >
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COURSE HIGHLIGHTS ===== */}
      <section className="py-14 bg-grid-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: PlayCircle,
                label: "HD Video Lessons",
                desc: "Expert-recorded content",
              },
              {
                icon: FileText,
                label: "Weekly Assignments",
                desc: "With gift card rewards",
              },
              {
                icon: Trophy,
                label: "AI-Powered Quizzes",
                desc: "Adaptive post-video tests",
              },
              {
                icon: Zap,
                label: "Live Mentoring",
                desc: "Industry expert sessions",
              },
            ].map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label}
                {...sectionMotion}
                className="glass-card rounded-xl p-5 text-center"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{
                    background: "oklch(60% 0.25 230 / 0.1)",
                    border: "1px solid oklch(60% 0.25 230 / 0.2)",
                  }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="font-semibold text-sm text-foreground">
                  {label}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "oklch(45% 0.01 250)" }}
                >
                  {desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ===== FEATURED COURSES ===== */}
      <section id="courses" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div {...sectionMotion} className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3"
              style={{
                background: "oklch(60% 0.25 230 / 0.08)",
                border: "1px solid oklch(60% 0.25 230 / 0.2)",
                color: "oklch(70% 0.2 200)",
              }}
            >
              Featured Programs
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-foreground">Our Top </span>
              <span className="gold-text">Courses</span>
            </h2>
            <p
              className="max-w-xl mx-auto"
              style={{ color: "oklch(50% 0.01 250)" }}
            >
              Industry-crafted programs to take you from complete beginner to
              expert. All AI-powered.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex gap-6 overflow-hidden pb-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="shrink-0 w-72 md:w-80 glass-card rounded-xl p-4 space-y-3"
                >
                  <div
                    className="h-44 rounded-lg animate-pulse"
                    style={{ background: "oklch(60% 0.25 230 / 0.06)" }}
                  />
                  <div
                    className="h-4 rounded w-3/4 animate-pulse"
                    style={{ background: "oklch(60% 0.25 230 / 0.06)" }}
                  />
                  <div
                    className="h-4 rounded animate-pulse"
                    style={{ background: "oklch(60% 0.25 230 / 0.06)" }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
              style={{ cursor: "grab", WebkitOverflowScrolling: "touch" }}
            >
              {displayCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course as any}
                  onEnroll={handleEnroll}
                  isCheckingOut={createCheckout.isPending}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <GoldDivider />

      {/* ===== DM CATEGORIES ===== */}
      <section className="py-16 bg-grid-dark">
        <div className="container mx-auto px-4">
          <motion.div {...sectionMotion} className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3"
              style={{
                background: "oklch(45% 0.22 290 / 0.12)",
                border: "1px solid oklch(45% 0.22 290 / 0.3)",
                color: "oklch(65% 0.18 290)",
              }}
            >
              Digital Marketing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-foreground">10 Categories of </span>
              <span className="gold-text">Digital Marketing</span>
            </h2>
            <p
              className="max-w-xl mx-auto"
              style={{ color: "oklch(50% 0.01 250)" }}
            >
              Every category is covered in detail, from fundamentals to advanced
              AI-powered strategies.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {DM_CATEGORIES.map(({ icon: Icon, name, desc }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="glass-card glow-hover rounded-2xl p-5 text-center cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "oklch(60% 0.25 230 / 0.08)" }}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-bold text-sm text-foreground">{name}</div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "oklch(45% 0.01 250)" }}
                >
                  {desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ALL COURSES LIST ===== */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div {...sectionMotion} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-foreground">Complete Course </span>
              <span className="gold-text">Library</span>
            </h2>
            <p
              className="max-w-xl mx-auto"
              style={{ color: "oklch(50% 0.01 250)" }}
            >
              15 comprehensive courses spanning every facet of digital marketing
              and beyond.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {ALL_COURSES_LIST.map(({ icon: Icon, name, tier }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="glass-card rounded-xl p-3 text-center"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2"
                  style={{ background: "oklch(60% 0.25 230 / 0.08)" }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs font-semibold leading-tight text-foreground">
                  {name}
                </div>
                <div
                  className="text-[10px] mt-1 font-mono font-medium"
                  style={{
                    color:
                      tier === "Advanced"
                        ? "oklch(65% 0.18 290)"
                        : tier === "Performance"
                          ? "oklch(70% 0.2 200)"
                          : "oklch(65% 0.22 230)",
                  }}
                >
                  {tier}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ===== COMPARISON TABLE ===== */}
      <section className="py-16 bg-grid-dark">
        <div className="container mx-auto px-4">
          <motion.div {...sectionMotion} className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3"
              style={{
                background: "oklch(45% 0.22 290 / 0.1)",
                border: "1px solid oklch(45% 0.22 290 / 0.25)",
                color: "oklch(65% 0.18 290)",
              }}
            >
              Why We Stand Out
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-foreground">Why Choose Us Over </span>
              <span className="gold-text">Udemy, Coursera &amp; HubSpot?</span>
            </h2>
            <p
              className="max-w-xl mx-auto"
              style={{ color: "oklch(50% 0.01 250)" }}
            >
              Most global platforms offer generic content. We&apos;re built
              specifically for Indian students and professionals.
            </p>
          </motion.div>

          <div className="overflow-x-auto max-w-5xl mx-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid oklch(60% 0.25 230 / 0.3)",
                  }}
                >
                  <th className="text-left py-3 px-4 font-bold text-foreground">
                    Feature
                  </th>
                  <th
                    className="py-3 px-4 font-bold rounded-t-xl text-primary"
                    style={{ background: "oklch(60% 0.25 230 / 0.06)" }}
                  >
                    Digital Marketing Foundation
                  </th>
                  <th
                    className="py-3 px-4 font-semibold"
                    style={{ color: "oklch(45% 0.01 250)" }}
                  >
                    Udemy
                  </th>
                  <th
                    className="py-3 px-4 font-semibold"
                    style={{ color: "oklch(45% 0.01 250)" }}
                  >
                    Coursera
                  </th>
                  <th
                    className="py-3 px-4 font-semibold"
                    style={{ color: "oklch(45% 0.01 250)" }}
                  >
                    HubSpot
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["India-focused curriculum", "Yes", "Partial", "No", "No"],
                  ["INR Pricing", "Yes", "Yes", "USD only", "Free limited"],
                  ["Govt. recognized certificate", "Yes", "No", "No", "No"],
                  ["AI-Powered Learning", "Yes", "No", "Partial", "No"],
                  ["Live mentor sessions", "Yes", "No", "Partial", "No"],
                  ["Placement support", "Yes", "No", "No", "No"],
                  ["WhatsApp support", "Yes", "No", "No", "No"],
                ].map(([feature, dmf, udemy, coursera, hubspot], i) => (
                  <tr
                    key={feature}
                    style={{
                      borderBottom: "1px solid oklch(60% 0.25 230 / 0.07)",
                      background:
                        i % 2 === 0
                          ? "transparent"
                          : "oklch(60% 0.25 230 / 0.02)",
                    }}
                  >
                    <td
                      className="py-3 px-4"
                      style={{ color: "oklch(70% 0.01 250)" }}
                    >
                      {feature}
                    </td>
                    <td
                      className="py-3 px-4 text-center font-mono font-semibold text-primary"
                      style={{ background: "oklch(60% 0.25 230 / 0.04)" }}
                    >
                      {dmf}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        style={{
                          color:
                            udemy === "Yes"
                              ? "oklch(70% 0.15 145)"
                              : udemy === "No"
                                ? "oklch(55% 0.2 25)"
                                : "oklch(45% 0.01 250)",
                        }}
                      >
                        {udemy}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        style={{
                          color:
                            coursera === "Yes"
                              ? "oklch(70% 0.15 145)"
                              : coursera === "No"
                                ? "oklch(55% 0.2 25)"
                                : "oklch(45% 0.01 250)",
                        }}
                      >
                        {coursera}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        style={{
                          color:
                            hubspot === "Yes"
                              ? "oklch(70% 0.15 145)"
                              : hubspot === "No"
                                ? "oklch(55% 0.2 25)"
                                : "oklch(45% 0.01 250)",
                        }}
                      >
                        {hubspot}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {[
              { label: "35,000+ Students Enrolled", icon: Users },
              { label: "Govt. Recognized", icon: Award },
              { label: "AI-Powered Platform", icon: Bot },
              { label: "Placement Support", icon: Briefcase },
              { label: "4.9 Star Average Rating", icon: Star },
            ].map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  background: "oklch(60% 0.25 230 / 0.06)",
                  border: "1px solid oklch(60% 0.25 230 / 0.18)",
                }}
              >
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div {...sectionMotion} className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3"
              style={{
                background: "oklch(60% 0.25 230 / 0.08)",
                border: "1px solid oklch(60% 0.25 230 / 0.2)",
                color: "oklch(70% 0.2 200)",
              }}
            >
              Transparent Pricing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-foreground">Choose Your </span>
              <span className="gold-text">Learning Path</span>
            </h2>
            <p
              className="max-w-xl mx-auto"
              style={{ color: "oklch(50% 0.01 250)" }}
            >
              One-time payment. Lifetime access. From complete beginner to
              certified professional or master.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative"
              >
                {/* Popular plan: gradient border wrapper */}
                {plan.popular && (
                  <div
                    className="absolute -inset-px rounded-[18px] pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(60% 0.25 230 / 0.8), oklch(45% 0.22 290 / 0.5), oklch(70% 0.2 200 / 0.6))",
                    }}
                  />
                )}
                <div
                  className="relative rounded-2xl p-7 flex flex-col h-full"
                  style={{
                    background: plan.popular
                      ? "oklch(9% 0.02 250)"
                      : "oklch(8% 0.015 250 / 0.75)",
                    backdropFilter: "blur(20px)",
                    border: plan.popular
                      ? "none"
                      : "1px solid oklch(60% 0.25 230 / 0.18)",
                    boxShadow: plan.popular
                      ? "0 0 40px oklch(60% 0.25 230 / 0.2), inset 0 1px 0 oklch(100% 0 0 / 0.06)"
                      : "inset 0 1px 0 oklch(100% 0 0 / 0.04), 0 4px 24px oklch(0% 0 0 / 0.35)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                      <span
                        className="text-[10px] font-mono font-bold px-4 py-1 rounded-full uppercase tracking-widest"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(58% 0.28 230), oklch(65% 0.25 230))",
                          color: "#fff",
                          boxShadow: "0 0 12px oklch(60% 0.25 230 / 0.5)",
                        }}
                      >
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Tier badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-2 w-fit"
                    style={{
                      background: "oklch(60% 0.25 230 / 0.1)",
                      border: "1px solid oklch(60% 0.25 230 / 0.25)",
                      color: "oklch(70% 0.2 200)",
                    }}
                  >
                    <Bot className="w-3.5 h-3.5" /> {plan.tier}
                  </div>

                  <p
                    className="text-xs mb-5 font-medium"
                    style={{ color: "oklch(50% 0.01 250)" }}
                  >
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div
                    className="mb-6 pb-6"
                    style={{
                      borderBottom: "1px solid oklch(60% 0.25 230 / 0.12)",
                    }}
                  >
                    <span className="text-4xl font-bold font-mono gold-text">
                      {plan.price}
                    </span>
                    <span
                      className="text-sm ml-1.5"
                      style={{ color: "oklch(40% 0.01 250)" }}
                    >
                      / one-time
                    </span>
                    <div
                      className="mt-1 text-xs font-mono"
                      style={{ color: "oklch(45% 0.01 250)" }}
                    >
                      Lifetime access included
                    </div>
                  </div>

                  <ul className="space-y-2.5 flex-1 mb-8">
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm"
                        style={{ color: "oklch(72% 0.008 250)" }}
                      >
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: "oklch(65% 0.22 230)" }}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Button
                    data-ocid="pricing.primary_button"
                    size="lg"
                    disabled={createCheckout.isPending}
                    onClick={() => handlePricingEnroll(plan.tierKey)}
                    className={
                      plan.popular
                        ? "btn-gold w-full rounded-full font-semibold h-12 text-sm tracking-wide"
                        : "w-full rounded-full font-semibold h-12 text-sm border-primary/25 text-primary hover:bg-primary/10"
                    }
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {createCheckout.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      `Enroll in ${plan.tier}`
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ===== AI ADVISOR CHATBOT SECTION ===== */}
      <WhatsAppChatbotSection
        onNavigateToPricing={() =>
          document
            .getElementById("pricing")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      />

      <GoldDivider />

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 bg-grid-dark">
        <div className="container mx-auto px-4">
          <motion.div {...sectionMotion} className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3"
              style={{
                background: "oklch(60% 0.25 230 / 0.08)",
                border: "1px solid oklch(60% 0.25 230 / 0.2)",
                color: "oklch(70% 0.2 200)",
              }}
            >
              Student Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-foreground">Loved by </span>
              <span className="gold-text">35,000+ Students</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].slice(0, t.rating).map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-primary fill-primary"
                    />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "oklch(70% 0.01 250)" }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold text-primary"
                    style={{
                      background: "oklch(60% 0.25 230 / 0.15)",
                      border: "1px solid oklch(60% 0.25 230 / 0.3)",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {t.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "oklch(45% 0.01 250)" }}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ===== BLOGS PREVIEW ===== */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div {...sectionMotion} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-foreground">Latest from </span>
              <span className="gold-text">Our Blog</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "10 Performance Marketing Strategies for 2026",
                cat: "Performance Marketing",
                date: "Apr 2026",
              },
              {
                title: "Google's 2026 Algorithm Update: SEO Recovery Guide",
                cat: "SEO",
                date: "Apr 2026",
              },
              {
                title: "How to Use AI to Write 10x Better Ad Copy",
                cat: "AI in Marketing",
                date: "Apr 2026",
              },
            ].map((post) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl p-5 cursor-pointer group"
                onClick={() => nav.navigate("blogs")}
              >
                <div className="text-xs font-mono font-semibold mb-2 text-primary">
                  {post.cat}
                </div>
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                  {post.title}
                </h3>
                <div
                  className="text-xs"
                  style={{ color: "oklch(40% 0.01 250)" }}
                >
                  {post.date}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              data-ocid="blog.secondary_button"
              variant="outline"
              onClick={() => nav.navigate("blogs")}
              className="border-primary/30 text-primary hover:bg-primary/10 rounded-full px-6"
            >
              View All Blog Posts <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
