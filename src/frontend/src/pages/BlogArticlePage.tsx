import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, ChevronRight, Clock, User } from "lucide-react";
import { motion } from "motion/react";
import type { AppNav } from "../App";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  author: string;
}

const ALL_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "10 Proven SEO Strategies to Rank on Google's First Page in 2025",
    category: "SEO",
    date: "Mar 20, 2025",
    excerpt:
      "Discover the most effective SEO techniques that top marketers use to dominate search rankings.",
    readTime: "8 min read",
    author: "Priya Sharma",
  },
  {
    id: 2,
    title: "How to Run Facebook Ads That Actually Convert in 2025",
    category: "Social Media",
    date: "Mar 18, 2025",
    excerpt:
      "Facebook Ads remain one of the most powerful tools for businesses in India.",
    readTime: "10 min read",
    author: "Rahul Verma",
  },
  {
    id: 3,
    title:
      "The Ultimate Guide to Email Marketing Automation for Indian Businesses",
    category: "Email Marketing",
    date: "Mar 15, 2025",
    excerpt: "Email marketing delivers the highest ROI of any digital channel.",
    readTime: "12 min read",
    author: "Anjali Singh",
  },
  {
    id: 4,
    title: "Google Ads vs Facebook Ads: Which is Better for Your Business?",
    category: "Google Ads",
    date: "Mar 12, 2025",
    excerpt: "Both platforms offer powerful advertising opportunities.",
    readTime: "7 min read",
    author: "Karan Mehta",
  },
  {
    id: 5,
    title: "How AI is Transforming Digital Marketing in India in 2025",
    category: "AI in Marketing",
    date: "Mar 10, 2025",
    excerpt:
      "Artificial intelligence is reshaping every aspect of digital marketing.",
    readTime: "9 min read",
    author: "Deepika Nair",
  },
  {
    id: 6,
    title: "WhatsApp Marketing: The Complete Guide for Indian Businesses",
    category: "Social Media",
    date: "Mar 8, 2025",
    excerpt:
      "With over 500 million users in India, WhatsApp is the most powerful marketing channel.",
    readTime: "11 min read",
    author: "Arjun Patel",
  },
  {
    id: 7,
    title: "Content Marketing Strategy: From Zero to 10K Monthly Visitors",
    category: "Content Marketing",
    date: "Mar 6, 2025",
    excerpt:
      "Building a content machine that drives consistent organic traffic.",
    readTime: "14 min read",
    author: "Sneha Gupta",
  },
  {
    id: 8,
    title: "YouTube SEO: How to Rank Your Videos and Get More Views in 2025",
    category: "SEO",
    date: "Mar 4, 2025",
    excerpt: "YouTube is the world's second largest search engine.",
    readTime: "9 min read",
    author: "Vikram Rao",
  },
  {
    id: 9,
    title: "Influencer Marketing Guide for Brands in India",
    category: "Social Media",
    date: "Mar 2, 2025",
    excerpt: "Influencer marketing in India is booming.",
    readTime: "10 min read",
    author: "Pooja Iyer",
  },
  {
    id: 10,
    title: "Local SEO for Small Businesses: Dominate Google Maps in Your City",
    category: "SEO",
    date: "Feb 28, 2025",
    excerpt:
      "Local SEO is the most cost-effective way for small businesses to attract nearby customers.",
    readTime: "8 min read",
    author: "Aditya Kumar",
  },
  {
    id: 11,
    title: "Instagram Reels Marketing: How to Go Viral and Build Your Brand",
    category: "Social Media",
    date: "Feb 26, 2025",
    excerpt:
      "Instagram Reels now receives 22% more interaction than regular video posts.",
    readTime: "7 min read",
    author: "Riya Desai",
  },
  {
    id: 12,
    title:
      "Digital Marketing Salary Guide India 2025: What You Can Really Earn",
    category: "Career",
    date: "Feb 24, 2025",
    excerpt:
      "Digital marketing salaries in India have grown 35% in the last two years.",
    readTime: "6 min read",
    author: "Suresh Babu",
  },
  {
    id: 13,
    title: "Google Analytics 4 Complete Setup Guide for 2025",
    category: "Analytics",
    date: "Feb 22, 2025",
    excerpt: "GA4 is now mandatory for all websites.",
    readTime: "11 min read",
    author: "Meera Krishnan",
  },
  {
    id: 14,
    title:
      "Sales Funnel Mastery: How to Convert Strangers into Loyal Customers",
    category: "Sales",
    date: "Feb 20, 2025",
    excerpt:
      "A well-designed sales funnel is the backbone of any successful online business.",
    readTime: "13 min read",
    author: "Rohit Joshi",
  },
  {
    id: 15,
    title: "Graphic Design for Marketers: Canva Pro Tips That Save Hours",
    category: "Design",
    date: "Feb 18, 2025",
    excerpt:
      "You don't need to be a professional designer to create stunning marketing visuals.",
    readTime: "8 min read",
    author: "Ananya Bose",
  },
];

