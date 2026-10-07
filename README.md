# Ahad Barber Atelier

## Setup
1. Supabase project banao -> SQL Editor -> `supabase/schema.sql` paste karke Run.
2. Supabase -> Authentication -> Users -> Add user (apna email + password). Ye dashboard login hai.
3. Root `.env` me VITE_SUPABASE_URL aur VITE_SUPABASE_ANON_KEY daalo (Project Settings -> API).
4. `server/.env` me SUPABASE_URL aur SUPABASE_SERVICE_ROLE_KEY daalo.
5. Terminal 1: `npm install && npm run dev`  (http://localhost:5173)
6. Terminal 2: `cd server && npm install && npm start`  (http://localhost:4000)
