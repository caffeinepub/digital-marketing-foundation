import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Calendar, ChevronRight, Newspaper } from "lucide-react";
import { useEffect, useState } from "react";
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
  // Digital Marketing
  {
    id: 1,
    headline:
      "Google Announces Largest Algorithm Update of 2025: What Digital Marketers Must Know",
    course: "Digital Marketing",
    date: "Mar 25, 2025",
    summary:
      "Google's March 2025 core update focuses heavily on content quality, E-E-A-T signals, and AI-generated content detection. Our Digital Marketing course has been updated with new modules covering the latest algorithm changes and recovery strategies for affected websites.",
    isNew: true,
  },
  {
    id: 2,
    headline: "New Module Live: Advanced AI Tools for Digital Marketers",
    course: "Digital Marketing",
    date: "Mar 20, 2025",
    summary:
      "We've just added a comprehensive new module on AI-powered digital marketing tools including ChatGPT, Gemini, Midjourney, and Canva AI. Learn how to use these tools to create content, run campaigns, and analyze performance at 10x speed.",
    isNew: true,
  },
  {
    id: 3,
    headline: "Google Analytics 4 Mastery Module: Updated for 2025 Features",
    course: "Digital Marketing",
    date: "Mar 15, 2025",
    summary:
      "GA4 has received major feature updates in 2025. Our updated module now covers predictive analytics, enhanced audience building, and the new AI-powered insights panel. All enrolled students get instant access to the updated content.",
    isNew: true,
  },
  {
    id: 4,
    headline:
      "Certificate Upgrade: Our Certification Now Recognized by 500+ Companies in India",
    course: "Digital Marketing",
    date: "Mar 10, 2025",
    summary:
      "We're proud to announce that The Digital Marketing Foundation certificate is now formally recognized by over 500 Indian companies including TCS, Wipro, and leading digital agencies. This opens new placement opportunities for all our graduates.",
    isNew: true,
  },
  {
    id: 5,
    headline:
      "Live Workshop: Mastering Performance Marketing in 2025 — Recording Available",
    course: "Digital Marketing",
    date: "Mar 5, 2025",
    summary:
      "Our recent live workshop on performance marketing attracted 2,000+ students. Topics covered included campaign attribution, incrementality testing, and cross-channel budget optimization. The full recording is now available in the course portal.",
    isNew: false,
  },
  {
    id: 6,
    headline:
      "New Placement Partnership: 10 Digital Agencies Now Hiring from Our Platform",
    course: "Digital Marketing",
    date: "Feb 28, 2025",
    summary:
      "We've partnered with 10 leading digital marketing agencies across Mumbai, Delhi, and Bangalore who are actively recruiting from our student pool. Advanced package students get exclusive access to these job openings.",
    isNew: false,
  },

  // Social Media Marketing
  {
    id: 7,
    headline:
      "Meta Launches New AI-Powered Ad Tools: Course Updated with Hands-On Training",
    course: "Social Media Marketing",
    date: "Mar 22, 2025",
    summary:
      "Meta's new Advantage+ AI tools are transforming Facebook and Instagram advertising. Our Social Media Marketing course has been updated with a dedicated module on using Meta's AI features to automate ad targeting and creative optimization.",
    isNew: true,
  },
  {
    id: 8,
    headline:
      "Instagram Threads Strategy Module: Now Available in Course Portal",
    course: "Social Media Marketing",
    date: "Mar 18, 2025",
    summary:
      "Instagram Threads has crossed 200 million users and is becoming a key platform for brands. We've added a complete Threads marketing strategy module covering content planning, community building, and cross-promotion with Instagram.",
    isNew: true,
  },
  {
    id: 9,
    headline: "YouTube Shorts Monetization Guide Added to Course",
    course: "Social Media Marketing",
    date: "Mar 12, 2025",
    summary:
      "YouTube has expanded Shorts monetization to India. Our new module covers how to create viral Shorts, monetize your content, and use YouTube Shorts as a traffic source for your main channel and website.",
    isNew: true,
  },
  {
    id: 10,
    headline: "WhatsApp Business API: New Advanced Module Released",
    course: "Social Media Marketing",
    date: "Mar 8, 2025",
    summary:
      "WhatsApp's new catalog and payment features make it the most complete business communication tool in India. Our advanced module covers API integration, automated messaging flows, and strategies to generate sales directly from WhatsApp.",
    isNew: false,
  },
  {
    id: 11,
    headline:
      "LinkedIn Marketing Module Updated: New AI Features and Algorithm Changes",
    course: "Social Media Marketing",
    date: "Mar 2, 2025",
    summary:
      "LinkedIn's algorithm update in early 2025 has changed how posts are distributed. Our updated module explains the new algorithm, optimal post formats, and strategies to maximize organic reach for both personal and company pages.",
    isNew: false,
  },
  {
    id: 12,
    headline:
      "Guest Expert Session: Top Influencer Marketing Agency Shares Industry Secrets",
    course: "Social Media Marketing",
    date: "Feb 25, 2025",
    summary:
      "We hosted the founder of one of India's top influencer marketing agencies for an exclusive session on nano-influencer strategies, campaign measurement, and how to negotiate rates. The session recording is now live in the course.",
    isNew: false,
  },

  // SEO
  {
    id: 13,
    headline:
      "Google's March 2025 Core Update: Complete Recovery & Optimization Guide",
    course: "SEO",
    date: "Mar 24, 2025",
    summary:
      "The March 2025 core update has affected thousands of websites. Our SEO course has been updated with a detailed analysis of the changes, affected site types, and a step-by-step recovery guide for impacted pages.",
    isNew: true,
  },
  {
    id: 14,
    headline: "New Module: AI Overviews and SGE Optimization Strategies",
    course: "SEO",
    date: "Mar 16, 2025",
    summary:
      "Google's AI Overviews (formerly SGE) are appearing in over 40% of searches. This new module teaches you how to optimize your content to appear in AI Overviews and maintain visibility as search results evolve.",
    isNew: true,
  },
  {
    id: 15,
    headline:
      "Technical SEO Workshop Recording: Core Web Vitals & Page Speed Mastery",
    course: "SEO",
    date: "Mar 8, 2025",
    summary:
      "Last week's technical SEO workshop covered the latest Core Web Vitals requirements, INP metric optimization, and advanced page speed techniques. All enrolled students can now access the 3-hour workshop recording.",
    isNew: false,
  },
  {
    id: 16,
    headline:
      "Backlink Building Update: New Ethical Link Building Module Added",
    course: "SEO",
    date: "Feb 20, 2025",
    summary:
      "Link building strategies that worked in 2023 may hurt your site in 2025. Our updated backlink module covers Google's spam policies, ethical outreach strategies, and how to build high-quality links that improve rankings sustainably.",
    isNew: false,
  },

  // Google Ads
  {
    id: 17,
    headline:
      "Google Ads Performance Max: Complete 2025 Optimization Guide Now Live",
    course: "Google Ads",
    date: "Mar 21, 2025",
    summary:
      "Performance Max campaigns now represent 40% of all Google Ads spend. Our comprehensive PMax optimization module covers asset creation, audience signals, budget allocation, and how to diagnose and improve underperforming campaigns.",
    isNew: true,
  },
  {
    id: 18,
    headline:
      "Google Ads AI Features: New Module on Smart Bidding and Demand Gen Campaigns",
    course: "Google Ads",
    date: "Mar 15, 2025",
    summary:
      "Google has rolled out major AI improvements to Smart Bidding and launched Demand Gen campaigns as a replacement for Discovery ads. Our updated module includes hands-on training with real campaign examples.",
    isNew: true,
  },
  {
    id: 19,
    headline:
      "Google Shopping Ads Module Updated: New AI-Powered Product Listings",
    course: "Google Ads",
    date: "Mar 9, 2025",
    summary:
      "Google's new AI-powered product listings are showing in search results across India. This module update covers how to optimize your product feed, set up Performance Max shopping campaigns, and maximize ROAS for e-commerce.",
    isNew: false,
  },

  // Email Marketing
  {
    id: 20,
    headline:
      "New Module: AI Email Writing with ChatGPT — Generate Converting Emails in Minutes",
    course: "Email Marketing",
    date: "Mar 19, 2025",
    summary:
      "AI has made email copywriting faster than ever. Our new module includes 30+ ChatGPT prompts specifically designed for email marketing, A/B testing frameworks, and how to personalize emails at scale using AI.",
    isNew: true,
  },
  {
    id: 21,
    headline:
      "Gmail & Yahoo Sender Requirement Updates: What Email Marketers Need to Do",
    course: "Email Marketing",
    date: "Mar 13, 2025",
    summary:
      "New Gmail and Yahoo sender requirements for bulk emailers have changed email marketing best practices. This course update covers DMARC, DKIM, SPF setup, and steps to ensure your emails reach the inbox, not spam.",
    isNew: true,
  },
  {
    id: 22,
    headline: "WhatsApp vs Email Marketing: New Comparative Module Added",
    course: "Email Marketing",
    date: "Mar 5, 2025",
    summary:
      "As WhatsApp becomes a major marketing channel in India, marketers need to understand how to use both email and WhatsApp effectively. This new comparison module covers channel selection, use cases, and integrated campaign strategies.",
    isNew: false,
  },

  // Learn the Art of Designing
  {
    id: 23,
    headline:
      "New Course Launch: Learn the Art of Designing — From Basics to Professional",
    course: "Learn the Art of Designing",
    date: "Mar 23, 2025",
    summary:
      "We're thrilled to announce the full launch of our Design course. Starting from design fundamentals and color theory, students progress through Adobe Photoshop, Illustrator, Canva Pro, Figma, and UI/UX design principles, all with AI-assisted design tools.",
    isNew: true,
  },
  {
    id: 24,
    headline:
      "New Module: AI Design Tools — Midjourney, Adobe Firefly, and Canva AI",
    course: "Learn the Art of Designing",
    date: "Mar 17, 2025",
    summary:
      "AI is revolutionizing the design industry. Our new AI design tools module covers Midjourney for image generation, Adobe Firefly for professional design assets, and Canva AI for rapid social media content creation.",
    isNew: true,
  },
  {
    id: 25,
    headline: "Figma for UI/UX Design: New Advanced Module Now Available",
    course: "Learn the Art of Designing",
    date: "Mar 10, 2025",
    summary:
      "Figma is the industry standard for UI/UX design. Our advanced Figma module covers design systems, prototyping, auto-layout, components, and how to collaborate with development teams on real-world projects.",
    isNew: false,
  },
  {
    id: 26,
    headline: "Guest Expert: Top Brand Designer Shares Portfolio Building Tips",
    course: "Learn the Art of Designing",
    date: "Mar 3, 2025",
    summary:
      "Our design students had an exclusive session with a senior brand designer from a leading Mumbai agency. Topics included building a portfolio that attracts clients, pricing your design services, and transitioning from freelancer to agency.",
    isNew: false,
  },

  // Learn the Art of Sales
  {
    id: 27,
    headline:
      "New Course Launch: Learn the Art of Sales — From Cold Calls to Closing Deals",
    course: "Learn the Art of Sales",
    date: "Mar 22, 2025",
    summary:
      "Our Sales Mastery course is now fully live. The curriculum covers prospecting, consultative selling, objection handling, negotiation, and closing techniques, with special modules on digital sales, social selling on LinkedIn, and AI-powered CRM tools.",
    isNew: true,
  },
  {
    id: 28,
    headline:
      "AI in Sales Module: Using ChatGPT to Write Winning Sales Scripts and Proposals",
    course: "Learn the Art of Sales",
    date: "Mar 16, 2025",
    summary:
      "AI tools are transforming the sales process. Our new module shows how to use ChatGPT to write compelling cold emails, sales scripts, proposals, and follow-up sequences that dramatically improve conversion rates.",
    isNew: true,
  },
  {
    id: 29,
    headline:
      "New Module: B2B vs B2C Sales Strategies — Key Differences and Techniques",
    course: "Learn the Art of Sales",
    date: "Mar 8, 2025",
    summary:
      "B2B and B2C sales require fundamentally different approaches. This new module covers the specific strategies, tools, and psychological principles needed to succeed in each type of selling, with real-world examples from Indian businesses.",
    isNew: false,
  },
  {
    id: 30,
    headline: "Sales Role-Play Sessions: Practice with AI-Powered Sales Coach",
    course: "Learn the Art of Sales",
    date: "Feb 28, 2025",
    summary:
      "We've integrated an AI-powered sales role-play feature into the course. Practice real sales conversations with an AI customer, receive instant feedback on your pitch, and track your improvement over time.",
    isNew: false,
  },

  // MS Office
  {
    id: 31,
    headline:
      "New Course Launch: MS Office Complete Course — Word, Excel, PowerPoint & More",
    course: "MS Office",
    date: "Mar 20, 2025",
    summary:
      "Our comprehensive MS Office course covers Microsoft Word, Excel, PowerPoint, Outlook, and Teams, from beginner basics to advanced professional techniques. New modules include AI-powered Copilot features that are transforming how professionals use Office.",
    isNew: true,
  },
  {
    id: 32,
    headline:
      "Microsoft Copilot for Office 365: Complete AI Features Module Added",
    course: "MS Office",
    date: "Mar 14, 2025",
    summary:
      "Microsoft's Copilot AI is now integrated into all Office applications. Our new module covers how to use Copilot in Excel for data analysis, in Word for drafting documents, and in PowerPoint for creating presentations automatically.",
    isNew: true,
  },
  {
    id: 33,
    headline:
      "Advanced Excel Module Update: Power BI Integration and Data Analytics",
    course: "MS Office",
    date: "Mar 6, 2025",
    summary:
      "Excel and Power BI together form the most powerful data analysis toolkit in business. Our updated advanced Excel module includes Power Query, Power Pivot, and integration with Power BI for creating professional business intelligence dashboards.",
    isNew: false,
  },
  {
    id: 34,
    headline:
      "New Module: Professional Presentation Design with PowerPoint and AI",
    course: "MS Office",
    date: "Feb 22, 2025",
    summary:
      "Presentations can make or break your professional impression. Our new module covers advanced PowerPoint design principles, slide templates, animation techniques, and how to use AI tools to create stunning presentations in minutes.",
    isNew: false,
  },
];

