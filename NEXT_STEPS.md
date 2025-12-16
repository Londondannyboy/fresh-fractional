# Next Steps - Fractional Jobs UK Improvements

## 🎯 Immediate Priorities

### 1. Calculator Layout Restructure
**Current:** Two calculators in one section
**Needed:** Each calculator in its OWN section with header

**File:** `/app/fractional-jobs-uk/page.tsx` (around line 305-373)

```tsx
{/* Rate Calculator Section */}
<section id="rate-calculator" className="py-16 md:py-24 bg-gray-900">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-white !text-white mb-4">
        Calculate Your Fractional Rate
      </h2>
      <p className="text-gray-300 text-lg max-w-2xl mx-auto">
        Understand your earning potential as a fractional executive. Input your role and location to see realistic day rates, weekly earnings, and annual income projections based on current UK market data.
      </p>
    </div>
    <div className="bg-gray-950 rounded-2xl p-8 border border-gray-800">
      <FractionalRateCalculatorUK />
    </div>
  </div>
</section>

{/* Savings Calculator Section */}
<section id="savings-calculator" className="py-16 md:py-24 bg-gray-950">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-white !text-white mb-4">
        Calculate Your Cost Savings
      </h2>
      <p className="text-gray-300 text-lg max-w-2xl mx-auto">
        Discover how much you can save by hiring fractional executives versus full-time. Compare total employment costs including salary, NI, benefits, and overhead against flexible fractional rates.
      </p>
    </div>
    <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
      <SavingsCalculator />
    </div>
  </div>
</section>
```

### 2. Make Skills Graph Interactive & Clickable
**File:** `/components/SkillsRadar.tsx`

Add click handlers to role buttons that navigate to specific role pages:

```tsx
<button
  onClick={() => window.location.href = '/fractional-cfo-jobs-uk'}
  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
    selectedRole === 'CFO'
      ? 'bg-blue-600 text-white'
      : 'bg-gray-800 text-gray-300 hover:bg-blue-600/20'
  }`}
>
  CFO
</button>
```

**Role mappings:**
- CFO → `/fractional-cfo-jobs-uk`
- CTO → `/fractional-cto-jobs-uk`
- CMO → `/fractional-cmo-jobs-uk`
- COO → `/fractional-coo-jobs-uk`

### 3. Delete Footer Header Titles
**File:** `/app/fractional-jobs-uk/page.tsx` (lines ~484-510)

**Remove these lines:**
```tsx
<h3 className="text-white mb-4 text-xs font-semibold uppercase tracking-wider opacity-70">By Role</h3>
<h3 className="text-white mb-4 text-xs font-semibold uppercase tracking-wider opacity-70">By Location</h3>
<h3 className="text-white mb-4 text-xs font-semibold uppercase tracking-wider opacity-70">By Type</h3>
```

Just keep the link lists without headers. They're ugly and cause contrast issues (Lighthouse complaint).

### 4. SEO Improvements (92 → 100)
**Status:** ✅ Metadata improved (robots, OpenGraph enhanced)

**Remaining:**
- Add JSON-LD structured data for Organization
- Add breadcrumb schema
- Ensure all images have alt text

### 5. Performance Optimization (72 → 85+)
**Current issues:**
- 680ms Total Blocking Time
- 406 KiB unused JavaScript
- Render-blocking CSS

**Quick wins:**
- Lazy load calculators below fold
- Defer non-critical JavaScript
- Use `next/dynamic` with `{ ssr: false }` for heavy components:

```tsx
const SavingsCalculator = dynamic(
  () => import('@/components/SavingsCalculator'),
  { ssr: false, loading: () => <div className="animate-pulse bg-gray-800 h-64 rounded-xl" /> }
)
```

---

## 📝 Additional Enhancements

### JobCard - Pass key_deliverables
**File:** `/app/fractional-jobs-uk/page.tsx` (around line 296)

Update to pass key deliverables:
```tsx
keyDeliverables={job.key_deliverables || []}
```

JobCard already accepts this prop and displays it! Just need to pass it from the page.

### Add Search Bar to Hero
Insert after H1 in hero section:

```tsx
<div className="max-w-2xl mx-auto mb-6">
  <form action="/fractional-jobs" method="GET" className="relative">
    <input
      type="text"
      name="q"
      defaultValue="UK"
      placeholder="Search fractional jobs UK..."
      className="w-full px-6 py-4 pr-32 bg-gray-900/80 backdrop-blur border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-600 focus:outline-none"
    />
    <button type="submit" className="absolute right-2 top-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
      Search
    </button>
  </form>
</div>
```

---

## 🎨 Design Consistency

### Ensure ALL Headings Are White
Search for all `<h1>`, `<h2>`, `<h3>`, `<h4>` and add:
```tsx
className="... text-white !text-white ..."
```

The `!text-white` forces white color even if other classes try to override.

---

## 🚀 Quick Command Reference

```bash
# Build and test
npm run build

# Find all purple references (should be 0 after conversion)
grep -r "purple-" app/fractional-jobs-uk/

# Find all heading tags
grep -rn "<h[1-6]" app/fractional-jobs-uk/page.tsx

# Deploy
git add -A && git commit -m "fix: SEO improvements and layout fixes" && git push
```

---

## 📊 Current Status

✅ Database schema complete (normalized_title, appeal_summary, key_deliverables)
✅ JobCard redesigned with royal blue
✅ SEO metadata enhanced
🔄 Calculator layout needs restructuring
🔄 Footer headers need deletion
🔄 Skills graph needs click handlers
🔄 Performance optimization needed

---

## 🎯 Expected Lighthouse Scores After Fixes

- Performance: 85+ (from 72)
- Accessibility: 100 (from 95) - fix footer contrast
- SEO: 100 (from 92) - metadata improvements

---

**Last Updated:** 2025-12-16
**Priority:** HIGH - Calculator layout and footer fixes are user-facing issues
