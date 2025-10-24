import React from "react";
import { createLoan, updateLoan } from "../../api/loans";

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
        } else {
            setFormData({
                BookID: "",
                MemberID: "",
                LoanDate: "",
                DueDate: "",
                ReturnDate: "",
            });
        }
    }, [updatingLoan]);


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
        const newLoan = await createLoan(formData);

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
        const updatedLoan = await updateLoan(updatingLoan.LoanID, formData);

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


return (
    <div className="my-4 p-4 bg-white rounded shadow">
        <h2 className="text-2xl mb-4">
            {updatingLoan ? 'Update Loan' : 'Add New Loan'}
        </h2>
        <form onSubmit={updatingLoan ? handleUpdate : handleCreate}>
            <div className="mb-3">
                <label className="block mb-1">
                    Book ID:
                    <input
                        type="number"
                        name="BookID"
                        value={formData.BookID}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 border rounded"
                    />
                </label>
            </div>

            <div className="mb-3">
                <label className="block mb-1">
                    Member ID:
                    <input
                        type="number"
                        name="MemberID"
                        value={formData.MemberID}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 border rounded"
                    />
                </label>
            </div>

            <div className="mb-3">
                <label className="block mb-1">
                    Issue Date:
                    <input
                        type="date"
                        name="LoanDate"
                        value={formData.LoanDate}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 border rounded"
                    />
                </label>
            </div>

            <div className="mb-3">
                <label className="block mb-1">
                    Due Date:
                    <input
                        type="date"
                        name="DueDate"
                        value={formData.DueDate}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 border rounded"
                    />
                </label>
            </div>

            <div className="mb-3">
                <label className="block mb-1">
                    Return Date:
                    <input
                        type="date"
                        name="ReturnDate"
                        value={formData.ReturnDate}
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
                    {updatingLoan ? 'Update Loan' : 'Add Loan'}
                </button>
            </div>
            
            <div>
                {updatingLoan && (
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

