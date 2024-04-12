import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { UserProvider } from "./helpers/UserContext";

function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/navbar" element={<Navbar />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </UserProvider>
    );
}

export default App;
