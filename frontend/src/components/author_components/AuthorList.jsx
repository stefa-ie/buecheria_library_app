import React from "react";
import { deleteAuthor } from "../../api/authors";

// AuthorList component to display a list of authors
export default function AuthorList({ authors, onAuthorDeleted, onAuthorUpdate }) {
    // Handle author deletion
    const handleDelete = async (authorId) => {
        try {
            await deleteAuthor(authorId);
            onAuthorDeleted(authorId);
        } catch (error) {
            console.error('Error deleting author:', error);
            alert('Failed to delete author.');
        }
    }

    return (
        <div>
            <h2 className="text-2xl bold">Author List</h2>
            {authors.length === 0 ? (
                <p>No authors found.</p>
            ) : (
                <ul>
                    {authors.map((author) => (
                        <li key={author.AuthorID}>
                            <span>
                                Author Last Name: {author.LastName} |
                                Author First Name: {author.FirstName} |
                                Birthdate: {author.BirthDate} |
                            </span>
                            <button
                                onClick={() => onAuthorUpdate(author)}
                                className="ml-2 px-3 py-0.3 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                UPDATE
                            </button>
                            <button
                                onClick={() => handleDelete(author.AuthorID)}
                                className="ml-2 px-3 py-0.3 bg-blue-500 text-white rounded hover:bg-blue-600"
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

