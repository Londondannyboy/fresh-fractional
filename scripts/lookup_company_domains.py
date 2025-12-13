#!/usr/bin/env python3
"""
Batch lookup company domains using Pydantic AI.
Populates company_domain for all jobs missing it.
"""

import os
import asyncio
from typing import Optional
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor
from pydantic import BaseModel, Field
from pydantic_ai import Agent

load_dotenv()


class CompanyInfo(BaseModel):
    """Company domain lookup result"""
    domain: Optional[str] = Field(
        default=None,
        description="Company website domain WITHOUT https:// (e.g., 'vercel.com', 'stripe.com'). Return None if unknown or if it's a generic recruitment agency with no distinct brand."
    )
    is_recruitment_agency: bool = Field(
        default=False,
        description="True if this is a recruitment/staffing agency, false if it's a direct employer"
    )
    confidence: float = Field(
        default=0.0,
        description="Confidence score 0-1. Set low if guessing."
    )


# Create Pydantic AI agent
agent = Agent(
    'google-gla:gemini-2.0-flash',
    output_type=CompanyInfo,
    system_prompt="""You are a company domain lookup assistant. Given a company name, determine their website domain.

Rules:
1. Return the domain WITHOUT https:// or www (e.g., 'stripe.com' not 'https://www.stripe.com')
2. For well-known companies, provide the domain confidently
3. For recruitment agencies, still provide their domain if you know it (they have websites too)
4. If you're not sure, return None for domain and set confidence low
5. Common patterns:
   - "Company Ltd" → company.com or company.co.uk
   - "Company Inc" → company.com
   - Tech startups often use .io, .co, .dev domains
   - UK companies often use .co.uk
6. Recruitment agencies often have domains like:
   - recruitername.com
   - recruiternamerecruitment.com
   - recruitername.co.uk

Be accurate - it's better to return None than guess wrong."""
)


def get_db_connection():
    """Get database connection"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError("DATABASE_URL environment variable not set")
    return psycopg2.connect(database_url)


def get_companies_without_domains(conn, limit: int = 100) -> list[dict]:
    """Get unique company names that don't have domains"""
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("""
            SELECT DISTINCT company_name
            FROM jobs
            WHERE is_active = true
              AND company_domain IS NULL
              AND company_name IS NOT NULL
              AND company_name != ''
            ORDER BY company_name
            LIMIT %s
        """, (limit,))
        return [dict(row) for row in cur.fetchall()]


def update_company_domain(conn, company_name: str, domain: str, is_recruitment: bool):
    """Update all jobs for this company with the domain"""
    with conn.cursor() as cur:
        cur.execute("""
            UPDATE jobs
            SET company_domain = %s
            WHERE company_name = %s
        """, (domain, company_name))

        # Also mark if it's a recruitment agency (useful for filtering later)
        # We could add this column if needed
        return cur.rowcount


async def lookup_company(company_name: str) -> CompanyInfo:
    """Lookup a single company's domain"""
    result = await agent.run(f"What is the website domain for the company: {company_name}")
    return result.output


async def main(limit: int = 100, dry_run: bool = False):
    """Main processing function"""
    conn = get_db_connection()

    try:
        companies = get_companies_without_domains(conn, limit)
        print(f"\n{'='*60}")
        print(f"COMPANY DOMAIN LOOKUP")
        print(f"{'='*60}")
        print(f"Found {len(companies)} companies without domains")
        print(f"{'='*60}\n")

        success_count = 0
        skip_count = 0
        error_count = 0

        for i, company in enumerate(companies):
            name = company['company_name']
            print(f"\n[{i+1}/{len(companies)}] {name}")

            try:
                result = await lookup_company(name)

                if result.domain and result.confidence >= 0.5:
                    print(f"    ✓ Domain: {result.domain}")
                    print(f"    ✓ Confidence: {result.confidence:.0%}")
                    print(f"    ✓ Recruitment: {'Yes' if result.is_recruitment_agency else 'No'}")

                    if not dry_run:
                        rows = update_company_domain(conn, name, result.domain, result.is_recruitment_agency)
                        conn.commit()
                        print(f"    ✓ Updated {rows} jobs")
                    else:
                        print(f"    [DRY RUN] Would update jobs")

                    success_count += 1
                else:
                    print(f"    ○ No domain found (confidence: {result.confidence:.0%})")
                    skip_count += 1

            except Exception as e:
                print(f"    ✗ Error: {str(e)[:80]}")
                error_count += 1
                continue

        print(f"\n{'='*60}")
        print(f"COMPLETE: {success_count} updated, {skip_count} skipped, {error_count} errors")
        print(f"{'='*60}\n")

    finally:
        conn.close()


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Lookup company domains using AI')
    parser.add_argument('--limit', type=int, default=100, help='Max companies to process')
    parser.add_argument('--dry-run', action='store_true', help='Don\'t actually update database')

    args = parser.parse_args()

    print(f"\nStarting Company Domain Lookup...")
    print(f"Limit: {args.limit}, Dry run: {args.dry_run}")

    asyncio.run(main(limit=args.limit, dry_run=args.dry_run))
