import React from "react";
import { Plus, X } from "lucide-react";
import AuthorForm from "../components/author_components/AuthorForm";
import AuthorList from "../components/author_components/AuthorList";
import { fetchAuthors } from "../api/authors";

export default function AuthorsPage() {
    const [authors, setAuthors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [updatingAuthor, setUpdatingAuthor] = React.useState(null);
    const [showForm, setShowForm] = React.useState(false);

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

    // Handle new author creation
    const handleAuthorCreated = (newAuthor) => {
        setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
        setShowForm(false);
        setUpdatingAuthor(null);
    };

    // Handle author update
    const handleAuthorUpdated = (updatedAuthor) => {
        setAuthors((prevAuthors) =>
            prevAuthors.map((author) =>
                author.AuthorID === updatedAuthor.AuthorID ? updatedAuthor : author
            )
        );
        setUpdatingAuthor(null);
        setShowForm(false);
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
        setShowForm(true);
    };

    // Handle cancel button click when updating
    const handleCancelUpdate = () => {
        setUpdatingAuthor(null);
        setShowForm(false);
    };


    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-300 mb-2">Authors</h1>
                    <p className="text-gray-600 dark:text-slate-400">Manage library authors</p>
                </div>
                <button
                    onClick={() => {
                        setUpdatingAuthor(null);
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Author
                </button>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="bg-white dark:!bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-8 text-center">
                    <p className="text-gray-600 dark:text-slate-400">Loading authors...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-300">Error: {error}</p>
                </div>
            )}

            {/* Content */}
            {!loading && !error && (
                <>
                    {/* Form Section */}
                    {showForm && (
                        <div className="bg-white dark:!bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-300">
                                    {updatingAuthor ? 'Update Author' : 'Add New Author'}
                                </h2>
                                <button
                                    onClick={handleCancelUpdate}
                                    className="text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <AuthorForm 
                                onAuthorCreated={handleAuthorCreated}
                                onAuthorUpdated={handleAuthorUpdated}
                                updatingAuthor={updatingAuthor}
                                onCancelUpdate={handleCancelUpdate}
                            />
                        </div>
                    )}

                    {/* List Section */}
                    <AuthorList 
                        authors={authors}
                        onAuthorDeleted={handleAuthorDeleted}
                        onAuthorUpdate={handleAuthorUpdate}
                    />
                </>
            )}
        </div>
    );
}

