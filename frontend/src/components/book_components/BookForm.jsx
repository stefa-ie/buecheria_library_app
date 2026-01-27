import React from "react";
import { createBook, updateBook } from "../../api/books";
import { fetchAuthors, createAuthor } from "../../api/authors";


// BookForm component to add a new book
export default function BookForm({ onBookCreated, onBookUpdated, updatingBook, onCancelUpdate }) {
    const [formData, setFormData] = React.useState({
        Title: "",
        AuthorID: "",
        Isbn: "",
        PublicationDate: "",
        Genre: "",
        Available: true,
        CoverUrl: "",
    });

    const [authors, setAuthors] = React.useState([]);
    const [showNewAuthorForm, setShowNewAuthorForm] = React.useState(false);
    const [newAuthorData, setNewAuthorData] = React.useState({
        FirstName: "",
        LastName: "",
        BirthDate: "",
    });


    // Fetch authors on mount
    React.useEffect(() => {
        const loadAuthors = async () => {
            try {
                const data = await fetchAuthors();
                setAuthors(data);
            } catch (error) {
                alert(`Failed to load authors: ${error.message}`);
            }
        };
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
                Available: updatingBook.Available ?? true,
                CoverUrl: updatingBook.CoverUrl || "",
            });
        } else {
            setFormData({
                Title: "",
                AuthorID: "",
                Isbn: "",
                PublicationDate: "",
                Genre: "",
                Available: true,
                CoverUrl: "",
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

    const normalizeIsbn = (isbn) => isbn.replace(/[^0-9X]/gi, "").toUpperCase();

    const getOpenLibraryCover = (isbn) => {
        const normalized = normalizeIsbn(isbn);
        if (!normalized) return "";
        return `https://covers.openlibrary.org/b/isbn/${normalized}-M.jpg?default=false`;
    };

    const handleUseOpenLibraryCover = () => {
        if (!formData.Isbn) {
            alert("Please add an ISBN first.");
            return;
        }
        setFormData((prevData) => ({
            ...prevData,
            CoverUrl: getOpenLibraryCover(prevData.Isbn),
        }));
    };


    // Handle form submission for create
    const handleCreate = async (e) => {
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
                Available: true,
                CoverUrl: "",
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
                Available: true,
                CoverUrl: "",
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
            Available: true,
            CoverUrl: "",
        });
    };

    // Handle creating a new author
    const handleCreateAuthor = async (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event from bubbling to parent form
        
        try {
            // Prepare author data - only include BirthDate if it's not empty
            const authorPayload = {
                FirstName: newAuthorData.FirstName,
                LastName: newAuthorData.LastName,
            };
            
            // Only add BirthDate if it's provided
            if (newAuthorData.BirthDate && newAuthorData.BirthDate.trim() !== '') {
                authorPayload.BirthDate = newAuthorData.BirthDate;
            }
            
            console.log('Creating author with data:', authorPayload);
            const newAuthor = await createAuthor(authorPayload);
            console.log('Author created:', newAuthor);
            
            // Add the new author to the authors list
            setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
            
            // Automatically select the new author
            setFormData((prevData) => ({
                ...prevData,
                AuthorID: newAuthor.AuthorID.toString(),
            }));
            
            // Reset new author form and hide it
            setNewAuthorData({
                FirstName: "",
                LastName: "",
                BirthDate: "",
            });
            setShowNewAuthorForm(false);
            
            alert('Author created and selected successfully!');
        } catch (error) {
            console.error('Error creating author:', error);
            const errorMessage = error.message || 'Failed to create author';
            alert(`Failed to create author: ${errorMessage}`);
        }
    };

    // Handle new author form changes
    const handleNewAuthorChange = (e) => {
        const { name, value } = e.target;
        setNewAuthorData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    
    return (
        <form onSubmit={updatingBook ? handleUpdate : handleCreate}>
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
                        <div className="flex gap-2">
                            <select
                                name="AuthorID"
                                value={formData.AuthorID}
                                onChange={handleChange}
                                required
                                className="block flex-1 p-2 border rounded"
                                disabled={showNewAuthorForm}
                            >
                                <option value="">Select Author</option>
                                {authors.map((author) => (
                                    <option key={author.AuthorID} value={author.AuthorID}>
                                        {author.FirstName} {author.LastName}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowNewAuthorForm(!showNewAuthorForm);
                                    if (showNewAuthorForm) {
                                        setNewAuthorData({
                                            FirstName: "",
                                            LastName: "",
                                            BirthDate: "",
                                        });
                                    }
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap"
                            >
                                {showNewAuthorForm ? 'Cancel' : '+ New Author'}
                            </button>
                        </div>
                    </label>
                    
                    {showNewAuthorForm && (
                        <div className="mt-3 p-4 bg-gray-50 border border-gray-300 rounded">
                            <h3 className="text-lg font-semibold mb-3">Add New Author</h3>
                            <div>
                                <div className="mb-3">
                                    <label className="block mb-1 text-sm">
                                        First Name:
                                        <input
                                            type="text"
                                            name="FirstName"
                                            value={newAuthorData.FirstName}
                                            onChange={handleNewAuthorChange}
                                            required
                                            className="block w-full p-2 border rounded mt-1"
                                            placeholder="First Name"
                                        />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="block mb-1 text-sm">
                                        Last Name:
                                        <input
                                            type="text"
                                            name="LastName"
                                            value={newAuthorData.LastName}
                                            onChange={handleNewAuthorChange}
                                            required
                                            className="block w-full p-2 border rounded mt-1"
                                            placeholder="Last Name"
                                        />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="block mb-1 text-sm">
                                        Birth Date (optional):
                                        <input
                                            type="text"
                                            name="BirthDate"
                                            value={newAuthorData.BirthDate}
                                            onChange={handleNewAuthorChange}
                                            placeholder="YYYY or MM-YYYY or DD-MM-YYYY"
                                            className="block w-full p-2 border rounded mt-1"
                                        />
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCreateAuthor}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Add Author
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        ISBN:
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="Isbn"
                                value={formData.Isbn}
                                onChange={handleChange}
                                required
                                className="block w-full p-2 border rounded"
                            />
                            <button
                                type="button"
                                onClick={handleUseOpenLibraryCover}
                                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 whitespace-nowrap"
                            >
                                Fetch Cover
                            </button>
                        </div>
                    </label>
                </div>

                <div className="mb-3">
                    <label className="block mb-1">
                        Cover URL (optional):
                        <input
                            type="url"
                            name="CoverUrl"
                            value={formData.CoverUrl}
                            onChange={handleChange}
                            placeholder="https://..."
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

                <div className="mb-3">
                    <label className="block mb-1">
                        Available:
                        <select
                            name="Available"
                            value={formData.Available}
                            onChange={(e) => setFormData((prevData) => ({ ...prevData, Available: e.target.value === 'true' }))}
                            className="block w-full p-2 border rounded"
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                </div>

                <div className="flex gap-2">
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        {updatingBook ? 'Update Book' : 'Add Book'}
                    </button>
                </div>
                
                <div>
                    {updatingBook && (
                        <button 
                            type="button"
                            onClick={handleCancelUpdate}
                            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
    );
}

