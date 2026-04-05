import { Button } from "@/components/ui/button";
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
  // 2026 News Items
  {
    id: 100,
    headline:
      "Google's March 2026 Helpful Content Update: What Changed for SEO Rankings",
    course: "SEO",
    date: "Apr 2026",
    summary:
      "Google's March 2026 Helpful Content Update introduces stricter signals for AI-generated content, originality, and page experience. Websites relying on thin, AI-spun articles saw significant drops. Our SEO course has been updated with a full recovery guide and future-proofing strategies to help you maintain and grow your rankings.",
    isNew: true,
  },
  {
    id: 101,
    headline:
      "Meta AI Ads 2026: Advantage+ Creative Adds Dynamic Video Generation",
    course: "Social Media Marketing",
    date: "Apr 2026",
    summary:
      "Meta has supercharged Advantage+ Creative in 2026 with AI-powered dynamic video generation, automated A/B testing at scale, and new music overlay suggestions for Reels ads. Indian advertisers are seeing up to 38% lower CPAs. Our Social Media Marketing course now includes a hands-on module covering every new Advantage+ feature.",
    isNew: true,
  },
  {
    id: 102,
    headline:
      "New Course Launched: Performance Marketing at ₹74,999 — India's Most Comprehensive",
    course: "Performance Marketing",
    date: "Apr 2026",
    summary:
      "The Digital Marketing Foundation is proud to launch its flagship Performance Marketing course at ₹74,999 — the most in-depth performance marketing program in India. The course covers Google Ads, Meta Ads, programmatic buying, attribution modelling, funnel optimization, and live campaign management with real ad budgets.",
    isNew: true,
  },
  {
    id: 103,
    headline:
      "Google Ads Smart Bidding 2026: tROAS and tCPA Get Major AI Upgrades",
    course: "Google Ads",
    date: "Apr 2026",
    summary:
      "Google has rolled out significant improvements to its Smart Bidding algorithms in 2026, with tROAS now incorporating real-time auction signals from Search, Shopping, and Display simultaneously. tCPA models also received enhanced conversion prediction accuracy. Our Google Ads module has been updated to reflect these changes.",
    isNew: true,
  },
  {
    id: 104,
    headline:
      "YouTube 2026: AI-Generated Thumbnail Testing Feature Now Available to All Channels",
    course: "Social Media Marketing",
    date: "Apr 2026",
    summary:
      "YouTube has globally rolled out its AI-generated thumbnail testing feature, allowing creators to auto-generate up to 5 thumbnail variants and test them with live audiences. Early adopters are reporting 20–35% higher click-through rates. Our YouTube marketing module now covers how to use this feature effectively.",
    isNew: true,
  },
  {
    id: 105,
    headline:
      "LinkedIn 2026: New B2B Targeting Tools Tailored for the Indian Market",
    course: "Digital Marketing",
    date: "Apr 2026",
    summary:
      "LinkedIn has introduced India-specific B2B targeting enhancements in 2026, including job function targeting by Indian tier-2 cities, new company revenue filters, and a revamped Lead Gen Forms with auto-fill from Indian professional profiles. Our Digital Marketing course now covers LinkedIn's full 2026 B2B advertising toolkit.",
    isNew: true,
  },
  {
    id: 106,
    headline:
      "WhatsApp Business 2026: AI-Powered Chatbot Flows for Small Businesses",
    course: "Social Media Marketing",
    date: "Mar 2026",
    summary:
      "WhatsApp Business has launched no-code AI chatbot flow builder for small businesses in India, enabling automated lead qualification, order tracking, and appointment booking without any technical knowledge. Our Social Media Marketing course now includes a full module on building AI chatbot flows using the new tools.",
    isNew: true,
  },
  {
    id: 107,
    headline:
      "AI in SEO 2026: How Google SGE Is Reshaping Rankings and Traffic Patterns",
    course: "SEO",
    date: "Mar 2026",
    summary:
      "Google's Search Generative Experience (SGE) is now present in over 60% of Indian search results in 2026. Websites are experiencing significant traffic shifts, with some losing 30% of organic clicks while AI-optimised content sees gains. Our updated SEO course covers SGE optimisation, featured snippet strategies, and E-E-A-T signals for the AI era.",
    isNew: true,
  },
  {
    id: 108,
    headline:
      "Digital Marketing Foundation Celebrates 40,000 Students Milestone",
    course: "Digital Marketing",
    date: "Mar 2026",
    summary:
      "We're thrilled to announce that The Digital Marketing Foundation has crossed 40,000 enrolled students — a testament to the quality of our curriculum and the trust of the Indian learner community. To celebrate, we're offering exclusive alumni networking events and a refreshed certificate design valid across all 14 courses.",
    isNew: true,
  },
  {
    id: 109,
    headline:
      "New Partnership: 15 More Companies Now Hiring Directly from Our Platform",
    course: "Digital Marketing",
    date: "Mar 2026",
    summary:
      "The Digital Marketing Foundation has signed placement partnerships with 15 additional companies in 2026, including leading e-commerce firms, digital agencies, and startups across Hyderabad, Pune, and Chennai. Advanced and Performance Marketing package students now have direct access to job openings at all 25+ partner companies.",
    isNew: true,
  },
  {
    id: 110,
    headline:
      "Instagram 2026: Broadcast Channels — The Must-Know Feature for Marketers",
    course: "Social Media Marketing",
    date: "Mar 2026",
    summary:
      "Instagram's Broadcast Channels have become a primary tool for brand-to-audience communication in 2026, with open rates averaging 70% — far higher than email. Our Social Media Marketing module now covers how to grow, monetise, and automate Broadcast Channels for both personal brands and businesses.",
    isNew: true,
  },
  {
    id: 111,
    headline:
      "TikTok India 2026 Comeback: What Digital Marketers Need to Know Right Now",
    course: "Social Media Marketing",
    date: "Feb 2026",
    summary:
      "TikTok's anticipated return to India in 2026 is expected to reshape the short-video landscape. Our Social Media Marketing course has been updated with a TikTok India strategy module covering content formats, advertising options, influencer collaborations, and how to quickly build an audience in this highly competitive space.",
    isNew: true,
  },
  {
    id: 112,
    headline:
      "Razorpay 2026: New EMI Options Make Course Enrollment More Accessible",
    course: "Digital Marketing",
    date: "Feb 2026",
    summary:
      "Razorpay has launched new 0% EMI options across all major Indian banks for educational purchases in 2026. Students can now enroll in the Professional (₹24,999), Advanced (₹34,999), or Performance Marketing (₹74,999) courses with easy monthly instalments — making world-class digital marketing education accessible to everyone.",
    isNew: true,
  },
  {
    id: 113,
    headline:
      "Google Analytics 4 2026: New Predictive AI Metrics Launched for All Accounts",
    course: "Google Ads",
    date: "Feb 2026",
    summary:
      "Google Analytics 4 has launched four new predictive AI metrics in 2026: purchase probability, churn probability, revenue prediction, and engagement prediction scores. These metrics are now accessible in all GA4 accounts. Our Analytics module covers how to use these predictions to allocate budgets and personalise user journeys.",
    isNew: true,
  },
  {
    id: 114,
    headline:
      "Performance Marketing Batch Starting May 2026 — Early Bird Pricing Available Now",
    course: "Performance Marketing",
    date: "Jan 2026",
    summary:
      "The next batch of our Performance Marketing course begins in May 2026, with limited seats available at an early bird price. The course includes live Google Ads and Meta Ads campaigns, 1-on-1 mentorship, and guaranteed placement support. Enroll before April 30 to secure your spot and save on the full ₹74,999 fee.",
    isNew: true,
  },
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

