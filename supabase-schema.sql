-- Tabel untuk menyimpan history analisis
CREATE TABLE analysis_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  original_text TEXT NOT NULL,
  vocalized_text TEXT NOT NULL,
  translation TEXT NOT NULL,
  irab_analysis JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk performa
CREATE INDEX idx_analysis_history_user_id ON analysis_history(user_id);
CREATE INDEX idx_analysis_history_created_at ON analysis_history(created_at DESC);

-- Enable Row Level Security
ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to select all (for demo purposes)
-- In production, you might want to restrict this
CREATE POLICY "Allow anonymous select"
  ON analysis_history FOR SELECT
  USING (true);

-- Policy: Allow anonymous users to insert (for demo purposes)
CREATE POLICY "Allow anonymous insert"
  ON analysis_history FOR INSERT
  WITH CHECK (true);

-- Policy: Allow anonymous users to delete (for clearing history)
CREATE POLICY "Allow anonymous delete"
  ON analysis_history FOR DELETE
  USING (true);

-- Optional: Policy for authenticated users can view their own history
-- CREATE POLICY "Users can view own history"
--   ON analysis_history FOR SELECT
--   USING (auth.uid() = user_id);

-- Optional: Policy for authenticated users can insert their own history
-- CREATE POLICY "Users can insert own history"
--   ON analysis_history FOR INSERT
--   WITH CHECK (auth.uid() = user_id);
