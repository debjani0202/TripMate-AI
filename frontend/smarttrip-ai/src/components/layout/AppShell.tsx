import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();

  const isPlanTripPage = location.pathname === "/plan-trip";

  if (isPlanTripPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}