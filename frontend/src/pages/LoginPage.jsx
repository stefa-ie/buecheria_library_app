import React from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Implement login logic
        console.log("Login attempt:", formData);
        alert("Login functionality will be implemented soon");
    };

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
            <main className="max-w-md mx-auto px-6 py-16">
                <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
                    <p className="text-gray-600 mb-6">Melden Sie sich bei Ihrem Konto an</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700 font-medium">
                                E-Mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="ihre.email@beispiel.de"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-gray-700 font-medium">
                                Passwort
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-600">Angemeldet bleiben</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg"
                        >
                            Anmelden
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="#" className="text-sm text-purple-600 hover:text-purple-700">
                            Passwort vergessen?
                        </a>
                    </div>

                </div>
            </main>
        </div>
    );
}

