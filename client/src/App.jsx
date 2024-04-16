import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./helpers/UserContext";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import BookDetails from "./pages/BookDetails";
import SeriesDetails from "./pages/SeriesDetails";
import Profile from "./pages/Profile";
import AddBook from "./pages/AddBook";
import Login from "./pages/Login";

function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/profile/:user_id" element={<Profile />} />
                <Route path="/books/:isbn" element={<BookDetails />} />
                <Route path="/series/:series_id" element={<SeriesDetails />} />
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </UserProvider>
    );
}

export default App;
