import { BookOpen, Users, BarChart3, Search, LogOut } from "lucide-react"
import { Link } from "react-router-dom";
import AuthorsPage from "./AuthorsPage"
import BooksPage from "./BooksPage"

// Basic Button component
function Button({ children, className = "", variant = "default", ...props }) {
  const base = "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md"
  const variants = {
    default: "bg-emerald-400 text-white hover:bg-purple-800",
    outline: "border border-gray-300 text-gray-400 hover:bg-gray-100",
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// Basic Input component
function Input({ className = "", ...props }) {
  return (
    <input
      className={`border border-gray-300 rounded-md px-3 py-2 text-sm ${className}`}
      {...props}
    />
  )
}

// Basic Card component
function Card({ children, className = "" }) {
  return <div className={`shadow-sm ${className}`}>{children}</div>
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BÜCHERIA</h1>
              <p className="text-sm text-gray-600">Admin Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input type="search" placeholder="Search books, authors, members, ..." className="pl-10 w-80 bg-gray-50" />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              LOGOUT
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 min-h-[calc(100vh-89px)] p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Dashboard</h2>
            <p className="text-sm text-gray-600 mb-6">Verwaltungsbereich</p>

            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-purple-400 hover:text-white rounded-lg font-medium">
                <BarChart3 className="w-5 h-5" />
                Overview
              </button>

              <Link to="/books">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-purple-400 hover:text-white rounded-lg font-medium">
                  <BookOpen className="w-5 h-5" />
                  Bücher
                </button>
              </Link>

              <Link to="/authors">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-purple-400 hover:text-white rounded-lg font-medium">
                  <Users className="w-5 h-5" />
                  Authors
                </button>
              </Link>

              <Link to="/members">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-purple-400 hover:text-white rounded-lg font-medium">
                  <Users className="w-5 h-5" />
                  Members
                </button>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="grid grid-cols-4 gap-6">
            {/* Gesamte Bücher Card */}
            <Card className="p-6 bg-white rounded-2xl border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total number</p>
                  <p className="text-sm text-gray-600 mb-3">of Books</p>
                  <p className="text-4xl font-bold text-gray-900">2,847</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
