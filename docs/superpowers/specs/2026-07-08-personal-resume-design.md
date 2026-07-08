# Personal Resume - Design Spec

## Overview

A personal resume web application built with Vue 3, supporting desktop and mobile responsive layouts through tab-based navigation.

## Tech Stack

| Category       | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | Vue 3 + Composition API (`<script setup>`)          |
| Build Tool     | Vite                                                |
| Language       | TypeScript                                          |
| Routing        | Vue Router (tab switching via routes)               |
| UI Library     | Element Plus                                        |
| CSS Framework  | Tailwind CSS                                        |
| Data Source    | `src/data/resume.json`                              |
| Deployment     | GitHub Pages                                        |

## Page Layout

```
┌──────────────────────────────────┐
│         AppHeader (top nav)      │
│  [About] [Experience] [Education]│
│  [Skills] [Projects]             │
├──────────────────────────────────┤
│                                  │
│        Current Tab Content       │
│                                  │
├──────────────────────────────────┤
│         AppFooter                │
└──────────────────────────────────┘
```

- **Desktop**: Fixed top navigation bar with tab switching
- **Mobile**: Bottom navigation or hamburger menu (collapsible)

## Directory Structure

```
src/
├── assets/              # Static resources (avatar, project screenshots)
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue      # Top navigation bar
│   │   ├── AppFooter.vue      # Footer
│   │   └── MobileNav.vue      # Mobile navigation
│   └── sections/
│       ├── AboutMe.vue        # Basic info + self-intro
│       ├── Experience.vue     # Work experience (timeline)
│       ├── Education.vue      # Education background
│       ├── Skills.vue         # Skill tags
│       └── Projects.vue       # Project portfolio cards
├── data/
│   └── resume.json            # Resume data
├── types/
│   └── resume.ts              # TypeScript type definitions
├── router/
│   └── index.ts
├── views/
│   └── HomeView.vue           # Main page with tab switching
├── App.vue
└── main.ts
```

## Section Designs

### About Me
- Avatar image, name, contact info (email, phone, GitHub, LinkedIn)
- Personal summary paragraph

### Work Experience
- Element Plus Timeline component
- Each entry: company, role, date range, description list
- Current/latest company entry is highlighted: different background, a "当前在职" badge, and pushed to the top of the list if data includes `current: true` flag

### Education
- Simple list with school, major, degree, date range

### Skills
- Tags grouped by category (languages, frameworks, tools)
- Element Plus Tag component styled with Tailwind

### Projects
- Card grid layout
- Each card: project screenshot, name, tech stack tags, description, external links

## Data Model (`resume.json`)

```json
{
  "basics": {
    "name": "",
    "avatar": "",
    "title": "",
    "email": "",
    "phone": "",
    "github": "",
    "linkedin": "",
    "summary": ""
  },
  "experience": [
    {
      "company": "",
      "role": "",
      "startDate": "",
      "endDate": "",
      "current": false,
      "description": []
    }
  ],
  "education": [
    {
      "school": "",
      "major": "",
      "degree": "",
      "startDate": "",
      "endDate": ""
    }
  ],
  "skills": [
    {
      "category": "",
      "items": [""]
    }
  ],
  "projects": [
    {
      "name": "",
      "image": "",
      "description": "",
      "techStack": [""],
      "link": "",
      "github": ""
    }
  ]
}
```

## Responsive Strategy

- Breakpoints: mobile < 768px, tablet 768-1024px, desktop > 1024px
- Mobile: collapsible hamburger menu, stacked card layout
- Desktop: horizontal nav, multi-column card grid

## Non-Goals

- No backend or CMS
- No i18n (single-language, Chinese + English mixed as needed)
- No PDF export (out of scope for initial version)
- No dark mode toggle (out of scope for initial version)
