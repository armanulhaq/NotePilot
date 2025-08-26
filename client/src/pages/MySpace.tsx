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
import Tiptap from "@/components/Tiptap";
import EmptyNoteState from "@/components/EmptyNoteSlate";
import { useParams } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { nanoid } from "nanoid";

export default function MySpace() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [allNotes, setAllNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState<string>("");

    const params = useParams();
    const isCreateNote = params.id === "createNote";

    const handleCloseDialog = () => {
        navigate("/my-space");
    };

    const handleConfirm = async () => {
        const slug = nanoid(30); // Generate random slug
        const note = await fetch(
            "http://localhost:3000/api/notes/create-note",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.uid}`,
                },
                body: JSON.stringify({ slug, title }),
            }
        );
        if (!note.ok) {
            throw new Error("Failed to create note");
        }
        navigate("/my-space"); // closes dialog
        window.location.reload(); // force refresh to show new note (quick solution)
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user?.uid) return; // wait for auth to be ready
        const fetchNotes = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/notes/all-notes",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user.uid}`,
                        },
                    }
                );
                const data = await response.json();
                setAllNotes(data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, [user]);

    return (
        <SidebarProvider>
            <AppSidebar notes={allNotes} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1 cursor-pointer" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb className="flex justify-between w-full md:mr-10 lg:mr-20">
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
                                {user?.photoURL && (
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                            referrerPolicy="no-referrer"
                                            onError={(e) => {
                                                const initial =
                                                    user?.displayName?.[0]?.toUpperCase() ||
                                                    "U";
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                    initial
                                                )}&background=random&size=64&bold=true`;
                                            }}
                                        />
                                        <span className="text-sm">
                                            Hi,{" "}
                                            {user?.displayName?.split(" ")[0]}
                                        </span>
                                    </div>
                                )}
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Button
                                    onClick={async () => {
                                        try {
                                            await logout();
                                            navigate("/");
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
                {isCreateNote && (
                    <Dialog open={true} onOpenChange={handleCloseDialog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create a new note</DialogTitle>
                                <DialogDescription>
                                    Enter a title for your note.
                                </DialogDescription>
                            </DialogHeader>
                            <input
                                type="text"
                                placeholder="Note title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                            <DialogFooter>
                                <Button
                                    variant="secondary"
                                    onClick={handleCloseDialog}
                                    className="cursor-pointer"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirm}
                                    className="cursor-pointer"
                                >
                                    Confirm
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
                {loading && (
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <div className="bg-muted/50 aspect-video rounded-xl" />
                            <div className="bg-muted/50 aspect-video rounded-xl" />
                            <div className="bg-muted/50 aspect-video rounded-xl" />
                        </div>
                        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                    </div>
                )}

                {allNotes.length && (
                    <div className="min-h-[80vh] bg-muted-sidebar flex justify-center items-center">
                        {params.id ? <Tiptap /> : <EmptyNoteState />}
                    </div>
                )}
            </SidebarInset>
        </SidebarProvider>
    );
}
