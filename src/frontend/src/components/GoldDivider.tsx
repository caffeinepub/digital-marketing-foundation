interface GoldDividerProps {
  className?: string;
}

export default function GoldDivider({ className = "" }: GoldDividerProps) {
  return (
    <div
      className={`w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent my-8 ${className}`}
    />
  );
}
