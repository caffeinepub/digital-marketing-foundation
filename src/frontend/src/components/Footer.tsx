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
        background: "oklch(4% 0.008 250)",
        borderTop: "1px solid oklch(60% 0.25 230 / 0.15)",
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center glow-blue"
                style={{
                  background: "oklch(60% 0.25 230 / 0.15)",
                  border: "1px solid oklch(60% 0.25 230 / 0.35)",
                }}
              >
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-bold text-base font-mono text-primary tracking-wider">
                  DMF
                </span>
                <span
                  className="block text-xs"
                  style={{ color: "oklch(60% 0.01 250)" }}
                >
                  Digital Marketing Foundation
                </span>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "oklch(55% 0.01 250)" }}
            >
              India&apos;s most comprehensive AI-powered digital marketing
              learning platform. From Scratch to Professional or Master Level.
              Govt. recognized certifications, expert mentors, and hands-on
              assignments.
            </p>
            <div className="flex gap-3 mt-5">
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
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: "oklch(60% 0.25 230 / 0.07)",
                    border: "1px solid oklch(60% 0.25 230 / 0.15)",
                    color: "oklch(55% 0.01 250)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "oklch(60% 0.25 230 / 0.2)";
                    (e.currentTarget as HTMLElement).style.color =
                      "oklch(70% 0.2 200)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "oklch(60% 0.25 230 / 0.07)";
                    (e.currentTarget as HTMLElement).style.color =
                      "oklch(55% 0.01 250)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono font-semibold text-sm mb-4 text-primary tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
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
                    className="text-sm transition-colors"
                    style={{ color: "oklch(55% 0.01 250)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "oklch(70% 0.2 200)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "oklch(55% 0.01 250)";
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
            <h4 className="font-mono font-semibold text-sm mb-4 text-primary tracking-wider">
              Contact
            </h4>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "oklch(55% 0.01 250)" }}
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
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: "1px solid oklch(60% 0.25 230 / 0.08)" }}
        >
          <p className="text-xs" style={{ color: "oklch(35% 0.01 250)" }}>
            &copy; {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors text-primary hover:text-accent"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs" style={{ color: "oklch(35% 0.01 250)" }}>
            Govt. recognized certification platform | All AI-Powered
          </p>
        </div>
      </div>
    </footer>
  );
}
