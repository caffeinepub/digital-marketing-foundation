import { Button } from "@/components/ui/button";
import {
  Brain,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import type { AppNav, PageName } from "../App";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";

interface HeaderProps {
  nav: AppNav;
  currentPage: PageName;
}

export default function Header({ nav, currentPage }: HeaderProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";
  const { data: isAdmin } = useIsAdmin();

  const navLinks: { label: string; page: PageName; hash?: string }[] = [
    { label: "Courses", page: "landing", hash: "courses" },
    { label: "Pricing", page: "landing", hash: "pricing" },
    { label: "Blog", page: "blogs" },
    { label: "News", page: "news" },
    { label: "Dashboard", page: "dashboard" },
    ...(isLoggedIn ? [{ label: "AI Hub", page: "ai-hub" as PageName }] : []),
  ];

  const handleNavClick = (link: (typeof navLinks)[0]) => {
    setMenuOpen(false);
    nav.navigate(link.page);
    if (link.hash) {
      setTimeout(() => {
        const el = document.getElementById(link.hash!);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          data-ocid="header.link"
          onClick={() => nav.navigate("landing")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-sm md:text-base text-brand-heading leading-tight">
            The Digital Marketing
            <span className="hidden sm:inline"> Foundation</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              data-ocid="header.link"
              onClick={() => handleNavClick(link)}
              className={`text-sm font-medium transition-colors hover:text-brand-teal ${
                currentPage === link.page && !link.hash
                  ? "text-brand-teal"
                  : "text-brand-body"
              }`}
            >
              {link.label}
            </button>
          ))}
          {isAdmin && (
            <button
              type="button"
              data-ocid="header.link"
              onClick={() => nav.navigate("admin")}
              className={`text-sm font-medium transition-colors hover:text-brand-teal flex items-center gap-1 ${
                currentPage === "admin" ? "text-brand-teal" : "text-brand-body"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin
            </button>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Button
                data-ocid="header.button"
                variant="ghost"
                size="sm"
                onClick={() => nav.navigate("dashboard")}
                className="text-brand-teal hover:text-brand-teal hover:bg-brand-wash"
              >
                <LayoutDashboard className="w-4 h-4 mr-1" />
                My Learning
              </Button>
              <Button
                data-ocid="header.button"
                variant="outline"
                size="sm"
                onClick={() => clear()}
                className="border-brand-teal text-brand-teal hover:bg-brand-wash"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                data-ocid="header.button"
                variant="ghost"
                size="sm"
                onClick={() => login()}
                disabled={isLoggingIn}
                className="text-brand-body hover:text-brand-teal"
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
              <Button
                data-ocid="header.primary_button"
                size="sm"
                onClick={() => login()}
                disabled={isLoggingIn}
                className="bg-brand-orange hover:bg-brand-orange-dark text-white rounded-full px-5 font-semibold shadow-orange"
              >
                Join Now
              </Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          data-ocid="header.button"
          className="md:hidden p-2 text-brand-body"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              data-ocid="header.link"
              onClick={() => handleNavClick(link)}
              className="text-left text-sm font-medium text-brand-body hover:text-brand-teal py-1"
            >
              {link.label}
            </button>
          ))}
          {isAdmin && (
            <button
              type="button"
              data-ocid="header.link"
              onClick={() => {
                nav.navigate("admin");
                setMenuOpen(false);
              }}
              className="text-left text-sm font-medium text-brand-body hover:text-brand-teal py-1"
            >
              Admin Panel
            </button>
          )}
          <div className="flex gap-2 pt-2">
            {isLoggedIn ? (
              <Button
                data-ocid="header.button"
                variant="outline"
                size="sm"
                onClick={() => {
                  clear();
                  setMenuOpen(false);
                }}
                className="border-brand-teal text-brand-teal"
              >
                Logout
              </Button>
            ) : (
              <Button
                data-ocid="header.primary_button"
                size="sm"
                onClick={() => {
                  login();
                  setMenuOpen(false);
                }}
                className="bg-brand-orange text-white rounded-full px-5"
              >
                Join Now
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
