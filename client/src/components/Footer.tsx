import { Twitter, Linkedin, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";

const links = ["Features", "Solution", "Customers", "Pricing", "Help", "About"];
const socialIcons = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Instagram", href: "#", icon: Instagram },
];

export default function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="py-16 border-t">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <div
                    onClick={() => navigate("/")}
                    aria-label="Home"
                    className="mx-auto w-fit flex items-center gap-3 cursor-pointer"
                >
                    <img
                        className="hidden dark:block"
                        src="/icon-dark.png"
                        alt="Logo"
                        width={30}
                        height={30}
                    />
                    <img
                        className="block dark:hidden"
                        src="/icon-light.png"
                        alt="Logo"
                        width={30}
                        height={30}
                    />
                    <span className="text-lg font-semibold">NotePilot</span>
                </div>
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((title, i) => (
                        <div
                            key={i}
                            onClick={() => navigate("/")}
                            aria-label="Home"
                            className="text-muted-foreground hover:text-primary transition"
                        >
                            {title}
                        </div>
                    ))}
                </div>

                <div className="my-6 flex justify-center gap-6">
                    {socialIcons.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => navigate("/")}
                            aria-label={item.name}
                            className="text-muted-foreground hover:text-primary transition"
                        >
                            <item.icon className="w-6 h-6" />
                        </div>
                    ))}
                </div>

                <p className="text-muted-foreground text-sm">
                    © {new Date().getFullYear()} NotePilot, All rights reserved.
                </p>
            </div>
        </footer>
    );
}
