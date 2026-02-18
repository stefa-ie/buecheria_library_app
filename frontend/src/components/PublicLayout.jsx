import { Link, Outlet, useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";

export default function PublicLayout() {
    const { theme, toggleTheme } = useTheme();
    const headerRef = useRef(null);
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const [showFooter, setShowFooter] = useState(!isLoginPage);

    useEffect(() => {
        if (!isLoginPage) {
            setShowFooter(true);
            return;
        }
        const onScroll = () => setShowFooter(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isLoginPage]);

    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;
        const setHeight = () => {
            document.documentElement.style.setProperty(
                "--header-height",
                `${el.getBoundingClientRect().height}px`
            );
        };
        setHeight();
        const ro = new ResizeObserver(setHeight);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
            {/* Header */}
            <header
                ref={headerRef}
                className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shrink-0"
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Navigation */}
                        <nav className="flex items-center gap-8">
                            <Link to="/" className="text-gray-900 dark:text-slate-100 font-medium hover:text-purple-600 transition-colors">
                                HOME
                            </Link>
                            <Link to="/buecher" className="text-gray-900 dark:text-slate-100 font-medium hover:text-purple-600 transition-colors">
                                BÜCHER
                            </Link>
                            <Link to="/veranstaltungen" className="text-gray-900 dark:text-slate-100 font-medium hover:text-purple-600 transition-colors">
                                VERANSTALTUNGEN
                            </Link>
                            <Link to="/ueber-uns" className="text-gray-900 dark:text-slate-100 font-medium hover:text-purple-600 transition-colors">
                                ÜBER UNS
                            </Link>
                            <Link to="/kontakt" className="text-gray-900 dark:text-slate-100 font-medium hover:text-purple-600 transition-colors">
                                KONTAKT
                            </Link>
                        </nav>

                        {/* Login Button */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                                aria-pressed={theme === "dark"}
                            >
                                {theme === "dark" ? "Light" : "Dark"}
                            </button>
                            <Link
                                to="/login"
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content - content-sized so no gap between carousel and footer on homepage */}
            <main>
                <Outlet />
            </main>

            {/* Footer - on login page only visible after user scrolls */}
            <footer
                className={`border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shrink-0 transition-opacity duration-300 ${
                    isLoginPage && !showFooter ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-sm text-gray-600 dark:text-slate-400 sm:grid sm:grid-cols-3">
                    <p className="text-center sm:text-left">© Bücheria – Feministische und queere Stadtteilbibliothek</p>
                    <nav className="flex flex-col items-center gap-1 justify-self-center" aria-label="Rechtliches und Informationen">
                        <Link to="/impressum" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Impressum</Link>
                        <Link to="/datenschutz" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Datenschutzerklärung</Link>
                        <Link to="/cookie-einstellungen" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Cookie‑Einstellungen</Link>
                        <Link to="/barrierefreiheit" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Barrierefreiheitserklärung</Link>
                    </nav>
                    <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
                        <span>Vogelhüttendeich 30, 21107 HH</span>
                        <span>hallo@buecheria.example</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
