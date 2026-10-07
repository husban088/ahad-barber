import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { supabase, API_URL } from "../lib/supabase";
import { useAuth } from "../lib/auth";

export default function Profile() {
  const { user, session, loading, isOwner } = useAuth();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState(false);
  if (loading) return null;
  if (!user || !session) return <Navigate to="/login" replace />;
  const m = user.user_metadata || {};
  const name = String(m.full_name || "Guest");
  const fmt = (v?: string) =>
    v
      ? new Date(v).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "-";
  const rows: [string, string][] = [
    ["Full name", name],
    ["Email", user.email || "-"],
    ["Phone", String(m.phone || "Not added")],
    ["City", String(m.city || "Not added")],
    ["About", String(m.bio || "Not added")],
    ["Member since", fmt(user.created_at)],
    ["Last login", fmt(user.last_sign_in_at)],
  ];

  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: String(d.get("name")).trim(),
        phone: String(d.get("phone")).trim(),
        city: String(d.get("city")).trim(),
        bio: String(d.get("bio")).trim(),
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Profile updated");
    setEdit(false);
  }
  async function logout() {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate("/");
  }
  async function remove() {
    setBusy(true);
    try {
      const r = await fetch(`${API_URL}/api/account`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session!.access_token}` },
      });
      if (!r.ok)
        throw new Error((await r.json()).error || "Could not delete account");
      try {
        await supabase.auth.signOut();
      } catch {
        /* user already removed */
      }
      toast.success("Your account was deleted");
      navigate("/");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not delete account",
      );
    } finally {
      setBusy(false);
      setConfirm(false);
    }
  }

  return (
    <>
      <div className="pole" />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex animate-pop flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-navy font-display text-5xl text-white ring-4 ring-white ring-offset-4 ring-offset-zinc-200 transition duration-500 hover:scale-105 hover:rotate-3">
            {name[0].toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-5xl text-zinc-900">{name}</h1>
            <p className="mt-1 text-zinc-600">
              {user.email}
              {isOwner && (
                <span className="ml-3 border border-navy px-2 py-0.5 text-xs text-navy">
                  Owner
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-12 border border-zinc-200 bg-white p-8 shadow-sm transition duration-500 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl text-zinc-900">
              Your details
            </h2>
            {!edit && (
              <button
                onClick={() => setEdit(true)}
                className="link-line text-sm tracking-widest"
              >
                EDIT PROFILE
              </button>
            )}
          </div>
          {edit ? (
            <form onSubmit={save} className="mt-8 grid gap-6 sm:grid-cols-2">
              <input
                name="name"
                required
                defaultValue={String(m.full_name || "")}
                placeholder="Full name"
                className="field"
              />
              <input
                name="phone"
                defaultValue={String(m.phone || "")}
                placeholder="Phone number"
                className="field"
              />
              <input
                name="city"
                defaultValue={String(m.city || "")}
                placeholder="City"
                className="field"
              />
              <input
                value={user.email || ""}
                disabled
                className="field text-zinc-400"
                readOnly
              />
              <textarea
                name="bio"
                rows={3}
                defaultValue={String(m.bio || "")}
                placeholder="About you"
                className="field resize-none sm:col-span-2"
              />
              <div className="flex gap-4 sm:col-span-2">
                <button disabled={busy} className="btn">
                  {busy ? "SAVING..." : "UPDATE PROFILE"}
                </button>
                <button
                  type="button"
                  onClick={() => setEdit(false)}
                  className="link-line text-sm tracking-widest text-zinc-500"
                >
                  CANCEL
                </button>
              </div>
            </form>
          ) : (
            <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {rows.map(([k, v]) => (
                <div key={k} className="border-b border-zinc-100 pb-3">
                  <dt className="text-xs tracking-widest text-zinc-500">{k}</dt>
                  <dd className="mt-1 break-words text-zinc-900">{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-zinc-200 p-8 transition duration-500 hover:shadow-xl">
          <div>
            <h2 className="font-display text-2xl text-zinc-900">Account</h2>
            <p className="text-sm text-zinc-600">
              Log out here, or remove your account for good.
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={logout} className="btn">
              LOG OUT
            </button>
            <button
              onClick={() => setConfirm(true)}
              className="border border-zinc-300 px-6 py-3 text-sm tracking-widest text-zinc-700 transition duration-500 hover:border-red-600 hover:bg-red-600 hover:text-white"
            >
              DELETE ACCOUNT
            </button>
          </div>
        </div>
      </section>

      <Modal open={confirm} onClose={() => !busy && setConfirm(false)}>
        <h2 className="font-display text-3xl text-zinc-900">
          Delete your account?
        </h2>
        <p className="mt-3 text-zinc-600">
          This permanently removes your account and profile. It cannot be
          undone.
        </p>
        <div className="mt-8 flex gap-4">
          <button
            disabled={busy}
            onClick={remove}
            className="bg-red-600 px-6 py-3 text-sm tracking-widest text-white transition duration-300 hover:bg-red-700 disabled:opacity-50"
          >
            {busy ? "DELETING..." : "CONFIRM"}
          </button>
          <button
            disabled={busy}
            onClick={() => setConfirm(false)}
            className="border border-zinc-300 px-6 py-3 text-sm tracking-widest transition duration-300 hover:bg-zinc-100"
          >
            CANCEL
          </button>
        </div>
      </Modal>
    </>
  );
}
