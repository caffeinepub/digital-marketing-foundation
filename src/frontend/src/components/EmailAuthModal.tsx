import { Badge } from "@/components/ui/badge";
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
import { Eye, EyeOff, KeyRound, Loader2, Mail, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useEmailAuth } from "../hooks/useEmailAuth";

type ModalTab = "login" | "signup";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: ModalTab;
}

export default function EmailAuthModal({
  open,
  onOpenChange,
  defaultTab = "login",
}: Props) {
  const { actor } = useActor();
  const { setEmailUser } = useEmailAuth();

  // --- LOGIN STATE ---
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // --- SIGNUP STATE ---
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [signupName, setSignupName] = useState("");
  const [signupAge, setSignupAge] = useState("");
  const [signupContact, setSignupContact] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [showSignupPass, setShowSignupPass] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [otpCode, setOtpCode] = useState(""); // the code returned by backend
  const [otpInput, setOtpInput] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);

  const resetAll = () => {
    setLoginEmail("");
    setLoginPassword("");
    setSignupStep(1);
    setSignupName("");
    setSignupAge("");
    setSignupContact("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirm("");
    setOtpCode("");
    setOtpInput("");
  };

  const handleClose = (v: boolean) => {
    if (!v) resetAll();
    onOpenChange(v);
  };

  // LOGIN
  const handleLogin = async () => {
    if (!actor) return;
    if (!loginEmail.trim() || !loginPassword.trim()) {
      toast.error("Please enter your email and password.");
      return;
    }
    setLoginLoading(true);
    try {
      const profile = await actor.loginWithEmail(
        loginEmail.trim(),
        loginPassword,
      );
      if (!profile) {
        toast.error("Invalid email or password.");
        return;
      }
      setEmailUser(profile);
      toast.success(`Welcome back, ${profile.name}!`);
      handleClose(false);
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // SIGNUP — step 1
  const handleSignup = async () => {
    if (!actor) return;
    if (
      !signupName.trim() ||
      !signupEmail.trim() ||
      !signupPassword ||
      !signupAge ||
      !signupContact.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (signupPassword !== signupConfirm) {
      toast.error("Passwords do not match.");
      return;
    }
    const ageNum = Number(signupAge);
    if (Number.isNaN(ageNum) || ageNum < 10 || ageNum > 120) {
      toast.error("Please enter a valid age.");
      return;
    }
    setSignupLoading(true);
    try {
      const code = await actor.registerUser(
        signupEmail.trim(),
        signupName.trim(),
        BigInt(ageNum),
        signupContact.trim(),
        signupPassword,
      );
      setOtpCode(code);
      setSignupStep(2);
      toast.success("Account created! Please verify your OTP below.");
    } catch (err: any) {
      const msg = String(err?.message || err);
      if (
        msg.includes("already registered") ||
        msg.includes("already exists")
      ) {
        toast.error("This email is already registered. Please login instead.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setSignupLoading(false);
    }
  };

  // OTP verify — step 2
  const handleVerifyOtp = async () => {
    if (!actor) return;
    if (!otpInput.trim()) {
      toast.error("Please enter the OTP code.");
      return;
    }
    setVerifyLoading(true);
    try {
      const ok = await actor.verifyOtp(signupEmail.trim(), otpInput.trim());
      if (!ok) {
        toast.error("Incorrect OTP. Please try again.");
        return;
      }
      // Fetch full profile
      const profile = await actor.getMyProfile();
      if (profile) {
        setEmailUser(profile);
        toast.success(`Welcome, ${profile.name}! Your account is verified.`);
      } else {
        toast.success("Account verified! Please log in.");
      }
      handleClose(false);
    } catch {
      toast.error("Verification failed. Please try again.");
    } finally {
      setVerifyLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        data-ocid="email_auth.dialog"
        className="max-w-md w-full p-0 overflow-hidden"
      >
        <div className="bg-gradient-to-br from-[#075E54] to-[#128C7E] p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              Join The Digital Marketing Foundation
            </DialogTitle>
            <p className="text-white/80 text-sm mt-1">
              Sign up or log in to access world-class digital marketing courses.
            </p>
          </DialogHeader>
        </div>

        <div className="p-6">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList data-ocid="email_auth.tab" className="w-full mb-6">
              <TabsTrigger value="login" className="flex-1">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex-1">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* ===== LOGIN TAB ===== */}
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    data-ocid="email_auth.input"
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="pl-9"
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    data-ocid="email_auth.input"
                    id="login-password"
                    type={showLoginPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pl-9 pr-10"
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPass(!showLoginPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showLoginPass ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                data-ocid="email_auth.submit_button"
                onClick={handleLogin}
                disabled={loginLoading || !actor}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging
                    in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </TabsContent>

            {/* ===== SIGN UP TAB ===== */}
            <TabsContent value="signup">
              {signupStep === 1 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        data-ocid="email_auth.input"
                        id="signup-name"
                        placeholder="Priya Sharma"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-age">Age</Label>
                      <Input
                        data-ocid="email_auth.input"
                        id="signup-age"
                        type="number"
                        placeholder="25"
                        min={10}
                        max={99}
                        value={signupAge}
                        onChange={(e) => setSignupAge(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-contact">Contact Number</Label>
                      <Input
                        data-ocid="email_auth.input"
                        id="signup-contact"
                        placeholder="+91 98765 43210"
                        value={signupContact}
                        onChange={(e) => setSignupContact(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="signup-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          data-ocid="email_auth.input"
                          id="signup-email"
                          type="email"
                          placeholder="you@example.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input
                          data-ocid="email_auth.input"
                          id="signup-password"
                          type={showSignupPass ? "text" : "password"}
                          placeholder="Create password"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPass(!showSignupPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                          {showSignupPass ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm">Confirm Password</Label>
                      <Input
                        data-ocid="email_auth.input"
                        id="signup-confirm"
                        type="password"
                        placeholder="Repeat password"
                        value={signupConfirm}
                        onChange={(e) => setSignupConfirm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    data-ocid="email_auth.submit_button"
                    onClick={handleSignup}
                    disabled={signupLoading || !actor}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold"
                  >
                    {signupLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              ) : (
                /* OTP Verification step */
                <div className="space-y-5">
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-center">
                    <p className="text-sm font-medium text-amber-800 mb-2">
                      Your OTP Code
                    </p>
                    <div
                      data-ocid="email_auth.panel"
                      className="text-4xl font-mono font-extrabold tracking-[0.3em] text-amber-700 bg-amber-100 rounded-lg py-3 px-4 inline-block select-all"
                    >
                      {otpCode}
                    </div>
                    <p className="text-xs text-amber-600 mt-2">
                      Copy this code and enter it below to verify your account.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otp-input">Enter OTP Code</Label>
                    <Input
                      data-ocid="email_auth.input"
                      id="otp-input"
                      placeholder="Enter the code shown above"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="text-center text-xl tracking-widest font-mono"
                      maxLength={10}
                      onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                    />
                  </div>
                  <Button
                    data-ocid="email_auth.confirm_button"
                    onClick={handleVerifyOtp}
                    disabled={verifyLoading || !otpInput.trim()}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold"
                  >
                    {verifyLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Verifying...
                      </>
                    ) : (
                      "Verify & Complete Registration"
                    )}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setSignupStep(1)}
                    className="w-full text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Go back and edit details
                  </button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
