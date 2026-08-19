import { Link } from "react-router-dom";
import { Facebook, Instagram, Plane, Twitter } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Plan a Trip", to: "/plan-trip" },
      { label: "My Trips", to: "/trips" },
      { label: "Recommendations", to: "/recommendations" },
      { label: "Safety", to: "/safety" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Travel Guides", to: "/blog" },
      { label: "Help", to: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/" },
      { label: "Contact", to: "/" },
      { label: "Privacy", to: "/" },
      { label: "Terms", to: "/" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Twitter", href: "#", Icon: Twitter },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "Facebook", href: "#", Icon: Facebook },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-semibold">
            <Plane className="h-5 w-5 text-accent" />
            SmartTrip AI
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Your journey, planned by a team of AI travel specialists.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold">{column.title}</h3>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} SmartTrip AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
