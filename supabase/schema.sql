-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scenarios table
CREATE TABLE IF NOT EXISTS scenarios (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  characters JSONB NOT NULL,
  conversation JSONB NOT NULL,
  correct_answer TEXT NOT NULL CHECK (correct_answer IN ('green', 'red')),
  feedback JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  scenario_id INTEGER REFERENCES scenarios(id) ON DELETE CASCADE NOT NULL,
  user_answer TEXT NOT NULL CHECK (user_answer IN ('green', 'red')),
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, scenario_id)
);

-- Create analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_scenario_id ON user_progress(scenario_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Scenarios policies (public read access)
CREATE POLICY "Anyone can view active scenarios" ON scenarios
  FOR SELECT USING (is_active = true);

-- User progress policies
CREATE POLICY "Users can view their own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Analytics events policies
CREATE POLICY "Users can view their own analytics" ON analytics_events
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics" ON analytics_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin policies (for admin@greenflag.com)
CREATE POLICY "Admin can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND email = 'admin@greenflag.com'
    )
  );

CREATE POLICY "Admin can view all progress" ON user_progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND email = 'admin@greenflag.com'
    )
  );

CREATE POLICY "Admin can view all analytics" ON analytics_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND email = 'admin@greenflag.com'
    )
  );

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scenarios_updated_at
  BEFORE UPDATE ON scenarios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample scenarios
