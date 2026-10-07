import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import PasswordInput from "../components/PasswordInput";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";

export default function Reset() {
  const { session, loading } = useAuth();
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const password = String(d.get("password"));
    if (password !== String(d.get("confirm")))
      return toast.error("Passwords do not match");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    await supabase.auth.signOut();
    toast.success("Password updated. Please log in.");
    navigate("/login");
  }
  return (
    <AuthShell
      title="New password"
      sub="Choose a strong password you have not used before."
    >
      {loading ? null : session ? (
        <form onSubmit={submit} className="grid gap-6">
          <PasswordInput
            name="password"
            placeholder="New password (min 8 characters)"
          />
          <PasswordInput name="confirm" placeholder="Confirm new password" />
          <button disabled={busy} className="btn">
            {busy ? "SAVING..." : "SAVE PASSWORD"}
          </button>
        </form>
      ) : (
        <p className="border border-zinc-200 bg-zinc-50 p-6 text-zinc-700">
          This link has expired or was not opened from your email.{" "}
          <Link to="/forgot-password" className="link-line text-zinc-900">
            Request a new link
          </Link>
          .
        </p>
      )}
    </AuthShell>
  );
}
