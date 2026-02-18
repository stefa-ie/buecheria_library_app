import React from "react";
import { fetchBooks } from "../api/books";

const normalizeIsbn = (isbn) => (isbn || "").replace(/[^0-9X]/gi, "").toUpperCase();

const getOpenLibraryCover = (isbn) => {
    const normalized = normalizeIsbn(isbn);
    if (!normalized) return "";
    return `https://covers.openlibrary.org/b/isbn/${normalized}-L.jpg?default=false`;
};

export default function BuecherPage() {
    const [books, setBooks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks();
                setBooks(data);
            } catch (err) {
                setError(err.message || "Failed to load books");
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-300">Bücher</h1>
            <p className="mt-4 text-gray-700 dark:text-slate-300">
                Entdecke unsere Sammlung – Cover werden automatisch geladen (Open Library)
                oder manuell gepflegt.
            </p>

            {loading && (
                <div className="mt-10 text-gray-600 dark:text-slate-400">
                    Bücher werden geladen...
                </div>
            )}

            {error && (
                <div className="mt-10 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {books.map((book) => {
                        const coverUrl = book.CoverUrl || getOpenLibraryCover(book.Isbn);
                        return (
                            <article
                                key={book.BookID}
                                className="group rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="aspect-[3/4] w-full overflow-hidden border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                                    {coverUrl ? (
                                        <img
                                            src={coverUrl}
                                            alt={`Cover von ${book.Title || "Buch"}`}
                                            className="h-full w-full object-cover"
                                            onError={(event) => {
                                                event.currentTarget.src = "";
                                            }}
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-xs text-gray-400 dark:text-slate-500">
                                            Kein Cover
                                        </div>
                                    )}
                                </div>
                                <h2 className="mt-4 text-base font-semibold text-gray-900 dark:text-slate-300">
                                    {book.Title || "Unbekannter Titel"}
                                </h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                                    {book.author
                                        ? `${book.author.FirstName} ${book.author.LastName}`
                                        : "Unbekannte Autor:in"}
                                </p>
                                {book.Genre && (
                                    <p className="mt-2 text-xs uppercase tracking-wide text-gray-500 dark:text-slate-500">
                                        {book.Genre}
                                    </p>
                                )}
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
