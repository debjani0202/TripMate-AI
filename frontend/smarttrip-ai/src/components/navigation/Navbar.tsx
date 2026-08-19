import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Plane, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Plan a Trip", to: "/plan-trip" },
  { label: "My Trips", to: "/trips" },
  { label: "Discover", to: "/discover" },
  { label: "Blog", to: "/blog" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled();
  const { pathname } = useLocation();

  const transparent = pathname === "/" && !scrolled && !mobileOpen;

  // TODO: Replace this with the real logged-in user's profile photo
  // when authentication is connected.
  const profilePhoto = null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-background/80 backdrop-blur-md",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 font-display text-lg font-semibold"
        >
          <Plane className="h-5 w-5 text-accent" />
          SmartTrip AI
        </NavLink>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-foreground",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Dark / Light mode */}
          <ThemeToggle />

          {/* Profile */}
          <Button
            variant="ghost"
            size="icon"
            asChild
            aria-label="Profile"
            className="overflow-hidden rounded-full"
          >
            <NavLink to="/profile">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
            </NavLink>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="container flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground",
                    isActive && "bg-secondary text-foreground",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}

            <NavLink
              to="/profile"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground",
                  isActive && "bg-secondary text-foreground",
                )
              }
            >
              Profile
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}