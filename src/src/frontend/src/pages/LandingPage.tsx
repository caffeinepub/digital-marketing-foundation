import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  BarChart2,
  BookOpen,
  Bot,
  Briefcase,
  CheckCircle2,
  ChevronRight,
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
import type { AppNav } from "../App";
import type { Course } from "../backend.d";
import WhatsAppChatbot from "../components/WhatsAppChatbot";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCourses } from "../hooks/useQueries";
import { useCreateCheckoutSession } from "../hooks/useStripe";

interface LandingPageProps {
  nav: AppNav;
}

const TIER_COLORS: Record<string, { bg: string; text: string; label: string }> =
  {
    professional: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "Professional",
    },
    advanced: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      label: "Advanced",
    },
    performance: {
      bg: "bg-red-100",
      text: "text-red-700",
      label: "Performance",
    },
  };

const STATIC_COURSES = [
  {
    id: "static-1",
    title: "Digital Marketing: SEO Mastery",
    description:
      "Rank on Google's first page with advanced SEO techniques, keyword research, and technical optimization — AI-powered.",
    tier: { __kind__: "professional" },
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-seo.dim_400x240.jpg",
  },
  {
    id: "static-2",
    title: "Social Media Marketing Mastery",
    description:
      "Master Facebook, Instagram, LinkedIn & WhatsApp advertising with AI-powered targeting and creative tools.",
    tier: { __kind__: "professional" },
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-social-media.dim_400x240.jpg",
  },
  {
    id: "static-3",
    title: "Digital Marketing: Google Ads & PPC Expert",
    description:
      "Run profitable Google, YouTube and Display Network campaigns with AI bidding strategies and smart automation.",
    tier: { __kind__: "advanced" },
    priceInr: BigInt(34999),
    thumbnailUrl: "/assets/generated/course-google-ads.dim_400x240.jpg",
  },
  {
    id: "static-4",
    title: "Learn the Art of Designing",
    description:
      "From design basics to Photoshop, Illustrator, Figma & AI design tools. Create stunning visuals for any brand.",
    tier: { __kind__: "professional" },
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-seo.dim_400x240.jpg",
  },
  {
    id: "static-5",
    title: "Learn the Art of Sales",
    description:
      "Master consultative selling, negotiation, and closing techniques. Includes AI-powered sales scripts and CRM training.",
    tier: { __kind__: "professional" },
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-social-media.dim_400x240.jpg",
  },
  {
    id: "static-6",
    title: "MS Office Complete Course",
    description:
      "Professional mastery of Word, Excel, PowerPoint & Teams with Microsoft Copilot AI features for modern workplace productivity.",
    tier: { __kind__: "professional" },
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-google-ads.dim_400x240.jpg",
  },
  {
    id: "static-7",
    title: "Performance Marketing Masterclass",
    description:
      "High-ticket Meta Ads, Google Ads, ROI optimization, conversion rate optimization. Scale campaigns to Rs.10L+ monthly ad spend.",
    tier: { __kind__: "performance" },
    priceInr: BigInt(74999),
    thumbnailUrl: "/assets/generated/course-performance.dim_400x240.jpg",
  },
];