interface ArticleContent {
  intro: string;
  sections: { heading: string; content: string; bullets?: string[] }[];
  conclusion: string;
  tips?: string[];
}

const ARTICLE_CONTENT: Record<number, ArticleContent> = {
  1: {
    intro:
      "In 2025, ranking on Google's first page is more competitive than ever — but it's absolutely achievable with the right strategy. This comprehensive guide covers the 10 most effective SEO techniques used by India's top digital marketers.",
    sections: [
      {
        heading: "1. Master Long-Tail Keyword Research",
        content:
          "Long-tail keywords (3+ words) account for 70% of all search queries. Tools like Ahrefs, SEMrush, and Google Keyword Planner help you find keywords with high intent and lower competition. For Indian businesses, include vernacular and Hinglish keywords.",
        bullets: [
          "Use Google's 'People Also Ask' for question-based keywords",
          "Target keywords with 100-1000 monthly searches for faster wins",
          "Analyse competitor keyword gaps using Ahrefs Site Explorer",
        ],
      },
      {
        heading: "2. Perfect Your On-Page SEO",
        content:
          "On-page SEO signals remain among Google's top ranking factors. Every page needs an optimised title tag, meta description, H1, and proper internal linking structure.",
        bullets: [
          "Include your primary keyword in the first 100 words",
          "Keep title tags under 60 characters",
          "Write meta descriptions of 150-160 characters with a clear CTA",
        ],
      },
      {
        heading: "3. Core Web Vitals & Technical SEO",
        content:
          "Google's Core Web Vitals (LCP, FID, CLS) are now confirmed ranking factors. A slow website doesn't just hurt rankings — it loses conversions. Use Google PageSpeed Insights to diagnose and fix performance issues.",
        bullets: [
          "Aim for LCP under 2.5 seconds",
          "Use lazy loading for images",
          "Enable browser caching and use a CDN",
        ],
      },
      {
        heading: "4. Build High-Quality Backlinks",
        content:
          "Backlinks from authoritative websites remain one of the strongest ranking signals. Focus on quality over quantity — one link from an industry-relevant DA60+ site is worth more than 100 low-quality links.",
        bullets: [
          "Guest post on industry blogs and news sites",
          "Create linkable assets: original research, infographics, tools",
          "Use HARO (Help A Reporter Out) for journalist backlink opportunities",
        ],
      },
      {
        heading: "5. Optimise for Featured Snippets",
        content:
          "Featured snippets appear in Position 0 — above all organic results. To win them, structure your content to directly answer common questions using concise 40-60 word paragraphs or numbered lists.",
      },
      {
        heading: "6. E-E-A-T: Experience, Expertise, Authoritativeness, Trust",
        content:
          "Google's quality rater guidelines emphasise E-E-A-T heavily for YMYL (Your Money Your Life) topics. Build author profiles, cite sources, and demonstrate real-world expertise in every article you publish.",
      },
      {
        heading: "7. Local SEO for Indian Businesses",
        content:
          "For businesses targeting Indian cities, local SEO can drive massive foot traffic and leads. Optimise your Google Business Profile completely and build local citations on Indian directories like Justdial and Sulekha.",
        bullets: [
          "Complete every field in Google Business Profile",
          "Collect and respond to reviews consistently",
          "Add local business schema markup to your website",
        ],
      },
    ],
    conclusion:
      "SEO success in 2025 requires a consistent, multi-faceted approach. Focus on creating genuinely helpful content, building technical excellence, and earning quality backlinks. The businesses that commit to SEO for 12+ months consistently outrank competitors who treat it as a one-time project.",
    tips: [
      "Post at least 2 new SEO-optimised articles per week",
      "Update old content every 6 months with fresh data",
      "Use Google Search Console weekly to track ranking changes",
    ],
  },
  2: {
    intro:
      "Facebook and Instagram ads, powered by Meta's AI targeting, remain the most powerful performance marketing channel for Indian businesses in 2025. With the right campaign structure, you can reach exactly the right customers at the lowest cost.",
    sections: [
      {
        heading: "Setting Up Your Meta Ad Account for Success",
        content:
          "Before running a single rupee in ads, ensure your Meta Pixel is correctly installed on your website. The Pixel tracks conversions and feeds data to Meta's AI to find more customers like your best buyers.",
        bullets: [
          "Install Meta Pixel via Tag Manager for easy management",
          "Set up standard events: Purchase, Lead, ViewContent, AddToCart",
          "Use Conversions API for server-side tracking accuracy",
        ],
      },
      {
        heading: "Choosing the Right Campaign Objective",
        content:
          "Meta's campaign objectives range from Awareness to Sales. Always start with a conversion objective (Leads or Sales) when you want measurable results. Awareness and Reach campaigns are only suitable for brand building.",
      },
      {
        heading: "Mastering Audience Targeting",
        content:
          "Meta's audience targeting is its superpower. Use Custom Audiences (website visitors, customer lists) and Lookalike Audiences (people similar to your buyers) for the highest ROI.",
        bullets: [
          "Create a Lookalike Audience from your top 5% of customers",
          "Layer interests with demographic targeting for warm audiences",
          "Use Advantage+ Audience for AI-automated targeting in 2025",
        ],
      },
      {
        heading: "Ad Formats That Convert in India",
        content:
          "Video ads (especially 6-15 second hooks) consistently outperform static images in India. Carousel ads work well for e-commerce. For lead generation, use Meta's native Lead Ads to capture details without leaving Facebook.",
      },
      {
        heading: "A/B Testing and Budget Optimisation",
        content:
          "Never run one ad creative. Always test 3-5 variations simultaneously. Use Campaign Budget Optimisation (CBO) to let Meta's algorithm allocate budget to the best-performing ad sets automatically.",
        bullets: [
          "Test one variable at a time (headline, image, audience)",
          "Wait for 50+ conversions before judging an ad's performance",
          "Scale winning ad sets by increasing budget no more than 20% per day",
        ],
      },
    ],
    conclusion:
      "Successful Facebook advertising in 2025 is about combining strategic audience targeting with compelling creative and rigorous testing. Start with a ₹500-1000 daily budget, test aggressively, and scale what works. The key metric to watch is Cost Per Acquisition (CPA), not just Cost Per Click.",
    tips: [
      "Refresh ad creatives every 2-3 weeks to avoid ad fatigue",
      "Run retargeting campaigns for website visitors who didn't convert",
      "Use Facebook's free Ad Library to spy on competitor ads",
    ],
  },
  5: {
    intro:
      "Artificial intelligence is no longer a futuristic concept for digital marketers — it's the present reality reshaping campaigns, content, and customer experiences across every channel. For Indian marketers and businesses, understanding and leveraging AI is now a competitive necessity.",
    sections: [
      {
        heading: "AI-Powered Content Creation",
        content:
          "Tools like ChatGPT, Claude, and Gemini have fundamentally changed content creation. Marketers can now produce first drafts, generate hundreds of ad variations, and personalise email sequences at scale. The key is using AI as a co-creator, not a replacement for human strategy.",
        bullets: [
          "Use ChatGPT for blog outlines, ad copy variations, and email sequences",
          "Midjourney and DALL-E for custom marketing images",
          "Canva's AI tools for automated design resizing and background removal",
        ],
      },
      {
        heading: "AI in Social Media Marketing",
        content:
          "Meta's Advantage+ and Google's Performance Max campaigns use AI to automatically find the best audience, creative combinations, and bidding strategies. These AI-driven campaign types are delivering 20-30% better results than manually managed campaigns in 2025.",
      },
      {
        heading: "Predictive Analytics and Customer Intelligence",
        content:
          "AI-powered analytics platforms can now predict which customers are likely to churn, which leads are most likely to convert, and what products each customer will buy next. For Indian e-commerce businesses, this enables hyper-personalised marketing at scale.",
        bullets: [
          "Use AI segmentation to identify high-value customer segments",
          "Implement predictive lead scoring to prioritise sales follow-ups",
          "Deploy recommendation engines to increase average order value",
        ],
      },
      {
        heading: "AI Chatbots for Customer Service",
        content:
          "AI chatbots on WhatsApp, Instagram, and websites are handling 60-70% of customer queries automatically for leading Indian brands. Modern AI chatbots understand context, handle complex questions, and escalate to humans when needed.",
      },
      {
        heading: "AI SEO Tools Revolutionising Rankings",
        content:
          "Tools like Surfer SEO, Clearscope, and Frase use AI to analyse top-ranking content and tell you exactly what topics, keywords, and content length will rank. AI is also being used for automated internal linking and content gap identification.",
        bullets: [
          "Use AI writing assistants trained on SEO best practices",
          "Leverage AI for automated schema markup generation",
          "Deploy AI tools for competitive content gap analysis",
        ],
      },
      {
        heading: "Staying Ahead of AI-Driven Competition",
        content:
          "As AI levels the playing field for content creation, differentiation will come from original research, genuine expert perspectives, and unique data. Indian marketers who combine AI efficiency with authentic local insights will have the strongest competitive advantage.",
      },
    ],
    conclusion:
      "AI is not replacing digital marketers — it's amplifying their capabilities. The marketers who master AI tools in 2025 will produce 10x more content, run smarter campaigns, and deliver more personalised experiences. Start with one AI tool, master it completely, then expand your toolkit.",
    tips: [
      "Dedicate 30 minutes daily to experimenting with AI tools",
      "Follow AI marketing newsletters to stay updated on new capabilities",
      "Always add human review and brand voice to AI-generated content",
    ],
  },
};