const COURSE_NEON: Record<string, string> = {
  "Digital Marketing": "#4d79ff",
  "Social Media Marketing": "#ff4d9f",
  SEO: "#39ff14",
  "Google Ads": "#f59e0b",
  "Email Marketing": "#a855f7",
  "Learn the Art of Designing": "#ff6b35",
  "Learn the Art of Sales": "#ff4444",
  "MS Office": "#00ffff",
  "Performance Marketing": "#f59e0b",
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
    <div className="min-h-screen" style={{ background: "#000" }}>
      {/* Hero */}
      <section
        className="py-16 bg-grid-dark"
        style={{ borderBottom: "1px solid rgba(0,255,255,0.1)" }}
      >
        <div className="container mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "rgba(0, 255, 255, 0.08)",
              border: "1px solid rgba(0, 255, 255, 0.2)",
              color: "#00ffff",
            }}
          >
            Latest Updates
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: "#e0f7ff" }}
          >
            News &amp;{" "}
            <span className="text-neon-gradient">Course Updates</span>
          </h1>
          <p
            className="max-w-2xl mx-auto text-lg"
            style={{ color: "rgba(200,220,235,0.65)" }}
          >
            Stay ahead of the curve with the latest digital marketing news,
            course updates, and expert insights — updated weekly.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#39ff14", boxShadow: "0 0 6px #39ff14" }}
            />
            <span
              className="text-sm"
              style={{ color: "rgba(200,220,235,0.5)" }}
            >
              Updated weekly
            </span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section
        className="sticky top-16 z-30"
        style={{
          background: "rgba(0,0,0,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(0,255,255,0.08)",
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 flex-wrap">
            {COURSE_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap"
                style={{
                  background:
                    activeTab === tab
                      ? "rgba(0, 255, 255, 0.15)"
                      : "rgba(255,255,255,0.04)",
                  border:
                    activeTab === tab
                      ? "1px solid rgba(0, 255, 255, 0.4)"
                      : "1px solid rgba(255,255,255,0.08)",
                  color:
                    activeTab === tab ? "#00ffff" : "rgba(200,220,235,0.6)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-12 bg-grid-dark">
        <div className="container mx-auto px-4">
          {/* New / Breaking items */}
          {newItems.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5" style={{ color: "#00ffff" }} />
                <h2 className="font-bold text-lg" style={{ color: "#e0f7ff" }}>
                  Breaking & New
                </h2>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255, 50, 50, 0.15)",
                    border: "1px solid rgba(255, 50, 50, 0.3)",
                    color: "#ff4444",
                  }}
                >
                  {newItems.length} new
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {newItems.map((item) => {
                  const neonColor = COURSE_NEON[item.course] || "#00ffff";
                  return (
                    <div
                      key={item.id}
                      data-ocid={`news.item.${item.id}`}
                      className="rounded-2xl p-6"
                      style={{
                        background: "rgba(10,12,20,0.7)",
                        border: `1px solid ${neonColor}30`,
                        boxShadow: `0 0 20px ${neonColor}10`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{
                              background: `${neonColor}18`,
                              border: `1px solid ${neonColor}40`,
                              color: neonColor,
                            }}
                          >
                            {item.course}
                          </span>
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{
                              background: "rgba(57, 255, 20, 0.12)",
                              border: "1px solid rgba(57, 255, 20, 0.35)",
                              color: "#39ff14",
                            }}
                          >
                            NEW
                          </span>
                        </div>
                        <span
                          className="text-xs flex items-center gap-1 shrink-0"
                          style={{ color: "rgba(200,220,235,0.4)" }}
                        >
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                      </div>
                      <h3
                        className="font-bold text-base mb-2 leading-snug"
                        style={{ color: "#e0f7ff" }}
                      >
                        {item.headline}
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "rgba(200,220,235,0.65)" }}
                      >
                        {item.summary}
                      </p>
                      <Button
                        data-ocid="news.secondary_button"
                        size="sm"
                        variant="outline"
                        className="text-xs font-semibold"
                        style={{
                          borderColor: `${neonColor}40`,
                          color: neonColor,
                          background: "transparent",
                        }}
                        onClick={() =>
                          nav.navigate("news-article", {
                            articleId: String(item.id),
                          })
                        }
                      >
                        Read Full Update{" "}
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Regular items */}
          {regularItems.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-6">
                <Newspaper
                  className="w-5 h-5"
                  style={{ color: "rgba(200,220,235,0.5)" }}
                />
                <h2 className="font-bold text-lg" style={{ color: "#e0f7ff" }}>
                  Recent Updates
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularItems.map((item) => {
                  const neonColor = COURSE_NEON[item.course] || "#00ffff";
                  return (
                    <div
                      key={item.id}
                      data-ocid={`news.item.${item.id}`}
                      className="glass-card glow-hover rounded-2xl p-5"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{
                            background: `${neonColor}18`,
                            border: `1px solid ${neonColor}40`,
                            color: neonColor,
                          }}
                        >
                          {item.course}
                        </span>
                        <span
                          className="text-xs flex items-center gap-1"
                          style={{ color: "rgba(200,220,235,0.4)" }}
                        >
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                      </div>
                      <h3
                        className="font-bold text-sm mb-2 leading-snug line-clamp-2"
                        style={{ color: "#e0f7ff" }}
                      >
                        {item.headline}
                      </h3>
                      <p
                        className="text-xs leading-relaxed mb-3 line-clamp-3"
                        style={{ color: "rgba(200,220,235,0.6)" }}
                      >
                        {item.summary}
                      </p>
                      <Button
                        data-ocid="news.secondary_button"
                        size="sm"
                        variant="ghost"
                        className="text-xs font-semibold p-1"
                        style={{ color: "#00ffff" }}
                        onClick={() =>
                          nav.navigate("news-article", {
                            articleId: String(item.id),
                          })
                        }
                      >
                        Read More <ChevronRight className="w-3 h-3 ml-0.5" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div
              data-ocid="news.empty_state"
              className="text-center py-16"
              style={{ color: "rgba(200,220,235,0.5)" }}
            >
              <p className="text-lg font-medium">No news items found</p>
              <p className="text-sm mt-2">Select a different category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
