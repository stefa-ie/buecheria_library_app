import React from "react";
import AuthorForm from "../components/AuthorForm";
import AuthorList from "../components/AuthorList";

export default function AuthorsPage() {
    const [authors, setAuthors] = React.useState([]);

    // Handle new author creation
    const handleAuthorCreated = (newAuthor) => {
        setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
    };

    return (
        <div>
            <h1>Authors</h1>
            <AuthorForm onAuthorCreated={handleAuthorCreated} />
            <AuthorList authors={authors} />
        </div>
    );
}

