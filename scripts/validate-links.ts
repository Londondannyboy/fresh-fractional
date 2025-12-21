/**
 * Link Validator for Fractional.Quest
 * Run: npx tsx scripts/validate-links.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const CONFIG = {
  baseUrl: 'https://fractional.quest',
  maxRedirects: 3,
  requestTimeout: 10000,
  concurrentRequests: 5,
  userAgent: 'FractionalQuestLinkValidator/1.0',
  scanDirs: ['app', 'components', 'lib'],
  fileExtensions: ['.tsx', '.ts'],
};

interface LinkInfo {
  url: string;
  sourceFile: string;
  type: 'internal' | 'external';
}

interface ValidationResult {
  url: string;
  status: 'ok' | 'error' | 'warning';
  httpStatus?: number;
  issues: string[];
}

const args = process.argv.slice(2);
const options = {
  externalOnly: args.includes('--external-only'),
  internalOnly: args.includes('--internal-only'),
  skipDb: args.includes('--skip-db'),
};

function extractLinksFromContent(content: string, filePath: string): LinkInfo[] {
  const links: LinkInfo[] = [];
  const patterns = [
    /<Link[^>]*href=["']([^"']+)["']/g,
    /<a[^>]*href=["']([^"']+)["']/g,
    /["'](https?:\/\/[^"'\s]+)["']/g,
  ];

  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const url = match[1];
      if (url.startsWith('#') || url.startsWith('javascript:') || url.startsWith('mailto:') ||
          url.startsWith('tel:') || url.includes('${') || url.includes('{') || url === '/') {
        continue;
      }
      const isExternal = url.startsWith('http://') || url.startsWith('https://');
      const isInternal = url.startsWith('/') || url.startsWith(CONFIG.baseUrl);
      if (isExternal || isInternal) {
        links.push({
          url: isInternal && !url.startsWith('http') ? `${CONFIG.baseUrl}${url}` : url,
          sourceFile: filePath,
          type: isExternal && !url.startsWith(CONFIG.baseUrl) ? 'external' : 'internal',
        });
      }
    }
  }
  return links;
}

function scanDirectory(dir: string, baseDir: string): string[] {
  const files: string[] = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === '.next') continue;
      if (entry.isDirectory()) {
        files.push(...scanDirectory(fullPath, baseDir));
      } else if (CONFIG.fileExtensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error scanning ${dir}:`, error);
  }
  return files;
}

async function validateUrl(url: string): Promise<ValidationResult> {
  const result: ValidationResult = { url, status: 'ok', issues: [] };
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.requestTimeout);
    const response = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': CONFIG.userAgent },
      redirect: 'follow',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    result.httpStatus = response.status;
    if (response.status >= 400) {
      result.status = 'error';
      result.issues.push(`HTTP ${response.status}`);
    }
  } catch (error: unknown) {
    result.status = 'error';
    result.issues.push(error instanceof Error ? error.message : 'Unknown error');
  }
  return result;
}

async function main() {
  console.log('\n=== Link Validator ===\n');
  const projectRoot = path.resolve(__dirname, '..');
  const allLinks: LinkInfo[] = [];

  console.log('Scanning source files...');
  for (const scanDir of CONFIG.scanDirs) {
    const dir = path.join(projectRoot, scanDir);
    if (!fs.existsSync(dir)) continue;
    const files = scanDirectory(dir, projectRoot);
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const links = extractLinksFromContent(content, path.relative(projectRoot, file));
      allLinks.push(...links);
    }
  }

  let linksToValidate = allLinks;
  if (options.externalOnly) linksToValidate = allLinks.filter(l => l.type === 'external');
  if (options.internalOnly) linksToValidate = allLinks.filter(l => l.type === 'internal');

  const uniqueUrls = [...new Set(linksToValidate.map(l => l.url))];
  console.log(`Found ${uniqueUrls.length} unique URLs to validate\n`);

  let broken = 0;
  for (let i = 0; i < uniqueUrls.length; i += CONFIG.concurrentRequests) {
    const batch = uniqueUrls.slice(i, i + CONFIG.concurrentRequests);
    const results = await Promise.all(batch.map(url => validateUrl(url)));
    for (const r of results) {
      if (r.status === 'error') {
        broken++;
        console.log(`[BROKEN] ${r.url} - ${r.issues.join(', ')}`);
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Total: ${uniqueUrls.length} | Broken: ${broken}`);
}

main().catch(console.error);
