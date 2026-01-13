import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthorsPage from "./pages/AuthorsPage"
import BooksPage from "./pages/BooksPage"
import MembersPage from "./pages/MembersPage"
import LoansPage from "./pages/LoansPage"
import DashboardPage from "./pages/DashboardPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"

function App() {
    return (
        <Router>
            <Routes>
                {/* Public routes - no layout */}
                <Route path="/" element={<HomePage />}/> 
                <Route path="/login" element={<LoginPage />}/> 
                
                {/* Protected routes - with layout (header & sidebar) */}
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<DashboardPage />}/> 
                    <Route path="/authors" element={<AuthorsPage />} />
                    <Route path="/books" element={<BooksPage />} /> 
                    <Route path="/members" element={<MembersPage />} />
                    <Route path="/loans" element={<LoansPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App

