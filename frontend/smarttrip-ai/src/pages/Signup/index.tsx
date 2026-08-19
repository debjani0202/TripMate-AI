import { FormEvent, useState } from "react";
import { Eye, EyeOff, ArrowRight, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import heroImage from "@/assets/images/destinations/bali.avif";
import { useAuth } from "@/context/AuthContext";

export function SignupPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    const formData = new FormData(event.currentTarget);

    const fullName = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    );

    // Check passwords before sending to backend.
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await register(fullName, email, password);

      // Registration successful.
      navigate("/login");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to create your account. Please try again.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl items-center py-4">
        <div className="grid w-full max-w-[920px] overflow-hidden rounded-[1.5rem] border border-orange-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)] lg:grid-cols-[1fr_1fr]">

          {/* LEFT IMAGE */}

          <motion.section
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative hidden h-[500px] overflow-hidden lg:block"
          >
            <img
              src={heroImage}
              alt="Beautiful travel destination"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            <div className="absolute left-7 top-7">
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                  ✦
                </span>
                SmartTrip AI
              </Link>
            </div>

            <div className="absolute bottom-8 left-7 right-7 text-white">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5" />
                Start your journey
              </div>

              <h1 className="font-display text-3xl font-semibold leading-tight">
                Your journey
                <br />
                starts here.
              </h1>

              <p className="mt-3 max-w-md text-xs leading-5 text-white/80">
                Create your SmartTrip account and let AI help you plan
                unforgettable journeys.
              </p>
            </div>
          </motion.section>

          {/* RIGHT SIGNUP */}

          <motion.section
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex h-[500px] items-start justify-center px-7 py-4 sm:px-9 lg:px-10"
          >
            <div className="w-full max-w-[430px] pt-2">

              <Link
                to="/"
                className="mb-5 flex items-center gap-2 text-lg font-semibold text-foreground lg:hidden"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  ✦
                </span>
                SmartTrip AI
              </Link>

              {/* HEADING */}

              <div className="text-center">
                <p className="mb-1.5 text-xs font-medium text-accent">
                  Create your account
                </p>

                <h2 className="font-display text-[1.75rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[2rem]">
                  Start your
                  <br />
                  SmartTrip journey.
                </h2>

                <p className="mx-auto mt-2.5 max-w-[390px] text-xs leading-5 text-muted-foreground">
                  Create an account and start planning personalized trips
                  with your AI travel assistant.
                </p>
              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="mt-4 space-y-2.5"
              >

                {/* Full name */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-xs font-medium text-foreground"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-xs font-medium text-foreground"
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
                    className="h-10 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                {/* Password */}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1 block text-xs font-medium text-foreground"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      placeholder="Create a password"
                      className="h-10 w-full rounded-xl border border-border bg-background px-4 pr-12 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
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
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1 block text-xs font-medium text-foreground"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      required
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      className="h-10 w-full rounded-xl border border-border bg-background px-4 pr-12 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />

                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}

                {error && (
                  <p className="text-center text-xs font-medium text-red-500">
                    {error}
                  </p>
                )}

                {/* Create account */}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Creating account..." : "Create account"}

                  {!isLoading && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </form>

              {/* LOGIN LINK */}

              <div className="my-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />

                <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                  Already have an account?
                </span>

                <div className="h-px flex-1 bg-border" />
              </div>

              <Link
                to="/login"
                className="flex h-10 w-full items-center justify-center rounded-xl border border-border text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                Sign in
              </Link>

              <p className="mt-2.5 text-center text-[10px] leading-4 text-muted-foreground">
                By creating an account, you agree to SmartTrip AI's
                Terms of Service and Privacy Policy.
              </p>

            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}