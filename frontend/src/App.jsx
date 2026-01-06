import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
                <Route path="/" element={<HomePage />}/> 
                <Route path="/login" element={<LoginPage />}/> 
                <Route path="/dashboard" element={<DashboardPage />}/> 
                <Route path="/authors" element={<AuthorsPage />} />
                <Route path="/books" element={<BooksPage />} /> 
                <Route path="/members" element={<MembersPage />} />
                <Route path="/loans" element={<LoansPage />} />
            </Routes>
        </Router>
    )
}

export default App

