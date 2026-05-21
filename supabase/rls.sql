-- Row level security policies

-- Enable RLS on all tables
alter table public.users_profile enable row level security;
alter table public.program_profiles enable row level security;
alter table public.document_reviews enable row level security;
alter table public.financial_reviews enable row level security;
alter table public.interview_sessions enable row level security;
alter table public.final_reports enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.document_attachments enable row level security;
alter table public.applications enable row level security;
alter table public.tasks enable row level security;
alter table public.consultant_review_requests enable row level security;
alter table public.audit_logs enable row level security;

-- Allow users to see and manage their own records
create policy "Users can view own profile" on public.users_profile
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users_profile
  for update using (auth.uid() = id);

create policy "Users can manage own program profiles" on public.program_profiles
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own document reviews" on public.document_reviews
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own financial reviews" on public.financial_reviews
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own interview sessions" on public.interview_sessions
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own final reports" on public.final_reports
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own chat sessions" on public.chat_sessions
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own chat messages" on public.chat_messages
  using (auth.uid() in (select user_id from public.chat_sessions where id = session_id))
  with check (auth.uid() in (select user_id from public.chat_sessions where id = session_id));

create policy "Users can manage own document attachments" on public.document_attachments
  using (auth.uid() in (select user_id from public.document_reviews where id = review_id))
  with check (auth.uid() in (select user_id from public.document_reviews where id = review_id));

create policy "Users can manage own applications" on public.applications
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own tasks" on public.tasks
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage own consultant requests" on public.consultant_review_requests
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can view own audit logs" on public.audit_logs
  for select using (auth.uid() = user_id);

-- Admin role
create policy "Admin can access everything" on all tables for all using (
  exists (
    select 1 from public.users_profile as up where up.id = auth.uid() and up.role = 'admin'
  )
);