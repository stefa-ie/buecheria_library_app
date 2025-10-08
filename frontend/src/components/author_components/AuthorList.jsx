import React from "react";

// AuthorList component to display a list of authors
export default function AuthorList({ authors }) {
    return (
        <div>
            <h2>Author List</h2>
            <ul>
                {authors.map((author) => (
                    <li key={author.id}>
                        Author Last Name: {author.LastName} | Author First Name: {author.FirstName} | Birthdate: {author.BirthDate}
                    </li>
                ))}
            </ul>
        </div>
    );
}

