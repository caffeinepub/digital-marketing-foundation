import {
  Facebook,
  GraduationCap,
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
    <footer className="bg-brand-heading text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-teal flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                The Digital Marketing Foundation
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              India's most comprehensive AI-powered digital marketing learning
              platform. From Scratch to Professional or Master Level. Govt.
              recognized certifications, expert mentors, and hands-on
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
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-teal flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90">
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
                    className="text-sm text-gray-400 hover:text-brand-teal transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>hello@dmfoundation.in</li>
              <li>+91 98765 43210</li>
              <li>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  WhatsApp: +91 98765 43210
                </a>
              </li>
              <li>Mon–Sat, 9am–6pm IST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-teal hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-gray-500">
            Govt. recognized certification platform | All AI-Powered
          </p>
        </div>
      </div>
    </footer>
  );
}
