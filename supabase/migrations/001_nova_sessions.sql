-- Create nova_sessions table for persisting Nova chat conversations
create table public.nova_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text unique not null,
  started_at timestamptz default now(),
  completed_at timestamptz,
  messages jsonb not null default '[]'::jsonb,
  email text,
  booked boolean default false,
  business_context jsonb,
  user_agent text,
  ip_hash text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create indexes
create index idx_nova_sessions_session_id on public.nova_sessions (session_id);
create index idx_nova_sessions_created_at_desc on public.nova_sessions (created_at desc);
create index idx_nova_sessions_email_partial on public.nova_sessions (email) where email is not null;

-- Enable RLS
alter table public.nova_sessions enable row level security;

-- RLS policies: deny all to anon, allow all to service_role
create policy "deny_anon_read" on public.nova_sessions
  for select to anon
  using (false);

create policy "deny_anon_insert" on public.nova_sessions
  for insert to anon
  with check (false);

create policy "deny_anon_update" on public.nova_sessions
  for update to anon
  using (false);

create policy "deny_anon_delete" on public.nova_sessions
  for delete to anon
  using (false);

create policy "allow_service_role_all" on public.nova_sessions
  for all to service_role
  using (true)
  with check (true);

-- Create function to automatically update updated_at
create or replace function public.update_nova_sessions_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger to call update function
create trigger nova_sessions_updated_at_trigger
  before update on public.nova_sessions
  for each row
  execute function public.update_nova_sessions_updated_at();
