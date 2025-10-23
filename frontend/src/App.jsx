import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthorsPage from "./pages/AuthorsPage"
import BooksPage from "./pages/BooksPage"
import MembersPage from "./pages/MembersPage"
import DashboardPage from "./pages/DashboardPage"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashboardPage />}/> 
                <Route path="/authors" element={<AuthorsPage />} />
                <Route path="/books" element={<BooksPage />} /> 
                <Route path="/members" element={<MembersPage />} />
            </Routes>
        </Router>
    )
}

export default App

