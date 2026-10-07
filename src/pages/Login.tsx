import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import PasswordInput from "../components/PasswordInput";
import { supabase } from "../lib/supabase";
import { OWNER_EMAIL } from "../lib/auth";

export default function Login() {
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const email = String(d.get("email")).trim();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: String(d.get("password")),
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
    navigate(email.toLowerCase() === OWNER_EMAIL ? "/dashboard" : "/profile");
  }
  return (
    <AuthShell
      title="Welcome back"
      sub="Log in to manage your profile and bookings."
    >
      <form onSubmit={submit} className="grid gap-6">
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          autoComplete="email"
          className="field"
        />
        <PasswordInput name="password" placeholder="Password" />
        <Link
          to="/forgot-password"
          className="link-line justify-self-end text-sm text-zinc-500"
        >
          Forgot password?
        </Link>
        <button disabled={busy} className="btn">
          {busy ? "LOGGING IN..." : "LOG IN"}
        </button>
      </form>
      <p className="mt-8 text-sm text-zinc-600">
        New here?{" "}
        <Link to="/signup" className="link-line text-zinc-900">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
