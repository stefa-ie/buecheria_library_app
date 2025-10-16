import React from "react";  
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

    // Handle book update
    const handleBookUpdated = (updatedBook) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) =>
                book.BookID === updatedBook.BookID ? updatedBook : book
            )
        );
        setUpdatingBook(null);
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
    };

    // Handle cancel button click when updating
    const handleCancelUpdate = () => {
        setUpdatingBook(null);
    };


    return (
        <div className="bg-gray-400 p-4 m-8">
            <h1 className="text-4xl italic">Books</h1>
            <BookForm 
                onBookCreated={handleBookCreated} 
                onBookUpdated={handleBookUpdated}
                updatingBook={updatingBook}
                onCancelUpdate={handleCancelUpdate}
            />
            <BookList
                books={books}
                onBookDeleted={handleBookDeleted}
                onBookUpdate={handleBookUpdate}
            />
        </div>
    );
}