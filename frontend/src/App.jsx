import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthorsPage from "./pages/AuthorsPage"
import BooksPage from "./pages/BooksPage"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={"<h1>Welcome to the Library Management System</h1>}"}/> 
                <Route path="/authors" element={<AuthorsPage />} />
                <Route path="/books" element={<BooksPage />} /> 
            </Routes>
        </Router>
    )
}

export default App

