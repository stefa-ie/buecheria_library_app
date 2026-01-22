import { Link, Outlet } from "react-router-dom";

export default function PublicLayout() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Navigation */}
                        <nav className="flex items-center gap-8">
                            <Link to="/" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                                HOME
                            </Link>
                            <Link to="/buecher" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                                BÜCHER
                            </Link>
                            <Link to="/veranstaltungen" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                                VERANSTALTUNGEN
                            </Link>
                            <Link to="/ueber-uns" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                                ÜBER UNS
                            </Link>
                            <Link to="/kontakt" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                                KONTAKT
                            </Link>
                        </nav>

                        {/* Login Button */}
                        <Link
                            to="/login"
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-gray-600">
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
