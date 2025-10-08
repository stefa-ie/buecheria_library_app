import React from "react";

// BookList component to display a list of books
export default function BookList({ books }) {
    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        Title: {book.Title} | Author ID: {book.AuthorId} | ISBN: {book.ISBN} | Publication Date: {book.PublicationDate} | Genre: {book.Genre}
                    </li>
                ))}
            </ul>
        </div>
    );
}

