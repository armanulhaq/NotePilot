import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import MySpace from "./pages/MySpace";

function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-space" element={<MySpace />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
