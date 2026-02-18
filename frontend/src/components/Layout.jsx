import { BookOpen, Users, BarChart3, Search, LogOut } from "lucide-react"
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { isAuthenticated, removeToken } from "../api/auth";
import buecheriaLogo from "../assets/buecheria_logo.jpg";
import useTheme from "../hooks/useTheme";

// Basic Button component
function Button({ children, className = "", variant = "default", ...props }) {
  const base = "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md"
  const variants = {
    default: "bg-emerald-400 text-white hover:bg-purple-800",
    outline:
      "border border-gray-300 dark:border-slate-600 text-gray-400 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800",
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
      className={`border border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm bg-white dark:!bg-slate-800 text-gray-900 dark:text-slate-100 ${className}`}
      {...props}
    />
  )
}

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-900 overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-4 h-[89px]">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <img
              src={buecheriaLogo}
              alt="Bücheria"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-300">BÜCHERIA</h1>
              <p className="text-sm text-gray-600 dark:text-slate-400">Admin Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-400" />
              <Input type="search" placeholder="Search books, authors, members, ..." className="pl-10 w-80 bg-gray-50 dark:!bg-slate-800" />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent" onClick={toggleTheme} aria-pressed={theme === "dark"}>
              {theme === "dark" ? "Light" : "Dark"}
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              LOGOUT
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 p-6 overflow-y-auto">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-300 mb-1">Dashboard</h2>
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-6">Verwaltungsbereich</p>

            <nav className="space-y-2">
              <Link to="/dashboard">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  isActive("/dashboard") 
                    ? "bg-purple-400 text-white" 
                    : "text-gray-400 dark:text-slate-300 hover:bg-purple-400 hover:text-white"
                }`}>
                  <BarChart3 className="w-5 h-5" />
                  Overview
                </button>
              </Link>

              <Link to="/books">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  isActive("/books") 
                    ? "bg-purple-400 text-white" 
                    : "text-gray-400 dark:text-slate-300 hover:bg-purple-400 hover:text-white"
                }`}>
                  <BookOpen className="w-5 h-5" />
                  Bücher
                </button>
              </Link>

              <Link to="/authors">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  isActive("/authors") 
                    ? "bg-purple-400 text-white" 
                    : "text-gray-400 dark:text-slate-300 hover:bg-purple-400 hover:text-white"
                }`}>
                  <Users className="w-5 h-5" />
                  Authors
                </button>
              </Link>

              <Link to="/members">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  isActive("/members") 
                    ? "bg-purple-400 text-white" 
                    : "text-gray-400 dark:text-slate-300 hover:bg-purple-400 hover:text-white"
                }`}>
                  <Users className="w-5 h-5" />
                  Members
                </button>
              </Link>

              <Link to="/loans">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${
                  isActive("/loans") 
                    ? "bg-purple-400 text-white" 
                    : "text-gray-400 dark:text-slate-300 hover:bg-purple-400 hover:text-white"
                }`}>
                  <Users className="w-5 h-5" />
                  Loans
                </button>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content - Outlet renders child routes here */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
