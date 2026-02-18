import React from "react";
import { BookOpen, Users, FileText, Library } from "lucide-react";
import { fetchBooks } from "../api/books";
import { fetchAuthors } from "../api/authors";
import { fetchMembers } from "../api/members";
import { fetchLoans } from "../api/loans";

// Basic Card component
function Card({ children, className = "" }) {
  return <div className={`shadow-sm dark:shadow-md dark:shadow-black/20 ${className}`}>{children}</div>
}

export default function DashboardPage() {
  const [booksCount, setBooksCount] = React.useState(0);
  const [authorsCount, setAuthorsCount] = React.useState(0);
  const [membersCount, setMembersCount] = React.useState(0);
  const [loansCount, setLoansCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Fetch all counts on component mount
  React.useEffect(() => {
    async function loadCounts() {
      try {
        setLoading(true);
        const [books, authors, members, loans] = await Promise.all([
          fetchBooks(),
          fetchAuthors(),
          fetchMembers(),
          fetchLoans()
        ]);
        
        setBooksCount(books.length);
        setAuthorsCount(authors.length);
        setMembersCount(members.length);
        setLoansCount(loans.length);
        setError(null);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCounts();
  }, []);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Books Card */}
        <Card className="p-6 bg-white dark:!bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Total number</p>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">of Books</p>
              {loading ? (
                <p className="text-4xl font-bold text-gray-900 dark:text-slate-100">...</p>
              ) : (
                <p className="text-4xl font-bold text-gray-900 dark:text-slate-100">{formatNumber(booksCount)}</p>
              )}
            </div>
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>

        {/* Authors Card */}
        <Card className="p-6 bg-white dark:!bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Total number</p>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">of Authors</p>
              {loading ? (
                <p className="text-4xl font-bold text-gray-900 dark:text-slate-100">...</p>
              ) : (
                <p className="text-4xl font-bold text-gray-900 dark:text-slate-100">{formatNumber(authorsCount)}</p>
              )}
            </div>
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        {/* Members Card */}
        <Card className="p-6 bg-white dark:!bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Total number</p>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">of Members</p>
              {loading ? (
                <p className="text-4xl font-bold text-gray-900 dark:text-slate-100">...</p>
              ) : (
                <p className="text-4xl font-bold text-gray-900 dark:text-slate-100">{formatNumber(membersCount)}</p>
              )}
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        {/* Loans Card */}
        <Card className="p-6 bg-white dark:!bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-1">Total number</p>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">of Loans</p>
              {loading ? (
                <p className="text-4xl font-bold text-gray-900 dark:text-slate-100">...</p>
              ) : (
                <p className="text-4xl font-bold text-gray-900 dark:text-slate-100">{formatNumber(loansCount)}</p>
              )}
            </div>
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <Library className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Error State */}
      {error && (
        <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-300">Error loading dashboard data: {error}</p>
        </div>
      )}
    </div>
  )
}
