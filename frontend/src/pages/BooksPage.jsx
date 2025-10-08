import React from "react";  
import BookForm from "../components/book_components/BookForm";
import BookList from "../components/book_components/BookList";
import { fetchBooks } from "../api/books";

export default function BooksPage() {
    const [books, setBooks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

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

    if (loading) return <p>Loading books...</p>;
    if (error) return <p>Error: {error}</p>;

    // Handle new book creation
    const handleBookCreated = (newBook) => {
        setBooks((prevBooks) => [...prevBooks, newBook]);
    };

    return (
        <div>
            <h1>Books</h1>
            <BookForm onBookCreated={handleBookCreated} />
            <BookList books={books} />
        </div>
    );
}