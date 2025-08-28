import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import type { User } from "firebase/auth";

const Home = ({ user }: { user: User | null }) => {
    return (
        <div>
            <Header />
            <Hero user={user} />
            <Features />
            <CTA />
            <Footer />
        </div>
    );
};

export default Home;
