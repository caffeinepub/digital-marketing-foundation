# Digital Marketing Foundation - Complete Website

## Current State
The platform is a full-stack digital marketing learning site built on ICP with:
- Motoko backend with: courses, modules, videos, quiz, enrollments, assignments, certificates, Razorpay payment settings, authorization/blob-storage
- React frontend with pages: LandingPage, StudentDashboard, AdminPanel, CourseDetailPage, VideoPlayerPage, BlogsPage, NewsPage, BlogArticlePage, NewsArticlePage, PaymentSuccess, PaymentFailure
- WhatsApp+YouTube green/red color scheme in index.css
- Pricing shows Professional (Rs.24,999) and Advanced (Rs.34,999) only — Performance Marketing (Rs.74,999) MISSING from pricing/landing page
- No WhatsApp AI chatbot component (floating widget + homepage section)
- No email/Gmail login with OTP flow
- No LinkedIn certificate sharing (unique certificate URLs, "Add to LinkedIn" button)
- Admin panel has NO Users tab and NO AI Tools tab
- Student Dashboard has NO AI Hub section
- No CertificatePage with shareable URL (/certificate/:id)
- Blog and News articles exist but some 2026 content needs full article text
- SEO meta tags exist but can be improved
- Right-click protection present in Header
- Performance Marketing backend variant exists as #performance in backend but frontend doesn't handle it

## Requested Changes (Diff)

### Add
- **Performance Marketing tier** (Rs.74,999) to LandingPage pricing section and STATIC_COURSES
- **WhatsApp AI Advisor chatbot**: floating widget (bottom-right, every page) + homepage full section. WhatsApp-style green UI, ChatGPT-powered (OpenAI API), guided flow (skill level → goal → interests → course recommendation with enroll links), then free-form chat
- **Email/Gmail login with OTP** alongside Internet Identity in Header and wherever login is shown. Sign-up form collects: name, age, contact number, email. Simulated OTP (6-digit code shown on screen). Store user profiles in localStorage.
- **CertificatePage** at route `/certificate/:id` — professional A4-style certificate, LinkedIn share button pre-filling all credential fields, print button, copy URL button
- **LinkedIn "Add to LinkedIn" button** on certificate cards in StudentDashboard linking to `/certificate/:id`
- **AI Hub section** in StudentDashboard — ChatGPT-powered free-form chat for students
- **AI Tools tab** in AdminPanel — content generator, quiz generator, marketing copy generator using OpenAI API
- **Users tab** in AdminPanel — shows list of email-registered users (name, age, contact number, email, registered date)
- **App.tsx route** for certificate page (`/certificate/:id`)
- Full article content for 2026 blog posts and news articles

### Modify
- LandingPage: Add Performance Marketing pricing card (Rs.74,999), add Performance Marketing to STATIC_COURSES and featured courses, add WhatsApp AI Advisor homepage section, improve hero section animations
- StudentDashboard: Add LinkedIn share button to certificate cards, link to /certificate/:id
- AdminPanel: Add Users tab and AI Tools tab to tabs list
- Header: Add email login option alongside Internet Identity
- App.tsx: Add certificate route, WhatsApp floating widget rendered at app level, email user context
- index.css: Ensure right-click protection is active
- Backend Motoko: Add `#performance` to CourseTier, add email user registration storage, add getUsersByEmail admin query

### Remove
- Nothing to remove

## Implementation Plan
1. Update backend main.mo: add `#performance` CourseTier variant, add EmailUser type with name/age/contact/email/registeredAt, add registerEmailUser, getMyEmailProfile, adminGetAllEmailUsers functions. Update seedSampleData to include Performance Marketing course.
2. Update backend.d.ts to reflect new types and functions
3. Generate images: performance marketing course thumbnail, hero banner, WhatsApp chatbot illustration
4. Build frontend:
   a. Add CertificatePage.tsx (shareable certificate with LinkedIn/print/copy)
   b. Update LandingPage.tsx: Performance Marketing pricing card + course + WhatsApp AI Advisor chatbot section
   c. Update StudentDashboard.tsx: LinkedIn share + AI Hub
   d. Update AdminPanel.tsx: AI Tools tab + Users tab
   e. Update Header.tsx: Add email login option, OTP flow dialog
   f. Update App.tsx: Add certificate route, global WhatsApp floating widget
   g. Create WhatsAppChatbot.tsx component (floating + embedded modes)
   h. Create EmailLoginDialog.tsx component
5. Validate and deploy
