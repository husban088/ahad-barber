import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AuthProvider } from "./lib/auth";
import { envOk } from "./lib/supabase";
import "./index.css";

class Boundary extends React.Component<
  { children: React.ReactNode },
  { err: Error | null }
> {
  state: { err: Error | null } = { err: null };
  static getDerivedStateFromError(err: Error) {
    return { err };
  }
  render() {
    if (this.state.err) {
      return (
        <div style={{ padding: 24, fontFamily: "sans-serif" }}>
          <h2>Something went wrong</h2>
          <pre style={{ whiteSpace: "pre-wrap", color: "#b91c1c" }}>
            {this.state.err.message}
          </pre>
          <button onClick={() => location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Boundary>
      <BrowserRouter>
        <AuthProvider>
          {!envOk && (
            <div
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                background: "#b91c1c",
                color: "#fff",
                padding: "10px 16px",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Supabase keys missing: open .env in the main folder, set
              VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart npm run
              dev.
            </div>
          )}
          <App />
        </AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: { background: "#18181b", color: "#fff", borderRadius: 0 },
          }}
        />
      </BrowserRouter>
    </Boundary>
  </React.StrictMode>,
);
