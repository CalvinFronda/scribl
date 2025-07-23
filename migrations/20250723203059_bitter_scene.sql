/*
  # Create responses table for user submissions

  1. New Tables
    - `responses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `prompt_id` (uuid, foreign key to prompts)
      - `response_text` (text, the user's written response)
      - `is_public` (boolean, whether response can be shown publicly)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `responses` table
    - Add policy for users to read their own responses
    - Add policy for public read access to public responses
    - Add policy for users to insert/update their own responses

  3. Constraints
    - Unique constraint on user_id + prompt_id (one response per user per prompt)
    - Foreign key constraints for data integrity
*/

CREATE TABLE IF NOT EXISTS responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  prompt_id uuid REFERENCES prompts(id) ON DELETE CASCADE NOT NULL,
  response_text text NOT NULL,
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, prompt_id)
);

ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Users can read their own responses
CREATE POLICY "Users can read own responses"
  ON responses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Public can read public responses (anonymized)
CREATE POLICY "Anyone can read public responses"
  ON responses
  FOR SELECT
  TO public
  USING (is_public = true);

-- Users can insert their own responses
CREATE POLICY "Users can insert own responses"
  ON responses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own responses
CREATE POLICY "Users can update own responses"
  ON responses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_responses_user_id ON responses(user_id);
CREATE INDEX IF NOT EXISTS idx_responses_prompt_id ON responses(prompt_id);
CREATE INDEX IF NOT EXISTS idx_responses_public ON responses(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_responses_created_at ON responses(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_responses_updated_at 
    BEFORE UPDATE ON responses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();