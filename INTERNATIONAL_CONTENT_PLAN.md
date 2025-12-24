# Fractional Quest: International Content Expansion Plan

## Executive Summary

Expand from UK-only to global coverage using subdirectory structure (`/us/`, `/ca/`, etc.).

**Total New Pages: ~180** | **Target Search Volume: 30,000+/mo**

---

## Competitive Analysis: US Market

### "fractional cfo" SERP (12,100/mo)

| Rank | Domain | Type |
|------|--------|------|
| #1 | preferredcfo.com | US-only niche |
| #2 | reddit.com | UGC |
| #3 | focuscfo.com | US-only niche |
| #4 | doeren.com | US accounting firm |
| #5 | toptal.com | Global marketplace |

### "fractional cfo jobs" SERP (880/mo)

| Rank | Domain | Type |
|------|--------|------|
| #1 | **focuscfo.com** | US-only niche |
| #2 | indeed.com | Job board |
| #3 | linkedin.com | Job board |
| #4 | ziprecruiter.com | Job board |
| #5 | glassdoor.com | Job board |

### Key Insight: Our Edge

**No competitor has US city pages.** focuscfo.com ranks #1 for jobs but has no `/new-york`, `/san-francisco` etc. This is our differentiation.

---

## Site Architecture

### URL Structure

```
fractional.quest/                    # UK (default, unchanged)
fractional.quest/us/                 # United States
fractional.quest/ca/                 # Canada
fractional.quest/au/                 # Australia
fractional.quest/ie/                 # Ireland
fractional.quest/ae/                 # UAE
fractional.quest/sg/                 # Singapore
```

### Next.js App Structure (New Site)

```
app/
├── (uk)/                           # UK routes (no prefix, current structure)
│   ├── fractional-cfo-jobs-uk/
│   └── ...
├── us/
│   ├── page.tsx                    # US hub
│   ├── what-is-fractional-cfo/     # Educational (matches #1 SERP)
│   ├── fractional-cfo-jobs/        # Jobs hub
│   ├── fractional-cfo-jobs-new-york/
│   ├── fractional-cfo-jobs-san-francisco/
│   └── ...
├── ca/
├── au/
├── ie/
├── ae/
└── sg/
```

---

## Phase 1: USA (Priority)

### 1A. Hub Pages (Week 1)

| Page | Target Keyword | Vol |
|------|---------------|-----|
| `/us/` | fractional executive usa | 880 |
| `/us/what-is-fractional-cfo` | what is a fractional cfo | 2,400 |
| `/us/fractional-cfo-jobs` | fractional cfo jobs | 880 |
| `/us/fractional-cmo-jobs` | fractional cmo jobs | 480 |
| `/us/fractional-cto-jobs` | fractional cto jobs | 320 |
| `/us/fractional-coo-jobs` | fractional coo jobs | 260 |
| `/us/fractional-hr-jobs` | fractional hr jobs | 170 |

### 1B. US City Pages - CFO (Week 2) **[COMPETITIVE EDGE]**

| Page | Target Keyword | Vol | CPC |
|------|---------------|-----|-----|
| `/us/fractional-cfo-jobs-new-york` | fractional cfo new york | 50 | $36 |
| `/us/fractional-cfo-jobs-los-angeles` | fractional cfo los angeles | 30 | $64 |
| `/us/fractional-cfo-jobs-san-francisco` | fractional cfo san francisco | 40 | $16 |
| `/us/fractional-cfo-jobs-chicago` | fractional cfo chicago | 50 | $55 |
| `/us/fractional-cfo-jobs-boston` | fractional cfo boston | 40 | $26 |
| `/us/fractional-cfo-jobs-austin` | fractional cfo austin | 70 | $45 |
| `/us/fractional-cfo-jobs-denver` | fractional cfo denver | 90 | $33 |
| `/us/fractional-cfo-jobs-atlanta` | fractional cfo atlanta | 40 | $60 |
| `/us/fractional-cfo-jobs-miami` | fractional cfo miami | 30 | $40 |
| `/us/fractional-cfo-jobs-seattle` | fractional cfo seattle | 30 | $35 |
| `/us/fractional-cfo-jobs-dallas` | fractional cfo dallas | 40 | $45 |
| `/us/fractional-cfo-jobs-houston` | fractional cfo houston | 30 | $42 |
| `/us/fractional-cfo-jobs-nashville` | fractional cfo nashville | 20 | $35 |

### 1C. US City Pages - CMO/CTO (Week 3)

| Page | Target Keyword | Vol |
|------|---------------|-----|
| `/us/fractional-cmo-jobs-new-york` | fractional cmo new york | 30 |
| `/us/fractional-cmo-jobs-los-angeles` | fractional cmo los angeles | 20 |
| `/us/fractional-cmo-jobs-san-francisco` | fractional cmo san francisco | 20 |
| `/us/fractional-cto-jobs-new-york` | fractional cto new york | 20 |
| `/us/fractional-cto-jobs-san-francisco` | fractional cto san francisco | 30 |
| `/us/fractional-cto-jobs-austin` | fractional cto austin | 20 |

### 1D. US Synonym Pages (Week 4)

| Page | Target Keyword | Vol |
|------|---------------|-----|
| `/us/outsourced-cfo` | outsourced cfo | 1,000 |
| `/us/virtual-cfo` | virtual cfo | 720 |
| `/us/part-time-cfo` | part time cfo | 1,000 |
| `/us/interim-cfo` | interim cfo | 720 |
| `/us/startup-cfo` | startup cfo | 260 |

