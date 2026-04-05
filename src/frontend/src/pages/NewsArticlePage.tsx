import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Bell, Calendar, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import type { AppNav } from "../App";

interface NewsItem {
  id: number;
  headline: string;
  course: string;
  date: string;
  summary: string;
  isNew?: boolean;
}

const ALL_NEWS: NewsItem[] = [
  {
    id: 1,
    headline:
      "Google Announces Largest Algorithm Update of 2025: What Digital Marketers Must Know",
    course: "Digital Marketing",
    date: "Mar 25, 2025",
    summary:
      "Google's March 2025 core update focuses heavily on content quality, E-E-A-T signals, and AI-generated content detection.",
    isNew: true,
  },
  {
    id: 2,
    headline: "New Module Live: Advanced AI Tools for Digital Marketers",
    course: "Digital Marketing",
    date: "Mar 20, 2025",
    summary:
      "We've just added a comprehensive new module on AI-powered digital marketing tools including ChatGPT, Gemini, Midjourney, and Canva AI.",
    isNew: true,
  },
  {
    id: 3,
    headline: "Google Analytics 4 Mastery Module: Updated for 2025 Features",
    course: "Digital Marketing",
    date: "Mar 15, 2025",
    summary:
      "GA4 has received major feature updates in 2025. Our updated module now covers predictive analytics, enhanced audience building, and the new AI-powered insights panel.",
    isNew: true,
  },
  {
    id: 4,
    headline:
      "Certificate Upgrade: Our Certification Now Recognized by 500+ Companies in India",
    course: "Digital Marketing",
    date: "Mar 10, 2025",
    summary:
      "The Digital Marketing Foundation certificate is now formally recognized by over 500 Indian companies.",
    isNew: true,
  },
  {
    id: 5,
    headline:
      "Live Workshop Recording: Mastering Performance Marketing in 2025",
    course: "Digital Marketing",
    date: "Mar 5, 2025",
    summary:
      "Our recent live workshop on performance marketing attracted 2,000+ students.",
    isNew: false,
  },
  {
    id: 6,
    headline:
      "New Placement Partnership: 10 Digital Agencies Now Hiring from Our Platform",
    course: "Digital Marketing",
    date: "Feb 28, 2025",
    summary:
      "We've partnered with 10 leading digital marketing agencies across Mumbai, Delhi, and Bangalore.",
    isNew: false,
  },
  {
    id: 7,
    headline:
      "Meta Launches New AI-Powered Ad Tools: Course Updated with Hands-On Training",
    course: "Social Media Marketing",
    date: "Mar 22, 2025",
    summary:
      "Meta's new Advantage+ AI tools are transforming Facebook and Instagram advertising.",
    isNew: true,
  },
  {
    id: 8,
    headline:
      "Instagram Threads Strategy Module: Now Available in Course Portal",
    course: "Social Media Marketing",
    date: "Mar 18, 2025",
    summary:
      "Instagram Threads has crossed 200 million users and is becoming a key platform for brands.",
    isNew: true,
  },
  {
    id: 9,
    headline: "YouTube Shorts Monetization Guide Added to Course",
    course: "Social Media Marketing",
    date: "Mar 12, 2025",
    summary: "YouTube has expanded Shorts monetization to India.",
    isNew: true,
  },
  {
    id: 10,
    headline: "WhatsApp Business API: New Advanced Module Released",
    course: "Social Media Marketing",
    date: "Mar 8, 2025",
    summary:
      "WhatsApp's new catalog and payment features make it the most complete business communication tool in India.",
    isNew: false,
  },
  {
    id: 11,
    headline: "LinkedIn Marketing Module Updated: New AI Features",
    course: "Social Media Marketing",
    date: "Feb 25, 2025",
    summary:
      "LinkedIn's new AI tools are helping marketers generate 3x more qualified B2B leads.",
    isNew: false,
  },
  {
    id: 12,
    headline: "Canva AI Design Tools Module: Complete Redesign Released",
    course: "Learn the Art of Designing",
    date: "Mar 20, 2025",
    summary:
      "Canva's 2025 AI features have completely changed how designers work.",
    isNew: true,
  },
  {
    id: 13,
    headline: "Adobe Creative Cloud Module: Updated for 2025 Feature Set",
    course: "Learn the Art of Designing",
    date: "Mar 14, 2025",
    summary:
      "Adobe's Firefly AI integration has transformed the Creative Cloud suite.",
    isNew: true,
  },
  {
    id: 14,
    headline: "Brand Identity Design Workshop: New Case Studies Added",
    course: "Learn the Art of Designing",
    date: "Mar 8, 2025",
    summary:
      "Learn how India's top brands built their visual identity from scratch.",
    isNew: false,
  },
  {
    id: 15,
    headline:
      "Sales Psychology Module: New Consumer Behaviour Research for India",
    course: "Learn the Art of Sales",
    date: "Mar 23, 2025",
    summary:
      "New consumer behaviour research specific to the Indian market has been incorporated.",
    isNew: true,
  },
  {
    id: 16,
    headline:
      "Objection Handling Masterclass: Updated with Real Call Recordings",
    course: "Learn the Art of Sales",
    date: "Mar 17, 2025",
    summary:
      "Real sales call recordings from successful Indian sales professionals have been added.",
    isNew: true,
  },
  {
    id: 17,
    headline: "High-Ticket Sales Module: Closing ₹1L+ Deals",
    course: "Learn the Art of Sales",
    date: "Mar 11, 2025",
    summary:
      "A dedicated module for closing high-value deals in the Indian B2B market.",
    isNew: false,
  },
  {
    id: 18,
    headline: "Microsoft Excel AI Features: Complete Module Update",
    course: "MS Office",
    date: "Mar 19, 2025",
    summary:
      "Excel's new Copilot AI features have changed how professionals analyse data.",
    isNew: true,
  },
  {
    id: 19,
    headline: "PowerPoint Pro Module: Pitch Decks That Win Investors",
    course: "MS Office",
    date: "Mar 13, 2025",
    summary:
      "Learn how top Indian startups structure their investor pitch decks.",
    isNew: true,
  },
  {
    id: 20,
    headline: "Google Workspace vs Microsoft Office: Comparison Module Added",
    course: "MS Office",
    date: "Mar 7, 2025",
    summary:
      "A comprehensive comparison guide to help professionals choose and master the right productivity suite.",
    isNew: false,
  },
];

