import React from "react";
import { createBook, updateBook } from "../../api/books";
import { fetchAuthors } from "../../api/authors";

/**
 * BookForm component for creating or updating a book.
 * Supports optional creation of a new author.
 */
export default function BookForm({ onBookCreated, onBookUpdated, updatingBook, onCancelUpdate }) {
    // Form state
    const [formData, setFormData] = React.useState({
        Title: "",
        AuthorID: "",
        Isbn: "",
        PublicationDate: "",
        Genre: "",
        Available: true,
        NewAuthor: null,
    });

    // Authors list for dropdown
    const [authors, setAuthors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    // State for showing new author fields
    const [showNewAuthorForm, setShowNewAuthorForm] = React.useState(false);
    const [newAuthor, setNewAuthor] = React.useState({ FirstName: "", LastName: "", BirthDate: "" });

    // Function to load authors (extracted for reuse)
    const loadAuthors = React.useCallback(async () => {
        try {
            const data = await fetchAuthors();
            setAuthors(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch authors on mount
    React.useEffect(() => {
        loadAuthors();
    }, [loadAuthors]);

    // Populate form when updatingBook changes
    React.useEffect(() => {
        if (updatingBook) {
            setFormData({
                Title: updatingBook.Title || "",
                AuthorID: updatingBook.AuthorID || "",
                Isbn: updatingBook.Isbn || "",
                PublicationDate: updatingBook.PublicationDate || "",
                Genre: updatingBook.Genre || "",
                Available: updatingBook.Available ?? true,
                NewAuthor: null,
            });
            setShowNewAuthorForm(false);
            setNewAuthor({ FirstName: "", LastName: "", BirthDate: "" });
        } else {
            resetForm();
        }
    }, [updatingBook]);

    // Reset form helper
    const resetForm = () => {
        setFormData({
            Title: "",
            AuthorID: "",
            Isbn: "",
            PublicationDate: "",
            Genre: "",
            Available: true,
            NewAuthor: null,
        });
        setShowNewAuthorForm(false);
        setNewAuthor({ FirstName: "", LastName: "", BirthDate: "" });
    };

    // Generic change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle selecting author (existing or new)
    const handleAuthorChange = (e) => {
        const value = e.target.value;
        if (value === "new") {
            setShowNewAuthorForm(true);
            setFormData((prev) => ({ ...prev, AuthorID: "", NewAuthor: newAuthor }));
        } else {
            setShowNewAuthorForm(false);
            setFormData((prev) => ({ ...prev, AuthorID: value, NewAuthor: null }));
        }
    };

    // Handle new author input changes
    const handleNewAuthorChange = (e) => {
        const { name, value } = e.target;
        const updatedNewAuthor = { ...newAuthor, [name]: value };
        setNewAuthor(updatedNewAuthor);
        setFormData((prev) => ({ ...prev, NewAuthor: updatedNewAuthor }));
    };

    // Create a new book
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                Title: formData.Title,
                Isbn: formData.Isbn,
                PublicationDate: formData.PublicationDate,
                Genre: formData.Genre,
                Available: formData.Available,
                AuthorID: showNewAuthorForm ? undefined : formData.AuthorID,
                NewAuthor: showNewAuthorForm ? formData.NewAuthor : undefined,
            };
            const newBook = await createBook(payload);
            
            // If a new author was created, refresh the authors list
            if (showNewAuthorForm) {
                await loadAuthors();
            }
            
            if (onBookCreated) onBookCreated(newBook);
            resetForm();
            alert("Book created successfully!");
        } catch (error) {
            alert(`Failed to create book: ${error.message}`);
        }
    };

    // Update an existing book
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedBook = await updateBook(updatingBook.BookID, formData);
            if (onBookUpdated) onBookUpdated(updatedBook);
            resetForm();
            alert("Book updated successfully!");
        } catch (error) {
            alert(`Failed to update book: ${error.message}`);
        }
    };

    // Cancel update
    const handleCancelUpdate = () => {
        if (onCancelUpdate) onCancelUpdate();
        resetForm();
    };

    return (
        <div className="my-4 p-4 bg-white rounded shadow">
            <h2 className="text-2xl mb-4">
                {updatingBook ? "Update Book" : "Add New Book"}
            </h2>
            <form onSubmit={updatingBook ? handleUpdate : handleCreate}>
                {/* Title */}
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

                {/* Author */}
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
                                value={showNewAuthorForm ? "new" : formData.AuthorID}
                                onChange={handleAuthorChange}
                                required={!showNewAuthorForm}
                                className="block w-full p-2 border rounded"
                            >
                                <option value="">Select Author</option>
                                {authors.map((author) => (
                                    <option key={author.AuthorID} value={author.AuthorID}>
                                        {author.FirstName} {author.LastName}
                                    </option>
                                ))}
                                <option value="new">+ Add New Author</option>
                            </select>
                        )}
                    </label>

                    {/* New author fields */}
                    {showNewAuthorForm && (
                        <div className="mt-2 space-y-2">
                            <input
                                type="text"
                                name="FirstName"
                                placeholder="First Name"
                                value={newAuthor.FirstName}
                                onChange={handleNewAuthorChange}
                                required
                                className="block w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="LastName"
                                placeholder="Last Name"
                                value={newAuthor.LastName}
                                onChange={handleNewAuthorChange}
                                required
                                className="block w-full p-2 border rounded"
                            />
                            <input
                                type="date"
                                name="BirthDate"
                                placeholder="Birth Date"
                                value={newAuthor.BirthDate}
                                onChange={handleNewAuthorChange}
                                required
                                className="block w-full p-2 border rounded"
                            />
                        </div>
                    )}
                </div>

                {/* ISBN */}
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

                {/* Publication Date */}
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

                {/* Genre */}
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

                {/* Available */}
                <div className="mb-2 flex items-center">
                    <label className="mr-2">Available:</label>
                    <input
                        type="checkbox"
                        checked={formData.Available}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, Available: e.target.checked }))
                        }
                        className="w-5 h-5 accent-green-600 cursor-pointer"
                    />
                </div>

                {/* Submit / Cancel */}
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
