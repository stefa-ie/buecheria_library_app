import { Link, Outlet } from "react-router-dom";
import useTheme from "../hooks/useTheme";

export default function PublicLayout() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
            {/* Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
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

            {/* Main Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-gray-600 dark:text-slate-400">
                    <p>© Bücheria – Feministische und queere Stadtteilbibliothek</p>
                    <div className="flex items-center gap-6">
                        <span>Vogelhüttendeich 30, 21107 HH</span>
                        <span>hallo@buecheria.example</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
