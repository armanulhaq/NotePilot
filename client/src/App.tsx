import "./App.css";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
    return (
        <ThemeProvider>
            <Header />
            <Hero />
            <Features />
            <CTA />
            <Footer />
        </ThemeProvider>
    );
}

export default App;
