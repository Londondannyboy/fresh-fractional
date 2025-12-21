-- Candidate Profiles Table for self-service registration
CREATE TABLE IF NOT EXISTS candidate_profiles (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  slug VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  headline VARCHAR(255),
  bio TEXT,
  photo_url VARCHAR(500),
  role_categories TEXT[] DEFAULT '{}',
  industries TEXT[] DEFAULT '{}',
  specialisms TEXT[] DEFAULT '{}',
  years_experience INTEGER,
  day_rate_min INTEGER,
  day_rate_max INTEGER,
  availability VARCHAR(50),
  work_preference VARCHAR(50),
  based_in VARCHAR(100),
  timezone VARCHAR(50),
  linkedin_url VARCHAR(500),
  website_url VARCHAR(500),
  is_public BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  profile_status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_candidate_profiles_slug ON candidate_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_user_id ON candidate_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_candidate_profiles_public ON candidate_profiles(is_public) WHERE is_public = true;
