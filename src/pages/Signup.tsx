import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import PasswordInput from "../components/PasswordInput";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const password = String(d.get("password"));
    if (password !== String(d.get("confirm")))
      return toast.error("Passwords do not match");
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: String(d.get("email")).trim(),
      password,
      options: {
        data: {
          full_name: String(d.get("name")).trim(),
          phone: String(d.get("phone")).trim(),
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    if (data.user && data.user.identities?.length === 0)
      return toast.error("This email is already registered. Please log in.");
    if (data.session) {
      toast.success("Account created");
      navigate("/profile");
    } else {
      toast.success("Check your email to confirm your account, then log in.");
      navigate("/login");
    }
  }
  return (
    <AuthShell
      title="Create account"
      sub="Join Ahad Barber Atelier in under a minute."
    >
      <form onSubmit={submit} className="grid gap-6">
        <input
          name="name"
          required
          placeholder="Full name"
          autoComplete="name"
          className="field"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          autoComplete="email"
          className="field"
        />
        <input
          name="phone"
          placeholder="Phone number (optional)"
          autoComplete="tel"
          className="field"
        />
        <PasswordInput
          name="password"
          placeholder="Password (min 8 characters)"
        />
        <PasswordInput name="confirm" placeholder="Confirm password" />
        <button disabled={busy} className="btn">
          {busy ? "CREATING..." : "SIGN UP"}
        </button>
      </form>
      <p className="mt-8 text-sm text-zinc-600">
        Already a member?{" "}
        <Link to="/login" className="link-line text-zinc-900">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
