import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MySpace from "./pages/MySpace";

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/my-space" element={<MySpace />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
