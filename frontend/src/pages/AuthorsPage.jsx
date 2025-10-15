import React from "react";
import AuthorForm from "../components/author_components/AuthorForm";
import AuthorList from "../components/author_components/AuthorList";
import { fetchAuthors } from "../api/authors";

export default function AuthorsPage() {
    const [authors, setAuthors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [updatingAuthor, setUpdatingAuthor] = React.useState(null);

    // Fetch authors on component mount
    React.useEffect(() => {
        async function loadAuthors() {
            try {
                const data = await fetchAuthors();
                setAuthors(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadAuthors();
    }, []);

    if (loading) return <p>Loading authors...</p>;
    if (error) return <p>Error: {error}</p>;


    // Handle new author creation
    const handleAuthorCreated = (newAuthor) => {
        setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
    };

    // Handle author update
    const handleAuthorUpdated = (updatedAuthor) => {
        setAuthors((prevAuthors) =>
            prevAuthors.map((author) =>
                author.AuthorID === updatedAuthor.AuthorID ? updatedAuthor : author
            )
        );
        setUpdatingAuthor(null);
    };

    // Handle author deletion
    const handleAuthorDeleted = (authorId) => {
        setAuthors((prevAuthors) =>
            prevAuthors.filter((author) => author.AuthorID !== authorId)
        );
    };

    // Handle update button click
    const handleAuthorUpdate = (author) => {
        setUpdatingAuthor(author);
    };

    // Handle cancel button click when updating
    const handleCancelUpdate = () => {
        setUpdatingAuthor(null);
    };


    return (
        <div className="bg-gray-400 p-4 m-8">
            <h1 className="text-4xl italic">Authors</h1>
            <AuthorForm 
                onAuthorCreated={handleAuthorCreated}
                onAuthorUpdated={handleAuthorUpdated}
                updatingAuthor={updatingAuthor}
                onCancelUpdate={handleCancelUpdate}
            />
            <AuthorList 
                authors={authors}
                onAuthorDeleted={handleAuthorDeleted}
                onAuthorUpdate={handleAuthorUpdate}
            />
        </div>
    );
}

