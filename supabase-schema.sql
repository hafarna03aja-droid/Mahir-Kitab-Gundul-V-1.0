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

-- Policy: Users can view their own history
CREATE POLICY "Users can view own history"
  ON analysis_history FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own history
CREATE POLICY "Users can insert own history"
  ON analysis_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Allow anonymous users to insert (optional)
CREATE POLICY "Allow anonymous insert"
  ON analysis_history FOR INSERT
  WITH CHECK (true);
