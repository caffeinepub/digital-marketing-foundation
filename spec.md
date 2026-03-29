# Digital Marketing Foundation

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Public landing page showcasing course packages (Rs. 4,999 / Rs. 9,999 / Rs. 24,999 tiers)
- Stripe payment integration for course enrollment
- Student dashboard with course journey tracker (progress per module)
- Payment-gated video tutorial player (blob-storage hosted videos)
- Post-video quiz system (multiple choice, must pass to unlock next video)
- Weekly assignments with submission upload and gift card reward tracking
- Course completion certificate generation (frontend PDF/canvas)
- Admin CMS panel (role-based) to manage courses, modules, videos, quizzes, and assignments
- Role-based access control (student vs admin)

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Backend: Course catalog, enrollment records, quiz attempts, assignment submissions, certificate issuance, admin CRUD for content
2. Authorization component for student/admin roles
3. Blob-storage for video content and assignment uploads
4. Stripe for payment processing at enrollment
5. Frontend: Landing page, course cards, checkout flow, student dashboard, video player with quiz gates, assignment submission, certificate view, admin CMS
