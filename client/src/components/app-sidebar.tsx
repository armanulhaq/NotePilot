import { Sidebar, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { useState } from "react";
import { Eye, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    notes?: Note[]; // Added notes prop type
};
type Note = {
    id: string;
    user_id: string;
    title: string;
    content: string;
    createdAt: string;
};

export function AppSidebar({ notes = [], ...props }: AppSidebarProps) {
    const navigate = useNavigate();
    const handleNewNote = () => {
        const slug = nanoid(20); // e.g. abc123xyz
        navigate(`/my-space/${slug}`);
    };
    const [selectedNote, setSelectedNote] = useState<string | null>(null);
    const findNote: Note | undefined = notes.find(
        (note) => note.id === selectedNote
    );
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="flex items-center space-x-3 p-3">
                    <img
                        src="/icon-light.png"
                        alt="NotePilot Icon"
                        className="w-6 h-6 block dark:hidden"
                    />
                    <img
                        src="/icon-dark.png"
                        alt="NotePilot Icon"
                        className="hidden dark:block w-6 h-6"
                    />
                    <span className="text-lg font-semibold">NotePilot</span>
                </div>
            </SidebarHeader>
            <div className="flex w-full mx-2 px-4 my-3 ">
                <Button className="cursor-pointer" onClick={handleNewNote}>
                    Create a new note
                </Button>
            </div>
            {notes.map((item, i) => (
                <div
                    className="py-2 mx-2 rounded cursor-pointer px-4 hover:bg-muted flex justify-between items-center"
                    key={i}
                >
                    <div className="text-sm text-muted-foreground max-w-2/3 truncate">
                        {item.title}
                    </div>
                    <div className="ml-auto flex gap-5">
                        <span onClick={() => setSelectedNote(item.id)}>
                            <Eye className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-primary" />
                        </span>
                        <span onClick={() => setSelectedNote(item.id)}>
                            <Pencil className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-primary" />
                        </span>
                    </div>
                </div>
            ))}
            <SidebarRail />
        </Sidebar>
    );
}
