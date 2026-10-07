import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { supabase } from "../lib/supabase";

export default function Forgot() {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email")).trim();
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    setSent(true);
    toast.success("Reset link sent. Check your email.");
  }
  return (
    <AuthShell
      title="Forgot password"
      sub="Enter your email and we will send a link to set a new password."
    >
      {sent ? (
        <p className="border border-zinc-200 bg-zinc-50 p-6 text-zinc-700">
          If that email has an account, a reset link is on its way. Open it on
          this device to choose a new password.
        </p>
      ) : (
        <form onSubmit={submit} className="grid gap-6">
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            className="field"
          />
          <button disabled={busy} className="btn">
            {busy ? "SENDING..." : "SEND RESET LINK"}
          </button>
        </form>
      )}
      <p className="mt-8 text-sm text-zinc-600">
        <Link to="/login" className="link-line text-zinc-900">
          Back to login
        </Link>
      </p>
    </AuthShell>
  );
}
