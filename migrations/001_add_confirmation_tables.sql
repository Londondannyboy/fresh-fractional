-- Migration: Add human-in-the-loop confirmation tables
-- Date: 2025-12-16
-- Description: Tables for storing user job interests and preferences

-- User job interests table
CREATE TABLE IF NOT EXISTS user_job_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  job_id TEXT NOT NULL,
  interest_level TEXT NOT NULL CHECK (interest_level IN ('interested', 'applied', 'interviewing', 'offered', 'rejected')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_job_interests_user_id ON user_job_interests(user_id);
CREATE INDEX IF NOT EXISTS idx_user_job_interests_job_id ON user_job_interests(job_id);
CREATE INDEX IF NOT EXISTS idx_user_job_interests_interest_level ON user_job_interests(interest_level);
CREATE INDEX IF NOT EXISTS idx_user_job_interests_created_at ON user_job_interests(created_at DESC);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  preference_type TEXT NOT NULL CHECK (preference_type IN ('role', 'location', 'day_rate', 'work_type', 'industry')),
  values JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, preference_type)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_type ON user_preferences(preference_type);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_user_job_interests_updated_at
  BEFORE UPDATE ON user_job_interests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE user_job_interests IS 'Stores user interest in specific jobs (saved, applied, etc)';
COMMENT ON TABLE user_preferences IS 'Stores user career preferences (roles, locations, rates, etc)';
COMMENT ON COLUMN user_job_interests.interest_level IS 'Stage of interest: interested, applied, interviewing, offered, rejected';
COMMENT ON COLUMN user_preferences.preference_type IS 'Type of preference: role, location, day_rate, work_type, industry';
COMMENT ON COLUMN user_preferences.values IS 'JSON array of preference values';
