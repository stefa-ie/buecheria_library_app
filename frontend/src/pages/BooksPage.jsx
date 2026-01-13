import React from "react";
import { Plus, X } from "lucide-react";
import BookForm from "../components/book_components/BookForm";
import BookList from "../components/book_components/BookList";
import { fetchBooks } from "../api/books";
import { fetchAuthors } from "../api/authors";

export default function BooksPage() {
    const [books, setBooks] = React.useState([]);
    const [authors, setAuthors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [updatingBook, setUpdatingBook] = React.useState(null);
    const [showForm, setShowForm] = React.useState(false);

    // Fetch books on component mount
    React.useEffect(() => {
        async function loadBooks() {
            try {
                const data = await fetchBooks();
                setBooks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadBooks();
    }, []);

    // Handle new book creation
    const handleBookCreated = (newBook) => {
        setBooks((prevBooks) => [...prevBooks, newBook]);
        setShowForm(false);
    };


    // Handle book update
    const handleBookUpdated = (updatedBook) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) =>
                book.BookID === updatedBook.BookID ? updatedBook : book
            )
        );
        setUpdatingBook(null);
        setShowForm(false);
    }


    // Handle book deletion
    const handleBookDeleted = (bookId) => {
        setBooks((prevBooks) =>
            prevBooks.filter((book) => book.BookID !== bookId)
        );
    };


    // Handle update button click
    const handleBookUpdate = (book) => {
        setUpdatingBook(book);
        setShowForm(true);
    };


    // Handle cancel button click when updating
    const handleCancelUpdate = () => {
        setUpdatingBook(null);
        setShowForm(false);
    };


    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Books</h1>
                    <p className="text-gray-600">Manage library books</p>
                </div>
                <button
                    onClick={() => {
                        setUpdatingBook(null);
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Book
                </button>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                    <p className="text-gray-600">Loading books...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700">Error: {error}</p>
                </div>
            )}

            {/* Content */}
            {!loading && !error && (
                <>
                    {/* Form Section */}
                    {showForm && (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {updatingBook ? 'Update Book' : 'Add New Book'}
                                </h2>
                                <button
                                    onClick={handleCancelUpdate}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <BookForm 
                                onBookCreated={handleBookCreated} 
                                onBookUpdated={handleBookUpdated}
                                updatingBook={updatingBook}
                                onCancelUpdate={handleCancelUpdate}
                            />
                        </div>
                    )}

                    {/* List Section */}
                    <BookList
                        books={books}
                        onBookDeleted={handleBookDeleted}
                        onBookUpdate={handleBookUpdate}
                    />
                </>
            )}
        </div>
    );
}

