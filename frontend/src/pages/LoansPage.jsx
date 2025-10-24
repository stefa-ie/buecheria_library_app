import React from "react";
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

    if (loading) return <p>Loading loans...</p>;
    if (error) return <p>Error: {error}</p>;


    // Handle new loan creation
    const handleLoanCreated = (newLoan) => {
        setLoans((prevLoans) => [...prevLoans, newLoan]);
    };


    // Handle loan update
    const handleLoanUpdated = (updatedLoan) => {
        setLoans((prevLoans) =>
            prevLoans.map((loan) =>
                loan.LoanID === updatedLoan.LoanID ? updatedLoan : loan
            )
        );
        setUpdatingLoan(null);
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
    };


    // Handle cancel button click when updating
    const handleCancelUpdate = () => {
        setUpdatingLoan(null);
    };


    return (
        <div className="bg-gray-400 p-4 m-8">
            <h1 className="text-4xl italic">Loans</h1>
            <LoanForm
                books={books}
                onLoanCreated={handleLoanCreated}
                onLoanUpdated={handleLoanUpdated}
                updatingLoan={updatingLoan}
                onCancelUpdate={handleCancelUpdate}
            />  
            <LoanList
                loans={loans}
                onLoanDeleted={handleLoanDeleted}
                onLoanUpdate={handleLoanUpdate}
            />
        </div>
    );
}

