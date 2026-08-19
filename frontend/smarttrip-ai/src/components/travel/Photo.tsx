import { useState } from "react";
import { ImageOff } from "lucide-react";

interface PhotoProps {
  src: string;
  alt: string;
  className?: string;
}

export function Photo({ src, alt, className = "" }: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary to-accent/80 ${className}`}>
        <ImageOff className="h-6 w-6 text-primary-foreground/50" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
