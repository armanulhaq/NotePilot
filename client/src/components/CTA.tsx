import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export default function CallToAction() {
    const navigate = useNavigate();
    return (
        <section className="py-16 md:py-32 text-center">
            <div className="max-w-5xl mx-auto px-6">
                <h2 className="text-4xl font-semibold lg:text-5xl">
                    🛠️ Build Your Mind Like a Developer
                </h2>
                <p className="mt-4">
                    Fast, local-first, and built for code. Notes that work the
                    way you think.
                </p>
                <div className="mt-12 flex justify-center gap-4">
                    <Button
                        className="cursor-pointer"
                        size="lg"
                        onClick={() => navigate("/my-space")}
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </section>
    );
}
