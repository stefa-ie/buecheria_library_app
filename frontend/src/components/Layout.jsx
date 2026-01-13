import { BookOpen, Users, BarChart3, Search, LogOut } from "lucide-react"
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { isAuthenticated, removeToken } from "../api/auth";

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

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is authenticated
  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  // Don't render layout if not authenticated
  if (!isAuthenticated()) {
    return null;
  }

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

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
            <Button variant="outline" className="gap-2 bg-transparent" onClick={handleLogout}>
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
              <Link to="/dashboard">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  isActive("/dashboard") 
                    ? "bg-purple-400 text-white" 
                    : "text-gray-400 hover:bg-purple-400 hover:text-white"
                }`}>
                  <BarChart3 className="w-5 h-5" />
                  Overview
                </button>
              </Link>

              <Link to="/books">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  isActive("/books") 
                    ? "bg-purple-400 text-white" 
                    : "text-gray-400 hover:bg-purple-400 hover:text-white"
                }`}>
                  <BookOpen className="w-5 h-5" />
                  Bücher
                </button>
              </Link>

              <Link to="/authors">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  isActive("/authors") 
                    ? "bg-purple-400 text-white" 
                    : "text-gray-400 hover:bg-purple-400 hover:text-white"
                }`}>
                  <Users className="w-5 h-5" />
                  Authors
                </button>
              </Link>

              <Link to="/members">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  isActive("/members") 
                    ? "bg-purple-400 text-white" 
                    : "text-gray-400 hover:bg-purple-400 hover:text-white"
                }`}>
                  <Users className="w-5 h-5" />
                  Members
                </button>
              </Link>

              <Link to="/loans">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  isActive("/loans") 
                    ? "bg-purple-400 text-white" 
                    : "text-gray-400 hover:bg-purple-400 hover:text-white"
                }`}>
                  <Users className="w-5 h-5" />
                  Loans
                </button>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content - Outlet renders child routes here */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
