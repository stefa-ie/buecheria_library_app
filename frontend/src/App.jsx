import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthorsPage from "./pages/AuthorsPage"
import BooksPage from "./pages/BooksPage"
import MembersPage from "./pages/MembersPage"
import LoansPage from "./pages/LoansPage"
import DashboardPage from "./pages/DashboardPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import BuecherPage from "./pages/BuecherPage"
import VeranstaltungenPage from "./pages/VeranstaltungenPage"
import UeberUnsPage from "./pages/UeberUnsPage"
import KontaktPage from "./pages/KontaktPage"
import PublicLayout from "./components/PublicLayout"

function App() {
    return (
        <Router>
            <Routes>
                {/* Public routes - shared header/footer */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<HomePage />}/> 
                    <Route path="/buecher" element={<BuecherPage />}/> 
                    <Route path="/veranstaltungen" element={<VeranstaltungenPage />}/> 
                    <Route path="/ueber-uns" element={<UeberUnsPage />}/> 
                    <Route path="/kontakt" element={<KontaktPage />}/> 
                </Route>
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

