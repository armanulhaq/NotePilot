import { ModeToggle } from "./mode-toggle";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <header className="w-full fixed top-0 z-50 backdrop-blur-lg bg-background/90 text-foreground border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img
                        src="/icon-dark.png"
                        alt="NotePilot Icon"
                        width={30}
                        height={30}
                        className="dark:block hidden"
                    />
                    <img
                        src="/icon-light.png"
                        alt="NotePilot Icon"
                        width={30}
                        height={30}
                        className="block dark:hidden"
                    />
                    <span className="text-lg font-semibold">NotePilot</span>
                </div>

                <div className="flex items-center space-x-4">
                    <div
                        onClick={() => navigate("/my-space")}
                        className="cursor-pointer"
                        aria-label="GitHub Profile"
                    >
                        <img
                            src="https://img.icons8.com/?size=100&id=62856&format=png&color=000000"
                            className="block dark:hidden"
                            alt="GitHub Icon"
                            width={30}
                            height={30}
                        />
                        <img
                            src="https://img.icons8.com/?size=100&id=62856&format=png&color=ffffff"
                            className="hidden dark:block"
                            alt="GitHub Icon"
                            width={30}
                            height={30}
                        />
                    </div>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