interface FullContent {
  intro: string;
  sections: { heading: string; content: string; bullets?: string[] }[];
  impact: string;
}

const FULL_CONTENT: Record<number, FullContent> = {
  1: {
    intro:
      "Google's March 2025 Core Update is one of the most significant algorithm changes in the past three years. This update specifically targets content quality, E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals, and AI-generated content that lacks genuine value. Our Digital Marketing course has been completely updated to help you navigate and thrive in the post-update landscape.",
    sections: [
      {
        heading: "What Changed in the March 2025 Update",
        content:
          "The update introduced enhanced AI detection for low-value content, stronger signals for first-hand experience, and improved spam detection. Websites with thin, AI-generated content saw ranking drops of 30-70%. However, sites with genuine expert content and strong user engagement signals saw significant improvements.",
        bullets: [
          "E-E-A-T signals weighted more heavily in rankings",
          "AI-generated content without expert oversight penalised",
          "Page experience and engagement metrics strengthened as ranking factors",
        ],
      },
      {
        heading: "What This Means for Your Digital Marketing Strategy",
        content:
          "If your website relies heavily on AI-generated content without human expert review, you may have been impacted. The solution is to focus on creating genuinely helpful content that demonstrates real-world experience and expertise. This is actually good news for marketers willing to invest in quality.",
      },
      {
        heading: "How Our Course Has Been Updated",
        content:
          "We've added three new lessons covering the update in detail: understanding the new quality rater guidelines, conducting a content audit for your website, and a step-by-step content recovery plan for affected sites. All enrolled students have immediate access to these new lessons.",
        bullets: [
          "Lesson: Understanding E-E-A-T in 2025",
          "Lesson: Running a Post-Update Content Audit",
          "Lesson: Recovery Strategies for Affected Websites",
        ],
      },
    ],
    impact:
      "This update reinforces the importance of quality over quantity. The marketers who focus on genuine expertise and helpful content will benefit significantly from this change.",
  },
};