INSERT INTO scenarios (title, description, characters, conversation, correct_answer, feedback) VALUES
(
  'Dress Code Drama',
  'A scenario about healthy communication regarding insecurities',
  '[
    {"name": "Priya", "profilePicture": "/characters/priya.jpg"},
    {"name": "Kabir", "profilePicture": "/characters/kabir.jpg"}
  ]',
  '[
    {"speaker": "Kabir", "text": "Hey Priya, can I say something honestly? I feel a little uncomfortable when people stare. I know it''s my own insecurity."},
    {"speaker": "Priya", "text": "Thanks for telling me. I feel confident in what I wear, but I''m glad we can talk about this."},
    {"speaker": "Kabir", "text": "I trust you — just working through my feelings."}
  ]',
  'green',
  '{
    "explanation": "It''s okay to feel insecure — what matters is how you communicate it, with respect.",
    "truthToKeep": "You can be vulnerable without being controlling.",
    "reflection": "Have you ever shared something uncomfortable without making it the other person''s fault?"
  }'
),
(
  'Secret Sharing',
  'A scenario about trust and confidentiality in relationships',
  '[
    {"name": "Rani", "profilePicture": "/characters/rani.jpg"},
    {"name": "Meena", "profilePicture": "/characters/meena.jpg"}
  ]',
  '[
    {"speaker": "Rani", "text": "You won''t believe what Priya told me. Full gossip!"},
    {"speaker": "Meena", "text": "Wait, didn''t she say that in confidence?"},
    {"speaker": "Rani", "text": "Yeah, but you''re my bestie. It''s fine!"}
  ]',
  'red',
  '{
    "explanation": "Sharing secrets without consent breaks trust.",
    "truthToKeep": "Being close to someone doesn''t mean breaking others'' trust.",
    "reflection": "What does it take to build broken trust?"
  }'
),
(
  'Love or Isolation?',
  'A scenario about controlling behavior and isolation',
  '[
    {"name": "Arjun", "profilePicture": "/characters/arjun.jpg"},
    {"name": "Diya", "profilePicture": "/characters/diya.jpg"}
  ]',
  '[
    {"speaker": "Arjun", "text": "I don''t want you hanging out with your friends anymore. They''re a bad influence."},
    {"speaker": "Diya", "text": "But they''re my closest friends. We''ve known each other for years."},
    {"speaker": "Arjun", "text": "If you really loved me, you''d choose me over them."}
  ]',
  'red',
  '{
    "explanation": "Isolating someone from their support system is a major red flag.",
    "truthToKeep": "Love should expand your world, not shrink it.",
    "reflection": "How do you feel when someone tries to control who you spend time with?"
  }'
),
(
  'Private Stalker',
  'A scenario about privacy invasion and trust',
  '[
    {"name": "Aman", "profilePicture": "/characters/aman.jpg"},
    {"name": "Reema", "profilePicture": "/characters/reema.jpg"}
  ]',
  '[
    {"speaker": "Aman", "text": "I went through your phone last night. I needed to know who you''re talking to."},
    {"speaker": "Reema", "text": "That''s a huge violation of my privacy. You can''t just go through my things."},
    {"speaker": "Aman", "text": "If you have nothing to hide, why are you so defensive?"}
  ]',
  'red',
  '{
    "explanation": "Invading privacy and justifying it with suspicion is controlling behavior.",
    "truthToKeep": "Trust is built through communication, not surveillance.",
    "reflection": "What would it feel like to have someone constantly monitoring your life?"
  }'
),
(
  'Fast Forward Intensity',
  'A scenario about rushing into commitments',
  '[
    {"name": "Tina", "profilePicture": "/characters/tina.jpg"},
    {"name": "Ravi", "profilePicture": "/characters/ravi.jpg"}
  ]',
  '[
    {"speaker": "Ravi", "text": "I love you so much. Let''s move in together next month."},
    {"speaker": "Tina", "text": "We''ve only been dating for two weeks. That''s way too fast."},
    {"speaker": "Ravi", "text": "When you know, you know. Don''t you feel the same way?"}
  ]',
  'red',
  '{
    "explanation": "Rushing into major commitments without mutual agreement is concerning.",
    "truthToKeep": "Healthy relationships develop at a pace comfortable for both people.",
    "reflection": "Why might someone want to rush into serious commitments?"
  }'
),
(
  'Good Vibes Only?',
  'A scenario about toxic positivity',
  '[
    {"name": "Varun", "profilePicture": "/characters/varun.jpg"},
    {"name": "Neha", "profilePicture": "/characters/neha.jpg"}
  ]',
  '[
    {"speaker": "Neha", "text": "I''m feeling really down about my job situation. Can we talk?"},
    {"speaker": "Varun", "text": "Come on, stay positive! You''re always so negative."},
    {"speaker": "Neha", "text": "I just need someone to listen right now."},
    {"speaker": "Varun", "text": "You''ll feel better if you just think happy thoughts."}
  ]',
  'red',
  '{
    "explanation": "Dismissing someone''s feelings with toxic positivity is invalidating.",
    "truthToKeep": "Real support means being present for all emotions, not just positive ones.",
    "reflection": "How do you feel when someone tells you to ''just be positive''?"
  }'
),
(
  'Jokes or Jabs?',
  'A scenario about gaslighting through humor',
  '[
    {"name": "Alok", "profilePicture": "/characters/alok.jpg"},
    {"name": "Rhea", "profilePicture": "/characters/rhea.jpg"}
  ]',
  '[
    {"speaker": "Alok", "text": "Haha, you''re so sensitive. It was just a joke!"},
    {"speaker": "Rhea", "text": "That didn''t feel like a joke. It felt mean."},
    {"speaker": "Alok", "text": "You can''t take a joke. Lighten up!"}
  ]',
  'red',
  '{
    "explanation": "Using ''just a joke'' to dismiss hurtful comments is gaslighting.",
    "truthToKeep": "Jokes should make both people laugh, not just one person.",
    "reflection": "What''s the difference between playful teasing and hurtful comments?"
  }'
),
(
  'Privacy Please',
  'A scenario about respecting boundaries',
  '[
    {"name": "Ishaan", "profilePicture": "/characters/ishaan.jpg"},
    {"name": "Zoya", "profilePicture": "/characters/zoya.jpg"}
  ]',
  '[
    {"speaker": "Zoya", "text": "I need some time alone to process my thoughts."},
    {"speaker": "Ishaan", "text": "Of course. Take all the time you need. I''m here when you''re ready."},
    {"speaker": "Zoya", "text": "Thank you for understanding. I really appreciate that."}
  ]',
  'green',
  '{
    "explanation": "Respecting someone''s need for space shows emotional maturity.",
    "truthToKeep": "Healthy relationships allow for individual needs and boundaries.",
    "reflection": "How do you feel when someone respects your need for space?"
  }'
),
(
  'All My Exes Were Crazy',
  'A scenario about taking responsibility in relationships',
  '[
    {"name": "Tanya", "profilePicture": "/characters/tanya.jpg"},
    {"name": "Sahil", "profilePicture": "/characters/sahil.jpg"}
  ]',
  '[
    {"speaker": "Sahil", "text": "All my exes were crazy. They all had issues."},
    {"speaker": "Tanya", "text": "That''s a lot of people with problems. What''s the common denominator?"},
    {"speaker": "Sahil", "text": "What are you trying to say?"}
  ]',
  'red',
  '{
    "explanation": "If everyone else is the problem, you might be the problem.",
    "truthToKeep": "Healthy people take responsibility for their role in relationship dynamics.",
    "reflection": "What patterns do you notice in your past relationships?"
  }'
),
(
  'I Don''t Do Feelings',
  'A scenario about emotional availability',
  '[
    {"name": "Riya", "profilePicture": "/characters/riya.jpg"},
    {"name": "Kunal", "profilePicture": "/characters/kunal.jpg"}
  ]',
  '[
    {"speaker": "Kunal", "text": "I don''t do feelings. I''m not emotional like that."},
    {"speaker": "Riya", "text": "But we''re in a relationship. Don''t you want to connect emotionally?"},
    {"speaker": "Kunal", "text": "I show love through actions, not words. That should be enough."}
  ]',
  'red',
  '{
    "explanation": "Refusing emotional intimacy while expecting physical/romantic connection is unfair.",
    "truthToKeep": "Emotional availability is essential for healthy relationships.",
    "reflection": "What does emotional intimacy mean to you?"
  }'
); 