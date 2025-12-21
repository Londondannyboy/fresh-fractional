/**
 * Comprehensive Link Validator for Fractional.Quest
 *
 * Validates all internal and external links for:
 * - Broken links (404s, 5xx errors)
 * - Redirect chains (>3 redirects = bad)
 * - Paywalls and thin content
 * - Orphaned pages (no inbound links)
 * - Dead ends (pages with no outbound links)
 * - SEO issues
 *
 * Usage: npx tsx scripts/validate-links.ts
 * Options:
 *   --external-only    Only check external links
 *   --internal-only    Only check internal links
 *   --skip-db          Skip database content scanning
 *   --verbose          Show detailed progress
 *   --output=json      Output results as JSON
 */

import { neon } from '@neondatabase/serverless';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const CONFIG = {
  baseUrl: 'https://fractional.quest',
  maxRedirects: 3,
  requestTimeout: 15000,
  concurrentRequests: 5,
  minContentLength: 500, // Minimum words for thin content check
  userAgent: 'FractionalQuestLinkValidator/1.0 (SEO Audit)',

  // Paywall indicators
  paywallPatterns: [
    /subscribe to (continue|read|access)/i,
    /you've reached (your|the) (free|monthly) (article|limit)/i,
    /premium (content|article|access)/i,
    /sign up to (read|continue|access)/i,
    /create (a free |an )?account to/i,
    /members[- ]only/i,
    /paywall/i,
    /subscription required/i,
  ],

  // Known paywall domains
  paywallDomains: [
    'wsj.com',
    'ft.com',
    'economist.com',
    'nytimes.com',
    'washingtonpost.com',
    'bloomberg.com',
    'hbr.org',
  ],

  // Directories to scan
  scanDirs: ['app', 'components', 'lib'],

  // File extensions to scan
  fileExtensions: ['.tsx', '.ts', '.jsx', '.js'],

  // Exclude patterns
  excludePatterns: [
    /node_modules/,
    /\.next/,
    /\.git/,
  ],
};

// Types
interface LinkInfo {
  url: string;
  sourceFile: string;
  sourceLine?: number;
  type: 'internal' | 'external';
  context?: string;
}

interface ValidationResult {
  url: string;
  status: 'ok' | 'error' | 'warning';
  httpStatus?: number;
  redirectCount?: number;
  finalUrl?: string;
  issues: string[];
  responseTime?: number;
  contentLength?: number;
  hasPaywall?: boolean;
  isThinContent?: boolean;
}

interface PageInfo {
  path: string;
  file: string;
  inboundLinks: string[];
  outboundLinks: string[];
}

interface Report {
  timestamp: string;
  summary: {
    totalLinks: number;
    internalLinks: number;
    externalLinks: number;
    brokenLinks: number;
    redirectIssues: number;
    paywallLinks: number;
    thinContentLinks: number;
    orphanedPages: number;
    deadEndPages: number;
  };
  brokenLinks: ValidationResult[];
  redirectIssues: ValidationResult[];
  paywallLinks: ValidationResult[];
  thinContentLinks: ValidationResult[];
  orphanedPages: string[];
  deadEndPages: string[];
  allResults: ValidationResult[];
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  externalOnly: args.includes('--external-only'),
  internalOnly: args.includes('--internal-only'),
  skipDb: args.includes('--skip-db'),
  verbose: args.includes('--verbose'),
  outputJson: args.includes('--output=json'),
};

// Logging
function log(message: string, level: 'info' | 'warn' | 'error' | 'verbose' = 'info') {
  if (level === 'verbose' && !options.verbose) return;
  const prefix = {
    info: '\x1b[36m[INFO]\x1b[0m',
    warn: '\x1b[33m[WARN]\x1b[0m',
    error: '\x1b[31m[ERROR]\x1b[0m',
    verbose: '\x1b[90m[DEBUG]\x1b[0m',
  };
  console.log(`${prefix[level]} ${message}`);
}

