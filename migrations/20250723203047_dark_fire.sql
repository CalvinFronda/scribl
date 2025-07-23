/*
  # Create prompts table for daily writing prompts

  1. New Tables
    - `prompts`
      - `id` (uuid, primary key)
      - `prompt_text` (text, the writing prompt content)
      - `date` (date, the specific date this prompt is active)
      - `created_at` (timestamp)
      - `is_active` (boolean, whether this prompt is currently active)

  2. Security
    - Enable RLS on `prompts` table
    - Add policy for public read access to prompts
    - Add policy for admin insert/update (using service role)

  3. Indexes
    - Index on date for efficient daily prompt queries
    - Index on is_active for quick active prompt lookup
*/

CREATE TABLE IF NOT EXISTS prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_text text NOT NULL,
  date date NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT false
);

ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

-- Public read access to prompts
CREATE POLICY "Anyone can read prompts"
  ON prompts
  FOR SELECT
  TO public
  USING (true);

-- Only authenticated users can insert prompts (for seeding)
CREATE POLICY "Authenticated users can insert prompts"
  ON prompts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_prompts_date ON prompts(date);
CREATE INDEX IF NOT EXISTS idx_prompts_active ON prompts(is_active) WHERE is_active = true;

-- Insert some initial prompts
INSERT INTO prompts (prompt_text, date, is_active) VALUES
  ('Write about a character who discovers an old letter that changes everything they thought they knew about their family.', CURRENT_DATE, true),
  ('Describe a world where colors have sounds and sounds have tastes. What would a rainbow symphony taste like?', CURRENT_DATE + INTERVAL '1 day', false),
  ('Write a story that begins with the line: "The last library on Earth was about to close forever."', CURRENT_DATE + INTERVAL '2 days', false),
  ('Create a character who can only tell the truth for 24 hours. What happens?', CURRENT_DATE + INTERVAL '3 days', false),
  ('Write about a place where lost things go. What would you find there?', CURRENT_DATE + INTERVAL '4 days', false),
  ('Describe a conversation between the last two people on Earth.', CURRENT_DATE + INTERVAL '5 days', false),
  ('Write about someone who wakes up with the ability to hear plants thinking.', CURRENT_DATE + INTERVAL '6 days', false);