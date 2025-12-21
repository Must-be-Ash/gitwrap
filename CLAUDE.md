# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitWrap is a Next.js 14 application that creates shareable GitHub developer stat cards with an arcade/retro aesthetic. Users authenticate via GitHub OAuth, and the app fetches their contribution data to generate animated visual cards displaying stats like commits, stars, languages, and contribution graphs.

## Common Commands

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Build and Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture

### Directory Structure

- `app/` - Next.js 14 App Router pages and API routes
  - `app/page.tsx` - Landing page with GitHub OAuth login button
  - `app/dashboard/page.tsx` - Main dashboard showing user stats
  - `app/api/auth/callback/route.ts` - OAuth callback handler, exchanges code for token
  - `app/api/user/route.ts` - Fetches and returns GitHub user stats
- `components/` - React components
  - Main visualization components: `DevStats.tsx`, `ShareableCard.tsx`, `RevealCard.tsx`, `MobileStats.tsx`
  - Animated components: `TextPathDraw.tsx`, `GitHubPathDraw.tsx`, `ContributionGraph.tsx`
  - Interactive components: `ShareButton.tsx`, `SaveButton.tsx`
- `lib/` - Core business logic
  - `lib/auth.ts` - GitHub OAuth URL generation
  - `lib/github.ts` - GitHub API integration (REST + GraphQL)
  - `lib/types.ts` - TypeScript type definitions
  - `lib/utils.ts` - Utility functions
- `hooks/` - React hooks (e.g., `use-toast.ts`)
- `types/` - Type declarations for third-party libraries

### Key Technologies

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations (`tailwindcss-animate`)
- **Animations**: Framer Motion for page transitions and card animations
- **UI Components**: Radix UI primitives (toast notifications)
- **Rendering**: html-to-image for card export
- **SVG Morphing**: Flubber for icon animations

### Authentication Flow

1. User clicks login button on landing page (`app/page.tsx`)
2. `lib/auth.ts` generates GitHub OAuth URL with required scopes (`read:user repo read:org`)
3. GitHub redirects to `/api/auth/callback` with authorization code
4. Callback route exchanges code for access token via GitHub API
5. Access token stored in HTTP-only secure cookie (`github_token`)
6. Dashboard fetches user data from `/api/user` route, which reads token from cookies

### GitHub Data Fetching

**Primary Module**: `lib/github.ts`

The `fetchGitHubStats` function orchestrates all data fetching:

1. **REST API calls** for basic user info, repositories, languages
2. **GraphQL API calls** for contribution calendar and commit counts (requires token)
3. Calculates derived metrics:
   - `power_level` - Weighted score based on commits (60%), stars (25%), forks (15%), and language diversity
   - `achievements` - Most active day, longest streak, top repository
   - `contributions` - Last year of daily contribution counts

**Important**: The GraphQL queries require authentication and fetch data from 2025-01-01 to present.

### Component Architecture

**Desktop View** (`DevStats.tsx`):
- Two-card scroll-based reveal using Framer Motion
- `ShareableCard` fades out as user scrolls
- `RevealCard` fades in with 3D flip animation
- Scroll progress tracked with `useScroll` and `useTransform`

**Mobile View** (`MobileStats.tsx`):
- Single-page layout with swipeable card carousel
- Simplified navigation for smaller screens

**Card Rendering**:
- Both visible cards and hidden off-screen cards for export/sharing
- Hidden cards positioned at `-top-[9999px]` to enable html-to-image capture

### Environment Variables

Required environment variables (create `.env.local`):

```
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_oauth_app_client_id
GITHUB_CLIENT_ID=your_github_oauth_app_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_app_client_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Production uses `https://www.gitwrap.dev` as base URL.

## Code Patterns

### API Routes
- Use `NextResponse` for responses
- Read cookies with `cookies()` from `next/headers`
- Handle errors gracefully with appropriate status codes
- Include detailed console logging for debugging OAuth and API issues

### Client Components
- All components using hooks or browser APIs must have `'use client'` directive
- Animation components use Framer Motion's `motion` components
- Refs used for card capture with `html-to-image`

### Type Safety
- TypeScript strict mode enabled
- All GitHub API responses typed with interfaces
- Path alias `@/*` maps to project root

### Styling Conventions
- Tailwind utility classes for all styling
- Dark theme with green accent colors (arcade aesthetic)
- Responsive design with `md:` breakpoint for desktop/mobile split
- Custom animations defined in `tailwind.config.ts`

## Important Implementation Details

### OAuth Callback
The callback route must match exactly between:
- GitHub OAuth app settings
- `lib/auth.ts` redirect_uri generation
- Environment variable base URL

### Cookie Security
Cookies use:
- `httpOnly: true` - Prevents JavaScript access
- `secure: true` - HTTPS only
- `sameSite: 'lax'` - CSRF protection
- `maxAge: 60 * 60 * 24` - 24-hour expiration

### GitHub API Rate Limits
- Authenticated requests: 5,000/hour
- Unauthenticated: 60/hour
- App always uses token for higher limits and access to private data

### Contribution Data
- GraphQL query fetches full contribution calendar for current year
- Contribution counts include commits, PRs, issues, reviews, and restricted contributions
- Streak calculation iterates through all contribution days sequentially
