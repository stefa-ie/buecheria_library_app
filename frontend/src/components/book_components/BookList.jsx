import React from "react";
import { deleteBook } from "../../api/books";

// BookList component to display a list of books
export default function BookList({ books, onBookDeleted, onBookUpdate }) {
    // Handle book deletion
    const handleDelete = async (bookId) => {
        try {
            await deleteBook(bookId);
            onBookDeleted(bookId);
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Failed to delete book.')
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold">Book List</h2>
            {books.length === 0 ? (
                <p>No books found.</p>
            ) : (
                <ul>
                    {books.map((book) => (
                        <li key={book.BookID}>
                            <span>
                            Title: {book.Title} |
                            Author Name: {book.author.LastName}, {book.author.FirstName} |
                            ISBN: {book.Isbn} |
                            Publication Date: {book.PublicationDate} |
                            Genre: {book.Genre}
                            </span>
                            <button
                                onClick={() => onBookUpdate(book)}
                                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                UPDATE
                            </button>
                            <button
                                onClick={() => handleDelete(book.BookID)}
                                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                DELETE
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

