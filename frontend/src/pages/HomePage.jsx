import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Navigation */}
                        <nav className="flex items-center gap-8">
                            <Link to="/" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                                HOME
                            </Link>
                            <a href="#" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                                BÜCHER
                            </a>
                            <a href="#" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                                VERANSTALTUNGEN
                            </a>
                            <a href="#" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                                ÜBER UNS
                            </a>
                            <a href="#" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                                KONTAKT
                            </a>
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
            <main className="max-w-7xl mx-auto px-6 py-16">
                <h1 className="text-6xl font-bold text-gray-900">Bücheria</h1>
                <h2 className="text-2xl font-bold text-gray-900">Feministische und queere Stadtteilbibliothek</h2>
                <p className="text-gray-600">🏠 Vogelhüttendeich 30, 21107 HH</p>
            </main>
        </div>
    );
}

