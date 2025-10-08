import React from "react";
import { createBook } from "../../api/books";
import { fetchAuthors } from "../../api/authors";


// BookForm component to add a new book
export default function BookForm({ onBookCreated }) {
    const [title, setTitle] = React.useState("");
    const [authorId, setAuthorId] = React.useState("");
    const [isbn, setIsbn] = React.useState("");
    const [publicationDate, setPublicationDate] = React.useState("");
    const [genre, setGenre] = React.useState("");


    // State to hold authors for the dropdown
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
    
    
    // Construct new book object
    const newBook = {
        Title: title,
        AuthorId: authorId,
        ISBN: isbn,
        PublicationDate: publicationDate,
        Genre: genre,
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            createBook(newBook).then((createdBook) => {
                onBookCreated(createdBook);
                // Clear form fields
                setTitle("");
                setAuthorId("");
                setIsbn("");
                setPublicationDate("");
                setGenre("");
            });
        } catch (error) {
            console.error("Error creating book:", error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Author:</label>
                {loading ? (
                    <p>Loading authors...</p>
                ) : error ? (
                    <p>Error loading authors: {error}</p>
                ) : (
                    <select
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                        required
                    >
                        <option value="">Select an author</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.FirstName} {author.LastName}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <div>
                <label>ISBN:</label>
                <input
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Publication Date:</label>
                <input
                    type="date"
                    value={publicationDate}
                    onChange={(e) => setPublicationDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Genre:</label>
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Book</button>
        </form>
    );
}

