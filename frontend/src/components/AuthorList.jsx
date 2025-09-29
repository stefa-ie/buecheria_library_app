import React from "react";
import { fetchAuthors } from "../api/authors";

export default function AuthorList() {
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

    return (
        <div>
            <h2>Author List</h2>
            <ul>
                {authors.map((author) => (
                    <li key={author.id}>
                        Author Name: {author.name} | Birthdate: {author.birthdate}
                    </li>
                ))}
            </ul>
        </div>
    );
}

