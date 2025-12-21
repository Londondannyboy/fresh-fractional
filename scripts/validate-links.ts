#!/usr/bin/env npx tsx
/**
 * Link Validator for Fractional.Quest
 * Run: npx tsx scripts/validate-links.ts [--external-only] [--internal-only]
 */
import * as fs from 'fs';
import * as path from 'path';

const CONFIG = {
  baseUrl: 'https://fractional.quest',
  requestTimeout: 8000,
  concurrentRequests: 10,
  userAgent: 'FractionalQuestValidator/1.0',
  scanDirs: ['app', 'components'],
};

interface LinkInfo { url: string; sourceFile: string; type: 'internal' | 'external' }
interface Result { url: string; status: 'ok' | 'error'; httpStatus?: number; error?: string }

const args = process.argv.slice(2);
const externalOnly = args.includes('--external-only');
const internalOnly = args.includes('--internal-only');

function extractLinks(content: string, file: string): LinkInfo[] {
  const links: LinkInfo[] = [];
  const patterns = [/<Link[^>]*href=["']([^"']+)["']/g, /<a[^>]*href=["']([^"']+)["']/g, /["'](https?:\/\/[^"'\s<>]+)["']/g];
  for (const p of patterns) {
    p.lastIndex = 0;
    let m;
    while ((m = p.exec(content)) !== null) {
      const url = m[1];
      if (url.startsWith('#') || url.startsWith('javascript:') || url.startsWith('mailto:') || url.startsWith('tel:') || url.includes('${') || url === '/') continue;
      const isExt = url.startsWith('http://') || url.startsWith('https://');
      const isInt = url.startsWith('/');
      if (isExt || isInt) {
        links.push({ url: isInt ? `${CONFIG.baseUrl}${url}` : url, sourceFile: file, type: isExt && !url.startsWith(CONFIG.baseUrl) ? 'external' : 'internal' });
      }
    }
  }
  return links;
}

function scanDir(dir: string): string[] {
  const files: string[] = [];
  try {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) files.push(...scanDir(p));
      else if (e.name.endsWith('.tsx') || e.name.endsWith('.ts')) files.push(p);
    }
  } catch {}
  return files;
}

async function checkUrl(url: string): Promise<Result> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), CONFIG.requestTimeout);
    const r = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': CONFIG.userAgent }, redirect: 'follow', signal: ctrl.signal });
    clearTimeout(t);
    return { url, status: r.status >= 400 ? 'error' : 'ok', httpStatus: r.status };
  } catch (e: any) {
    return { url, status: 'error', error: e.message || 'fetch failed' };
  }
}

async function main() {
  console.log('\n=== Link Validator ===\n');
  const root = path.resolve(__dirname, '..');
  const allLinks: LinkInfo[] = [];

  for (const d of CONFIG.scanDirs) {
    const dir = path.join(root, d);
    if (!fs.existsSync(dir)) continue;
    for (const f of scanDir(dir)) {
      allLinks.push(...extractLinks(fs.readFileSync(f, 'utf-8'), path.relative(root, f)));
    }
  }

  let toCheck = allLinks;
  if (externalOnly) toCheck = allLinks.filter(l => l.type === 'external');
  if (internalOnly) toCheck = allLinks.filter(l => l.type === 'internal');

  const unique = [...new Set(toCheck.map(l => l.url))];
  console.log(`Checking ${unique.length} unique URLs...\n`);

  let broken = 0;
  for (let i = 0; i < unique.length; i += CONFIG.concurrentRequests) {
    const batch = unique.slice(i, i + CONFIG.concurrentRequests);
    const results = await Promise.all(batch.map(checkUrl));
    for (const r of results) {
      if (r.status === 'error') {
        broken++;
        console.log(`[BROKEN] ${r.url} - ${r.httpStatus ? `HTTP ${r.httpStatus}` : r.error}`);
      }
    }
  }

  console.log(`\n=== Summary ===\nTotal: ${unique.length} | Broken: ${broken}\n`);
}

main().catch(console.error);
