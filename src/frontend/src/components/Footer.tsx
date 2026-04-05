import {
  Cpu,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import type { AppNav } from "../App";

interface FooterProps {
  nav: AppNav;
}

export default function Footer({ nav }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer
      style={{
        background: "oklch(3.5% 0.007 250)",
        borderTop: "1px solid oklch(60% 0.25 230 / 0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative top glow orb */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 250,
          background:
            "radial-gradient(ellipse, oklch(60% 0.25 230 / 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <div
        className="container mx-auto px-6 py-16 relative"
        style={{ zIndex: 1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center logo-glow-pulse"
                style={{
                  background: "oklch(60% 0.25 230 / 0.12)",
                  border: "1px solid oklch(60% 0.25 230 / 0.35)",
                }}
              >
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-black text-base font-mono text-primary tracking-wider">
                  DMF
                </span>
                <span
                  className="block text-xs"
                  style={{ color: "oklch(40% 0.01 250)" }}
                >
                  Digital Marketing Foundation
                </span>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "oklch(42% 0.01 250)" }}
            >
              India&apos;s most comprehensive AI-powered digital marketing
              learning platform. From Scratch to Professional or Master Level.
              Govt. recognized certifications, expert mentors, and hands-on
              assignments.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "oklch(60% 0.25 230 / 0.06)",
                    border: "1px solid oklch(60% 0.25 230 / 0.12)",
                    color: "oklch(42% 0.01 250)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "oklch(60% 0.25 230 / 0.15)";
                    (e.currentTarget as HTMLElement).style.color =
                      "oklch(70% 0.2 200)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(60% 0.25 230 / 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "oklch(60% 0.25 230 / 0.06)";
                    (e.currentTarget as HTMLElement).style.color =
                      "oklch(42% 0.01 250)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(60% 0.25 230 / 0.12)";
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono font-bold text-xs mb-5 text-primary tracking-widest uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "All Courses", action: () => nav.navigate("landing") },
                {
                  label: "Pricing",
                  action: () => {
                    nav.navigate("landing");
                    setTimeout(
                      () =>
                        document
                          .getElementById("pricing")
                          ?.scrollIntoView({ behavior: "smooth" }),
                      100,
                    );
                  },
                },
                { label: "Blog", action: () => nav.navigate("blogs") },
                { label: "Latest News", action: () => nav.navigate("news") },
                {
                  label: "My Dashboard",
                  action: () => nav.navigate("dashboard"),
                },
                {
                  label: "Certificates",
                  action: () => nav.navigate("dashboard"),
                },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={link.action}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "oklch(42% 0.01 250)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "oklch(70% 0.2 200)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "oklch(42% 0.01 250)";
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono font-bold text-xs mb-5 text-primary tracking-widest uppercase">
              Contact
            </h4>
            <ul
              className="space-y-2.5 text-sm"
              style={{ color: "oklch(42% 0.01 250)" }}
            >
              <li>hello@dmfoundation.in</li>
              <li>+91 98765 43210</li>
              <li>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors text-primary hover:text-accent"
                >
                  WhatsApp: +91 98765 43210
                </a>
              </li>
              <li>Mon-Sat, 9am-6pm IST</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: "1px solid oklch(60% 0.25 230 / 0.07)" }}
        >
          <p className="text-xs" style={{ color: "oklch(28% 0.01 250)" }}>
            &copy; {year}. Built with{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors text-primary hover:text-accent"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs" style={{ color: "oklch(28% 0.01 250)" }}>
            Govt. recognized certification platform | All AI-Powered
          </p>
        </div>
      </div>
    </footer>
  );
}
