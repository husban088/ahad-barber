import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export const OWNER_EMAIL = "muhammadahadali2627@gmail.com";
type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isOwner: boolean;
};
const Ctx = createContext<AuthState>({
  session: null,
  user: null,
  loading: true,
  isOwner: false,
});
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  const user = session?.user ?? null;
  const isOwner = (user?.email ?? "").toLowerCase() === OWNER_EMAIL;
  return (
    <Ctx.Provider value={{ session, user, loading, isOwner }}>
      {children}
    </Ctx.Provider>
  );
}
