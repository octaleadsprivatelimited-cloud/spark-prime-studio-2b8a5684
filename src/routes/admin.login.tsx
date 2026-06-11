import { useState, FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { adminSignIn, useAuthUser } from "../lib/adminAuth";
import { PageHead } from "../components/PageHead";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="min-h-screen" />;
  if (user) return <Navigate to="/admin" replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await adminSignIn(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg.replace("Firebase: ", ""));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHead title="Admin Login — Nataraj Electricals" description="Admin login" />
      <div className="flex min-h-screen items-center justify-center bg-surface-elevated px-4">
        <form onSubmit={onSubmit} className="w-full max-w-sm rounded-lg border border-border bg-card p-8 shadow-sm">
          <h1 className="font-heading text-2xl font-extrabold text-foreground">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage website content.</p>
          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-brand-red"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-brand-red"
              />
            </label>
          </div>
          {error && <p className="mt-3 rounded bg-brand-red/10 px-3 py-2 text-xs text-brand-red">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary mt-6 w-full justify-center disabled:opacity-50"
          >
            {submitting ? "Signing in…" : "Sign In"}
          </button>
          <p className="mt-4 text-xs text-muted-foreground">
            Create the admin user in Firebase Console → Authentication → Users.
          </p>
        </form>
      </div>
    </>
  );
}