### 1E. US Info/Guide Pages (Week 5)

| Page | Target Keyword | Vol |
|------|---------------|-----|
| `/us/fractional-cfo-salary` | fractional cfo salary | 720 |
| `/us/fractional-cfo-cost` | fractional cfo cost | 480 |
| `/us/how-to-become-fractional-cfo` | how to become a fractional cfo | 320 |
| `/us/fractional-cfo-for-startups` | fractional cfo for startups | 390 |

**US Total: ~45 pages**

---

## Phase 2: Canada

| Page | Target Keyword | Vol |
|------|---------------|-----|
| `/ca/` | fractional executive canada | 70 |
| `/ca/fractional-cfo-jobs` | fractional cfo canada | 880 |
| `/ca/fractional-cmo-jobs` | fractional cmo canada | 390 |
| `/ca/fractional-cto-jobs` | fractional cto canada | 170 |
| `/ca/fractional-cfo-jobs-toronto` | fractional cfo toronto | 50 |
| `/ca/fractional-cfo-jobs-vancouver` | fractional cfo vancouver | 30 |
| `/ca/part-time-cfo` | part time cfo canada | 260 |

**Canada Total: ~12 pages**

---

## Phase 3: Australia

| Page | Target Keyword | Vol |
|------|---------------|-----|
| `/au/` | fractional executive australia | 50 |
| `/au/fractional-cfo-jobs` | fractional cfo australia | 320 |
| `/au/fractional-cmo-jobs` | fractional cmo australia | 390 |
| `/au/fractional-cfo-jobs-sydney` | fractional cfo sydney | 40 |
| `/au/fractional-cfo-jobs-melbourne` | fractional cfo melbourne | 30 |

**Australia Total: ~10 pages**

---

## Phase 4: Secondary Markets

### Ireland
| `/ie/fractional-cfo-jobs` | fractional cfo ireland | 90 |
| `/ie/fractional-cfo-jobs-dublin` | fractional cfo dublin | 40 |

### UAE
| `/ae/fractional-cfo-jobs` | fractional cfo dubai | 70 |
| `/ae/fractional-cfo-jobs-dubai` | fractional cfo dubai | 50 |

### Singapore
| `/sg/fractional-cfo-jobs` | fractional cfo singapore | 30 |

**Secondary Markets Total: ~10 pages**

---

## Technical Implementation

### Middleware (middleware.ts)

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip if already on country path
  if (pathname.match(/^\/(us|ca|au|ie|ae|sg)/)) {
    return NextResponse.next()
  }

  // Get country from Vercel geo headers
  const country = request.geo?.country || 'GB'

  // Set header for country banner (soft redirect)
  const response = NextResponse.next()
  response.headers.set('x-detected-country', country)
  return response
}
```

### Hreflang Tags (per page)

```typescript
export const metadata = {
  alternates: {
    languages: {
      'en-US': 'https://fractional.quest/us/fractional-cfo-jobs',
      'en-GB': 'https://fractional.quest/fractional-cfo-jobs-uk',
      'en-CA': 'https://fractional.quest/ca/fractional-cfo-jobs',
      'en-AU': 'https://fractional.quest/au/fractional-cfo-jobs',
      'x-default': 'https://fractional.quest/fractional-cfo-jobs-uk',
    },
  },
}
```

### Localization Config

```typescript
export const COUNTRY_CONFIG = {
  GB: { currency: '£', dayRate: { min: 800, max: 1500 }, locale: 'en-GB' },
  US: { currency: '$', dayRate: { min: 1500, max: 3000 }, locale: 'en-US' },
  CA: { currency: 'C$', dayRate: { min: 1200, max: 2500 }, locale: 'en-CA' },
  AU: { currency: 'A$', dayRate: { min: 1400, max: 2800 }, locale: 'en-AU' },
  IE: { currency: '€', dayRate: { min: 900, max: 1600 }, locale: 'en-IE' },
  AE: { currency: 'AED', dayRate: { min: 5000, max: 12000 }, locale: 'en-AE' },
  SG: { currency: 'S$', dayRate: { min: 2000, max: 4000 }, locale: 'en-SG' },
}
```

---

## Content Localization Checklist

For each international page:

- [ ] Currency updated (£ → $)
- [ ] Day rates adjusted to local market
- [ ] Professional bodies localized (ICAEW → CPA)
- [ ] Tax info localized (IR35 → 1099)
- [ ] Local company examples
- [ ] Hreflang tags added
- [ ] Canonical URL set
- [ ] H1 includes location

---

## Priority Order

| Week | Focus | Pages |
|------|-------|-------|
| 1 | US Hub Pages | 7 |
| 2 | US CFO City Pages | 13 |
| 3 | US CMO/CTO City Pages | 6 |
| 4 | US Synonym Pages | 5 |
| 5 | US Guide Pages | 4 |
| 6 | Canada | 12 |
| 7 | Australia | 10 |
| 8 | Ireland/UAE/Singapore | 10 |

---

## Success Metrics

| Metric | Target (6 months) |
|--------|-------------------|
| US organic traffic | 1,000/mo |
| US city page rankings (top 10) | 8/13 pages |
| "fractional cfo jobs" ranking | Top 5 |
| Canada/Australia traffic | 200/mo |

---

## Summary

**Strategy:** Subdirectory approach (`/us/`) with US-native content depth

**Competitive Edge:** City pages (no competitor has these)

**Priority:** US first (10x UK market size), then Canada/Australia

**Total Pages:** ~85 (Phase 1-4)
