import React from "react";
import { Edit, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { deleteBook } from "../../api/books";

// BookList component to display a list of books
export default function BookList({ books, onBookDeleted, onBookUpdate }) {
    const normalizeIsbn = (isbn) => isbn.replace(/[^0-9X]/gi, "").toUpperCase();

    const getOpenLibraryCover = (isbn) => {
        const normalized = normalizeIsbn(isbn || "");
        if (!normalized) return "";
        return `https://covers.openlibrary.org/b/isbn/${normalized}-S.jpg?default=false`;
    };

    const getCoverUrl = (book) => {
        return book.CoverUrl || getOpenLibraryCover(book.Isbn);
    };

    // Handle book deletion
    const handleDelete = async (bookId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await deleteBook(bookId);
                onBookDeleted(bookId);
            } catch (error) {
                console.error('Error deleting book:', error);
                alert('Failed to delete book.')
            }
        }
    }

    if (books.length === 0) {
        return (
            <div className="bg-white dark:!bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm p-8 text-center">
                <p className="text-gray-500 dark:text-slate-400">No books found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:!bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:!bg-slate-700/50 border-b border-gray-200 dark:border-slate-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Cover
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Author
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                ISBN
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Genre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Publication Date
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Available
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:!bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
                        {books.map((book) => (
                            <tr 
                                key={book.BookID}
                                className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-200">
                                    {book.BookID}
                                </td>
                                <td className="px-6 py-4">
                                    {getCoverUrl(book) ? (
                                        <img
                                            src={getCoverUrl(book)}
                                            alt={`Cover for ${book.Title || "book"}`}
                                            className="h-12 w-9 rounded object-cover border border-gray-200 dark:border-slate-600"
                                            onError={(event) => {
                                                event.currentTarget.style.display = "none";
                                            }}
                                        />
                                    ) : (
                                        <div className="h-12 w-9 rounded border border-dashed border-gray-300 dark:border-slate-600 text-[10px] text-gray-400 dark:text-slate-500 flex items-center justify-center">
                                            No cover
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-200 font-medium">
                                    {book.Title || 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">
                                    {book.author ? `${book.author.FirstName} ${book.author.LastName}` : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                                    {book.Isbn || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                                    {book.Genre || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                                    {book.PublicationDate || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {book.Available ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30 rounded-full">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Available
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/30 rounded-full">
                                            <XCircle className="w-3 h-3" />
                                            Unavailable
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onBookUpdate(book)}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book.BookID)}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