// Extract links from TSX/TS content
function extractLinksFromContent(content: string, filePath: string): LinkInfo[] {
  const links: LinkInfo[] = [];
  const lines = content.split('\n');

  // Patterns to match
  const patterns = [
    // Next.js Link component
    /<Link[^>]*href=["']([^"']+)["']/g,
    // Regular anchor tags
    /<a[^>]*href=["']([^"']+)["']/g,
    // String URLs (for metadata, etc.)
    /["'](https?:\/\/[^"'\s]+)["']/g,
    // Canonical URLs
    /canonical:\s*["']([^"']+)["']/g,
    // OpenGraph URLs
    /url:\s*["']([^"']+)["']/g,
  ];

  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];

    for (const pattern of patterns) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const url = match[1];

        // Skip anchors, javascript:, mailto:, tel:, and template literals
        if (url.startsWith('#') ||
            url.startsWith('javascript:') ||
            url.startsWith('mailto:') ||
            url.startsWith('tel:') ||
            url.includes('${') ||
            url.includes('{') ||
            url === '/') {
          continue;
        }

        const isExternal = url.startsWith('http://') || url.startsWith('https://');
        const isInternal = url.startsWith('/') || url.startsWith(CONFIG.baseUrl);

        if (isExternal || isInternal) {
          links.push({
            url: isInternal && !url.startsWith('http') ? `${CONFIG.baseUrl}${url}` : url,
            sourceFile: filePath,
            sourceLine: lineNum + 1,
            type: isExternal && !url.startsWith(CONFIG.baseUrl) ? 'external' : 'internal',
            context: line.trim().substring(0, 100),
          });
        }
      }
    }
  }

  return links;
}

// Extract links from HTML/Markdown content (for database articles)
function extractLinksFromHtml(content: string, source: string): LinkInfo[] {
  const links: LinkInfo[] = [];

  const patterns = [
    /<a[^>]*href=["']([^"']+)["']/gi,
    /\[([^\]]+)\]\(([^)]+)\)/g, // Markdown links
    /(https?:\/\/[^\s<>"']+)/g, // Plain URLs
  ];

  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const url = match[2] || match[1];

      if (url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) {
        continue;
      }

      const isExternal = url.startsWith('http://') || url.startsWith('https://');
      const isInternal = url.startsWith('/');

      if (isExternal || isInternal) {
        links.push({
          url: isInternal ? `${CONFIG.baseUrl}${url}` : url,
          sourceFile: source,
          type: isExternal && !url.startsWith(CONFIG.baseUrl) ? 'external' : 'internal',
        });
      }
    }
  }

  return links;
}

// Scan directory for files
function scanDirectory(dir: string, baseDir: string): string[] {
  const files: string[] = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);

      // Check exclusions
      if (CONFIG.excludePatterns.some(p => p.test(relativePath))) {
        continue;
      }

      if (entry.isDirectory()) {
        files.push(...scanDirectory(fullPath, baseDir));
      } else if (CONFIG.fileExtensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    log(`Error scanning directory ${dir}: ${error}`, 'error');
  }

  return files;
}

// Validate a single URL
async function validateUrl(url: string): Promise<ValidationResult> {
  const result: ValidationResult = {
    url,
    status: 'ok',
    issues: [],
    redirectCount: 0,
  };

  const startTime = Date.now();
  let currentUrl = url;
  const visitedUrls = new Set<string>();

  try {
    // Follow redirects manually to count them
    while (result.redirectCount! <= CONFIG.maxRedirects + 1) {
      if (visitedUrls.has(currentUrl)) {
        result.status = 'error';
        result.issues.push('Redirect loop detected');
        break;
      }
      visitedUrls.add(currentUrl);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CONFIG.requestTimeout);

      try {
        const response = await fetch(currentUrl, {
          method: 'GET',
          headers: {
            'User-Agent': CONFIG.userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
          },
          redirect: 'manual',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        result.httpStatus = response.status;

        // Handle redirects
        if ([301, 302, 303, 307, 308].includes(response.status)) {
          const location = response.headers.get('location');
          if (location) {
            result.redirectCount!++;
            currentUrl = location.startsWith('/')
              ? new URL(location, currentUrl).href
              : location;
            continue;
          }
        }

        // Check for errors
        if (response.status >= 400) {
          result.status = 'error';
          result.issues.push(`HTTP ${response.status} ${response.statusText}`);
          break;
        }

        // Success - check content
        if (response.status === 200) {
          result.finalUrl = currentUrl;

          // Only check content for HTML pages
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('text/html')) {
            const text = await response.text();
            result.contentLength = text.split(/\s+/).length;

            // Check for paywalls
            const domain = new URL(currentUrl).hostname;
            if (CONFIG.paywallDomains.some(d => domain.includes(d))) {
              result.hasPaywall = true;
              result.status = 'warning';
              result.issues.push('Known paywall domain');
            } else {
              for (const pattern of CONFIG.paywallPatterns) {
                if (pattern.test(text)) {
                  result.hasPaywall = true;
                  result.status = 'warning';
                  result.issues.push('Possible paywall detected');
                  break;
                }
              }
            }

            // Check for thin content
            if (result.contentLength < CONFIG.minContentLength) {
              result.isThinContent = true;
              result.status = 'warning';
              result.issues.push(`Thin content (${result.contentLength} words)`);
            }
          }
        }

        break;

      } catch (fetchError: unknown) {
        clearTimeout(timeoutId);
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          result.status = 'error';
          result.issues.push('Request timeout');
        } else {
          throw fetchError;
        }
        break;
      }
    }

    // Check redirect count
    if (result.redirectCount! > CONFIG.maxRedirects) {
      result.status = 'warning';
      result.issues.push(`Too many redirects (${result.redirectCount})`);
    } else if (result.redirectCount! > 0 && result.finalUrl !== url) {
      // Note if URL redirects to a different destination
      result.issues.push(`Redirects to: ${result.finalUrl}`);
    }

  } catch (error: unknown) {
    result.status = 'error';
    result.issues.push(`Network error: ${error instanceof Error ? error.message : String(error)}`);
  }

  result.responseTime = Date.now() - startTime;
  return result;
}

