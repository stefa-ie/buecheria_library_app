import React from "react";

// BookList component to display a list of books
export default function BookList({ books }) {
    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.Id}>
                        Title: {book.Title} | Author Name: {book.author.LastName}, {book.author.FirstName} | ISBN: {book.ISBN} | Publication Date: {book.PublicationDate} | Genre: {book.Genre}
                    </li>
                ))}
            </ul>
        </div>
    );
}

