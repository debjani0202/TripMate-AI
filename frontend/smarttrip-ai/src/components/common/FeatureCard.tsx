import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  description: string;
  ctaLabel: string;
  to: string;
  featured?: boolean;
  layout?: "tile" | "row";
}

export function FeatureCard({
  icon: Icon,
  iconClassName,
  title,
  description,
  ctaLabel,
  to,
  featured = false,
  layout = "tile",
}: FeatureCardProps) {
  if (layout === "row") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to={to}
          className="group flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-secondary"
        >
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${iconClassName}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium">{title}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`group flex h-full flex-col justify-between rounded-lg border border-border p-6 shadow-sm transition-shadow hover:shadow-md ${
        featured ? "bg-gradient-to-br from-primary/5 via-card to-card md:p-8" : "bg-card"
      }`}
    >
      <div>
        <div className={`inline-flex h-11 w-11 items-center justify-center rounded-md ${iconClassName}`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className={`mt-4 font-display font-semibold ${featured ? "text-2xl" : "text-lg"}`}>
          {title}
        </h3>
        <p className={`mt-2 text-muted-foreground ${featured ? "text-base" : "text-sm"}`}>
          {description}
        </p>
      </div>

      <Link
        to={to}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform group-hover:translate-x-0.5"
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}
