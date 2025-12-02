"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "bright" | "dark" | null;

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: "bright" | "dark") => void;
    showThemeSelector: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(null);
    const [showThemeSelector, setShowThemeSelector] = useState(false);

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme") as "bright" | "dark" | null;

        if (!currentTheme) {
            setShowThemeSelector(true);
        } else {
            setThemeState(currentTheme);
            // Theme is already applied by the blocking script in layout.tsx
            // Just ensure it's synced
            if (currentTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }, []);

    useEffect(() => {
        if (theme === null) return; // Don't save if theme hasn't been set yet

        // Save to localStorage
        localStorage.setItem("theme", theme);

        // Apply theme to HTML element
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        // Hide selector once theme is set
        setShowThemeSelector(false);
    }, [theme]);

    const setTheme = (newTheme: "bright" | "dark") => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, showThemeSelector }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeSelect() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useThemeSelect must be used within a ThemeProvider");
    }
    return context;
}