// Check internal pages for orphans and dead ends
function analyzeInternalStructure(
  links: LinkInfo[],
  existingPages: Set<string>
): { orphanedPages: string[]; deadEndPages: string[] } {
  const pageInfo = new Map<string, PageInfo>();

  // Initialize page info for all known pages
  for (const pagePath of existingPages) {
    const normalizedPath = pagePath.replace(CONFIG.baseUrl, '');
    pageInfo.set(normalizedPath, {
      path: normalizedPath,
      file: '',
      inboundLinks: [],
      outboundLinks: [],
    });
  }

  // Process links
  for (const link of links) {
    if (link.type !== 'internal') continue;

    const targetPath = link.url.replace(CONFIG.baseUrl, '').split('?')[0].split('#')[0];
    const sourcePath = link.sourceFile
      .replace(/.*\/app/, '')
      .replace(/\/page\.tsx$/, '')
      .replace(/\/page\.ts$/, '') || '/';

    // Record outbound link
    const sourceInfo = pageInfo.get(sourcePath) || {
      path: sourcePath,
      file: link.sourceFile,
      inboundLinks: [],
      outboundLinks: [],
    };
    sourceInfo.outboundLinks.push(targetPath);
    sourceInfo.file = link.sourceFile;
    pageInfo.set(sourcePath, sourceInfo);

    // Record inbound link
    const targetInfo = pageInfo.get(targetPath) || {
      path: targetPath,
      file: '',
      inboundLinks: [],
      outboundLinks: [],
    };
    targetInfo.inboundLinks.push(sourcePath);
    pageInfo.set(targetPath, targetInfo);
  }

  // Find orphaned pages (no inbound links except from themselves)
  const orphanedPages: string[] = [];
  const deadEndPages: string[] = [];

  // Exclude these paths from orphan/dead-end analysis
  const excludePaths = ['/', '/api', '/sitemap', '/robots'];

  for (const [path, info] of pageInfo) {
    if (excludePaths.some(p => path === p || path.startsWith('/api/'))) continue;

    // Orphaned: no inbound links from other pages
    const externalInbound = info.inboundLinks.filter(p => p !== path);
    if (externalInbound.length === 0 && existingPages.has(`${CONFIG.baseUrl}${path}`)) {
      orphanedPages.push(path);
    }

    // Dead end: no outbound links
    if (info.outboundLinks.length === 0 && info.file) {
      deadEndPages.push(path);
    }
  }

  return { orphanedPages, deadEndPages };
}

// Get all page paths from the app directory
function getExistingPages(appDir: string): Set<string> {
  const pages = new Set<string>();

  function scanDir(dir: string, routePath: string = '') {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;

        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          // Skip API routes and special folders
          if (entry.name === 'api' || entry.name.startsWith('(')) {
            scanDir(fullPath, routePath);
          } else {
            const newRoute = `${routePath}/${entry.name}`;
            scanDir(fullPath, newRoute);
          }
        } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
          const pagePath = routePath || '/';
          pages.add(`${CONFIG.baseUrl}${pagePath}`);
        }
      }
    } catch (error) {
      // Ignore errors
    }
  }

  scanDir(appDir);
  return pages;
}

