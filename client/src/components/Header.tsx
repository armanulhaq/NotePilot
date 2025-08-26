import { ModeToggle } from "./mode-toggle";
import { Link, useNavigate } from "react-router-dom";
import { loginWithGoogle, logout } from "../auth";
import { Button } from "./ui/button";
import type { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { LogOut } from "lucide-react";

export default function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <header className="w-full fixed top-0 z-50 backdrop-blur-lg bg-background/90 text-foreground border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-3">
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
                </Link>

                <div className="flex items-center space-x-4">
                    <Link
                        to="https://github.com/armanulhaq"
                        target="_blank"
                        rel="noopener noreferrer"
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
                    </Link>
                    <ModeToggle />
                    {user ? (
                        <div className="flex items-center gap-3">
                            <img
                                className="w-8 h-8 rounded-full"
                                src={user?.photoURL || ""}
                                alt=""
                            />
                            <p className="text-muted-foreground text-sm">
                                Hi, {user?.displayName?.split(" ")[0]}
                            </p>
                            <Button
                                className="cursor-pointer"
                                onClick={async () => {
                                    try {
                                        await logout();
                                        navigate("/"); // redirect after logout
                                    } catch (err) {
                                        console.error(err);
                                        alert("Logout failed!");
                                    }
                                }}
                            >
                                <LogOut />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            className="cursor-pointer"
                            onClick={async () => {
                                try {
                                    await loginWithGoogle();
                                    navigate("/my-space"); // redirect after login
                                } catch (err) {
                                    console.error(err);
                                    alert("Login failed!");
                                }
                            }}
                        >
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
