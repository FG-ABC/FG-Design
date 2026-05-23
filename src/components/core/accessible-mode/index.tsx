"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface AccessibleModeContextValue {
  accessibleMode: boolean;
  setAccessibleMode: (value: boolean) => void;
}

const AccessibleModeContext = createContext<AccessibleModeContextValue | null>(null);

const STORAGE_KEY = "fgd-ui-accessible-mode";

interface AccessibleModeProviderProps {
  children: React.ReactNode;
  defaultValue?: boolean;
  storageKey?: string;
}

export function AccessibleModeProvider({
  children,
  defaultValue = false,
  storageKey = STORAGE_KEY,
}: AccessibleModeProviderProps) {
  const [accessibleMode, setAccessibleModeState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored !== null ? stored === "true" : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    document.documentElement.dataset.accessibleMode = String(accessibleMode);
  }, [accessibleMode]);

  function setAccessibleMode(value: boolean) {
    try {
      localStorage.setItem(storageKey, String(value));
    } catch {}
    setAccessibleModeState(value);
  }

  return (
    <AccessibleModeContext.Provider value={{ accessibleMode, setAccessibleMode }}>
      {children}
    </AccessibleModeContext.Provider>
  );
}

export function useAccessibleMode(): AccessibleModeContextValue {
  const ctx = useContext(AccessibleModeContext);
  if (!ctx) throw new Error("useAccessibleMode must be used within AccessibleModeProvider");
  return ctx;
}