// Process links in batches
async function validateLinksInBatches(
  links: LinkInfo[],
  batchSize: number = CONFIG.concurrentRequests
): Promise<Map<string, ValidationResult>> {
  const results = new Map<string, ValidationResult>();
  const uniqueUrls = [...new Set(links.map(l => l.url))];

  log(`Validating ${uniqueUrls.length} unique URLs...`);

  for (let i = 0; i < uniqueUrls.length; i += batchSize) {
    const batch = uniqueUrls.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(uniqueUrls.length / batchSize);

    log(`Processing batch ${batchNum}/${totalBatches} (${batch.length} URLs)`, 'verbose');

    const batchResults = await Promise.all(
      batch.map(url => validateUrl(url))
    );

    for (const result of batchResults) {
      results.set(result.url, result);

      if (result.status === 'error') {
        log(`[BROKEN] ${result.url} - ${result.issues.join(', ')}`, 'error');
      } else if (result.status === 'warning') {
        log(`[WARNING] ${result.url} - ${result.issues.join(', ')}`, 'warn');
      } else {
        log(`[OK] ${result.url}`, 'verbose');
      }
    }

    // Small delay between batches to be polite
    if (i + batchSize < uniqueUrls.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  return results;
}

// Main function
async function main() {
  console.log('\n\x1b[1m========================================\x1b[0m');
  console.log('\x1b[1m  Fractional.Quest Link Validator\x1b[0m');
  console.log('\x1b[1m========================================\x1b[0m\n');

  const projectRoot = path.resolve(__dirname, '..');
  const appDir = path.join(projectRoot, 'app');

  const allLinks: LinkInfo[] = [];

  // Step 1: Scan TSX/TS files
  log('Scanning source files for links...');

  for (const scanDir of CONFIG.scanDirs) {
    const dir = path.join(projectRoot, scanDir);
    if (!fs.existsSync(dir)) continue;

    const files = scanDirectory(dir, projectRoot);
    log(`Found ${files.length} files in ${scanDir}/`, 'verbose');

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const links = extractLinksFromContent(content, path.relative(projectRoot, file));
        allLinks.push(...links);
      } catch (error) {
        log(`Error reading ${file}: ${error}`, 'error');
      }
    }
  }

  log(`Found ${allLinks.length} links in source files`);

  // Step 2: Scan database content (if not skipped)
  if (!options.skipDb) {
    log('Scanning database content for links...');

    try {
      const databaseUrl = process.env.DATABASE_URL;
      if (!databaseUrl) {
        log('DATABASE_URL not set, skipping database scan', 'warn');
      } else {
        const sql = neon(databaseUrl);

        // Check for articles table
        const tables = await sql`
          SELECT table_name
          FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name IN ('articles', 'jobs', 'destinations')
        `;

        for (const table of tables) {
          const tableName = table.table_name;
          log(`Scanning ${tableName} table...`, 'verbose');

          // Get content columns - adjust based on your schema
          let contentColumn = 'content';
          if (tableName === 'jobs') contentColumn = 'description';

          try {
            const rows = await sql`
              SELECT id, ${sql(contentColumn)} as content
              FROM ${sql(tableName)}
              WHERE ${sql(contentColumn)} IS NOT NULL
              LIMIT 1000
            `;

            for (const row of rows) {
              if (row.content) {
                const links = extractLinksFromHtml(
                  row.content,
                  `database:${tableName}:${row.id}`
                );
                allLinks.push(...links);
              }
            }

            log(`Found ${rows.length} records in ${tableName}`);
          } catch (err) {
            log(`Error querying ${tableName}: ${err}`, 'warn');
          }
        }
      }
    } catch (error) {
      log(`Database connection error: ${error}`, 'warn');
    }
  }

  // Filter by type if requested
  let linksToValidate = allLinks;
  if (options.externalOnly) {
    linksToValidate = allLinks.filter(l => l.type === 'external');
    log(`Filtering to ${linksToValidate.length} external links only`);
  } else if (options.internalOnly) {
    linksToValidate = allLinks.filter(l => l.type === 'internal');
    log(`Filtering to ${linksToValidate.length} internal links only`);
  }

  // Step 3: Get existing pages for orphan detection
  log('Analyzing page structure...');
  const existingPages = getExistingPages(appDir);
  log(`Found ${existingPages.size} pages in app directory`);

  // Step 4: Validate all links
  log('\nStarting link validation...\n');
  const validationResults = await validateLinksInBatches(linksToValidate);

  // Step 5: Analyze internal structure
  const internalLinks = allLinks.filter(l => l.type === 'internal');
  const { orphanedPages, deadEndPages } = analyzeInternalStructure(internalLinks, existingPages);

  // Step 6: Generate report
  const report: Report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalLinks: linksToValidate.length,
      internalLinks: linksToValidate.filter(l => l.type === 'internal').length,
      externalLinks: linksToValidate.filter(l => l.type === 'external').length,
      brokenLinks: 0,
      redirectIssues: 0,
      paywallLinks: 0,
      thinContentLinks: 0,
      orphanedPages: orphanedPages.length,
      deadEndPages: deadEndPages.length,
    },
    brokenLinks: [],
    redirectIssues: [],
    paywallLinks: [],
    thinContentLinks: [],
    orphanedPages,
    deadEndPages,
    allResults: [],
  };

  for (const result of validationResults.values()) {
    report.allResults.push(result);

    if (result.status === 'error') {
      report.summary.brokenLinks++;
      report.brokenLinks.push(result);
    }

    if (result.redirectCount && result.redirectCount > CONFIG.maxRedirects) {
      report.summary.redirectIssues++;
      report.redirectIssues.push(result);
    }

    if (result.hasPaywall) {
      report.summary.paywallLinks++;
      report.paywallLinks.push(result);
    }

    if (result.isThinContent) {
      report.summary.thinContentLinks++;
      report.thinContentLinks.push(result);
    }
  }

  // Output results
  if (options.outputJson) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log('\n\x1b[1m========================================\x1b[0m');
    console.log('\x1b[1m  VALIDATION REPORT\x1b[0m');
    console.log('\x1b[1m========================================\x1b[0m\n');

    console.log('\x1b[1mSummary:\x1b[0m');
    console.log(`  Total Links Checked: ${report.summary.totalLinks}`);
    console.log(`  - Internal: ${report.summary.internalLinks}`);
    console.log(`  - External: ${report.summary.externalLinks}`);
    console.log('');
    console.log(`  \x1b[31mBroken Links: ${report.summary.brokenLinks}\x1b[0m`);
    console.log(`  \x1b[33mRedirect Issues: ${report.summary.redirectIssues}\x1b[0m`);
    console.log(`  \x1b[33mPaywall Links: ${report.summary.paywallLinks}\x1b[0m`);
    console.log(`  \x1b[33mThin Content: ${report.summary.thinContentLinks}\x1b[0m`);
    console.log(`  \x1b[33mOrphaned Pages: ${report.summary.orphanedPages}\x1b[0m`);
    console.log(`  \x1b[33mDead End Pages: ${report.summary.deadEndPages}\x1b[0m`);

    if (report.brokenLinks.length > 0) {
      console.log('\n\x1b[1m\x1b[31mBroken Links:\x1b[0m');
      for (const link of report.brokenLinks) {
        console.log(`  - ${link.url}`);
        console.log(`    Status: ${link.httpStatus || 'N/A'} | ${link.issues.join(', ')}`);
        const sources = linksToValidate.filter(l => l.url === link.url);
        for (const source of sources.slice(0, 3)) {
          console.log(`    Found in: ${source.sourceFile}${source.sourceLine ? `:${source.sourceLine}` : ''}`);
        }
        if (sources.length > 3) {
          console.log(`    ... and ${sources.length - 3} more locations`);
        }
      }
    }

    if (report.paywallLinks.length > 0) {
      console.log('\n\x1b[1m\x1b[33mPaywall Links:\x1b[0m');
      for (const link of report.paywallLinks) {
        console.log(`  - ${link.url}`);
      }
    }

    if (report.redirectIssues.length > 0) {
      console.log('\n\x1b[1m\x1b[33mExcessive Redirects (>${CONFIG.maxRedirects}):\x1b[0m');
      for (const link of report.redirectIssues) {
        console.log(`  - ${link.url}`);
        console.log(`    Redirects: ${link.redirectCount} -> ${link.finalUrl}`);
      }
    }

    if (orphanedPages.length > 0) {
      console.log('\n\x1b[1m\x1b[33mOrphaned Pages (no inbound links):\x1b[0m');
      for (const page of orphanedPages.slice(0, 20)) {
        console.log(`  - ${page}`);
      }
      if (orphanedPages.length > 20) {
        console.log(`  ... and ${orphanedPages.length - 20} more`);
      }
    }

    if (deadEndPages.length > 0) {
      console.log('\n\x1b[1m\x1b[33mDead End Pages (no outbound links):\x1b[0m');
      for (const page of deadEndPages.slice(0, 20)) {
        console.log(`  - ${page}`);
      }
      if (deadEndPages.length > 20) {
        console.log(`  ... and ${deadEndPages.length - 20} more`);
      }
    }

    // Save detailed report
    const reportPath = path.join(projectRoot, 'link-validation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n\x1b[32mDetailed report saved to: ${reportPath}\x1b[0m`);
  }

  // Exit with error code if issues found
  const hasErrors = report.summary.brokenLinks > 0;
  process.exit(hasErrors ? 1 : 0);
}

// Load environment variables
import { config } from 'dotenv';
config({ path: path.resolve(__dirname, '..', '.env.local') });

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
