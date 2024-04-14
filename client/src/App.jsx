import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./helpers/UserContext";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";

function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </UserProvider>
    );
}

export default App;