function generateGenericContent(blog: BlogPost): ArticleContent {
  return {
    intro: `${blog.excerpt} This comprehensive guide will walk you through everything you need to know to succeed with ${blog.category.toLowerCase()} in the Indian market in 2025.`,
    sections: [
      {
        heading: "Why This Matters for Indian Businesses",
        content: `The Indian digital landscape is evolving faster than ever. With over 800 million internet users and a rapidly growing middle class, ${blog.category} has become one of the most powerful tools for business growth. Companies that master these strategies are seeing 3-5x more leads and 40% lower customer acquisition costs.`,
        bullets: [
          "India has the world's fastest-growing digital advertising market",
          "Mobile-first users demand instant, personalised experiences",
          "Regional language content is driving the next wave of digital growth",
        ],
      },
      {
        heading: "Getting Started: The Foundation",
        content: `Before diving into advanced tactics, it's critical to have the right foundation in place. This means understanding your target audience, setting clear KPIs, and having the analytics infrastructure to measure your results accurately.`,
        bullets: [
          "Define your ideal customer profile with demographic and psychographic data",
          "Set up Google Analytics 4 and Meta Pixel for complete tracking",
          "Establish baseline metrics: current traffic, leads, and conversion rates",
        ],
      },
      {
        heading: "Core Strategy and Implementation",
        content: `The most successful ${blog.category} campaigns in India combine global best practices with local market insights. Understanding regional nuances, language preferences, and cultural moments gives Indian marketers a significant home-field advantage.`,
      },
      {
        heading: "Advanced Tactics for Maximum ROI",
        content:
          "Once the basics are in place, these advanced strategies can multiply your results. Indian brands that implement these tactics typically see a 2-4x improvement in campaign performance within 90 days.",
        bullets: [
          "Use data segmentation to personalise at scale",
          "Implement automation to reduce manual work and improve consistency",
          "A/B test continuously — small improvements compound over time",
        ],
      },
      {
        heading: "Measuring Success and Scaling",
        content: `The key to long-term success is relentless measurement and optimisation. Track your key metrics weekly, identify what's working, and double down on your winning strategies while eliminating what isn't delivering results.`,
      },
    ],
    conclusion: `Mastering ${blog.category} requires consistent effort, data-driven decision-making, and a willingness to adapt as platforms evolve. The businesses that commit to continuous learning and implementation will build sustainable competitive advantages that are very difficult to replicate. Start with one strategy from this guide, execute it perfectly, then add the next layer.`,
    tips: [
      `Dedicate at least 5 hours per week to ${blog.category} strategy and execution`,
      "Join industry communities to stay updated on the latest changes and best practices",
      "Invest in professional training — the ROI on education is the highest in digital marketing",
    ],
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  SEO: "bg-blue-100 text-blue-700",
  "Social Media": "bg-pink-100 text-pink-700",
  "Email Marketing": "bg-yellow-100 text-yellow-700",
  "Google Ads": "bg-red-100 text-red-700",
  "AI in Marketing": "bg-purple-100 text-purple-700",
  "Content Marketing": "bg-primary/10 text-primary",
  Analytics: "bg-indigo-100 text-indigo-700",
  Sales: "bg-orange-100 text-orange-700",
  Design: "bg-primary/10 text-primary",
  Career: "bg-emerald-100 text-emerald-700",
};

interface Props {
  nav: AppNav;
  articleId: string;
}

export default function BlogArticlePage({ nav, articleId }: Props) {
  const id = Number.parseInt(articleId) || 1;
  const blog = ALL_BLOGS.find((b) => b.id === id) || ALL_BLOGS[0];
  const content = ARTICLE_CONTENT[blog.id] || generateGenericContent(blog);
  const related = ALL_BLOGS.filter(
    (b) =>
      b.id !== blog.id &&
      (b.category === blog.category || Math.abs(b.id - blog.id) < 4),
  ).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: "oklch(5% 0.01 250)" }}>
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            type="button"
            data-ocid="blog.link"
            onClick={() => nav.navigate("blogs")}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </button>
          <Badge
            className={`mb-4 text-xs font-semibold px-3 py-1 ${CATEGORY_COLORS[blog.category] || "bg-muted text-muted-foreground"}`}
          >
            {blog.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {blog.readTime}
            </span>
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
          <div className="lg:col-span-3 prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-8 font-medium border-l-4 border-blue-500 pl-5 bg-blue-50 py-3 pr-3 rounded-r-lg">
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
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {content.tips && content.tips.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-8">
                <h3 className="font-bold text-amber-800 mb-3 text-base">
                  Pro Tips
                </h3>
                <ul className="space-y-2">
                  {content.tips.map((tip, i) => (
                    <li
                      key={tip}
                      className="text-amber-900 text-sm flex items-start gap-2"
                    >
                      <span className="text-amber-600 font-bold flex-shrink-0">
                        {i + 1}.
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 p-5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-2">Conclusion</h3>
              <p className="text-gray-700 leading-relaxed">
                {content.conclusion}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white text-center">
              <h3 className="text-xl font-bold mb-2">
                Ready to Master {blog.category}?
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Join thousands of students learning digital marketing at The
                Digital Marketing Foundation
              </p>
              <Button
                data-ocid="blog.primary_button"
                onClick={() => nav.navigate("landing")}
                className="btn-gold font-semibold px-6"
              >
                Explore Our Courses
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">
                Related Articles
              </h3>
              <div className="space-y-3">
                {related.map((r) => (
                  <Card
                    key={r.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() =>
                      nav.navigate("blog-article", { articleId: String(r.id) })
                    }
                  >
                    <CardContent className="p-3">
                      <Badge
                        className={`text-xs mb-2 ${CATEGORY_COLORS[r.category] || ""}`}
                      >
                        {r.category}
                      </Badge>
                      <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-3">
                        {r.title}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-blue-600 text-xs font-medium">
                        Read article <ChevronRight className="w-3 h-3" />
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
