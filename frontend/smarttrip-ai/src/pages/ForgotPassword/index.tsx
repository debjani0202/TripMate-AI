import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Backend password-reset flow will be connected later.
    setSubmitted(true);
  };

return (
  <main className="min-h-[calc(100vh-92px)] bg-[#f7f5f0] px-4 py-5 sm:px-6">
    <div className="flex min-h-[calc(100vh-135px)] items-center justify-center">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-[470px] overflow-hidden rounded-[1.35rem] border border-orange-100 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.07)]"
      >
        <div className="px-6 py-7 sm:px-7 sm:py-8">

          {/* Email Icon */}
          <div className="mb-3.5 flex justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-accent">
              <Mail className="h-5.5 w-5.5" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <p className="mb-1.5 text-xs font-medium text-accent">
              Account recovery
            </p>

            <h1 className="font-display text-[1.8rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[2rem]">
              Forgot your
              <br />
              password?
            </h1>

            <p className="mx-auto mt-2.5 max-w-[390px] text-xs leading-5 text-muted-foreground sm:text-sm">
              Enter the email address associated with your SmartTrip
              account and we'll help you reset your password.
            </p>
          </div>

          {/* Form / Success */}
          {submitted ? (
            <div className="mt-5 rounded-xl border border-green-200 bg-green-50/80 px-4 py-5 text-center">
              <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Sparkles className="h-5 w-5" />
              </div>

              <h2 className="font-display text-base font-semibold text-green-800">
                Check your email
              </h2>

              <p className="mx-auto mt-1.5 max-w-[370px] text-xs leading-5 text-green-700">
                If an account exists for {email}, you'll receive password
                reset instructions.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-5 space-y-3.5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium text-foreground sm:text-sm"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-xs outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 sm:text-sm"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-md sm:text-sm"
              >
                Send reset instructions

                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}

          {/* Back to Login */}
          <Link
            to="/login"
            className="mx-auto mt-4 flex w-fit items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-accent sm:text-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to login
          </Link>
        </div>
      </motion.section>
    </div>
  </main>
);
}
