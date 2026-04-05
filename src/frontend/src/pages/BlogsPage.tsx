import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Calendar, ChevronRight, Search, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import type { AppNav } from "../App";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
}

const ALL_BLOGS: BlogPost[] = [
  // 2026 Blog Posts
  {
    id: 200,
    title: "10 Performance Marketing Strategies That Will Dominate in 2026",
    category: "Performance Marketing",
    date: "Apr 2026",
    excerpt:
      "Performance marketing in 2026 is all about AI-driven automation, cross-channel attribution, and creative testing at scale. Discover the 10 strategies top performance marketers are using to achieve record-breaking ROI in Google Ads, Meta Ads, and programmatic campaigns this year. Master these strategies in our new Performance Marketing course.",
    readTime: "12 min read",
  },
  {
    id: 201,
    title: "Google's 2026 Algorithm Update: What Changed and How to Recover",
    category: "SEO",
    date: "Apr 2026",
    excerpt:
      "Google's March 2026 Helpful Content Update introduced the toughest quality signals yet, targeting AI-spun content, thin pages, and sites with poor E-E-A-T. This complete guide breaks down exactly what changed, which site types were hit hardest, and a proven step-by-step recovery plan to get your rankings back.",
    readTime: "15 min read",
  },
  {
    id: 202,
    title: "How to Use AI to Write 10x Better Ad Copy in 2026",
    category: "AI in Marketing",
    date: "Apr 2026",
    excerpt:
      "AI writing tools have evolved dramatically — in 2026, the marketers winning on Google Ads and Meta Ads are using AI to generate, test, and iterate hundreds of ad variations in hours instead of weeks. Learn the exact workflow, prompts, and tools to produce high-converting ad copy using ChatGPT, Gemini, and Claude.",
    readTime: "10 min read",
  },
  {
    id: 203,
    title: "Meta Advantage+ in 2026: Complete Guide for Indian Advertisers",
    category: "Social Media",
    date: "Apr 2026",
    excerpt:
      "Meta Advantage+ has become the default campaign type for smart Indian advertisers in 2026, with new AI video generation, dynamic product overlays, and automated audience expansion. This complete guide covers every Advantage+ feature, best practices for the Indian market, and how to set up campaigns that scale profitably.",
    readTime: "13 min read",
  },
  {
    id: 204,
    title:
      "Performance Marketing vs Brand Marketing: Which Should You Invest In?",
    category: "Performance Marketing",
    date: "Apr 2026",
    excerpt:
      "The debate between performance marketing and brand marketing has intensified in 2026 as AI blurs the line between short-term ROI and long-term brand equity. This article breaks down the key differences, when to prioritise each approach, and how India's top DTC brands are balancing both to build sustainable growth.",
    readTime: "9 min read",
  },
  {
    id: 205,
    title:
      "Google Ads in 2026: Smart Campaigns vs Manual Bidding — Which Wins?",
    category: "Google Ads",
    date: "Apr 2026",
    excerpt:
      "Google's Smart Campaigns have matured significantly in 2026, with tROAS and tCPA algorithms now outperforming manual bidding in most account types. We ran a 90-day experiment across 12 Indian Google Ads accounts to find out when Smart Bidding wins, when it fails, and the hybrid strategy that gets the best of both worlds.",
    readTime: "11 min read",
  },
  {
    id: 206,
    title: "How to Measure Real ROI from Digital Marketing in 2026",
    category: "Analytics",
    date: "Mar 2026",
    excerpt:
      "Vanity metrics are out — in 2026, the best digital marketers are building full-funnel attribution models that connect every ad rupee to actual revenue. Learn how to set up cross-channel attribution in GA4, use Google's new predictive AI metrics, and report digital marketing ROI in a way that convinces even the most sceptical CFO.",
    readTime: "14 min read",
  },
  {
    id: 207,
    title:
      "WhatsApp Marketing Automation: Step-by-Step Guide for Indian Businesses 2026",
    category: "Social Media",
    date: "Mar 2026",
    excerpt:
      "WhatsApp is India's most powerful marketing channel in 2026, with over 600 million active users and open rates above 90%. This step-by-step guide covers how to set up WhatsApp Business API, build AI-powered chatbot flows, create broadcast campaigns, and automate your entire customer journey from lead to repeat purchase.",
    readTime: "12 min read",
  },
  {
    id: 208,
    title:
      "The Complete Performance Marketing Course Syllabus: What You'll Learn",
    category: "Performance Marketing",
    date: "Mar 2026",
    excerpt:
      "Curious about what India's most comprehensive Performance Marketing course covers? This detailed breakdown of the ₹74,999 course syllabus walks you through every module — from Google Search and Shopping Ads to Meta Advantage+, programmatic buying, attribution, and live campaign management with real budgets.",
    readTime: "8 min read",
  },
  {
    id: 209,
    title: "SEO in the Age of AI: How to Rank in Google SGE 2026",
    category: "SEO",
    date: "Mar 2026",
    excerpt:
      "Google's Search Generative Experience now appears in over 60% of Indian search results, fundamentally changing how websites earn organic traffic. This in-depth guide explains how SGE selects sources, what content formats it favours, and a practical SEO strategy to maximise your visibility in both traditional results and AI-generated answers.",
    readTime: "15 min read",
  },
  {
    id: 210,
    title: "LinkedIn Ads for B2B: The 2026 Playbook for Indian Marketers",
    category: "Google Ads",
    date: "Mar 2026",
    excerpt:
      "LinkedIn has become the most cost-effective B2B lead generation channel for Indian businesses in 2026, with new India-specific targeting options and lower CPLs. This playbook covers LinkedIn's full ad suite — Sponsored Content, Message Ads, Lead Gen Forms — plus the exact campaign structure and creative formats that generate the best B2B results in India.",
    readTime: "13 min read",
  },
  {
    id: 211,
    title: "How to Build a Personal Brand on Instagram in 2026",
    category: "Social Media",
    date: "Mar 2026",
    excerpt:
      "Instagram's algorithm in 2026 heavily rewards original content, consistent niche authority, and Broadcast Channel engagement. This guide walks through the exact strategy to grow from 0 to 50,000 followers, leverage Broadcast Channels for audience monetisation, and use AI tools to produce a month of content in a single day.",
    readTime: "10 min read",
  },
  {
    id: 212,
    title:
      "Email Marketing vs WhatsApp Marketing: Which Converts Better in India?",
    category: "Email Marketing",
    date: "Mar 2026",
    excerpt:
      "Indian consumers respond to email and WhatsApp marketing very differently — and in 2026, the gap has widened. We analysed 50+ campaigns across both channels to compare open rates, click rates, conversion rates, and cost per acquisition. The results will change how you think about your marketing mix.",
    readTime: "9 min read",
  },
  {
    id: 213,
    title:
      "Digital Marketing Career Scope in India 2026: Salaries, Roles & Skills",
    category: "Career",
    date: "Mar 2026",
    excerpt:
      "Digital marketing is one of India's highest-demand career fields in 2026, with entry-level roles starting at ₹4–6 LPA and senior performance marketers commanding ₹18–30 LPA. This comprehensive guide covers the top 12 digital marketing roles, required skills for each, salary benchmarks by city, and the fastest path to landing your first job.",
    readTime: "11 min read",
  },
  {
    id: 214,
    title: "From Beginner to Performance Marketer: A 90-Day Roadmap",
    category: "Performance Marketing",
    date: "Mar 2026",
    excerpt:
      "Performance marketing is the highest-paid digital marketing specialisation in India — but breaking into it can feel overwhelming without a clear roadmap. This practical 90-day plan tells you exactly what to learn, build, and practise each week, from understanding ad auction mechanics in Week 1 to running live ₹50,000 campaigns by Week 12.",
    readTime: "13 min read",
  },
  {
    id: 1,
    title: "10 Proven SEO Strategies to Rank on Google's First Page in 2025",
    category: "SEO",
    date: "Mar 20, 2025",
    excerpt:
      "Discover the most effective SEO techniques that top marketers use to dominate search rankings. From keyword research to technical SEO, this guide covers everything you need.",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "How to Run Facebook Ads That Actually Convert in 2025",
    category: "Social Media",
    date: "Mar 18, 2025",
    excerpt:
      "Facebook Ads remain one of the most powerful tools for businesses in India. Learn how to set up campaigns, write compelling ad copy, and optimize for conversions.",
    readTime: "10 min read",
  },
  {
    id: 3,
    title:
      "The Ultimate Guide to Email Marketing Automation for Indian Businesses",
    category: "Email Marketing",
    date: "Mar 15, 2025",
    excerpt:
      "Email marketing delivers the highest ROI of any digital channel. Learn how to build automated sequences that nurture leads and drive repeat sales without manual effort.",
    readTime: "12 min read",
  },
  {
    id: 4,
    title: "Google Ads vs Facebook Ads: Which is Better for Your Business?",
    category: "Google Ads",
    date: "Mar 12, 2025",
    excerpt:
      "Both platforms offer powerful advertising opportunities, but knowing when to use each can make or break your marketing budget. We break down the pros, cons, and ideal use cases.",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "How AI is Transforming Digital Marketing in India in 2025",
    category: "AI in Marketing",
    date: "Mar 10, 2025",
    excerpt:
      "Artificial intelligence is reshaping every aspect of digital marketing — from content creation to audience targeting. Discover the AI tools every Indian marketer needs to know.",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "WhatsApp Marketing: The Complete Guide for Indian Businesses",
    category: "Social Media",
    date: "Mar 8, 2025",
    excerpt:
      "With over 500 million users in India, WhatsApp is the most powerful marketing channel you might be ignoring. Learn how to use WhatsApp Business API to grow your sales.",
    readTime: "11 min read",
  },
  {
    id: 7,
    title: "Content Marketing Strategy: From Zero to 10K Monthly Visitors",
    category: "Content Marketing",
    date: "Mar 6, 2025",
    excerpt:
      "Building a content machine that drives consistent organic traffic requires the right strategy. This step-by-step guide shows you how to plan, create, and distribute content that ranks.",
    readTime: "14 min read",
  },
  {
    id: 8,
    title: "YouTube SEO: How to Rank Your Videos and Get More Views in 2025",
    category: "SEO",
    date: "Mar 4, 2025",
    excerpt:
      "YouTube is the world's second largest search engine. Discover how to optimize your video titles, descriptions, tags, and thumbnails to dramatically increase your views and subscribers.",
    readTime: "9 min read",
  },
  {
    id: 9,
    title:
      "Influencer Marketing Guide for Brands in India: From Nano to Mega Influencers",
    category: "Social Media",
    date: "Mar 2, 2025",
    excerpt:
      "Influencer marketing in India is booming. Learn how to identify the right influencers for your brand, negotiate rates, and measure ROI from your influencer campaigns.",
    readTime: "10 min read",
  },
  {
    id: 10,
    title: "Local SEO for Small Businesses: Dominate Google Maps in Your City",
    category: "SEO",
    date: "Feb 28, 2025",
    excerpt:
      "Local SEO is the most cost-effective way for small businesses to attract nearby customers. We cover Google Business Profile optimization, local citations, and review management.",
    readTime: "8 min read",
  },
  {
    id: 11,
    title: "Instagram Reels Marketing: How to Go Viral and Build Your Brand",
    category: "Social Media",
    date: "Feb 26, 2025",
    excerpt:
      "Instagram Reels now receives 22% more interaction than regular video posts. Learn the exact content formulas and posting strategies top brands use to grow on Reels.",
    readTime: "7 min read",
  },
  {
    id: 12,
    title: "Performance Marketing: A Beginner's Guide to ROI-Based Advertising",
    category: "Google Ads",
    date: "Feb 24, 2025",
    excerpt:
      "Performance marketing focuses on measurable outcomes — clicks, leads, and sales. This guide explains how to set up performance campaigns on Google, Meta, and affiliate networks.",
    readTime: "11 min read",
  },
  {
    id: 13,
    title: "How to Write SEO-Optimized Blog Posts That Rank and Convert",
    category: "Content Marketing",
    date: "Feb 22, 2025",
    excerpt:
      "Writing for both search engines and human readers is an art. Learn how to structure your blog posts, use keywords naturally, and create content that earns backlinks and drives leads.",
    readTime: "10 min read",
  },
  {
    id: 14,
    title:
      "Digital Marketing Career Guide: Top Jobs, Salaries, and Skills in 2025",
    category: "Career Tips",
    date: "Feb 20, 2025",
    excerpt:
      "The digital marketing industry in India is expected to create 2 million jobs by 2026. Discover the most in-demand roles, average salaries, and skills employers look for.",
    readTime: "12 min read",
  },
  {
    id: 15,
    title:
      "E-Commerce Marketing Strategy: How to Increase Sales on Shopify and Amazon",
    category: "Content Marketing",
    date: "Feb 18, 2025",
    excerpt:
      "Running an online store requires a multi-channel marketing approach. This guide covers product page SEO, Google Shopping ads, email sequences, and social proof strategies.",
    readTime: "13 min read",
  },
  {
    id: 16,
    title: "LinkedIn Marketing for B2B Brands: Generate Quality Leads in 2025",
    category: "Social Media",
    date: "Feb 16, 2025",
    excerpt:
      "LinkedIn is the most powerful B2B marketing platform in the world. Learn how to optimize your company page, create thought leadership content, and run targeted LinkedIn ads.",
    readTime: "9 min read",
  },
  {
    id: 17,
    title:
      "Google Analytics 4 Tutorial: How to Track and Analyze Your Website Traffic",
    category: "AI in Marketing",
    date: "Feb 14, 2025",
    excerpt:
      "GA4 has replaced Universal Analytics and brought a completely new way to measure digital performance. This practical guide walks you through setting up goals, reports, and dashboards.",
    readTime: "11 min read",
  },
  {
    id: 18,
    title: "Affiliate Marketing in India: How to Earn \u20b950,000+ Per Month",
    category: "Content Marketing",
    date: "Feb 12, 2025",
    excerpt:
      "Affiliate marketing is one of the best passive income streams for digital marketers. Discover the top affiliate programs in India, how to create converting content, and scaling strategies.",
    readTime: "10 min read",
  },
  {
    id: 19,
    title: "Video Marketing Strategy: Why Your Brand Needs Video in 2025",
    category: "Content Marketing",
    date: "Feb 10, 2025",
    excerpt:
      "Video content gets 1200% more shares than text and image content combined. Learn how to create a video marketing strategy across YouTube, Instagram, and OTT platforms.",
    readTime: "8 min read",
  },
  {
    id: 20,
    title:
      "ChatGPT for Digital Marketers: 50 Prompts to Supercharge Your Workflow",
    category: "AI in Marketing",
    date: "Feb 8, 2025",
    excerpt:
      "AI tools like ChatGPT can cut your content creation time by 70%. This practical guide includes 50 ready-to-use prompts for writing ad copy, blog posts, emails, and social media content.",
    readTime: "15 min read",
  },
  {
    id: 21,
    title: "Google Search Console: Complete Guide to Improve Your SEO Rankings",
    category: "SEO",
    date: "Feb 6, 2025",
    excerpt:
      "Google Search Console is a free tool that reveals exactly how Google sees your website. Learn how to fix crawl errors, improve click-through rates, and discover keyword opportunities.",
    readTime: "9 min read",
  },
  {
    id: 22,
    title:
      "Social Media Content Calendar: How to Plan 30 Days of Posts in 2 Hours",
    category: "Social Media",
    date: "Feb 4, 2025",
    excerpt:
      "Consistent posting is the key to social media growth, but it doesn't have to be time-consuming. Learn how to batch-create and schedule a month of content using AI tools and templates.",
    readTime: "7 min read",
  },
  {
    id: 23,
    title: "Pay-Per-Click (PPC) Advertising: Avoid These 10 Costly Mistakes",
    category: "Google Ads",
    date: "Feb 2, 2025",
    excerpt:
      "Most businesses waste up to 40% of their Google Ads budget on common mistakes. This guide reveals the top PPC errors and exactly how to fix them to maximize your return on ad spend.",
    readTime: "10 min read",
  },
  {
    id: 24,
    title: "Email List Building: How to Get Your First 10,000 Subscribers",
    category: "Email Marketing",
    date: "Jan 30, 2025",
    excerpt:
      "Your email list is your most valuable digital marketing asset. Discover proven list-building strategies including lead magnets, landing pages, and social media integrations.",
    readTime: "11 min read",
  },
  {
    id: 25,
    title:
      "Brand Building in the Digital Age: How to Stand Out in a Crowded Market",
    category: "Content Marketing",
    date: "Jan 28, 2025",
    excerpt:
      "In a world where attention is scarce, building a memorable brand requires consistency, authenticity, and strategic storytelling. Learn the key elements of digital brand building.",
    readTime: "9 min read",
  },
  {
    id: 26,
    title:
      "Keyword Research Masterclass: Find High-Traffic, Low-Competition Keywords",
    category: "SEO",
    date: "Jan 26, 2025",
    excerpt:
      "Keyword research is the foundation of any successful SEO or PPC campaign. This step-by-step guide covers free and paid tools, competitor analysis, and how to prioritize your target keywords.",
    readTime: "13 min read",
  },
  {
    id: 27,
    title: "How to Build a High-Converting Landing Page in 2025",
    category: "Career Tips",
    date: "Jan 24, 2025",
    excerpt:
      "Your landing page is where conversions happen or fail. Learn the proven elements of high-converting landing pages, including headlines, CTAs, social proof, and A/B testing strategies.",
    readTime: "9 min read",
  },
  {
    id: 28,
    title: "Digital Marketing for Startups: A 90-Day Growth Plan",
    category: "Career Tips",
    date: "Jan 22, 2025",
    excerpt:
      "Startups need quick wins with limited budgets. This 90-day digital marketing plan helps new businesses build brand awareness, generate leads, and acquire their first 1,000 customers.",
    readTime: "14 min read",
  },
  {
    id: 29,
    title:
      "Remarketing Ads: How to Convert Visitors Who Didn't Buy the First Time",
    category: "Google Ads",
    date: "Jan 20, 2025",
    excerpt:
      "95% of website visitors leave without buying. Remarketing lets you re-engage these potential customers with targeted ads. Learn how to set up remarketing campaigns on Google and Meta.",
    readTime: "8 min read",
  },
  {
    id: 30,
    title: "Social Proof Marketing: How Reviews and Testimonials Drive Sales",
    category: "Content Marketing",
    date: "Jan 18, 2025",
    excerpt:
      "92% of consumers read online reviews before making a purchase. Learn how to collect, showcase, and leverage social proof across your website, ads, and social media to boost conversions.",
    readTime: "7 min read",
  },
  {
    id: 31,
    title:
      "Instagram Shopping: How to Set Up and Sell Products Directly on Instagram",
    category: "Social Media",
    date: "Jan 16, 2025",
    excerpt:
      "Instagram Shopping has transformed the platform into a powerful e-commerce channel. This guide walks you through setting up your shop, tagging products, and running shoppable ads.",
    readTime: "9 min read",
  },
  {
    id: 32,
    title: "Technical SEO Checklist: 25 Issues That Are Killing Your Rankings",
    category: "SEO",
    date: "Jan 14, 2025",
    excerpt:
      "Technical SEO issues can prevent your content from ranking even when everything else is perfect. Use this comprehensive checklist to identify and fix site speed, mobile, and crawl issues.",
    readTime: "12 min read",
  },
  {
    id: 33,
    title: "How to Use AI Tools for SEO: Rank Faster with Less Effort",
    category: "AI in Marketing",
    date: "Jan 12, 2025",
    excerpt:
      "AI is revolutionizing SEO workflows. From automated keyword clustering to AI-generated content briefs, discover the best AI SEO tools and how to integrate them into your strategy.",
    readTime: "10 min read",
  },
  {
    id: 34,
    title: "Podcast Marketing: How to Build an Audience and Monetize Your Show",
    category: "Content Marketing",
    date: "Jan 10, 2025",
    excerpt:
      "Podcasting has exploded in India with 57 million monthly listeners. Learn how to launch, grow, and monetize a podcast as part of your digital marketing strategy.",
    readTime: "11 min read",
  },
  {
    id: 35,
    title:
      "CRM for Digital Marketers: How to Use HubSpot and Zoho to Close More Deals",
    category: "Career Tips",
    date: "Jan 8, 2025",
    excerpt:
      "A CRM is essential for managing leads and customer relationships at scale. This guide covers the basics of CRM marketing automation and how to set up lead nurturing workflows.",
    readTime: "10 min read",
  },
  {
    id: 36,
    title:
      "Meta Business Suite: Complete Guide to Managing Your Facebook & Instagram Ads",
    category: "Social Media",
    date: "Jan 6, 2025",
    excerpt:
      "Meta Business Suite centralizes your Facebook and Instagram marketing. Learn how to schedule posts, manage ad campaigns, and analyze performance all in one dashboard.",
    readTime: "8 min read",
  },
  {
    id: 37,
    title:
      "Personal Branding for Digital Marketers: Build Your Online Reputation",
    category: "Career Tips",
    date: "Jan 4, 2025",
    excerpt:
      "In today's job market, your personal brand is as important as your resume. Discover how to build a strong online presence on LinkedIn, Twitter, and your personal blog.",
    readTime: "9 min read",
  },
  {
    id: 38,
    title:
      "Marketing Funnel Strategy: From Awareness to Conversion and Retention",
    category: "Content Marketing",
    date: "Jan 2, 2025",
    excerpt:
      "Understanding the marketing funnel is essential for creating content and campaigns that move prospects toward purchase. Learn how to map content to each funnel stage.",
    readTime: "11 min read",
  },
  {
    id: 39,
    title: "Google My Business: The Complete 2025 Optimization Guide",
    category: "SEO",
    date: "Dec 30, 2024",
    excerpt:
      "Google Business Profile is the most powerful free tool for local businesses. This optimization guide covers photos, posts, reviews, Q&A, and the new AI-powered features.",
    readTime: "9 min read",
  },
  {
    id: 40,
    title:
      "A/B Testing for Digital Marketers: How to Run Experiments That Drive Growth",
    category: "AI in Marketing",
    date: "Dec 28, 2024",
    excerpt:
      "A/B testing removes guesswork from marketing decisions. Learn how to design statistically valid tests for landing pages, email subject lines, ad creatives, and CTAs.",
    readTime: "10 min read",
  },
  {
    id: 41,
    title: "Twitter/X Marketing Strategy for Brands in 2025",
    category: "Social Media",
    date: "Dec 26, 2024",
    excerpt:
      "Twitter/X has evolved significantly with new features and algorithm changes. This updated guide covers organic growth strategies, X Premium, and how to use the platform for brand building.",
    readTime: "7 min read",
  },
  {
    id: 42,
    title: "How to Get a Digital Marketing Job with No Experience in 2025",
    category: "Career Tips",
    date: "Dec 24, 2024",
    excerpt:
      "Breaking into digital marketing doesn't require years of experience — it requires the right skills and portfolio. Learn how to build your skills, create case studies, and land your first job.",
    readTime: "11 min read",
  },
  {
    id: 43,
    title: "Push Notification Marketing: Boost Re-Engagement by 300%",
    category: "Email Marketing",
    date: "Dec 22, 2024",
    excerpt:
      "Push notifications have a 50% higher open rate than email. Learn how to implement web and mobile push notifications, segment your audience, and create campaigns that drive re-engagement.",
    readTime: "8 min read",
  },
  {
    id: 44,
    title:
      "Programmatic Advertising Explained: The Future of Digital Ad Buying",
    category: "Google Ads",
    date: "Dec 20, 2024",
    excerpt:
      "Programmatic advertising now accounts for 85% of all digital ad spend. Understand how real-time bidding, DSPs, SSPs, and DMPs work to automate and optimize your ad buying.",
    readTime: "12 min read",
  },
  {
    id: 45,
    title:
      "Micro-Moment Marketing: How to Reach Customers in Their Moments of Intent",
    category: "Content Marketing",
    date: "Dec 18, 2024",
    excerpt:
      "Google's micro-moments framework identifies the key points in the customer journey where purchase decisions are made. Learn how to create content that captures these high-intent moments.",
    readTime: "8 min read",
  },
  {
    id: 46,
    title: "Backlink Building in 2025: Strategies That Still Work",
    category: "SEO",
    date: "Dec 16, 2024",
    excerpt:
      "Backlinks remain the #1 ranking factor in Google's algorithm. This updated guide covers ethical link-building strategies including guest posting, digital PR, and broken link building.",
    readTime: "11 min read",
  },
  {
    id: 47,
    title:
      "SMS Marketing for Ecommerce: Open Rates, Strategies, and Best Practices",
    category: "Email Marketing",
    date: "Dec 14, 2024",
    excerpt:
      "SMS marketing has a 98% open rate, making it one of the most powerful direct marketing channels. Learn how to build an SMS list, write effective messages, and automate SMS sequences.",
    readTime: "8 min read",
  },
  {
    id: 48,
    title:
      "Pinterest Marketing: How to Drive Traffic and Sales with Visual Content",
    category: "Social Media",
    date: "Dec 12, 2024",
    excerpt:
      "Pinterest drives more referral traffic than Twitter, LinkedIn, and Reddit combined. Learn how to optimize your Pinterest profile, create viral pins, and use Pinterest ads.",
    readTime: "9 min read",
  },
  {
    id: 49,
    title: "Shopify SEO: A Complete Guide to Ranking Your Online Store",
    category: "SEO",
    date: "Dec 10, 2024",
    excerpt:
      "SEO for e-commerce requires a specific approach different from blog SEO. This guide covers product page optimization, category pages, site structure, and technical fixes for Shopify.",
    readTime: "13 min read",
  },
  {
    id: 50,
    title: "Digital Marketing Trends 2025: What Every Marketer Needs to Know",
    category: "AI in Marketing",
    date: "Dec 8, 2024",
    excerpt:
      "From AI-generated content to zero-click searches and social commerce, the digital marketing landscape is changing rapidly. Stay ahead of the curve with this comprehensive 2025 trends report.",
    readTime: "14 min read",
  },
  {
    id: 51,
    title:
      "Conversion Rate Optimization (CRO): 15 Techniques to Double Your Sales",
    category: "Career Tips",
    date: "Dec 6, 2024",
    excerpt:
      "Getting traffic is only half the battle — converting visitors into customers is where the real money is made. Discover 15 proven CRO techniques backed by data and case studies.",
    readTime: "12 min read",
  },
  {
    id: 52,
    title: "Voice Search Optimization: How to Rank for Smart Speaker Queries",
    category: "SEO",
    date: "Dec 4, 2024",
    excerpt:
      "Voice searches now account for 30% of all mobile queries. Learn how to optimize your content for voice search by targeting conversational keywords and featured snippets.",
    readTime: "8 min read",
  },
  {
    id: 53,
    title:
      "TikTok Marketing Strategy: Grow Your Brand on India's Fastest Growing Platform",
    category: "Social Media",
    date: "Dec 2, 2024",
    excerpt:
      "Short-form video is dominating social media, and new platforms are capturing younger audiences. Learn how to create viral short-form content and leverage influencer partnerships.",
    readTime: "9 min read",
  },
  {
    id: 54,
    title:
      "Marketing Analytics Dashboard: How to Measure What Actually Matters",
    category: "AI in Marketing",
    date: "Nov 30, 2024",
    excerpt:
      "Data without context is just noise. Learn how to build a marketing analytics dashboard that tracks the KPIs that actually matter for business growth, and how to present insights to stakeholders.",
    readTime: "10 min read",
  },
  {
    id: 55,
    title: "How to Build a \u20b91 Crore Digital Marketing Agency from Scratch",
    category: "Career Tips",
    date: "Nov 28, 2024",
    excerpt:
      "Building a profitable digital marketing agency requires the right systems, clients, and team. This comprehensive guide shares the exact roadmap used by top agency founders in India.",
    readTime: "16 min read",
  },
];

