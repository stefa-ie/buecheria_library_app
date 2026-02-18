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

    
    const inputClass = "block w-full p-2 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400";
    const labelClass = "block mb-1 text-gray-700 dark:text-slate-200";

    return (
        <form onSubmit={updatingAuthor ? handleUpdate : handleCreate}>
                <div className="mb-3">
                    <label className={labelClass}>
                        First Name:
                        <input
                            type="text"
                            name="FirstName"
                            value={formData.FirstName}
                            onChange={handleChange}
                            required
                            className={inputClass}
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className={labelClass}>
                        Last Name:
                        <input
                            type="text"
                            name="LastName"
                            value={formData.LastName}
                            onChange={handleChange}
                            required
                            className={inputClass}
                        />
                    </label>
                </div>

                <div className="mb-3">
                    <label className={labelClass}>
                        Birth Date (optional):
                        <input
                            type="text"
                            name="BirthDate"
                            value={formData.BirthDate}
                            onChange={handleChange}
                            placeholder="YYYY or MM-YYYY or DD-MM-YYYY"
                            className={inputClass}
                        />
                    </label>
                </div>

                <div className="flex gap-2">
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                        {updatingAuthor ? 'Update Author' : 'Add Author'}
                    </button>
                </div>
                
                <div>
                    {updatingAuthor && (
                        <button 
                            type="button"
                            onClick={handleCancelUpdate}
                            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-slate-600 dark:hover:bg-slate-500"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
    );
}

