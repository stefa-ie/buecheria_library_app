import React from "react";
import { createAuthor, updateAuthor } from "../../api/authors";


// AuthorForm component to add a new author
export default function AuthorForm({ onAuthorCreated, onAuthorUpdated, updatingAuthor, onCancelUpdate }) {
    const [formData, setFormData] = React.useState({
        LastName: "",
        FirstName: "",
        BirthDate: "",
    });


    // Update form data when updatingAuthor prop changes
    React.useEffect(() => {
        if (updatingAuthor) {
            setFormData({
                LastName: updatingAuthor.LastName || "",
                FirstName: updatingAuthor.FirstName || "",
                BirthDate: updatingAuthor.BirthDate || "",
            });
        } else {
            setFormData({
                LastName: "",
                FirstName: "",
                BirthDate: "",
            });
        }
    }, [updatingAuthor]);


    // Object destructuring for easier access
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    // Handle form submission for create
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const newAuthor = await createAuthor(formData);

            // Notify parent component
            if (onAuthorCreated) {
                onAuthorCreated(newAuthor);
            }
            // Clear form fields
            setFormData({
                FirstName: "",
                LastName: "",
                BirthDate: ""
            });
            alert('Author created successfully!');
        } catch (error) {
            alert(`Failed to create author: ${error.message}`);
        }
    };


    // Handle form submission for update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedAuthor = await updateAuthor(updatingAuthor.AuthorID, formData);

            // Notify parent component
            if (onAuthorUpdated) {
                onAuthorUpdated(updatedAuthor);
            }
            // Clear form fields
            setFormData({
                FirstName: "",
                LastName: "",
                BirthDate: ""
            });
            alert('Author updated successfully!');
        } catch (error) {
            alert(`Failed to update author: ${error.message}`);
        }
    };


    // Handle cancel update
    const handleCancelUpdate = () => {
        if (onCancelUpdate) {
            onCancelUpdate();
        }
        setFormData({
            FirstName: "",
            LastName: "",
            BirthDate: ""
        });
    };

    
    return (
        <div className="my-4 p-4 bg-white rounded shadow">
            <h2 className="text-2xl mb-4">
                {updatingAuthor ? 'Update Author' : 'Add New Author'}
            </h2>
            <form onSubmit={updatingAuthor ? handleUpdate : handleCreate}>
                <div className="mb-3">
                    <label className="block mb-1">
                        First Name:
                        <input
                            type="text"
                            name="FirstName"
                            value={formData.FirstName}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                </div>
                <div className="mb-3">
                    <label className="block mb-1">
                        Last Name:
                        <input
                            type="text"
                            name="LastName"
                            value={formData.LastName}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 border rounded"
                        />
                    </label>
                </div>
                <div className="mb-3">
                    <label className="block mb-1">
                        Birth Date:
                        <input
                            type="date"
                            name="BirthDate"
                            value={formData.BirthDate}
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
                        {updatingAuthor ? 'Update Author' : 'Add Author'}
                    </button>
                </div>
                <div>
                    {updatingAuthor && (
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
        </div>
    );
}