const CATEGORIES = [
  "All",
  "SEO",
  "Social Media",
  "Content Marketing",
  "Google Ads",
  "Email Marketing",
  "Career Tips",
  "AI in Marketing",
];
const CATEGORY_COLORS: Record<string, string> = {
  SEO: "bg-blue-100 text-blue-700",
  "Social Media": "bg-pink-100 text-pink-700",
  "Content Marketing": "bg-green-100 text-green-700",
  "Google Ads": "bg-yellow-100 text-yellow-700",
  "Email Marketing": "bg-purple-100 text-purple-700",
  "Career Tips": "bg-orange-100 text-orange-700",
  "AI in Marketing": "bg-cyan-100 text-cyan-700",
};

interface BlogsPageProps {
  nav: AppNav;
}

export default function BlogsPage({ nav }: BlogsPageProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    document.title =
      "Digital Marketing Blog | The Digital Marketing Foundation";
    const meta = document.querySelector("meta[name='description']");
    if (meta) {
      meta.setAttribute(
        "content",
        "Explore 55+ expert blog posts on SEO, Social Media Marketing, Google Ads, Email Marketing, Content Marketing, and AI in Digital Marketing. Free resources from India's top digital marketing platform.",
      );
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content =
        "Explore 55+ expert blog posts on SEO, Social Media Marketing, Google Ads, Email Marketing, Content Marketing, and AI in Digital Marketing.";
      document.head.appendChild(newMeta);
    }
  }, []);

  const filtered = ALL_BLOGS.filter((b) => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4">
            Knowledge Hub
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Digital Marketing Blog
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg mb-8">
            Expert insights, proven strategies, and actionable guides to grow
            your skills and career in digital marketing.
          </p>
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(12);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(12);
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600 font-medium">
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}{" "}
                found
              </span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg font-medium">No articles found</p>
              <p className="text-sm mt-2">
                Try a different search term or category
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((blog) => (
                  <Card
                    key={blog.id}
                    className="border border-gray-200 hover:shadow-lg transition-shadow bg-white h-full flex flex-col"
                  >
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[blog.category] || "bg-gray-100 text-gray-700"}`}
                        >
                          {blog.category}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {blog.date}
                        </span>
                      </div>
                      <h2 className="font-bold text-gray-900 text-base mb-3 leading-snug line-clamp-3 flex-shrink-0">
                        {blog.title}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {blog.readTime}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs font-semibold p-1"
                          onClick={() =>
                            nav.navigate("blog-article", {
                              articleId: String(blog.id),
                            })
                          }
                        >
                          Read More <ChevronRight className="w-3 h-3 ml-0.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {visibleCount < filtered.length && (
                <div className="text-center mt-10">
                  <Button
                    size="lg"
                    onClick={() => setVisibleCount((v) => v + 12)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 font-semibold"
                  >
                    Load More Articles
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
