interface ComingSoonProps {
  title: string;
  description: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-3 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">{title}</h1>
      <p className="max-w-md text-muted-foreground">{description}</p>
    </div>
  );
}
