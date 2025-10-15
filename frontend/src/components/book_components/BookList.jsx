import React from "react";

// BookList component to display a list of books
export default function BookList({ books }) {
    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.BookID}>
                        Title: {book.Title} | Author Name: {book.author.LastName}, {book.author.FirstName} | ISBN: {book.Isbn} | Publication Date: {book.PublicationDate} | Genre: {book.Genre}
                    </li>
                ))}
            </ul>
        </div>
    );
}