const PRICING_PLANS = [
  {
    tier: "Professional",
    price: "\u20b924,999",
    tagline: "From Scratch to Professional Level",
    popular: true,
    priceId: "price_pro_24999",
    tierKey: "professional",
    color: "border-blue-400",
    badge: "bg-blue-600 text-white",
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
    price: "\u20b934,999",
    tagline: "From Scratch to Master Level",
    popular: false,
    priceId: "price_advanced_34999",
    tierKey: "advanced",
    color: "border-purple-300",
    badge: "bg-purple-600 text-white",
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
    price: "\u20b974,999",
    tagline: "High-Ticket Performance Specialist",
    popular: false,
    priceId: "price_perf_74999",
    tierKey: "performance",
    color: "border-red-400",
    badge: "bg-red-600 text-white",
    features: [
      "Everything in Advanced Mastery",
      "High-ticket Meta Ads & Google Ads campaigns",
      "ROI & ROAS optimization strategies",
      "Conversion Rate Optimization (CRO)",
      "Rs.10L+ monthly ad spend management",
      "Agency client acquisition training",
      "Advanced analytics & attribution modeling",
      "Performance marketing certifications",
      "1-on-1 campaign review sessions",
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
];

function CourseCard({
  course,
  onEnroll,
  isCheckingOut,
}: {
  course: Partial<Course> & {
    id: string;
    title: string;
    description: string;
    tier: { __kind__: string };
    priceInr: bigint;
    thumbnailUrl: string;
  };
  onEnroll: (id: string, tierKey: string) => void;
  isCheckingOut: boolean;
}) {
  const tierKey = course.tier.__kind__ as keyof typeof TIER_COLORS;
  const tierInfo = TIER_COLORS[tierKey] || TIER_COLORS.professional;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="card-hover"
    >
      <Card className="overflow-hidden border border-gray-100 h-full flex flex-col">
        <div className="h-44 bg-gray-100 overflow-hidden relative">
          <img
            src={
              course.thumbnailUrl ||
              "/assets/generated/course-seo.dim_400x240.jpg"
            }
            alt={course.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${tierInfo.bg} ${tierInfo.text}`}
          >
            {tierInfo.label}
          </div>
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold bg-black/70 text-white flex items-center gap-1">
            <Bot className="w-3 h-3" /> AI
          </div>
        </div>
        <CardContent className="flex-1 flex flex-col p-5">
          <h3 className="font-bold text-brand-heading text-base mb-1.5 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-brand-body leading-relaxed mb-4 line-clamp-2">
            {course.description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="font-bold text-brand-heading text-lg">
              \u20b9{Number(course.priceInr).toLocaleString("en-IN")}
            </span>
            <Button
              data-ocid="courses.primary_button"
              size="sm"
              onClick={() => onEnroll(course.id, tierKey)}
              disabled={isCheckingOut}
              className="bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full px-4 font-semibold"
            >
              {isCheckingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Enroll Now"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function LandingPage({ nav }: LandingPageProps) {
  const { data: courses, isLoading } = useCourses();
  const { login, identity } = useInternetIdentity();
  const createCheckout = useCreateCheckoutSession();

  useEffect(() => {
    document.title =
      "The Digital Marketing Foundation | AI-Powered Digital Marketing Courses India";
    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      (meta as HTMLMetaElement).name = "description";
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "India's #1 AI-powered digital marketing platform. Professional course \u20b924,999 | Advanced course \u20b934,999. Learn SEO, Google Ads, Social Media Marketing, Designing, Sales, MS Office. Govt. recognized certification.",
    );
    let keywords = document.querySelector("meta[name='keywords']");
    if (!keywords) {
      keywords = document.createElement("meta");
      (keywords as HTMLMetaElement).name = "keywords";
      document.head.appendChild(keywords);
    }
    keywords.setAttribute(
      "content",
      "digital marketing course India, SEO course, Google Ads training, social media marketing, digital marketing certification, online marketing course, AI marketing, digital marketing foundation",
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
      priceId: "price_perf_74999",
      name: "Performance Marketing Masterclass",
      amount: 7499900,
    },
  };

  const displayCourses = (
    courses && courses.length > 0 ? courses : STATIC_COURSES
  ).slice(0, 7);

  const handleEnroll = async (courseId: string, tierKey?: string) => {
    if (!identity) {
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
      if (!session?.url) throw new Error("Stripe session missing url");
      window.location.href = session.url;
    } catch {
      nav.navigate("course-detail", { courseId });
    }
  };

  const handlePricingEnroll = async (tierKey: string) => {
    if (!identity) {
      login();
      return;
    }
    const allCourses = courses && courses.length > 0 ? courses : STATIC_COURSES;
    const matchingCourse = allCourses.find((c) => c.tier.__kind__ === tierKey);
    const courseId = matchingCourse?.id || `tier-${tierKey}`;
    await handleEnroll(courseId, tierKey);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-brand-teal/10 text-brand-teal border-brand-teal/20 mb-4 font-medium">
                \ud83d\ude80 India's #1 AI-Powered Digital Marketing Platform
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-extrabold text-brand-heading leading-tight mb-5">
                Master Digital Marketing.
                <span className="text-brand-teal"> Transform</span> Your Career.
              </h1>
              <p className="text-lg text-brand-body leading-relaxed mb-2 max-w-lg">
                From Scratch to Professional or Master Level — Learn SEO, Google
                Ads, Social Media, Designing, Sales & More. AI-powered learning
                with real-world assignments.
              </p>
              <p className="text-sm text-brand-teal font-semibold mb-8">
                Govt. Recognized Certification | Placement Support | Live
                Mentoring
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  data-ocid="hero.primary_button"
                  size="lg"
                  onClick={() =>
                    document
                      .getElementById("courses")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full px-8 font-semibold text-base shadow-orange"
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
                  className="rounded-full px-8 border-brand-teal text-brand-teal hover:bg-brand-wash font-semibold text-base"
                >
                  View Pricing
                </Button>
              </div>
              <div className="flex gap-6 mt-8">
                {[
                  { value: "35,000+", label: "Students" },
                  { value: "14+", label: "Courses" },
                  { value: "98%", label: "Placement Rate" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-extrabold text-xl text-brand-teal">
                      {stat.value}
                    </div>
                    <div className="text-xs text-brand-body">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand-teal/10 rounded-3xl transform rotate-3" />
                <img
                  src="/assets/generated/hero-student.dim_600x500.png"
                  alt="Student learning digital marketing with AI tools"
                  className="relative rounded-3xl w-full max-w-lg mx-auto object-cover shadow-2xl"
                />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-teal/10 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-brand-teal" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-heading">
                      35,000+ Students
                    </div>
                    <div className="text-[10px] text-brand-body">
                      Enrolled this year
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-brand-orange text-white rounded-2xl px-4 py-3 shadow-xl">
                  <div className="text-xs font-bold">Govt. Recognized</div>
                  <div className="text-[10px] opacity-80">Certification</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="gradient-teal py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: "35,000+", label: "Active Students" },
              { icon: BookOpen, value: "14+ Courses", label: "All AI-Powered" },
              {
                icon: Award,
                value: "Govt. Recognized",
                label: "Certification",
              },
              { icon: Star, value: "Top Mentors", label: "Industry Experts" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm md:text-base">{value}</div>
                  <div className="text-xs text-white/75">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-14 bg-white">
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
                label: "Quizzes & Assignments",
                desc: "Weekly challenges",
              },
              {
                icon: Zap,
                label: "AI-Powered Learning",
                desc: "Personalized paths",
              },
              {
                icon: Trophy,
                label: "Certifications",
                desc: "Govt. recognized",
              },
            ].map(({ icon: Icon, label, desc }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-7 h-7 text-brand-teal" />
                </div>
                <div className="font-semibold text-brand-heading text-sm">
                  {label}
                </div>
                <div className="text-xs text-brand-body mt-0.5">{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Courses List */}
      <section className="py-8 bg-brand-wash">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge className="bg-brand-teal/10 text-brand-teal border-brand-teal/20 mb-3">
              All 14+ Courses
            </Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-heading">
              What You'll Learn
            </h2>
            <p className="text-brand-body mt-2 max-w-lg mx-auto text-sm">
              All courses are AI-powered and included in your package
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 max-w-5xl mx-auto">
            {ALL_COURSES_LIST.map(({ icon: Icon, name, tier }) => (
              <div
                key={name}
                className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 bg-brand-teal/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-brand-teal" />
                </div>
                <div className="text-xs font-semibold text-brand-heading leading-tight">
                  {name}
                </div>
                <div
                  className={`text-[10px] mt-1 font-medium ${tier === "Advanced" ? "text-purple-600" : "text-blue-600"}`}
                >
                  {tier}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-brand-teal/10 text-brand-teal border-brand-teal/20 mb-3">
              Featured Programs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-heading mb-3">
              Our Top Courses
            </h2>
            <p className="text-brand-body max-w-xl mx-auto">
              Industry-crafted programs to take you from complete beginner to
              expert. All AI-powered.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-44 bg-gray-200 rounded-xl animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Digital Marketing Categories */}
      <section className="py-16 bg-brand-wash">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge className="bg-brand-orange/10 text-brand-orange border-brand-orange/20 mb-3">
              Digital Marketing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-heading mb-3">
              10 Categories of Digital Marketing
            </h2>
            <p className="text-brand-body max-w-xl mx-auto">
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
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-teal/30 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-teal/20 transition-colors">
                  <Icon className="w-6 h-6 text-brand-teal" />
                </div>
                <div className="font-bold text-sm text-brand-heading">
                  {name}
                </div>
                <div className="text-xs text-brand-body mt-1">{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-brand-orange/10 text-brand-orange border-brand-orange/20 mb-3">
              Transparent Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-heading mb-3">
              Choose Your Learning Path
            </h2>
            <p className="text-brand-body max-w-xl mx-auto">
              One-time payment. Lifetime access. From complete beginner to
              certified professional or master.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border-2 p-6 flex flex-col ${
                  plan.popular
                    ? "border-blue-400 shadow-lg"
                    : `${plan.color} shadow-sm`
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-orange text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-orange">
                      Most Popular
                    </span>
                  </div>
                )}
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2 ${plan.badge} w-fit`}
                >
                  <Bot className="w-3.5 h-3.5" /> {plan.tier}
                </div>
                <p className="text-xs text-brand-body mb-4 font-medium">
                  {plan.tagline}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-brand-heading">
                    {plan.price}
                  </span>
                  <span className="text-brand-body text-sm ml-1">
                    / one-time
                  </span>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-sm text-brand-body"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button
                  data-ocid="pricing.primary_button"
                  size="lg"
                  disabled={createCheckout.isPending}
                  onClick={() => handlePricingEnroll(plan.tierKey)}
                  className={`w-full rounded-full font-semibold ${
                    plan.popular
                      ? "bg-brand-orange hover:bg-brand-orange-dark text-white shadow-orange"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {createCheckout.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : (
                    `Enroll in ${plan.tier}`
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-brand-wash">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-brand-teal/10 text-brand-teal border-brand-teal/20 mb-3">
              Student Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-heading mb-3">
              What Our Students Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border border-gray-100 shadow-xs card-hover">
                  <CardContent className="p-6">
                    <div className="flex mb-3">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star
                          key={`star-${t.name}-${j}`}
                          className="w-4 h-4 text-brand-orange fill-brand-orange"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-brand-body leading-relaxed mb-5 italic">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center text-white font-bold text-sm">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-brand-heading">
                          {t.name}
                        </div>
                        <div className="text-xs text-brand-body">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp AI Advisor Section */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <Badge className="bg-brand-teal/10 text-brand-teal border-brand-teal/20 mb-3">
              AI-Powered Guidance
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-heading mb-3">
              Chat with Our AI Marketing Advisor
            </h2>
            <p className="text-brand-body max-w-xl mx-auto">
              Get instant personalized course recommendations powered by
              ChatGPT. Describe your goals and we will match you with the
              perfect course.
            </p>
          </motion.div>
          <WhatsAppChatbot mode="embedded" />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="gradient-teal py-14">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Ready to Launch Your Digital Career?
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Join 35,000+ students who've transformed their careers from
              scratch with The Digital Marketing Foundation.
            </p>
            <Button
              data-ocid="cta.primary_button"
              size="lg"
              onClick={() => {
                if (!identity) login();
                else nav.navigate("dashboard");
              }}
              className="bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full px-10 font-semibold text-base shadow-orange"
            >
              Start Learning Today
              <TrendingUp className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
