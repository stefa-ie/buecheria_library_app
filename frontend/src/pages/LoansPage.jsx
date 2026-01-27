import React from "react";
import { Plus, X } from "lucide-react";
import LoanForm from "../components/loan_components/LoanForm";
import LoanList from "../components/loan_components/LoanList";
import { fetchLoans } from "../api/loans";
import { fetchBooks } from "../api/books";

export default function LoansPage() {
    const [loans, setLoans] = React.useState([]);
    const [books, setBooks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [updatingLoan, setUpdatingLoan] = React.useState(null);
    const [showForm, setShowForm] = React.useState(false);

    // Fetch loans on component mount
    React.useEffect(() => {
        async function loadLoans() {
            try {
                const data = await fetchLoans();
                setLoans(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadLoans();
    }, []);

    // Handle new loan creation
    const handleLoanCreated = (newLoan) => {
        setLoans((prevLoans) => [...prevLoans, newLoan]);
        setShowForm(false);
    };


    // Handle loan update
    const handleLoanUpdated = (updatedLoan) => {
        setLoans((prevLoans) =>
            prevLoans.map((loan) =>
                loan.LoanID === updatedLoan.LoanID ? updatedLoan : loan
            )
        );
        setUpdatingLoan(null);
        setShowForm(false);
    }


    // Handle loan deletion
    const handleLoanDeleted = (loanId) => {
        setLoans((prevLoans) =>
            prevLoans.filter((loan) => loan.LoanID !== loanId)
        );
    };


    // Handle update button click
    const handleLoanUpdate = (loan) => {
        setUpdatingLoan(loan);
        setShowForm(true);
    };


    // Handle cancel button click when updating
    const handleCancelUpdate = () => {
        setUpdatingLoan(null);
        setShowForm(false);
    };


    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-300 mb-2">Loans</h1>
                    <p className="text-gray-600">Manage book loans and returns</p>
                </div>
                <button
                    onClick={() => {
                        setUpdatingLoan(null);
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Loan
                </button>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                    <p className="text-gray-600">Loading loans...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700">Error: {error}</p>
                </div>
            )}

            {/* Content */}
            {!loading && !error && (
                <>
                    {/* Form Section */}
                    {showForm && (
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-300">
                                    {updatingLoan ? 'Update Loan' : 'Add New Loan'}
                                </h2>
                                <button
                                    onClick={handleCancelUpdate}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <LoanForm
                                books={books}
                                onLoanCreated={handleLoanCreated}
                                onLoanUpdated={handleLoanUpdated}
                                updatingLoan={updatingLoan}
                                onCancelUpdate={handleCancelUpdate}
                            />  
                        </div>
                    )}

                    {/* List Section */}
                    <LoanList
                        loans={loans}
                        onLoanDeleted={handleLoanDeleted}
                        onLoanUpdate={handleLoanUpdate}
                    />
                </>
            )}
        </div>
    );
}