function generateFullContent(item: NewsItem): FullContent {
  return {
    intro: `${item.summary} This update brings significant improvements to our ${item.course} course, and all enrolled students have immediate access to the new content.`,
    sections: [
      {
        heading: "What's New and Why It Matters",
        content: `This update to our ${item.course} course reflects the latest developments in the industry. We continuously monitor changes in the digital landscape to ensure our students always have access to the most current and actionable knowledge.`,
        bullets: [
          "Updated curriculum based on real-world industry changes",
          "New practical exercises and real examples from the Indian market",
          "Immediate access for all enrolled students at no extra cost",
        ],
      },
      {
        heading: "How to Access the New Content",
        content:
          "Log in to your student dashboard and navigate to your enrolled course. New modules and lessons are clearly marked with a 'New' badge so you can find them instantly. We recommend completing any pending lessons in the current module before moving to the new content.",
      },
      {
        heading: "What You'll Learn",
        content: `The new content in this update covers the latest strategies and tools specific to ${item.course}. Each lesson includes practical exercises, real-world examples from the Indian market, and downloadable resources you can use immediately in your work.`,
        bullets: [
          "Hands-on exercises with real tools and platforms",
          "Case studies from successful Indian businesses",
          "Downloadable templates and checklists",
        ],
      },
    ],
    impact: `This update is part of our commitment to keeping our ${item.course} course the most current and practical training available in India. We update our content regularly so you're always learning what actually works today, not what worked 2-3 years ago.`,
  };
}

const COURSE_COLORS: Record<string, string> = {
  "Digital Marketing": "bg-blue-100 text-blue-700",
  "Social Media Marketing": "bg-pink-100 text-pink-700",
  "Learn the Art of Designing": "bg-purple-100 text-purple-700",
  "Learn the Art of Sales": "bg-orange-100 text-orange-700",
  "MS Office": "bg-primary/10 text-primary",
};

interface Props {
  nav: AppNav;
  articleId: string;
}

export default function NewsArticlePage({ nav, articleId }: Props) {
  const id = Number.parseInt(articleId) || 1;
  const item = ALL_NEWS.find((n) => n.id === id) || ALL_NEWS[0];
  const content = FULL_CONTENT[item.id] || generateFullContent(item);
  const related = ALL_NEWS.filter(
    (n) => n.id !== item.id && n.course === item.course,
  ).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: "oklch(5% 0.01 250)" }}>
      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-900 py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            type="button"
            data-ocid="news.link"
            onClick={() => nav.navigate("news")}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All News
          </button>
          {item.isNew && (
            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
              <Bell className="w-3 h-3" /> Latest Update
            </span>
          )}
          <Badge
            className={`mb-4 text-xs font-semibold px-3 py-1 ${COURSE_COLORS[item.course] || "bg-gray-100 text-gray-700"}`}
          >
            {item.course}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
            {item.headline}
          </h1>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Calendar className="w-4 h-4" />
            {item.date}
          </div>
        </div>
      </div>

      {/* Article Body */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 max-w-4xl py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Main content */}
          <div className="lg:col-span-3">
            <p className="text-lg leading-relaxed mb-8 font-medium border-l-4 border-primary/50 pl-5 py-3 pr-3 rounded-r-lg">
              {content.intro}
            </p>

            {content.sections.map((section) => (
              <div key={section.heading} className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {section.heading}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {section.content}
                </p>
                {section.bullets && (
                  <ul className="space-y-2 my-3">
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="mt-8 p-5 glass-card rounded-xl">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <Bell className="w-4 h-4" /> What This Means for You
              </h3>
              <p className="text-foreground/80 leading-relaxed text-sm">
                {content.impact}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 p-6 bg-gradient-to-r from-teal-600 to-emerald-700 rounded-2xl text-white text-center">
              <h3 className="text-xl font-bold mb-2">
                Enroll in {item.course}
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Get instant access to all course updates and new content as soon
                as it's published
              </p>
              <Button
                data-ocid="news.primary_button"
                onClick={() => nav.navigate("landing")}
                className="btn-gold font-semibold px-6"
              >
                View Courses & Enroll
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">
                More from {item.course}
              </h3>
              <div className="space-y-3">
                {related.map((r) => (
                  <Card
                    key={r.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() =>
                      nav.navigate("news-article", { articleId: String(r.id) })
                    }
                  >
                    <CardContent className="p-3">
                      {r.isNew && (
                        <Badge className="text-xs mb-2 bg-primary/10 text-primary">
                          New
                        </Badge>
                      )}
                      <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-3">
                        {r.headline}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-primary text-xs font-medium">
                        Read update <ChevronRight className="w-3 h-3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
