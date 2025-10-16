import React from "react";
import { createBook, updateBook } from "../../api/books";
import { fetchAuthors } from "../../api/authors";


// BookForm component to add a new book
export default function BookForm({ onBookCreated, onBookUpdated, updatingBook, onCancelUpdate }) {
    const [formData, setFormData] = React.useState({
        Title: "",
        AuthorID: "",
        Isbn: "",
        PublicationDate: "",
        Genre: "",
    });


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


    // Update form data when updatingBook prop changes
    React.useEffect(() => {
        if (updatingBook) {
            setFormData({
                Title: updatingBook.Title || "",
                AuthorID: updatingBook.AuthorID || "",
                Isbn: updatingBook.Isbn || "",
                PublicationDate: updatingBook.PublicationDate || "",
                Genre: updatingBook.Genre || "",
            });
        } else {
            setFormData({
                Title: "",
                AuthorID: "",
                Isbn: "",
                PublicationDate: "",
                Genre: "",
            });
        }
    }, [updatingBook]);


    // Object destructuring for easier access
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    
    // Handle form submission for create
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newBook = await createBook(formData);

            // Notify parent component
            if (onBookCreated) {
                onBookCreated(newBook);
            }
            // Clear form fields
            setFormData({
                Title: "",
                AuthorID: "",
                Isbn: "",
                PublicationDate: "",
                Genre: "",
            });
            alert('Book created successfully!');
        } catch (error) {
            alert(`Failed to create book: ${error.message}`);
        }
    };


    // Handle form submission for update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedBook = await updateBook(updatingBook.BookID, formData);

            // Notify parent component
            if (onBookUpdated) {
                onBookUpdated(updatedBook);
            }
            // Clear form fields
            setFormData({
                Title: "",
                AuthorID: "",
                Isbn: "",
                PublicationDate: "",
                Genre: "",
            });
            alert('Book updated successfully!');
        } catch (error) {
            alert(`Failed to update book: ${error.message}`);
        }
    };


    // Handle cancel update
    const handleCancelUpdate = () => {
        if (onCancelUpdate) {
            onCancelUpdate();
        }
        setFormData({
            Title: "",
            AuthorID: "",
            Isbn: "",
            PublicationDate: "",
            Genre: "",
        });
    }


    return (
        <div className="my-4 p-4 bg-white rounded shadow">
            <h2 className="text-2xl mb-4">
                {updatingBook ? "Update Book" : "Add New Book"}
            </h2>
            <form onSubmit={updatingBook ? handleUpdate : handleSubmit}>
                <div className="mb-3">
                    <label className="block mb-1">
                        Title:
                        <input
                            type="text"
                            name="Title"
                            value={formData.Title}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        Author:
                        {loading ? (
                            <p>Loading authors...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <select
                                name="AuthorID"
                                value={formData.AuthorID}
                                onChange={handleChange}
                                required
                                className="block w-full p-2 border rounded"
                            >
                                <option value="">Select Author</option>
                                {authors.map((author) => (
                                    <option key={author.AuthorID} value={author.AuthorID}>
                                        {author.FirstName} {author.LastName}
                                    </option>
                                ))}
                            </select>
                        )}
                    </label>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        ISBN:
                        <input
                            type="text"
                            name="Isbn"
                            value={formData.Isbn}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        Publication Date:
                        <input
                            type="date"
                            name="PublicationDate"
                            value={formData.PublicationDate}
                            onChange={handleChange}
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        Genre:
                        <input
                            type="text"
                            name="Genre"
                            value={formData.Genre}
                            onChange={handleChange}
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        {updatingBook ? "Update Book" : "Add Book"}
                    </button>

                    {updatingBook && (
                        <button
                            type="button"
                            onClick={handleCancelUpdate}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}