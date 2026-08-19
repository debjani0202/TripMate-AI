import { FormEvent, useState } from "react";
import { Eye, EyeOff, ArrowRight, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import heroImage from "@/assets/images/destinations/bali.avif";
import { useAuth } from "@/context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#f7f5f0] px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full max-w-[880px] overflow-hidden rounded-[1.5rem] border border-orange-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)] lg:h-[440px] lg:grid-cols-[1fr_1fr]">

          {/* ==================== LEFT IMAGE ==================== */}

          <motion.section
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative hidden h-[440px] overflow-hidden lg:block"
          >
            <img
              src={heroImage}
              alt="Beautiful travel destination"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Logo */}
            <div className="absolute left-7 top-7">
              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-semibold text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                  ✦
                </span>

                SmartTrip AI
              </Link>
            </div>

            {/* Image content */}
            <div className="absolute bottom-7 left-7 right-7 text-white">

              <div className="mb-2.5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm backdrop-blur-md">
                <MapPin className="h-4 w-4" />
                Discover your next journey
              </div>

              <h1 className="max-w-md font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Your next adventure
                <br />
                starts here.
              </h1>

              <p className="mt-2.5 max-w-md text-sm leading-5 text-white/80">
                Plan smarter, discover incredible destinations, and let
                SmartTrip AI create a journey made for you.
              </p>

            </div>
          </motion.section>

          {/* ==================== RIGHT LOGIN ==================== */}

          <motion.section
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex h-auto min-h-[440px] items-center justify-center px-6 py-5 sm:px-8 lg:h-[440px] lg:px-9 lg:py-5"
          >
            <div className="w-full max-w-[400px]">

              {/* Mobile branding */}
              <Link
                to="/"
                className="mb-5 flex items-center gap-2 text-xl font-semibold text-foreground lg:hidden"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  ✦
                </span>

                SmartTrip AI
              </Link>

              {/* ==================== HEADING ==================== */}

              <div className="text-center">

                <p className="mb-1 text-sm font-medium text-accent">
                  Welcome back
                </p>

                <h2 className="font-display text-[1.9rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[2rem]">
                  Sign in to your
                  <br />
                  SmartTrip account.
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-5 text-muted-foreground">
                  Continue planning personalized journeys with your AI travel
                  assistant.
                </p>

              </div>

              {/* ==================== LOGIN FORM ==================== */}

              <form
                onSubmit={handleSubmit}
                className="mt-3 space-y-2.5"
              >

                {/* Email */}
                <div>

                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-foreground"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-10.5 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />

                </div>

                {/* Password */}
                <div>

                  <div className="mb-1 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-foreground"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-medium text-accent transition hover:underline"
                    >
                      Forgot password?
                    </Link>

                  </div>

                  <div className="relative">

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="h-10.5 w-full rounded-xl border border-border bg-background px-4 pr-12 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>

                  </div>

                </div>

                {/* Error */}
                {error && (
                  <p className="rounded-lg bg-destructive/10 px-3 py-1.5 text-center text-xs text-destructive">
                    {error}
                  </p>
                )}

                {/* Sign in */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-10.5 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}

                  {!isSubmitting && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>

              </form>

              {/* ==================== DIVIDER ==================== */}

              <div className="my-3 flex items-center gap-4">

                <div className="h-px flex-1 bg-border" />

                <span className="whitespace-nowrap text-xs text-muted-foreground">
                  New to SmartTrip?
                </span>

                <div className="h-px flex-1 bg-border" />

              </div>

              {/* ==================== CREATE ACCOUNT ==================== */}

              <Link
                to="/signup"
                className="flex h-10.5 w-full items-center justify-center rounded-xl border border-border text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                Create an account
              </Link>

              {/* ==================== TERMS ==================== */}

              <p className="mt-2 text-center text-[10px] leading-4 text-muted-foreground">
                By continuing, you agree to SmartTrip AI's Terms of Service
                and Privacy Policy.
              </p>

            </div>
          </motion.section>

        </div>
      </div>
    </main>
  );
}