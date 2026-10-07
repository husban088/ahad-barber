create extension if not exists "pgcrypto";

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  service text not null,
  date date not null,
  time time not null,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;
alter table public.messages enable row level security;

-- Public visitors can only create bookings
create policy "public can book" on public.bookings for insert to anon with check (true);
-- Only the logged-in owner can read and manage
create policy "owner reads bookings" on public.bookings for select to authenticated using (true);
create policy "owner updates bookings" on public.bookings for update to authenticated using (true);
create policy "owner reads messages" on public.messages for select to authenticated using (true);
-- Messages are inserted by the Node server with the service role key (bypasses RLS)
