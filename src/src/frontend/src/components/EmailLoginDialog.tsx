import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

export interface EmailUserSession {
  email: string;
  name: string;
  age?: number;
  contactNumber?: string;
  isEmailLoggedIn: boolean;
}

const EMAIL_USER_KEY = "emailUser";

export function getEmailUser(): EmailUserSession | null {
  try {
    const raw = localStorage.getItem(EMAIL_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EmailUserSession;
  } catch {
    return null;
  }
}

export function setEmailUser(user: EmailUserSession) {
  localStorage.setItem(EMAIL_USER_KEY, JSON.stringify(user));
}

export function clearEmailUser() {
  localStorage.removeItem(EMAIL_USER_KEY);
}

export function useEmailUser() {
  const [user, setUser] = useState<EmailUserSession | null>(() =>
    getEmailUser(),
  );
  const refresh = () => setUser(getEmailUser());
  const logout = () => {
    clearEmailUser();
    setUser(null);
  };
  return { user, refresh, logout };
}

function hashPassword(password: string): string {
  return btoa(password);
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function EmailLoginDialog({
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const { actor } = useActor();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    age: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      toast.error("Please fill all fields.");
      return;
    }
    if (!actor) {
      toast.error("Not connected to backend.");
      return;
    }
    setLoginLoading(true);
    try {
      const result = await (actor as any).verifyEmailUser(
        loginEmail.trim(),
        hashPassword(loginPassword),
      );
      if (result.success) {
        const session: EmailUserSession = {
          email: loginEmail.trim(),
          name: result.name,
          isEmailLoggedIn: true,
        };
        setEmailUser(session);
        toast.success(`Welcome back, ${result.name}!`);
        onOpenChange(false);
        onSuccess?.();
      } else {
        toast.error("Invalid email or password.");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSendOtp = () => {
    if (!regForm.email.trim() || !regForm.contact.trim()) {
      toast.error("Please enter email and contact number first.");
      return;
    }
    setSendingOtp(true);
    const otp = generateOTP();
    setGeneratedOtp(otp);
    setOtpSent(true);
    setSendingOtp(false);
    toast.success(`Your OTP is: ${otp}`, {
      duration: 10000,
      description: "This is a simulated OTP for testing.",
    });
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === generatedOtp) {
      setOtpVerified(true);
      toast.success("OTP verified successfully!");
    } else {
      toast.error(
        "Incorrect OTP. Please check the notification and try again.",
      );
    }
  };

  const handleRegister = async () => {
    const { name, email, age, contact, password, confirmPassword } = regForm;
    if (!name || !email || !age || !contact || !password) {
      toast.error("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!otpVerified) {
      toast.error("Please verify OTP first.");
      return;
    }
    if (!actor) {
      toast.error("Not connected to backend.");
      return;
    }
    setRegLoading(true);
    try {
      const result = await (actor as any).registerEmailUser(
        email.trim(),
        name.trim(),
        BigInt(Number.parseInt(age) || 18),
        contact.trim(),
        hashPassword(password),
      );
      if (result.success) {
        const session: EmailUserSession = {
          email: email.trim(),
          name: name.trim(),
          age: Number.parseInt(age),
          contactNumber: contact.trim(),
          isEmailLoggedIn: true,
        };
        setEmailUser(session);
        toast.success("Account created successfully! Welcome!");
        onOpenChange(false);
        onSuccess?.();
      } else {
        toast.error(result.message || "Registration failed.");
      }
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-ocid="email-auth.dialog"
        className="max-w-sm sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="text-brand-heading">
            Login / Create Account
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login">
          <TabsList data-ocid="email-auth.tab" className="w-full mb-4">
            <TabsTrigger value="login" className="flex-1">
              <LogIn className="w-4 h-4 mr-1" /> Login
            </TabsTrigger>
            <TabsTrigger value="register" className="flex-1">
              <UserPlus className="w-4 h-4 mr-1" /> Register
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="space-y-4">
            <div>
              <Label htmlFor="login-email">Email Address</Label>
              <Input
                data-ocid="email-auth.input"
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="login-password">Password</Label>
              <Input
                data-ocid="email-auth.input"
                id="login-password"
                type="password"
                placeholder="Your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Button
              data-ocid="email-auth.submit_button"
              onClick={handleLogin}
              disabled={loginLoading}
              className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white"
            >
              {loginLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {loginLoading ? "Logging in..." : "Login"}
            </Button>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="space-y-3">
            <div>
              <Label htmlFor="reg-name">Full Name</Label>
              <Input
                data-ocid="email-auth.input"
                id="reg-name"
                placeholder="Priya Sharma"
                value={regForm.name}
                onChange={(e) =>
                  setRegForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="reg-email">Email Address</Label>
              <Input
                data-ocid="email-auth.input"
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                value={regForm.email}
                onChange={(e) =>
                  setRegForm((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="reg-age">Age</Label>
                <Input
                  data-ocid="email-auth.input"
                  id="reg-age"
                  type="number"
                  placeholder="22"
                  min={16}
                  max={80}
                  value={regForm.age}
                  onChange={(e) =>
                    setRegForm((p) => ({ ...p, age: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="reg-contact">Mobile (+91)</Label>
                <Input
                  data-ocid="email-auth.input"
                  id="reg-contact"
                  placeholder="9876543210"
                  value={regForm.contact}
                  onChange={(e) =>
                    setRegForm((p) => ({ ...p, contact: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reg-password">Password</Label>
              <Input
                data-ocid="email-auth.input"
                id="reg-password"
                type="password"
                placeholder="Create a password"
                value={regForm.password}
                onChange={(e) =>
                  setRegForm((p) => ({ ...p, password: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="reg-confirm">Confirm Password</Label>
              <Input
                data-ocid="email-auth.input"
                id="reg-confirm"
                type="password"
                placeholder="Repeat your password"
                value={regForm.confirmPassword}
                onChange={(e) =>
                  setRegForm((p) => ({ ...p, confirmPassword: e.target.value }))
                }
              />
            </div>

            {/* OTP Section */}
            {!otpVerified && (
              <div className="border border-brand-teal/20 rounded-xl p-3 bg-brand-wash space-y-2">
                <Button
                  data-ocid="email-auth.button"
                  variant="outline"
                  size="sm"
                  onClick={handleSendOtp}
                  disabled={sendingOtp}
                  className="w-full border-brand-teal text-brand-teal hover:bg-brand-teal/10"
                >
                  {sendingOtp ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </Button>
                {otpSent && (
                  <div className="flex gap-2">
                    <Input
                      data-ocid="email-auth.input"
                      placeholder="Enter 6-digit OTP"
                      value={enteredOtp}
                      maxLength={6}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                    />
                    <Button
                      data-ocid="email-auth.confirm_button"
                      size="sm"
                      onClick={handleVerifyOtp}
                      className="bg-brand-teal text-white flex-shrink-0"
                    >
                      Verify
                    </Button>
                  </div>
                )}
              </div>
            )}
            {otpVerified && (
              <div
                data-ocid="email-auth.success_state"
                className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg"
              >
                <span className="text-green-600 font-bold">OTP Verified!</span>
                You can now complete registration.
              </div>
            )}

            <Button
              data-ocid="email-auth.submit_button"
              onClick={handleRegister}
              disabled={regLoading || !otpVerified}
              className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white"
            >
              {regLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              {regLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
