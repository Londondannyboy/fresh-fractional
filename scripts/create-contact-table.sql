-- Contact Submissions Table
-- Run this in your Neon database console

CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  submission_type VARCHAR(20) NOT NULL,  -- 'candidate' or 'company'
  full_name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  company_website VARCHAR(500),
  current_role VARCHAR(255),
  linkedin_url VARCHAR(500),
  phone VARCHAR(50),
  job_title VARCHAR(255),
  message TEXT,
  newsletter_opt_in BOOLEAN DEFAULT FALSE,
  schedule_call BOOLEAN DEFAULT FALSE,
  site VARCHAR(50) DEFAULT 'fractional',  -- 'fractional', 'interim', 'part-time'
  created_at TIMESTAMP DEFAULT NOW(),
  processed_at TIMESTAMP,
  notes TEXT
);

-- Index for querying by site
CREATE INDEX IF NOT EXISTS idx_contact_submissions_site ON contact_submissions(site);

-- Index for querying unprocessed submissions
CREATE INDEX IF NOT EXISTS idx_contact_submissions_unprocessed
ON contact_submissions(created_at) WHERE processed_at IS NULL;
