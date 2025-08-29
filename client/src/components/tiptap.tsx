import "prosemirror-view/style/prosemirror.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit"; //Includes basic nodes (paragraph, headings, lists, code, etc.).
import TextAlign from "@tiptap/extension-text-align"; //Align text (left, center, right).
import Highlight from "@tiptap/extension-highlight"; //Highlight text.
import Image from "@tiptap/extension-image"; //Insert images.
import Underline from "@tiptap/extension-underline"; //Underline text.
import Link from "@tiptap/extension-link"; //Insert links.
import { auth } from "../firebase"; //Firebase authentication.

import {
    Bold,
    Italic,
    UnderlineIcon,
    Strikethrough,
    Code as CodeIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link2,
    Save,
    Trash,
    Highlighter,
    List,
    ListOrdered,
    SquareChevronRight,
    Quote,
    ImageIcon,
    Minus,
    Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

type Note = {
    id: string;
    user_id: string;
    title: string;
    content: string;
    createdAt: string;
};

export default function FullTiptapEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Disable the default heading extension from StarterKit
                heading: {
                    levels: [1, 2, 3], //h1, h2, h3
                },
            }),
            TextAlign.configure({ types: ["heading", "paragraph"] }), //Adds text alignment (left, center, right) for headings and paragraphs.
            Highlight, //Adds highlight functionality.
            Image.configure({
                HTMLAttributes: {
                    class: "max-w-sm max-h-64 object-contain rounded border",
                },
            }), //Adds image functionality.
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-500 underline cursor-pointer",
                },
            }),
        ],
        content: ``,
        editorProps: {
            attributes: {
                class: "h-[100%] min-h-[100%] rounded-md px-3 focus:outline-none prose prose-sm sm:prose lg:prose-lg max-w-none",
            },
        },
    });

    const user = auth.currentUser;
    const [allNotes, setAllNotes] = useState<Note[]>([]);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        if (!user?.uid) return; // wait for auth to be ready
        const fetchNotes = async () => {
            try {
                const response = await fetch(
                    `${API_BASE}/api/notes/all-notes`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user.uid}`,
                        },
                    }
                );
                const data = await response.json();
                setAllNotes(data as Note[]);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };
        fetchNotes();
    }, [user]);

    const params = useParams();
    const noteId = params?.id;

    useEffect(() => {
        if (!noteId || !editor) return;
        const note = allNotes.find((n) => n.id === noteId);
        if (note) {
            editor.commands.setContent(note.content || "");
        }
    }, [noteId, allNotes, editor]);

    if (!editor) return null;

    const saveNote = async () => {
        try {
            setSaveLoading(true);
            const response = await fetch(`${API_BASE}/api/notes/update-note`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.uid}`,
                },
                body: JSON.stringify({
                    id: noteId,
                    content: editor.getHTML(),
                }),
            });
            const data = await response.json();
            console.log(data);
            toast("Note saved successfully");
        } catch (error) {
            console.error("Error saving note:", error);
        } finally {
            setSaveLoading(false);
        }
    };

    const deleteNote = async () => {
        try {
            setDeleteLoading(true);
            await fetch(`${API_BASE}/api/notes/delete-note`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.uid}`,
                },
                body: JSON.stringify({
                    id: noteId,
                }),
            });
        } catch (error) {
            console.log("Error deleting the note", error);
        } finally {
            setDeleteLoading(false);
            toast("Note deleted successfully");
            setTimeout(() => {
                window.location.href = "/my-space";
            }, 1500); // 1.5 seconds delay
        }
    };

    const insertImage = () => {
        const url = window.prompt("Enter image URL");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const addLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        let url = window.prompt("URL", previousUrl);

        if (url === null) return;

        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        if (!/^https?:\/\//i.test(url)) {
            url = `https://${url}`;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    };

    return (
        <>
            <style>{`
                .ProseMirror {
                    outline: none;
                    padding: 1rem;
                }
                .ProseMirror h1 {
                    font-size: 2em;
                    font-weight: bold;
                    margin: 1em 0 0.5em 0;
                    line-height: 1.2;
                }
                .ProseMirror h2 {
                    font-size: 1.5em;
                    font-weight: bold;
                    margin: 0.83em 0 0.5em 0;
                    line-height: 1.2;
                }
                .ProseMirror h3 {
                    font-size: 1.17em;
                    font-weight: bold;
                    margin: 0.83em 0 0.5em 0;
                    line-height: 1.2;
                }
                .ProseMirror p {
                    margin: 0.5em 0;
                    line-height: 1.6;
                }
                .ProseMirror ul, .ProseMirror ol {
                    padding-left: 2rem;
                    margin: 1rem 0;
                }
                .ProseMirror ul {
                    list-style-type: disc;
                }
                .ProseMirror ol {
                    list-style-type: decimal;
                }
                .ProseMirror li {
                    margin: 0.5rem 0;
                    position: relative;
                }
                .ProseMirror ul li::marker {
                    color: hsl(var(--foreground));
                    font-size: 1rem;
                }
                .ProseMirror ol li::marker {
                    color: hsl(var(--foreground));
                    font-weight: 500;
                }
                .ProseMirror blockquote {
                    border-left: 4px solid #ddd;
                    padding-left: 1em;
                    margin: 1em 0;
                    font-style: italic;
                    color: #666;
                }
                /* Code block */
                .ProseMirror pre {
                    background: #0f172a; /* slate-900 */
                    color: #e2e8f0; /* slate-200 */
                    border: 1px solid rgba(148, 163, 184, 0.25); /* slate-400/25 */
                    border-radius: 8px;
                    padding: 0.875rem 1rem;
                    overflow: auto;
                    margin: 1em 0;
                    line-height: 1.6;
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
                    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
                    font-size: 0.9rem;
                }
                /* Inline code */
                .ProseMirror code {
                    background: rgba(2, 6, 23, 0.06); /* slate-950/6 */
                    color: hsl(var(--foreground));
                    padding: 0.15em 0.4em;
                    border-radius: 4px;
                    border: 1px solid hsl(var(--border));
                    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
                    font-size: 0.875rem;
                }
                /* Avoid double styling inside code blocks */
                .ProseMirror pre code {
                    background: transparent;
                    padding: 0;
                    border: 0;
                    color: inherit;
                    font-size: inherit;
                }
                /* Dark mode adjustments (if a .dark class is present on root) */
                .dark .ProseMirror code {
                    background: rgba(148, 163, 184, 0.15); /* slate-400/15 */
                    border-color: rgba(148, 163, 184, 0.25);
                    color: #e2e8f0;
                }
                .dark .ProseMirror pre {
                    background: #0b1020; /* slightly darker */
                    color: #e6edf3;
                    border-color: rgba(148, 163, 184, 0.25);
                }
                .ProseMirror img {
                    max-width: 300px;
                    max-height: 200px;
                    height: auto;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                    display: block;
                    margin: 0.5em 0;
                }
                .ProseMirror hr {
                    border: none;
                    border-top: 2px solid #ddd;
                    margin: 2em 0;
                }
                .ProseMirror .highlight {
                    background-color: #fff3cd;
                    padding: 0.1em 0.2em;
                    border-radius: 2px;
                }
                .ProseMirror ul[data-type="taskList"] {
                    list-style: none;
                    padding-left: 0;
                    margin: 1rem 0;
                }
                .ProseMirror ul[data-type="taskList"] li {
                    display: flex;
                    align-items: flex-start;
                    margin: 0.75rem 0;
                    padding-left: 0;
                }
                .ProseMirror ul[data-type="taskList"] li > label {
                    margin-right: 0.75rem;
                    margin-top: 0.125rem;
                    user-select: none;
                    cursor: pointer;
                    flex-shrink: 0;
                }
                .ProseMirror ul[data-type="taskList"] li > label > input[type="checkbox"] {
                    width: 1rem;
                    height: 1rem;
                    accent-color: hsl(var(--primary));
                }
                .ProseMirror ul[data-type="taskList"] li > div {
                    flex: 1;
                    line-height: 1.5;
                }
                .ProseMirror ul[data-type="taskList"] li[data-checked="true"] > div {
                    text-decoration: line-through;
                    opacity: 0.6;
                }
            `}</style>
            <div className="border bg-background shadow-md rounded-md w-full h-[80vh] m-4 lg:m-10 flex flex-col">
                <div className="flex flex-wrap gap-2 p-2 border-b justify-between">
                    <div className="flex flex-wrap gap-1">
                        <Button
                            onClick={() =>
                                editor.chain().focus().toggleBold().run()
                            }
                            variant="outline"
                        >
                            <Bold className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() =>
                                editor.chain().focus().toggleItalic().run()
                            }
                            variant="outline"
                        >
                            <Italic className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() =>
                                editor.chain().focus().toggleUnderline().run()
                            }
                            variant="outline"
                        >
                            <UnderlineIcon className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() =>
                                editor.chain().focus().toggleStrike().run()
                            }
                            variant="outline"
                        >
                            <Strikethrough className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() =>
                                editor.chain().focus().toggleHighlight().run()
                            }
                            variant="outline"
                        >
                            <Highlighter className="w-4 h-4" />
                        </Button>

                        <Button
                            onClick={() =>
                                editor.chain().focus().setParagraph().run()
                            }
                            variant="outline"
                        >
                            P
                        </Button>
                        <Button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 1 })
                                    .run()
                            }
                            variant="outline"
                        >
                            H1
                        </Button>
                        <Button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 2 })
                                    .run()
                            }
                            variant="outline"
                        >
                            H2
                        </Button>
                        <Button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 3 })
                                    .run()
                            }
                            variant="outline"
                        >
                            H3
                        </Button>
                        <Button
                            onClick={() =>
                                editor.chain().focus().toggleBulletList().run()
                            }
                            variant="outline"
                        >
                            <List className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() =>
                                editor.chain().focus().toggleOrderedList().run()
                            }
                            variant="outline"
                        >
                            <ListOrdered className="w-4 h-4" />
                        </Button>

                        <Button
                            onClick={() =>
                                editor.chain().focus().toggleCode().run()
                            }
                            variant="outline"
                        >
                            <CodeIcon className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() =>
                                editor.chain().focus().toggleCodeBlock().run()
                            }
                            variant="outline"
                        >
                            <SquareChevronRight className="w-4 h-4" />
                        </Button>

                        <Button
                            onClick={() =>
                                editor.chain().focus().toggleBlockquote().run()
                            }
                            variant="outline"
                        >
                            <Quote />
                        </Button>

                        <Button onClick={addLink} variant="outline">
                            <Link2 className="w-4 h-4" />
                        </Button>
                        <Button onClick={insertImage} variant="outline">
                            <ImageIcon />
                        </Button>

                        <Button
                            onClick={() =>
                                editor.chain().focus().setHorizontalRule().run()
                            }
                            variant="outline"
                        >
                            <Minus className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("left")
                                    .run()
                            }
                            variant="outline"
                        >
                            <AlignLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("center")
                                    .run()
                            }
                            variant="outline"
                        >
                            <AlignCenter className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("right")
                                    .run()
                            }
                            variant="outline"
                        >
                            <AlignRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="flex gap-1">
                        <Button
                            onClick={saveNote}
                            variant="outline"
                            className="cursor-pointer"
                        >
                            {saveLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                        </Button>
                        <Button
                            onClick={deleteNote}
                            variant="outline"
                            className="cursor-pointer hover:bg-red-100"
                        >
                            {deleteLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Trash className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                </div>

                <EditorContent
                    editor={editor}
                    className="p-4 flex-1 rounded-md bg-sidebar overflow-auto focus:outline-none"
                    style={{
                        minHeight: "300px",
                    }}
                />
            </div>
        </>
    );
}
