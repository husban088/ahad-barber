-- Dashboard data sirf owner email dekh/badal sakta hai (signup users nahi)
drop policy if exists "owner reads bookings" on public.bookings;
drop policy if exists "owner updates bookings" on public.bookings;
drop policy if exists "owner reads messages" on public.messages;

create policy "owner reads bookings" on public.bookings for select to authenticated
  using (lower(auth.jwt() ->> 'email') = 'muhammadahadali2627@gmail.com');
create policy "owner updates bookings" on public.bookings for update to authenticated
  using (lower(auth.jwt() ->> 'email') = 'muhammadahadali2627@gmail.com');
create policy "owner reads messages" on public.messages for select to authenticated
  using (lower(auth.jwt() ->> 'email') = 'muhammadahadali2627@gmail.com');