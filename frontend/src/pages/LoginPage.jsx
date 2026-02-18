import React from "react";
import { useNavigate } from "react-router-dom";
import { login, setToken } from "../api/auth";
import backgroundImage from "../assets/buecheria_bg.jpeg";

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
    });
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const response = await login(formData.username, formData.password);
            setToken(response.access_token, response.username, response.role);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Ungültiger Benutzername oder Passwort");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-[calc(100vh-var(--header-height,80px))] w-full bg-cover bg-center flex items-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <main className="max-w-md mx-auto px-6 py-16 w-full">
                <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-8 border border-gray-200 dark:border-slate-700">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-300 mb-2">Login</h2>
                    <p className="text-gray-600 dark:text-slate-400 mb-6">Melden Sie sich bei Ihrem Konto an</p>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700 dark:text-slate-200 font-medium">
                                Benutzername
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="block w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Benutzername"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-gray-700 dark:text-slate-200 font-medium">
                                Passwort
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="block w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2 w-4 h-4 text-purple-600 border-gray-300 dark:border-slate-600 rounded focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-600 dark:text-slate-400">Angemeldet bleiben</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Anmeldung..." : "Anmelden"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="#" className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                            Passwort vergessen?
                        </a>
                    </div>

                </div>
            </main>
        </div>
    );
}

