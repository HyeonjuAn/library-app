import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import SearchBar from "./components/SearchBar";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<SearchBar />} />
            <Route path="/*" element={<Error />} />
        </Routes>
    );
}

export default App;
