# Digital Marketing Foundation

## Current State
Fresh project, no existing files.

## Requested Changes (Diff)

### Add
- Full course platform with level-based packages: Beginner (Rs. 4,999), Intermediate (Rs. 12,999), Advanced (Rs. 24,999)
- Stripe payment gateway for course purchases
- Student dashboard with a looping video background behind the main content area
- Payment-gated video tutorials organized by course modules
- Post-video quizzes
- Weekly assignments with gift card reward tracking
- Course completion certificates
- Admin panel: manage courses, videos, quizzes, assignments, view enrollments
- Role-based access: admin vs student

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Select components: authorization, stripe, blob-storage
2. Generate Motoko backend with: user roles, course catalog, enrollment (post-payment), video progress tracking, quiz submission, assignment submission, certificate issuance, admin CRUD
3. Frontend:
   - Landing page with course packages and pricing
   - Stripe checkout flow for course purchase
   - Student dashboard: looping ambient video background, enrolled courses, progress
   - Video player page with post-video quiz
   - Assignments page
   - Certificate page
   - Admin panel: seed data, manage content, view enrollments
