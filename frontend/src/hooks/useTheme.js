import { useEffect, useState } from "react";

const storageKey = "buecheria-theme";

export default function useTheme() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem(storageKey);
        if (storedTheme === "dark" || storedTheme === "light") {
            setTheme(storedTheme);
            return;
        }

        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        setTheme(prefersDark ? "dark" : "light");
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem(storageKey, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((current) => (current === "dark" ? "light" : "dark"));
    };

    return { theme, toggleTheme };
}
