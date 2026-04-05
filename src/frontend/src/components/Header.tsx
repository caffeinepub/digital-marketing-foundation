import { Button } from "@/components/ui/button";
import {
  Brain,
  Cpu,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  ShieldCheck,
  UserPlus,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { AppNav, PageName } from "../App";
import { useEmailAuth } from "../hooks/useEmailAuth";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";
import EmailAuthModal from "./EmailAuthModal";

interface HeaderProps {
  nav: AppNav;
  currentPage: PageName;
}

export default function Header({ nav, currentPage }: HeaderProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { emailUser, clearEmailUser, isEmailLoggedIn } = useEmailAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailModalTab, setEmailModalTab] = useState<"login" | "signup">(
    "login",
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isIILoggedIn = !!identity;
  const isLoggedIn = isIILoggedIn || isEmailLoggedIn;
  const isLoggingIn = loginStatus === "logging-in";
  const { data: isAdmin } = useIsAdmin();

  const openEmailModal = (tab: "login" | "signup") => {
    setEmailModalTab(tab);
    setEmailModalOpen(true);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    if (isIILoggedIn) clear();
    if (isEmailLoggedIn) clearEmailUser();
    setMenuOpen(false);
  };

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
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "oklch(4% 0.008 250 / 0.97)"
            : "oklch(4% 0.008 250 / 0.55)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderBottom: scrolled
            ? "1px solid oklch(60% 0.25 230 / 0.18)"
            : "1px solid transparent",
        }}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            data-ocid="header.link"
            onClick={() => nav.navigate("landing")}
            className="flex items-center gap-3 group"
          >
            <div
              className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105 logo-glow-pulse"
              style={{
                background: "oklch(60% 0.25 230 / 0.12)",
                border: "1px solid oklch(60% 0.25 230 / 0.4)",
              }}
            >
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-sm font-mono text-primary tracking-widest uppercase">
                DMF
              </span>
              <span
                className="hidden sm:block text-[10px] font-medium tracking-wide mt-0.5"
                style={{ color: "oklch(40% 0.01 250)" }}
              >
                Digital Marketing Foundation
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page && !link.hash;
              return (
                <button
                  type="button"
                  key={link.label}
                  data-ocid="header.link"
                  onClick={() => handleNavClick(link)}
                  className={`nav-link-underline text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "active text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            {isAdmin && (
              <button
                type="button"
                data-ocid="header.link"
                onClick={() => nav.navigate("admin")}
                className={`nav-link-underline text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 ${
                  currentPage === "admin"
                    ? "active text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </button>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                {isEmailLoggedIn && emailUser && (
                  <span
                    className="text-sm font-medium font-mono"
                    style={{ color: "oklch(70% 0.2 200)" }}
                  >
                    Hi, {emailUser.name.split(" ")[0]}
                  </span>
                )}
                <Button
                  data-ocid="header.button"
                  variant="ghost"
                  size="sm"
                  onClick={() => nav.navigate("dashboard")}
                  className="text-primary hover:bg-primary/10 text-xs"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 mr-1" />
                  My Learning
                </Button>
                <Button
                  data-ocid="header.button"
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-primary/25 text-primary hover:bg-primary/10 text-xs"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1" />
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
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  <Brain className="w-3.5 h-3.5 mr-1" />
                  {isLoggingIn ? "Connecting..." : "Internet Identity"}
                </Button>
                <Button
                  data-ocid="header.button"
                  variant="ghost"
                  size="sm"
                  onClick={() => openEmailModal("login")}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  <LogIn className="w-3.5 h-3.5 mr-1" />
                  Login
                </Button>
                <Button
                  data-ocid="header.primary_button"
                  size="sm"
                  onClick={() => openEmailModal("signup")}
                  className="rounded-full px-5 font-bold text-xs text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(55% 0.28 230), oklch(45% 0.22 290))",
                    boxShadow: "0 0 14px oklch(60% 0.25 230 / 0.3)",
                    border: "none",
                  }}
                >
                  <UserPlus className="w-3.5 h-3.5 mr-1" />
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            data-ocid="header.button"
            className="md:hidden p-2 text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden px-6 py-5 flex flex-col gap-3"
            style={{
              background: "oklch(4% 0.008 250 / 0.98)",
              borderTop: "1px solid oklch(60% 0.25 230 / 0.12)",
            }}
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                data-ocid="header.link"
                onClick={() => handleNavClick(link)}
                className="text-left text-sm font-medium py-1.5 text-muted-foreground hover:text-foreground transition-colors"
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
                className="text-left text-sm font-medium py-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin Panel
              </button>
            )}
            <div
              className="flex flex-col gap-2 pt-2 border-t"
              style={{ borderColor: "oklch(60% 0.25 230 / 0.1)" }}
            >
              {isLoggedIn ? (
                <>
                  {isEmailLoggedIn && emailUser && (
                    <p className="text-sm font-medium text-foreground">
                      Hi, {emailUser.name}
                    </p>
                  )}
                  <Button
                    data-ocid="header.button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      nav.navigate("dashboard");
                      setMenuOpen(false);
                    }}
                    className="justify-start text-primary hover:bg-primary/10"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-1" />
                    My Learning
                  </Button>
                  <Button
                    data-ocid="header.button"
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="border-primary/30 text-primary hover:bg-primary/10"
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
                    onClick={() => {
                      login();
                      setMenuOpen(false);
                    }}
                    disabled={isLoggingIn}
                    className="justify-start text-muted-foreground"
                  >
                    <Brain className="w-4 h-4 mr-1" />
                    {isLoggingIn ? "Connecting..." : "Internet Identity"}
                  </Button>
                  <Button
                    data-ocid="header.button"
                    variant="ghost"
                    size="sm"
                    onClick={() => openEmailModal("login")}
                    className="justify-start text-muted-foreground"
                  >
                    <LogIn className="w-4 h-4 mr-1" />
                    Login with Email
                  </Button>
                  <Button
                    data-ocid="header.primary_button"
                    size="sm"
                    onClick={() => openEmailModal("signup")}
                    className="rounded-full font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(55% 0.28 230), oklch(45% 0.22 290))",
                      border: "none",
                    }}
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <EmailAuthModal
        open={emailModalOpen}
        onOpenChange={setEmailModalOpen}
        defaultTab={emailModalTab}
      />
    </>
  );
}
