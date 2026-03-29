import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileText,
  Loader2,
  PlayCircle,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type { AppNav } from "../App";
import type { Course } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCourses } from "../hooks/useQueries";
import { useCreateCheckoutSession } from "../hooks/useStripe";

interface LandingPageProps {
  nav: AppNav;
}

const TIER_COLORS: Record<string, { bg: string; text: string; label: string }> =
  {
    basic: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Basic" },
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
  };

const STATIC_COURSES = [
  {
    id: "static-1",
    title: "Social Media Marketing Mastery",
    description:
      "Master Facebook, Instagram & LinkedIn advertising with hands-on campaigns",
    tier: { __kind__: "basic" },
    priceInr: BigInt(4999),
    thumbnailUrl: "/assets/generated/course-social-media.dim_400x240.jpg",
  },
  {
    id: "static-2",
    title: "SEO & Content Marketing Pro",
    description:
      "Rank on Google's first page and build a content strategy that converts",
    tier: { __kind__: "professional" },
    priceInr: BigInt(9999),
    thumbnailUrl: "/assets/generated/course-seo.dim_400x240.jpg",
  },
  {
    id: "static-3",
    title: "Google Ads & PPC Expert",
    description:
      "Run profitable ad campaigns on Google, YouTube and the Display Network",
    tier: { __kind__: "advanced" },
    priceInr: BigInt(24999),
    thumbnailUrl: "/assets/generated/course-google-ads.dim_400x240.jpg",
  },
];

const PRICING_PLANS = [
  {
    tier: "Basic",
    price: "₹4,999",
    popular: false,
    priceId: "price_basic_4999",
    tierKey: "basic",
    color: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    features: [
      "Access to Basic tier courses",
      "30+ video tutorials",
      "Weekly assignments",
      "Certificate of completion",
      "Community forum access",
      "Email support",
    ],
  },
  {
    tier: "Professional",
    price: "₹9,999",
    popular: true,
    priceId: "price_pro_9999",
    tierKey: "professional",
    color: "border-brand-teal",
    badge: "bg-brand-teal text-white",
    features: [
      "All Basic features",
      "100+ video tutorials",
      "Live Q&A sessions",
      "Gift card rewards for assignments",
      "Govt. recognized certification",
      "Priority email support",
      "1-on-1 mentor session",
    ],
  },
  {
    tier: "Advanced",
    price: "₹24,999",
    popular: false,
    priceId: "price_advanced_24999",
    tierKey: "advanced",
    color: "border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    features: [
      "All Professional features",
      "250+ video tutorials",
      "Live workshops & bootcamps",
      "Internship placement support",
      "Portfolio review",
      "Dedicated success manager",
      "Lifetime content access",
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
    text: "I was skeptical at first, but the quality of content blew me away. The quizzes after every video keep you sharp, and the gift card rewards for assignments are a great motivator!",
    rating: 5,
    avatar: "RV",
  },
  {
    name: "Ananya Patel",
    role: "Founder, GrowthLab Agency",
    text: "Best investment I've made in my career. The Govt. recognized certificate helped me close bigger clients. The platform is clean, the content is fresh and the mentors are genuinely helpful.",
    rating: 5,
    avatar: "AP",
  },
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
  const tierInfo = TIER_COLORS[tierKey] || TIER_COLORS.basic;

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
              "/assets/generated/course-social-media.dim_400x240.jpg"
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
              ₹{Number(course.priceInr).toLocaleString("en-IN")}
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

  const TIER_PRICE_MAP: Record<
    string,
    { priceId: string; name: string; amount: number }
  > = {
    basic: {
      priceId: "price_basic_4999",
      name: "Digital Marketing Basics",
      amount: 499900,
    },
    professional: {
      priceId: "price_pro_9999",
      name: "Professional Digital Marketing",
      amount: 999900,
    },
    advanced: {
      priceId: "price_advanced_24999",
      name: "Advanced Digital Marketing Mastery",
      amount: 2499900,
    },
  };

  const displayCourses = (
    courses && courses.length > 0 ? courses : STATIC_COURSES
  ).slice(0, 3);

  const handleEnroll = async (courseId: string, tierKey?: string) => {
    if (!identity) {
      login();
      return;
    }
    const tier = tierKey || "basic";
    const tierInfo = TIER_PRICE_MAP[tier] || TIER_PRICE_MAP.basic;
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
    } catch (err) {
      console.error("Checkout error:", err);
      // Fallback to course detail page
      nav.navigate("course-detail", { courseId });
    }
  };

  const handlePricingEnroll = async (tierKey: string) => {
    if (!identity) {
      login();
      return;
    }
    // Find matching course or use a generic ID for the tier
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
                🚀 India's #1 Digital Marketing Platform
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-[52px] font-extrabold text-brand-heading leading-tight mb-5">
                Master Digital Marketing.
                <span className="text-brand-teal"> Transform</span> Your Career.
              </h1>
              <p className="text-lg text-brand-body leading-relaxed mb-8 max-w-lg">
                Learn from India's top marketers. Earn Govt. recognized
                certifications, complete real-world assignments, and land your
                dream job in digital marketing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  data-ocid="hero.primary_button"
                  size="lg"
                  onClick={() => {
                    document
                      .getElementById("courses")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full px-8 font-semibold text-base shadow-orange"
                >
                  Explore Courses
                  <ChevronRight className="ml-1 w-5 h-5" />
                </Button>
                <Button
                  data-ocid="hero.secondary_button"
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    document
                      .getElementById("pricing")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full px-8 border-brand-teal text-brand-teal hover:bg-brand-wash font-semibold text-base"
                >
                  View Pricing
                </Button>
              </div>
              <div className="flex gap-6 mt-8">
                {[
                  { value: "35,000+", label: "Students" },
                  { value: "250+", label: "Video Lessons" },
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
                  alt="Student learning digital marketing"
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
              { icon: Video, value: "250+", label: "Video Tutorials" },
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
                label: "Video Tutorials",
                desc: "250+ HD videos",
              },
              {
                icon: FileText,
                label: "Quizzes & Assignments",
                desc: "Weekly challenges",
              },
              { icon: Zap, label: "Live Sessions", desc: "Expert Q&A" },
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

      {/* Featured Courses */}
      <section id="courses" className="py-16 bg-brand-wash">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-brand-teal/10 text-brand-teal border-brand-teal/20 mb-3">
              Our Programs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-heading mb-3">
              Featured Courses
            </h2>
            <p className="text-brand-body max-w-xl mx-auto">
              Structured programs crafted by industry veterans to take you from
              beginner to expert.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-44 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
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

          <div className="text-center mt-10">
            <Button
              data-ocid="courses.secondary_button"
              variant="outline"
              size="lg"
              onClick={() =>
                document
                  .getElementById("courses")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-brand-teal text-brand-teal hover:bg-brand-wash rounded-full px-8"
            >
              View All Courses
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
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
              One-time payment. Lifetime access to all course materials.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border-2 p-6 flex flex-col ${
                  plan.popular
                    ? "border-brand-teal shadow-teal scale-105"
                    : `${plan.color} shadow-xs`
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
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 ${plan.badge} w-fit`}
                >
                  {plan.tier}
                </div>
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
                      : "bg-brand-teal hover:bg-brand-teal-dark text-white"
                  }`}
                >
                  {createCheckout.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : (
                    "Get Started"
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
              Join 35,000+ students who've transformed their careers with The
              Digital Marketing Foundation.
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
