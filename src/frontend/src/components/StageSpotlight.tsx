export default function StageSpotlight() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(60% 0.25 230 / 0.06) 0%, transparent 70%)",
      }}
    />
  );
}
