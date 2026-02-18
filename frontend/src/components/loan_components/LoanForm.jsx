import React from "react";
import { createLoan, updateLoan } from "../../api/loans";
import { fetchBooks } from "../../api/books";
import { fetchMembers } from "../../api/members";

/**
 * LoanForm component for creating and updating loans
 */
export default function LoanForm({ onLoanCreated, onLoanUpdated, updatingLoan, onCancelUpdate }) {
    // Form state
    const [formData, setFormData] = React.useState({
        BookID: "",
        MemberID: "",
        LoanDate: "",
        DueDate: "",
        ReturnDate: "",
    });

    // Books and Members data
    const [books, setBooks] = React.useState([]);
    const [members, setMembers] = React.useState([]);

    // Search/filter states
    const [bookSearch, setBookSearch] = React.useState("");
    const [memberSearch, setMemberSearch] = React.useState("");
    const [showBookDropdown, setShowBookDropdown] = React.useState(false);
    const [showMemberDropdown, setShowMemberDropdown] = React.useState(false);

    // Selected items for display
    const [selectedBook, setSelectedBook] = React.useState(null);
    const [selectedMember, setSelectedMember] = React.useState(null);

    // Fetch books and members on mount
    React.useEffect(() => {
        const loadData = async () => {
            try {
                const [booksData, membersData] = await Promise.all([
                    fetchBooks(),
                    fetchMembers()
                ]);
                setBooks(booksData);
                setMembers(membersData);
            } catch (error) {
                alert(`Failed to load data: ${error.message}`);
            }
        };
        loadData();
    }, []);

    // Update form data when updatingLoan changes
    React.useEffect(() => {
        if (updatingLoan) {
            setFormData({
                BookID: updatingLoan.BookID,
                MemberID: updatingLoan.MemberID,
                LoanDate: updatingLoan.LoanDate,
                DueDate: updatingLoan.DueDate,
                ReturnDate: updatingLoan.ReturnDate || "",
            });
            
            // Set selected items for display
            const book = books.find(b => b.BookID === updatingLoan.BookID);
            const member = members.find(m => m.MemberID === updatingLoan.MemberID);
            if (book) {
                setSelectedBook(book);
                setBookSearch(`${book.Title} (ID: ${book.BookID})`);
            }
            if (member) {
                setSelectedMember(member);
                setMemberSearch(`${member.FirstName} ${member.LastName} (ID: ${member.MemberID})`);
            }
        } else {
            setFormData({
                BookID: "",
                MemberID: "",
                LoanDate: "",
                DueDate: "",
                ReturnDate: "",
            });
            setBookSearch("");
            setMemberSearch("");
            setSelectedBook(null);
            setSelectedMember(null);
        }
    }, [updatingLoan, books, members]);


    // Filter books based on search
    const filteredBooks = React.useMemo(() => {
        if (!bookSearch.trim()) return books;
        const searchLower = bookSearch.toLowerCase();
        return books.filter(book => 
            book.Title.toLowerCase().includes(searchLower) ||
            book.BookID.toString().includes(bookSearch) ||
            (book.Isbn && book.Isbn.toLowerCase().includes(searchLower))
        );
    }, [books, bookSearch]);

    // Filter members based on search
    const filteredMembers = React.useMemo(() => {
        if (!memberSearch.trim()) return members;
        const searchLower = memberSearch.toLowerCase();
        return members.filter(member => 
            member.FirstName.toLowerCase().includes(searchLower) ||
            member.LastName.toLowerCase().includes(searchLower) ||
            member.MemberID.toString().includes(memberSearch) ||
            `${member.FirstName} ${member.LastName}`.toLowerCase().includes(searchLower)
        );
    }, [members, memberSearch]);

    // Handle book selection
    const handleBookSelect = (book) => {
        setFormData(prev => ({ ...prev, BookID: book.BookID }));
        setSelectedBook(book);
        setBookSearch(`${book.Title} (ID: ${book.BookID})`);
        setShowBookDropdown(false);
    };

    // Handle member selection
    const handleMemberSelect = (member) => {
        setFormData(prev => ({ ...prev, MemberID: member.MemberID }));
        setSelectedMember(member);
        setMemberSearch(`${member.FirstName} ${member.LastName} (ID: ${member.MemberID})`);
        setShowMemberDropdown(false);
    };

    // Handle book search input
    const handleBookSearchChange = (e) => {
        const value = e.target.value;
        setBookSearch(value);
        setShowBookDropdown(true);
        if (!value) {
            setFormData(prev => ({ ...prev, BookID: "" }));
            setSelectedBook(null);
        }
    };

    // Handle member search input
    const handleMemberSearchChange = (e) => {
        const value = e.target.value;
        setMemberSearch(value);
        setShowMemberDropdown(true);
        if (!value) {
            setFormData(prev => ({ ...prev, MemberID: "" }));
            setSelectedMember(null);
        }
    };

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
        // Prepare loan data - convert empty ReturnDate to null
        const loanData = {
            ...formData,
            ReturnDate: formData.ReturnDate || null,
        };
        const newLoan = await createLoan(loanData);

        // Notify parent component
        if (onLoanCreated) {
            onLoanCreated(newLoan);
        }
        // Clear form fields
        setFormData({
            BookID: "",
            MemberID: "",
            LoanDate: "",
            DueDate: "",
            ReturnDate: "",
        });
        alert('Loan created successfully!');
    } catch (error) {
        alert(`Failed to create loan: ${error.message}`);
    }
};


