import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import MySpace from "./pages/MySpace";
import { useState } from "react";
import type { User } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase";

function App() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);
    return (
        <ThemeProvider>
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route
                    path="/my-space"
                    element={<MySpace user={user} setUser={setUser} />}
                />
                <Route
                    path="/my-space/:id"
                    element={<MySpace user={user} setUser={setUser} />}
                />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
