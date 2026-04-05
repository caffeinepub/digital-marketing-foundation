import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { UserProfile } from "../backend.d";

const STORAGE_KEY = "dmf_email_user";

interface EmailAuthContextValue {
  emailUser: UserProfile | null;
  setEmailUser: (user: UserProfile | null) => void;
  clearEmailUser: () => void;
  isEmailLoggedIn: boolean;
}

const EmailAuthContext = createContext<EmailAuthContextValue>({
  emailUser: null,
  setEmailUser: () => {},
  clearEmailUser: () => {},
  isEmailLoggedIn: false,
});

export function EmailAuthProvider({ children }: { children: ReactNode }) {
  const [emailUser, setEmailUserState] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      // Convert BigInt-serialized strings back
      if (parsed.age) parsed.age = BigInt(parsed.age);
      if (parsed.registeredAt)
        parsed.registeredAt = BigInt(parsed.registeredAt);
      return parsed as UserProfile;
    } catch {
      return null;
    }
  });

  const setEmailUser = (user: UserProfile | null) => {
    setEmailUserState(user);
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const clearEmailUser = () => setEmailUser(null);

  return (
    <EmailAuthContext.Provider
      value={{
        emailUser,
        setEmailUser,
        clearEmailUser,
        isEmailLoggedIn: !!emailUser,
      }}
    >
      {children}
    </EmailAuthContext.Provider>
  );
}

export function useEmailAuth() {
  return useContext(EmailAuthContext);
}
