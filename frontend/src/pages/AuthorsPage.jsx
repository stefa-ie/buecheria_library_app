import React from "react";
import AuthorForm from "../components/author_components/AuthorForm";
import AuthorList from "../components/author_components/AuthorList";
import { fetchAuthors } from "../api/authors";

export default function AuthorsPage() {
    const [authors, setAuthors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

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

    return (
        <div>
            <h1>Authors</h1>
            <AuthorForm onAuthorCreated={handleAuthorCreated} />
            <AuthorList authors={authors} />
        </div>
    );
}

