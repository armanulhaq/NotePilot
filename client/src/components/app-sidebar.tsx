import { Sidebar, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    notes?: Note[];
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
    const params = useParams();

    const handleNewNote = () => {
        navigate(`/my-space/createNote`);
    };

    const [selectedNote, setSelectedNote] = useState<string | null>(null);
    const findNote = (id: string) => {
        const note = notes.find((note) => note.id === id);
        if (note) {
            setSelectedNote(id);
        }
        console.log(note);
        navigate(`/my-space/${id}`);
    };
    return (
        <Sidebar {...props}>
            <SidebarHeader
                className="cursor-pointer"
                onClick={() => navigate("/")}
            >
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
            <div className="flex w-full m-4">
                <Button className="cursor-pointer" onClick={handleNewNote}>
                    Create a new note
                </Button>
            </div>
            {notes.length === 0 ? (
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                    </div>
                    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                </div>
            ) : (
                notes.map((item) => (
                    <div
                        className={`${
                            selectedNote === item.id || params.id === item.id
                                ? "bg-muted"
                                : ""
                        } py-2 mx-2 rounded cursor-pointer px-4 hover:bg-muted flex justify-between items-center`}
                        key={item.id}
                        onClick={() => findNote(item.id)}
                    >
                        <div className="text-sm text-muted-foreground max-w-2/3 truncate">
                            {item.title}
                        </div>
                    </div>
                ))
            )}
            <SidebarRail />
        </Sidebar>
    );
}