// Handle form submission for update
const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        // Prepare loan data - convert empty ReturnDate to null
        const loanData = {
            ...formData,
            ReturnDate: formData.ReturnDate || null,
        };
        const updatedLoan = await updateLoan(updatingLoan.LoanID, loanData);

        // Notify parent component
        if (onLoanUpdated) {
            onLoanUpdated(updatedLoan);
        }
        // Clear form fields
        setFormData({
            BookID: "",
            MemberID: "",
            LoanDate: "",
            DueDate: "",
            ReturnDate: "",
        });
        alert('Loan updated successfully!');
    } catch (error) {
        alert(`Failed to update loan: ${error.message}`);
    }
};


// Handle cancel update
const handleCancelUpdate = () => {
    if (onCancelUpdate) {
        onCancelUpdate();
    }
    setFormData({
        BookID: "",
        MemberID: "",
        LoanDate: "",
        DueDate: "",
        ReturnDate: "",
    });
};


const inputClass = "block w-full p-2 border border-gray-300 dark:border-slate-600 rounded bg-white dark:!bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400";
const labelClass = "block mb-1 text-gray-700 dark:text-slate-200";

return (
    <form onSubmit={updatingLoan ? handleUpdate : handleCreate}>
            <div className="mb-3">
                <label className={labelClass}>
                    Book:
                    <div className="relative">
                        <input
                            type="text"
                            value={bookSearch}
                            onChange={handleBookSearchChange}
                            onFocus={() => setShowBookDropdown(true)}
                            onBlur={() => setTimeout(() => setShowBookDropdown(false), 200)}
                            placeholder="Type book title, ISBN, or ID..."
                            required
                            className={inputClass}
                        />
                        {showBookDropdown && filteredBooks.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white dark:!bg-slate-800 border border-gray-300 dark:border-slate-600 rounded shadow-lg max-h-60 overflow-y-auto">
                                {filteredBooks.map((book) => (
                                    <div
                                        key={book.BookID}
                                        onClick={() => handleBookSelect(book)}
                                        className="p-2 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer border-b border-gray-100 dark:border-slate-600"
                                    >
                                        <div className="font-semibold text-gray-900 dark:text-slate-200">{book.Title || 'Untitled'}</div>
                                        <div className="text-sm text-gray-600 dark:text-slate-400">
                                            ID: {book.BookID} | ISBN: {book.Isbn || 'N/A'}
                                            {book.author && ` | Author: ${book.author.FirstName || ''} ${book.author.LastName || ''}`.trim()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {showBookDropdown && filteredBooks.length === 0 && bookSearch && (
                            <div className="absolute z-10 w-full mt-1 bg-white dark:!bg-slate-800 border border-gray-300 dark:border-slate-600 rounded shadow-lg p-2">
                                <div className="text-gray-500 dark:text-slate-400">No books found</div>
                            </div>
                        )}
                    </div>
                    {formData.BookID && (
                        <input type="hidden" name="BookID" value={formData.BookID} />
                    )}
                </label>
            </div>

            <div className="mb-3">
                <label className={labelClass}>
                    Member:
                    <div className="relative">
                        <input
                            type="text"
                            value={memberSearch}
                            onChange={handleMemberSearchChange}
                            onFocus={() => setShowMemberDropdown(true)}
                            onBlur={() => setTimeout(() => setShowMemberDropdown(false), 200)}
                            placeholder="Type member name or ID..."
                            required
                            className={inputClass}
                        />
                        {showMemberDropdown && filteredMembers.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white dark:!bg-slate-800 border border-gray-300 dark:border-slate-600 rounded shadow-lg max-h-60 overflow-y-auto">
                                {filteredMembers.map((member) => (
                                    <div
                                        key={member.MemberID}
                                        onClick={() => handleMemberSelect(member)}
                                        className="p-2 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer border-b border-gray-100 dark:border-slate-600"
                                    >
                                        <div className="font-semibold text-gray-900 dark:text-slate-200">{member.FirstName} {member.LastName}</div>
                                        <div className="text-sm text-gray-600 dark:text-slate-400">
                                            ID: {member.MemberID} | Email: {member.Email || 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {showMemberDropdown && filteredMembers.length === 0 && memberSearch && (
                            <div className="absolute z-10 w-full mt-1 bg-white dark:!bg-slate-800 border border-gray-300 dark:border-slate-600 rounded shadow-lg p-2">
                                <div className="text-gray-500 dark:text-slate-400">No members found</div>
                            </div>
                        )}
                    </div>
                    {formData.MemberID && (
                        <input type="hidden" name="MemberID" value={formData.MemberID} />
                    )}
                </label>
            </div>

            <div className="mb-3">
                <label className={labelClass}>
                    Issue Date:
                    <input
                        type="date"
                        name="LoanDate"
                        value={formData.LoanDate}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    />
                </label>
            </div>

            <div className="mb-3">
                <label className={labelClass}>
                    Due Date:
                    <input
                        type="date"
                        name="DueDate"
                        value={formData.DueDate}
                        onChange={handleChange}
                        required
                        className={inputClass}
                    />
                </label>
            </div>

            <div className="mb-3">
                <label className={labelClass}>
                    Return Date (optional):
                    <input
                        type="date"
                        name="ReturnDate"
                        value={formData.ReturnDate}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </label>
            </div>

            <div className="flex gap-2">
                <button 
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                >
                    {updatingLoan ? 'Update Loan' : 'Add Loan'}
                </button>
            </div>
            
            <div>
                {updatingLoan && (
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

