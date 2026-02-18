import React from "react";
import { Edit, Trash2, CheckCircle2, Clock } from "lucide-react";
import { deleteLoan } from "../../api/loans";

// LoanList component to display a list of loans
export default function LoanList({ loans, onLoanDeleted, onLoanUpdate }) {
    // Handle loan deletion
    const handleDelete = async (loanId) => {
        if (window.confirm('Are you sure you want to delete this loan?')) {
            try {
                await deleteLoan(loanId);
                onLoanDeleted(loanId);
            } catch (error) {
                console.error('Error deleting loan:', error);
                alert('Failed to delete loan.')
            }
        }
    }

    if (loans.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm p-8 text-center">
                <p className="text-gray-500 dark:text-slate-400">No loans found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Book
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Borrower
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Loan Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Due Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Return Date
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
                        {loans.map((loan) => (
                            <tr 
                                key={loan.LoanID}
                                className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-200">
                                    {loan.LoanID}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-slate-200 font-medium">
                                    {loan.book?.Title || 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">
                                    {loan.BorrowerName || (loan.member ? `${loan.member.FirstName} ${loan.member.LastName}` : 'N/A')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                                    {loan.LoanDate || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                                    {loan.DueDate || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300">
                                    {loan.ReturnDate || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {loan.Returned ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30 rounded-full">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Returned
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/30 rounded-full">
                                            <Clock className="w-3 h-3" />
                                            Active
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onLoanUpdate(loan)}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(loan.LoanID)}
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

