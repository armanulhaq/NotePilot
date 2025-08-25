import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import type { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logout } from "@/auth";
import { LogOut } from "lucide-react";

export default function MySpace() {
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
    if (!user) {
        navigate("/");
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb className="flex justify-between w-full mr-20">
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/">
                                    NotePilot
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>My Space</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                        <BreadcrumbList className="flex items-center space-x-5">
                            <BreadcrumbItem className="hidden md:block">
                                <ModeToggle />
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                Hi, {user?.displayName?.split(" ")[0]}
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Button
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
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
            </SidebarInset>
        </SidebarProvider>
    );
}
