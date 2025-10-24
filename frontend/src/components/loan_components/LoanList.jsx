import React from "react";
import { deleteLoan } from "../../api/loans";

// LoanList component to display a list of loans
export default function LoanList({ loans, onLoanDeleted, onLoanUpdate }) {
    // Handle loan deletion
    const handleDelete = async (loanId) => {
        try {
            await deleteLoan(loanId);
            onLoanDeleted(loanId);
        } catch (error) {
            console.error('Error deleting loan:', error);
            alert('Failed to delete loan.')
        }
    }

    return(
        <div>
            <h2 className="text-2xl font-bold">Loan List</h2>
            {loans.length === 0 ? (
                <p>No loans found.</p>
            ) : (
                <ol>
                    {loans.map((loan) => (
                        <li key={loan.LoanID}>
                            <span>
                            Book Title: {loan.book.Title} |
                            Borrower Name: {loan.BorrowerName} |
                            Loan Date: {loan.LoanDate} |
                            Return Date: {loan.ReturnDate ? loan.ReturnDate : "N/A"} |
                            Returned:{" "}
                            <input
                                type="checkbox"
                                checked={loan.Returned}
                                readOnly
                                className="w-4 h-4 accent-green-600 cursor-default"
                            />
                            </span>
                            <button
                                onClick={() => onLoanUpdate(loan)}
                                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                UPDATE
                            </button>
                            <button
                                onClick={() => handleDelete(loan.LoanID)}
                                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                DELETE
                            </button>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
}

