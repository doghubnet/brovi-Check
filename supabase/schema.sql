-- Tables for Brovi Check

-- Users profile table
create table if not exists public.users_profile (
  id uuid primary key references auth.users on delete cascade,
  first_name text,
  last_name text,
  preferred_language text,
  role text default 'user',
  created_at timestamp with time zone default now()
);

-- Program profiles
create table if not exists public.program_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id),
  target_country text,
  study_level text,
  current_education_level text,
  field_of_study text,
  gpa numeric,
  english_level text,
  budget_range text,
  preferred_intake text,
  work_experience text,
  scholarship_need boolean,
  available_documents jsonb,
  score numeric,
  created_at timestamp with time zone default now()
);

-- Document reviews
create table if not exists public.document_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id),
  data jsonb,
  score numeric,
  created_at timestamp with time zone default now()
);

-- Financial reviews
create table if not exists public.financial_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id),
  data jsonb,
  score numeric,
  created_at timestamp with time zone default now()
);

-- Interview sessions
create table if not exists public.interview_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id),
  question text,
  answer text,
  feedback jsonb,
  score numeric,
  created_at timestamp with time zone default now()
);

-- Final reports
create table if not exists public.final_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id),
  data jsonb,
  score numeric,
  created_at timestamp with time zone default now()
);

-- Chat sessions
create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id),
  created_at timestamp with time zone default now()
);

-- Chat messages
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.chat_sessions(id) on delete cascade,
  role text,
  content text,
  created_at timestamp with time zone default now()
);

-- Document attachments
create table if not exists public.document_attachments (
  id uuid primary key default gen_random_uuid(),
  review_id uuid references public.document_reviews(id) on delete cascade,
  filename text,
  url text,
  created_at timestamp with time zone default now()
);

-- Applications
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id),
  program_profile_id uuid references public.program_profiles(id),
  status text,
  notes text,
  created_at timestamp with time zone default now()
);

-- Tasks
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id),
  title text,
  due_date date,
  status text,
  priority text,
  created_at timestamp with time zone default now()
);

-- Consultant review requests
create table if not exists public.consultant_review_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id),
  review_type text,
  urgency text,
  notes text,
  contact_preference text,
  created_at timestamp with time zone default now()
);

-- Audit logs
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id),
  action text,
  metadata jsonb,
  created_at timestamp with time zone default now()
);