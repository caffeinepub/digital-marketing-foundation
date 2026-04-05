import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
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
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import type { AppNav } from "../App";
import type { Course } from "../backend.d";
import { NeuralNetworkCanvas } from "../components/NeuralNetworkCanvas";
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
    thumbnailUrl: "/assets/generated/course-seo-hitech.dim_800x450.jpg",
  },
  {
    id: "static-2",
    title: "Social Media Marketing Mastery",
    description:
      "Master Facebook, Instagram, LinkedIn & WhatsApp advertising with AI-powered targeting and creative tools.",
    tier: "professional",
    priceInr: BigInt(24999),
    thumbnailUrl:
      "/assets/generated/course-social-media-hitech.dim_800x450.jpg",
  },
  {
    id: "static-3",
    title: "Digital Marketing: Google Ads & PPC Expert",
    description:
      "Run profitable Google, YouTube and Display Network campaigns with AI bidding strategies and smart automation.",
    tier: "advanced",
    priceInr: BigInt(34999),
    thumbnailUrl: "/assets/generated/course-google-ads-hitech.dim_800x450.jpg",
  },
  {
    id: "static-4",
    title: "Learn the Art of Designing",
    description:
      "From design basics to Photoshop, Illustrator, Figma & AI design tools. Create stunning visuals for any brand.",
    tier: "professional",
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-designing-hitech.dim_800x450.jpg",
  },
  {
    id: "static-5",
    title: "Learn the Art of Sales",
    description:
      "Master consultative selling, negotiation, and closing techniques. Includes AI-powered sales scripts and CRM training.",
    tier: "professional",
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-sales-hitech.dim_800x450.jpg",
  },
  {
    id: "static-6",
    title: "MS Office Complete Course",
    description:
      "Professional mastery of Word, Excel, PowerPoint & Teams with Microsoft Copilot AI features for modern workplace productivity.",
    tier: "professional",
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-ms-office-hitech.dim_800x450.jpg",
  },
  {
    id: "static-7",
    title: "Performance Marketing Mastery",
    description:
      "Master Google Ads, Meta Ads, ROI tracking, funnel optimization, CRO, retargeting and performance dashboards. AI-powered advanced course.",
    tier: "performance",
    priceInr: BigInt(74999),
    thumbnailUrl: "/assets/generated/course-performance-hitech.dim_800x450.jpg",
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
    role: "Digital Marketing Manager",
    company: "TechCorp India",
    text: "The course completely changed my career trajectory. Within 3 months of completing the Advanced program, I landed a 40% salary hike. The AI-powered learning and mentor support are unmatched.",
    avatar: "PS",
  },
  {
    name: "Rahul Verma",
    role: "Freelance Marketing Consultant",
    company: "Independent",
    text: "I was skeptical at first, but the quality of content blew me away. The AI-powered learning path adapts to my pace, and the quizzes after every video keep you sharp. Best investment of my life.",
    avatar: "RV",
  },
  {
    name: "Ananya Patel",
    role: "Founder",
    company: "GrowthLab Agency",
    text: "Best investment I made in my career. The Govt. recognized certificate helped me close bigger clients instantly. The AI tools training alone is worth triple the price.",
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

const MARQUEE_ITEMS_1 = [
  "SEO Mastery",
  "Google Ads Expert",
  "Performance Marketing",
  "Social Media Marketing",
  "AI-Powered Learning",
  "Weekly Gift Card Rewards",
  "35,000 Students",
  "Govt. Recognized",
  "Live Mentoring",
  "Rs.24,999 Onwards",
  "Learn the Art of Designing",
  "Learn the Art of Sales",
];

const MARQUEE_ITEMS_2 = [
  "4.9 / 5 Rating",
  "100% Job Support",
  "LinkedIn Certificates",
  "AI-Powered Quizzes",
  "15+ Courses",
  "Industry Experts",
  "Performance Dashboards",
  "Meta Ads Mastery",
  "ChatGPT for Marketing",
  "Funnel Optimization",
  "ROI Tracking",
  "Placement Assistance",
];

function TiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateZ(8px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className ?? ""}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default function LandingPage({ nav }: LandingPageProps) {
  const { login, identity } = useInternetIdentity();
  const { isEmailLoggedIn } = useEmailAuth();
  const isLoggedIn = !!identity || isEmailLoggedIn;
  const { data: courses, isLoading } = useCourses();
  const createCheckout = useCreateCheckoutSession();

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = window.scrollY / docHeight;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        progress.toString(),
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const TIER_PRICE_MAP: Record<string, { name: string; amount: number }> = {
    professional: {
      name: "Professional Digital Marketing",
      amount: 2499900,
    },
    advanced: {
      name: "Advanced Digital Marketing",
      amount: 3499900,
    },
    performance: {
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
      {/* Scroll progress bar */}
      <div className="scroll-progress-bar" />

      {/* ===== HERO ===== */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-neural-bg.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Neural canvas overlay at reduced opacity */}
        <div className="absolute inset-0" style={{ opacity: 0.45, zIndex: 1 }}>
          <NeuralNetworkCanvas />
        </div>

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(3% 0.01 250 / 0.92) 0%, oklch(5% 0.01 250 / 0.75) 50%, oklch(3% 0.01 250 / 0.88) 100%)",
            zIndex: 2,
          }}
        />

        {/* Hero Content */}
        <div
          className="container mx-auto px-6 relative py-28 lg:py-36"
          style={{ zIndex: 10 }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Main content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-8"
              >
                <div
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono font-semibold badge-pulse"
                  style={{
                    background: "oklch(60% 0.25 230 / 0.1)",
                    border: "1px solid oklch(60% 0.25 230 / 0.35)",
                    color: "oklch(75% 0.2 200)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                    style={{ background: "oklch(70% 0.2 200)" }}
                  />
                  <Cpu className="w-3.5 h-3.5" />
                  INDIA&apos;S #1 AI-POWERED PLATFORM
                </div>
              </motion.div>

              {/* Giant headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{
                  fontSize: "clamp(52px, 7.5vw, 110px)",
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  className="block glow-blue-text"
                  style={{ color: "oklch(68% 0.26 230)" }}
                >
                  Master
                </span>
                <span
                  className="block"
                  style={{ color: "oklch(97% 0.005 250)" }}
                >
                  Digital
                </span>
                <span
                  className="block"
                  style={{ color: "oklch(97% 0.005 250)" }}
                >
                  Marketing
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  color: "oklch(62% 0.01 250)",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  maxWidth: "500px",
                  marginBottom: "2.5rem",
                }}
              >
                From beginner to certified professional. SEO, Google Ads, Meta
                Ads, Social Media & Performance Marketing &mdash; all
                AI-powered.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42 }}
                className="flex flex-wrap gap-3 mb-12"
              >
                <Button
                  data-ocid="hero.primary_button"
                  size="lg"
                  onClick={() =>
                    document
                      .getElementById("courses")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="btn-gold rounded-full px-10 py-6 font-bold text-base h-auto"
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

              {/* Inline stat chips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.58 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { value: "35,000+", label: "Students" },
                  { value: "4.9/5", label: "Rating" },
                  { value: "Govt. Certified", label: "" },
                ].map((stat) => (
                  <div
                    key={stat.label || stat.value}
                    className="px-4 py-2 rounded-full text-sm"
                    style={{
                      background: "oklch(60% 0.25 230 / 0.06)",
                      border: "1px solid oklch(60% 0.25 230 / 0.18)",
                      color: "oklch(65% 0.01 250)",
                    }}
                  >
                    <span className="text-primary font-mono font-bold">
                      {stat.value}
                    </span>
                    {stat.label && (
                      <span className="ml-1 font-medium">{stat.label}</span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Giant stat orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="hidden lg:flex flex-col items-center justify-center relative"
            >
              {/* Glow rings */}
              <div
                className="absolute rounded-full stat-ring"
                style={{
                  width: 380,
                  height: 380,
                  border: "1px solid oklch(60% 0.25 230 / 0.15)",
                }}
              />
              <div
                className="absolute rounded-full stat-ring-delay"
                style={{
                  width: 300,
                  height: 300,
                  border: "1px solid oklch(60% 0.25 230 / 0.25)",
                }}
              />
              <div
                className="relative w-56 h-56 rounded-full flex flex-col items-center justify-center"
                style={{
                  background: "oklch(60% 0.25 230 / 0.07)",
                  border: "1px solid oklch(60% 0.25 230 / 0.35)",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "0 0 60px oklch(60% 0.25 230 / 0.2), inset 0 1px 0 oklch(100% 0 0 / 0.06)",
                }}
              >
                <div
                  className="font-mono font-black leading-none mb-1"
                  style={{
                    fontSize: "clamp(52px, 7vw, 80px)",
                    color: "oklch(68% 0.26 230)",
                  }}
                >
                  35K+
                </div>
                <div
                  className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: "oklch(55% 0.01 250)" }}
                >
                  Active Learners
                </div>
              </div>
              {/* Floating stat chips around orb */}
              <div
                className="absolute top-4 right-0 px-3 py-1.5 rounded-full text-xs font-mono font-semibold"
                style={{
                  background: "oklch(45% 0.22 290 / 0.15)",
                  border: "1px solid oklch(45% 0.22 290 / 0.4)",
                  color: "oklch(70% 0.18 290)",
                }}
              >
                15+ AI Courses
              </div>
              <div
                className="absolute bottom-8 left-0 px-3 py-1.5 rounded-full text-xs font-mono font-semibold"
                style={{
                  background: "oklch(70% 0.2 200 / 0.1)",
                  border: "1px solid oklch(70% 0.2 200 / 0.35)",
                  color: "oklch(75% 0.18 200)",
                }}
              >
                4.9 / 5 Rating
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(transparent, oklch(5% 0.01 250))",
            zIndex: 11,
          }}
        />
      </section>

      {/* ===== MARQUEE TRUST BAR ===== */}
      <div
        style={{
          background: "oklch(4.5% 0.01 250)",
          borderTop: "1px solid oklch(60% 0.25 230 / 0.08)",
          borderBottom: "1px solid oklch(60% 0.25 230 / 0.08)",
          overflow: "hidden",
          padding: "16px 0",
        }}
      >
        <div className="animate-marquee">
          {[...MARQUEE_ITEMS_1, ...MARQUEE_ITEMS_1].map((item, i) => (
            <span
              key={`m1-${i}-${item}`}
              className="flex items-center gap-4 px-6 text-sm font-mono font-medium whitespace-nowrap"
              style={{ color: "oklch(45% 0.01 250)" }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "oklch(60% 0.25 230 / 0.5)",
                  flexShrink: 0,
                }}
              />
              {item}
            </span>
          ))}
        </div>
        <div className="animate-marquee-reverse mt-2">
          {[...MARQUEE_ITEMS_2, ...MARQUEE_ITEMS_2].map((item, i) => (
            <span
              key={`m2-${i}-${item}`}
              className="flex items-center gap-4 px-6 text-xs font-mono whitespace-nowrap"
              style={{ color: "oklch(35% 0.01 250)" }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "oklch(45% 0.22 290 / 0.5)",
                  flexShrink: 0,
                }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ===== BENTO STATS GRID ===== */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                value: "35,000+",
                label: "Active Students",
                sub: "Across India",
                color: "oklch(60% 0.25 230)",
              },
              {
                value: "4.9",
                label: "Average Rating",
                sub: "Out of 5.0",
                color: "oklch(45% 0.22 290)",
              },
              {
                value: "15+",
                label: "AI Courses",
                sub: "Expert-designed",
                color: "oklch(70% 0.2 200)",
              },
              {
                value: "100%",
                label: "Job Support",
                sub: "Placement Assistance",
                color: "oklch(60% 0.25 230)",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="glass-card rounded-2xl p-6 flex flex-col gap-1"
                style={{
                  borderColor: `${stat.color.replace(")", " / 0.15)")}`,
                }}
              >
                <div
                  className="font-mono font-black"
                  style={{
                    fontSize: "clamp(36px, 5vw, 56px)",
                    color: stat.color,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div className="font-bold text-sm text-foreground mt-1">
                  {stat.label}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(40% 0.01 250)" }}
                >
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COURSE HIGHLIGHTS (feature badges) ===== */}
      <section className="py-12" style={{ background: "oklch(6% 0.012 250)" }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
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
            ].map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{
                  background: "oklch(60% 0.25 230 / 0.04)",
                  border: "1px solid oklch(60% 0.25 230 / 0.1)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: "oklch(60% 0.25 230 / 0.1)",
                    border: "1px solid oklch(60% 0.25 230 / 0.2)",
                  }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    {label}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(45% 0.01 250)" }}
                  >
                    {desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS — BLUEPRINT SECTION ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <motion.div {...sectionMotion} className="relative mb-16">
            <span className="section-counter">01</span>
            <div className="relative" style={{ zIndex: 1 }}>
              <div
                className="text-xs font-mono font-semibold uppercase tracking-widest mb-3"
                style={{ color: "oklch(60% 0.25 230)" }}
              >
                The Blueprint
              </div>
              <h2
                className="font-black leading-[0.92] max-w-xl"
                style={{
                  fontSize: "clamp(36px, 5vw, 60px)",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="text-foreground">Your Path to</span>
                <br />
                <span className="gold-text">Expert Level</span>
              </h2>
            </div>
          </motion.div>

          {/* 4 steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Choose Your Track",
                desc: "Pick the right package for your current skill level and goals.",
                items: [
                  "Professional (Rs.24,999)",
                  "Advanced (Rs.34,999)",
                  "Performance (Rs.74,999)",
                ],
                color: "oklch(60% 0.25 230)",
              },
              {
                step: "02",
                title: "Learn with AI",
                desc: "HD video lessons with AI-powered quizzes after every module.",
                items: [
                  "Expert-recorded content",
                  "Adaptive AI quizzes",
                  "Track your progress",
                ],
                color: "oklch(45% 0.22 290)",
              },
              {
                step: "03",
                title: "Practice & Compete",
                desc: "Weekly assignments with real gift card rewards for top performers.",
                items: [
                  "Weekly assignments",
                  "Gift card rewards",
                  "Live mentor sessions",
                ],
                color: "oklch(70% 0.2 200)",
              },
              {
                step: "04",
                title: "Get Certified",
                desc: "Earn your Govt.-recognized certificate, share it on LinkedIn.",
                items: [
                  "Govt. recognized cert",
                  "Unique shareable URL",
                  "One-click LinkedIn share",
                ],
                color: "oklch(60% 0.25 230)",
              },
            ].map(({ step, title, desc, items, color }, i) => (
              <motion.div
                key={step}
                className="process-step relative glass-card rounded-2xl p-7"
                data-step={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div
                  className="font-mono font-black text-sm mb-4 relative z-10"
                  style={{ color }}
                >
                  Step {step}
                </div>
                <div className="font-bold text-lg text-foreground mb-2 relative z-10">
                  {title}
                </div>
                <p
                  className="text-sm mb-5 relative z-10"
                  style={{ color: "oklch(50% 0.01 250)" }}
                >
                  {desc}
                </p>
                <ul className="space-y-2 relative z-10">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs"
                      style={{ color: "oklch(55% 0.01 250)" }}
                    >
                      <CheckCircle2
                        className="w-3.5 h-3.5 flex-shrink-0"
                        style={{ color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED COURSES — EDITORIAL GRID ===== */}
      <section
        id="courses"
        className="py-20 relative overflow-hidden"
        style={{ background: "oklch(6% 0.012 250)" }}
      >
        <div className="container mx-auto px-6">
          {/* Section header */}
          <motion.div {...sectionMotion} className="relative mb-16">
            <span className="section-counter">02</span>
            <div
              className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6"
              style={{ zIndex: 1 }}
            >
              <div>
                <div
                  className="text-xs font-mono font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(60% 0.25 230)" }}
                >
                  Featured Programs
                </div>
                <h2
                  className="font-black leading-[0.92]"
                  style={{
                    fontSize: "clamp(36px, 5vw, 60px)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span className="text-foreground">Programs Built</span>
                  <br />
                  <span className="gold-text">for Results</span>
                </h2>
                <p
                  className="mt-4 text-sm"
                  style={{ color: "oklch(48% 0.01 250)" }}
                >
                  All AI-powered. Industry-designed. Outcome-focused.
                </p>
              </div>
              <Button
                data-ocid="courses.secondary_button"
                variant="outline"
                size="sm"
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-primary/25 text-primary hover:bg-primary/10 rounded-full px-6 self-start md:self-auto"
              >
                View Pricing <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card rounded-2xl overflow-hidden">
                  <div
                    className="h-52 animate-pulse"
                    style={{ background: "oklch(60% 0.25 230 / 0.06)" }}
                  />
                  <div className="p-5 space-y-3">
                    <div
                      className="h-4 rounded w-3/4 animate-pulse"
                      style={{ background: "oklch(60% 0.25 230 / 0.06)" }}
                    />
                    <div
                      className="h-4 rounded animate-pulse"
                      style={{ background: "oklch(60% 0.25 230 / 0.04)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCourses.map((course, i) => {
                const tierKey =
                  typeof course.tier === "string"
                    ? course.tier
                    : ((course.tier as unknown as { __kind__: string })
                        .__kind__ ?? "professional");
                const tierInfo =
                  TIER_COLORS[tierKey] || TIER_COLORS.professional;
                const priceNum =
                  typeof course.priceInr === "bigint"
                    ? Number(course.priceInr)
                    : Number(course.priceInr);
                const imgUrl =
                  (course as { thumbnailUrl?: string }).thumbnailUrl ||
                  "/assets/generated/course-seo-hitech.dim_800x450.jpg";

                return (
                  <motion.div
                    key={course.id}
                    className="course-card-editorial rounded-2xl overflow-hidden"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.6 }}
                  >
                    {/* Image */}
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <img
                        className="card-img w-full h-full object-cover"
                        src={imgUrl}
                        alt={course.title}
                        loading="lazy"
                      />
                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 50%, oklch(7% 0.013 250 / 0.8) 100%)",
                        }}
                      />
                      {/* Tier + AI tags */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span
                          className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
                          style={{
                            background: "oklch(5% 0.01 250 / 0.85)",
                            border: `1px solid ${tierInfo.hex.replace(")", " / 0.4)")}`,
                            color: tierInfo.hex,
                          }}
                        >
                          {tierInfo.label}
                        </span>
                        <span
                          className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
                          style={{
                            background: "oklch(70% 0.2 200 / 0.12)",
                            border: "1px solid oklch(70% 0.2 200 / 0.35)",
                            color: "oklch(70% 0.2 200)",
                          }}
                        >
                          AI
                        </span>
                      </div>
                      {/* Arrow indicator (hover reveal) */}
                      <div
                        className="card-arrow absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: "oklch(60% 0.25 230)",
                          boxShadow: "0 0 12px oklch(60% 0.25 230 / 0.5)",
                        }}
                      >
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <h3 className="font-bold text-base text-foreground mb-2 leading-snug">
                        {course.title}
                      </h3>
                      <p
                        className="text-xs leading-relaxed mb-4 line-clamp-2"
                        style={{ color: "oklch(48% 0.01 250)" }}
                      >
                        {(course as { description?: string }).description ||
                          "Comprehensive AI-powered course with industry-expert instructors."}
                      </p>
                      <div className="flex items-center justify-between">
                        <div
                          className="font-mono font-black text-lg"
                          style={{ color: tierInfo.hex }}
                        >
                          Rs.{priceNum.toLocaleString("en-IN")}
                        </div>
                        <Button
                          data-ocid="course_card.primary_button"
                          size="sm"
                          onClick={() => handleEnroll(course.id, tierKey)}
                          disabled={createCheckout.isPending}
                          className="btn-gold rounded-full px-5 font-semibold text-xs h-8"
                        >
                          {createCheckout.isPending ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <>
                              Enroll{" "}
                              <ChevronRight className="ml-0.5 w-3.5 h-3.5" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== DM CATEGORIES ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div {...sectionMotion} className="relative mb-14">
            <span className="section-counter">03</span>
            <div className="relative" style={{ zIndex: 1 }}>
              <div
                className="text-xs font-mono font-semibold uppercase tracking-widest mb-3"
                style={{ color: "oklch(45% 0.22 290)" }}
              >
                Digital Marketing
              </div>
              <h2
                className="font-black leading-[0.92]"
                style={{
                  fontSize: "clamp(32px, 4.5vw, 54px)",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="text-foreground">10 Categories.</span>
                <br />
                <span className="gold-text">One Platform.</span>
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl">
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
                  className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "oklch(60% 0.25 230 / 0.08)" }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="font-bold text-sm text-foreground">{name}</div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "oklch(40% 0.01 250)" }}
                >
                  {desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section
        id="pricing"
        className="py-20 relative overflow-hidden"
        style={{ background: "oklch(4.5% 0.01 250)" }}
      >
        <div className="container mx-auto px-6">
          <motion.div {...sectionMotion} className="relative mb-14">
            <span className="section-counter">04</span>
            <div
              className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4"
              style={{ zIndex: 1 }}
            >
              <div>
                <div
                  className="text-xs font-mono font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(60% 0.25 230)" }}
                >
                  Transparent Pricing
                </div>
                <h2
                  className="font-black leading-[0.92]"
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 54px)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span className="text-foreground">Choose Your</span>
                  <br />
                  <span className="gold-text">Learning Path</span>
                </h2>
              </div>
              <p
                className="text-sm max-w-xs"
                style={{ color: "oklch(48% 0.01 250)" }}
              >
                One-time payment. Lifetime access. From complete beginner to
                certified professional.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl">
            {PRICING_PLANS.map((plan, i) => {
              const accentColor =
                plan.tierKey === "professional"
                  ? "oklch(60% 0.25 230)"
                  : plan.tierKey === "advanced"
                    ? "oklch(45% 0.22 290)"
                    : "oklch(70% 0.2 200)";

              return (
                <motion.div
                  key={plan.tier}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div
                      className="absolute -inset-px rounded-[20px] pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(60% 0.25 230 / 0.9), oklch(45% 0.22 290 / 0.6), oklch(70% 0.2 200 / 0.7))",
                        animation: "gradient-spin 4s ease infinite",
                        backgroundSize: "300% 300%",
                      }}
                    />
                  )}
                  <div
                    className="relative rounded-[18px] p-8 flex flex-col h-full"
                    style={{
                      background: plan.popular
                        ? "oklch(9% 0.02 250)"
                        : "oklch(8% 0.015 250 / 0.8)",
                      border: plan.popular
                        ? "none"
                        : `1px solid ${accentColor.replace(")", " / 0.15)")}`,
                      boxShadow: plan.popular
                        ? "0 0 50px oklch(60% 0.25 230 / 0.18), inset 0 1px 0 oklch(100% 0 0 / 0.06)"
                        : "inset 0 1px 0 oklch(100% 0 0 / 0.04), 0 4px 24px oklch(0% 0 0 / 0.35)",
                      transition: "transform 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform =
                        "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform =
                        "translateY(0)";
                    }}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <span
                          className="text-[10px] font-mono font-bold px-5 py-1.5 rounded-full uppercase tracking-widest"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(58% 0.28 230), oklch(65% 0.25 230))",
                            color: "#fff",
                            boxShadow: "0 0 14px oklch(60% 0.25 230 / 0.5)",
                          }}
                        >
                          Most Popular
                        </span>
                      </div>
                    )}

                    {/* Tier */}
                    <div
                      className="text-xs font-mono font-bold uppercase tracking-widest mb-5"
                      style={{ color: accentColor }}
                    >
                      {plan.tier}
                    </div>

                    {/* Price */}
                    <div className="mb-2">
                      <span
                        className="font-mono font-black"
                        style={{
                          fontSize: "clamp(32px, 4vw, 44px)",
                          color: accentColor,
                          lineHeight: 1,
                        }}
                      >
                        {plan.price}
                      </span>
                    </div>
                    <p
                      className="text-xs mb-6"
                      style={{ color: "oklch(45% 0.01 250)" }}
                    >
                      {plan.tagline}
                    </p>

                    <ul className="space-y-2.5 mb-8 flex-1">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <CheckCircle2
                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                            style={{ color: accentColor }}
                          />
                          <span style={{ color: "oklch(70% 0.01 250)" }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      data-ocid={`pricing.${plan.tierKey}_button`}
                      size="lg"
                      onClick={() => handlePricingEnroll(plan.tierKey)}
                      disabled={createCheckout.isPending}
                      className={`w-full rounded-full font-bold h-12 text-sm ${
                        plan.popular
                          ? "btn-gold"
                          : "border-primary/30 text-primary hover:bg-primary/10"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {createCheckout.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Get Started <ChevronRight className="ml-1 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== AI ADVISOR CHATBOT SECTION ===== */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-6">
          <motion.div {...sectionMotion} className="relative mb-8">
            <span className="section-counter">05</span>
            <div className="relative" style={{ zIndex: 1 }}>
              <div
                className="text-xs font-mono font-semibold uppercase tracking-widest mb-2"
                style={{ color: "oklch(60% 0.25 230)" }}
              >
                AI Advisor
              </div>
            </div>
          </motion.div>
        </div>
        <WhatsAppChatbotSection
          onNavigateToPricing={() =>
            document
              .getElementById("pricing")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />
      </section>

      {/* ===== TESTIMONIALS — PULL QUOTE STYLE ===== */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "oklch(4.5% 0.01 250)" }}
      >
        <div className="container mx-auto px-6">
          <motion.div {...sectionMotion} className="relative mb-14">
            <span className="section-counter">06</span>
            <div className="relative" style={{ zIndex: 1 }}>
              <div
                className="text-xs font-mono font-semibold uppercase tracking-widest mb-3"
                style={{ color: "oklch(60% 0.25 230)" }}
              >
                Student Success Stories
              </div>
              <h2
                className="font-black leading-[0.92]"
                style={{
                  fontSize: "clamp(32px, 4.5vw, 54px)",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="text-foreground">Loved by</span>
                <br />
                <span className="gold-text">35,000+ Students</span>
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            {TESTIMONIALS.map((t, i) => (
              <TiltCard
                key={t.name}
                className="glass-card rounded-2xl p-7 cursor-default"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  {/* Giant quote mark */}
                  <div
                    className="font-serif font-black leading-none mb-4 select-none"
                    style={{
                      fontSize: "72px",
                      color: "oklch(60% 0.25 230 / 0.2)",
                      lineHeight: 0.7,
                    }}
                    aria-hidden
                  >
                    &ldquo;
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "oklch(72% 0.01 250)" }}
                  >
                    {t.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold text-primary flex-shrink-0"
                      style={{
                        background: "oklch(60% 0.25 230 / 0.15)",
                        border: "1px solid oklch(60% 0.25 230 / 0.3)",
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">
                        {t.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className="text-xs"
                          style={{ color: "oklch(42% 0.01 250)" }}
                        >
                          {t.role}
                        </span>
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                          style={{
                            background: "oklch(60% 0.25 230 / 0.08)",
                            border: "1px solid oklch(60% 0.25 230 / 0.18)",
                            color: "oklch(60% 0.25 230)",
                          }}
                        >
                          {t.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOGS PREVIEW ===== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div {...sectionMotion} className="relative mb-12">
            <span className="section-counter">07</span>
            <div
              className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4"
              style={{ zIndex: 1 }}
            >
              <div>
                <div
                  className="text-xs font-mono font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "oklch(60% 0.25 230)" }}
                >
                  Insights & Resources
                </div>
                <h2
                  className="font-black leading-[0.92]"
                  style={{
                    fontSize: "clamp(32px, 4.5vw, 54px)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span className="text-foreground">Latest from</span>
                  <br />
                  <span className="gold-text">Our Blog</span>
                </h2>
              </div>
              <Button
                data-ocid="blog.secondary_button"
                variant="outline"
                size="sm"
                onClick={() => nav.navigate("blogs")}
                className="border-primary/25 text-primary hover:bg-primary/10 rounded-full px-6 self-start md:self-auto"
              >
                All Articles <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            {[
              {
                title: "10 Performance Marketing Strategies for 2026",
                cat: "Performance Marketing",
                date: "Apr 2026",
                readTime: "8 min read",
              },
              {
                title: "Google's 2026 Algorithm Update: SEO Recovery Guide",
                cat: "SEO",
                date: "Apr 2026",
                readTime: "6 min read",
              },
              {
                title: "How to Use AI to Write 10x Better Ad Copy",
                cat: "AI in Marketing",
                date: "Apr 2026",
                readTime: "5 min read",
              },
            ].map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 cursor-pointer group"
                onClick={() => nav.navigate("blogs")}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                      background: "oklch(60% 0.25 230 / 0.08)",
                      border: "1px solid oklch(60% 0.25 230 / 0.18)",
                      color: "oklch(65% 0.22 230)",
                    }}
                  >
                    {post.cat}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-snug mb-4">
                  {post.title}
                </h3>
                <div
                  className="flex items-center gap-3 text-xs"
                  style={{ color: "oklch(38% 0.01 250)" }}
                >
                  <span>{post.date}</span>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "oklch(6% 0.012 250)" }}
      >
        <div className="container mx-auto px-6">
          <motion.div {...sectionMotion} className="relative mb-12">
            <span className="section-counter">08</span>
            <div className="relative" style={{ zIndex: 1 }}>
              <div
                className="text-xs font-mono font-semibold uppercase tracking-widest mb-3"
                style={{ color: "oklch(60% 0.25 230)" }}
              >
                FAQ
              </div>
              <h2
                className="font-black leading-[0.92]"
                style={{
                  fontSize: "clamp(28px, 4vw, 48px)",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="text-foreground">Common</span>
                <br />
                <span className="gold-text">Questions</span>
              </h2>
            </div>
          </motion.div>

          <div className="max-w-3xl">
            <Accordion type="single" collapsible>
              {[
                {
                  q: "Who is this course for?",
                  a: "These courses are designed for complete beginners, working professionals looking to upskill, freelancers wanting to grow their income, and business owners who want to master digital marketing. No prior experience needed.",
                },
                {
                  q: "How long do I have access to the course?",
                  a: "You get lifetime access to all course materials, including any future updates. Once you enroll, the content is yours forever.",
                },
                {
                  q: "Is the certification government-recognized?",
                  a: "Yes, our certificates are Govt.-recognized and carry significant weight in the Indian job market. Each certificate also has a unique shareable URL for LinkedIn.",
                },
                {
                  q: "What is the difference between the three plans?",
                  a: "Professional covers core digital marketing. Advanced adds live workshops, internship support, and advanced AI tools. Performance Marketing is the ultimate plan for performance-focused marketers with deep Google Ads and Meta Ads expertise.",
                },
                {
                  q: "Can I pay in EMI?",
                  a: "Yes, many Indian banks and credit cards support no-cost EMI on our Razorpay payment gateway. You can check your EMI options at checkout.",
                },
                {
                  q: "Is there placement assistance?",
                  a: "Absolutely. Advanced and Performance Marketing plan students get dedicated placement support, resume reviews, and access to our hiring partner network.",
                },
              ].map(({ q, a }, i) => (
                <AccordionItem
                  key={q}
                  value={`q${i}`}
                  style={{
                    borderBottom: "1px solid oklch(60% 0.25 230 / 0.1)",
                  }}
                >
                  <AccordionTrigger className="py-5 font-semibold text-sm text-foreground hover:text-primary transition-colors text-left">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="pb-5 text-sm leading-relaxed"
                    style={{ color: "oklch(55% 0.01 250)" }}
                  >
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-24 relative overflow-hidden">
        {/* Background glow orb */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, oklch(60% 0.25 230 / 0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="container mx-auto px-6 text-center relative"
          style={{ zIndex: 1 }}
        >
          <motion.div {...sectionMotion}>
            <div
              className="text-xs font-mono font-semibold uppercase tracking-widest mb-4"
              style={{ color: "oklch(60% 0.25 230)" }}
            >
              Ready for Lift-off
            </div>
            <h2
              className="font-black leading-[0.92] mb-6 mx-auto"
              style={{
                fontSize: "clamp(36px, 6vw, 80px)",
                letterSpacing: "-0.04em",
                maxWidth: "800px",
              }}
            >
              <span className="text-foreground">Start Your</span>
              <br />
              <span className="gold-text">Digital Marketing</span>
              <br />
              <span className="text-foreground">Career Today</span>
            </h2>
            <p
              className="text-base mb-10 mx-auto"
              style={{ color: "oklch(50% 0.01 250)", maxWidth: "480px" }}
            >
              Join 35,000+ students who transformed their careers with
              India&apos;s most advanced AI-powered marketing platform.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                data-ocid="cta.primary_button"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-gold rounded-full px-12 py-7 font-bold text-lg h-auto"
              >
                Get Started Now <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                data-ocid="cta.secondary_button"
                variant="outline"
                size="lg"
                onClick={() => nav.navigate("blogs")}
                className="rounded-full px-10 py-7 font-semibold text-base h-auto border-primary/25 text-primary hover:bg-primary/10"
              >
                Read Our Blog
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
