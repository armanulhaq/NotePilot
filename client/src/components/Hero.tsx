import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate();
    return (
        <section className="bg-background text-foreground pt-60 pb-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-6xl font-bold">
                    Navigate Smarter Notes. Code Better.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                    Supercharge your workflow with NotePilot — the smartest way
                    to capture, organize, and link developer notes, code
                    snippets, and technical insights.
                </p>

                <div className="mt-8 flex gap-4">
                    <Button size="lg" onClick={() => navigate("/my-space")}>
                        Start Writing
                    </Button>
                </div>

                <div className="mt-12 w-full max-w-4xl">
                    <img
                        src="/dark-hero.png"
                        alt="App Preview"
                        width={1200}
                        height={600}
                        className="rounded-xl shadow-lg dark:block hidden"
                    />
                    <img
                        src="/light-hero.png"
                        alt="App Preview"
                        width={1200}
                        height={600}
                        className="rounded-xl shadow-lg block dark:hidden"
                    />
                </div>
            </div>
        </section>
    );
}