const COURSE_TABS = [
  "All",
  "Digital Marketing",
  "Social Media Marketing",
  "SEO",
  "Google Ads",
  "Email Marketing",
  "Learn the Art of Designing",
  "Learn the Art of Sales",
  "MS Office",
];

const COURSE_COLORS: Record<string, string> = {
  "Digital Marketing": "bg-blue-100 text-blue-700",
  "Social Media Marketing": "bg-pink-100 text-pink-700",
  SEO: "bg-green-100 text-green-700",
  "Google Ads": "bg-yellow-100 text-yellow-700",
  "Email Marketing": "bg-purple-100 text-purple-700",
  "Learn the Art of Designing": "bg-orange-100 text-orange-700",
  "Learn the Art of Sales": "bg-red-100 text-red-700",
  "MS Office": "bg-cyan-100 text-cyan-700",
};

interface NewsPageProps {
  nav: AppNav;
}

export default function NewsPage({ nav }: NewsPageProps) {
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    document.title = "Latest News & Updates | The Digital Marketing Foundation";
    const meta = document.querySelector("meta[name='description']");
    if (meta) {
      meta.setAttribute(
        "content",
        "Stay updated with the latest news, course updates, and industry developments from The Digital Marketing Foundation. New modules, expert sessions, and industry insights.",
      );
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content =
        "Stay updated with the latest news, course updates, and industry developments from The Digital Marketing Foundation.";
      document.head.appendChild(newMeta);
    }
  }, []);

  const filtered =
    activeTab === "All"
      ? ALL_NEWS
      : ALL_NEWS.filter((n) => n.course === activeTab);
  const newItems = filtered.filter((n) => n.isNew);
  const regularItems = filtered.filter((n) => !n.isNew);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 mb-4">
            Latest Updates
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            News &amp; Course Updates
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Stay ahead of the curve with the latest digital marketing news,
            course updates, and expert insights — updated weekly.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white/60">Updated weekly</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 flex-wrap">
            {COURSE_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* New / Breaking items */}
          {newItems.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-teal-600" />
                <h2 className="font-bold text-gray-900 text-lg">
                  Breaking & New
                </h2>
                <Badge className="bg-red-100 text-red-600 border-red-200">
                  {newItems.length} new
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {newItems.map((item) => (
                  <Card
                    key={item.id}
                    className="border-2 border-teal-200 bg-teal-50/30 hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${COURSE_COLORS[item.course] || "bg-gray-100 text-gray-700"}`}
                          >
                            {item.course}
                          </span>
                          <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                            NEW
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug">
                        {item.headline}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {item.summary}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-teal-400 text-teal-700 hover:bg-teal-50 text-xs font-semibold"
                        onClick={() =>
                          nav.navigate("news-article", {
                            articleId: String(item.id),
                          })
                        }
                      >
                        Read Full Update{" "}
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Regular items */}
          {regularItems.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-6">
                <Newspaper className="w-5 h-5 text-gray-600" />
                <h2 className="font-bold text-gray-900 text-lg">
                  Recent Updates
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularItems.map((item) => (
                  <Card
                    key={item.id}
                    className="border border-gray-200 hover:shadow-md transition-shadow bg-white"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${COURSE_COLORS[item.course] || "bg-gray-100 text-gray-700"}`}
                        >
                          {item.course}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug line-clamp-2">
                        {item.headline}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-3">
                        {item.summary}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 text-xs font-semibold p-1"
                        onClick={() =>
                          nav.navigate("news-article", {
                            articleId: String(item.id),
                          })
                        }
                      >
                        Read More <ChevronRight className="w-3 h-3 ml-0.5" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg font-medium">No news items found</p>
              <p className="text-sm mt-2">Select a different category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
