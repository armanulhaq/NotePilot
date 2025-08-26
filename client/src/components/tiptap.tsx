"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Code from "@tiptap/extension-code";
import {
    Table,
    TableRow,
    TableCell,
    TableHeader,
} from "@tiptap/extension-table";
import { auth } from "../firebase";

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
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Note = {
    id: string;
    user_id: string;
    title: string;
    content: string;
    createdAt: string;
};

export default function FullTiptapEditor() {
    const navigate = useNavigate();
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Highlight,
            Image,
            Placeholder.configure({ placeholder: "Start typing..." }),
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
            TaskList,
            TaskItem,
            HorizontalRule,
            Subscript,
            Superscript,
            Code,
        ],
        content: ``,
        editorProps: {
            attributes: {
                class: "h-[100%] min-h-[100%] rounded-md px-3 focus:outline-none", // important for full height
            },
        },
    });

    const user = auth.currentUser;
    const [allNotes, setAllNotes] = useState<Note[]>([]);
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
            const response = await fetch(
                "http://localhost:3000/api/notes/update-note",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.uid}`,
                    },
                    body: JSON.stringify({
                        id: noteId,
                        content: editor.getHTML(),
                    }),
                }
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };
    const deleteNote = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/notes/delete-note",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.uid}`,
                    },
                    body: JSON.stringify({
                        id: noteId,
                    }),
                }
            );
            const data = await response.json();
            console.log(data);
            navigate("/my-space");
        } catch (error) {
            console.log("Error deleting the note", error);
        }
    };

    const buttonClass = (active: boolean) =>
        `p-2 rounded hover:bg-gray-200 ${active ? "bg-gray-300" : ""}`;

    return (
        <div className="border bg-background shadow-md rounded-md w-full h-[80vh] m-4 lg:m-10 flex flex-col">
            <div className="flex flex-wrap gap-1 p-2 border-b justify-between">
                <div className="flex">
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                        className={buttonClass(editor.isActive("bold"))}
                    >
                        <Bold className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                        className={buttonClass(editor.isActive("italic"))}
                    >
                        <Italic className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleUnderline().run()
                        }
                        className={buttonClass(editor.isActive("underline"))}
                    >
                        <UnderlineIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                        className={buttonClass(editor.isActive("strike"))}
                    >
                        <Strikethrough className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleCode().run()
                        }
                        className={buttonClass(editor.isActive("code"))}
                    >
                        <CodeIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => {
                            const url = prompt("Enter link URL");
                            if (url)
                                editor
                                    .chain()
                                    .focus()
                                    .setLink({ href: url })
                                    .run();
                        }}
                        className={buttonClass(editor.isActive("link"))}
                    >
                        <Link2 className="w-5 h-5" />
                    </button>

                    <div className="flex justify-between">
                        <button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("left")
                                    .run()
                            }
                            className={buttonClass(
                                editor.isActive({ textAlign: "left" })
                            )}
                        >
                            <AlignLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("center")
                                    .run()
                            }
                            className={buttonClass(
                                editor.isActive({ textAlign: "center" })
                            )}
                        >
                            <AlignCenter className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("right")
                                    .run()
                            }
                            className={buttonClass(
                                editor.isActive({ textAlign: "right" })
                            )}
                        >
                            <AlignRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => saveNote()}
                        className={
                            buttonClass(editor.isActive("undo")) +
                            " cursor-pointer"
                        }
                    >
                        <Save className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => deleteNote()}
                        className={
                            buttonClass(editor.isActive("undo")) +
                            " cursor-pointer"
                        }
                    >
                        <Trash className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <EditorContent
                editor={editor}
                className="p-4 flex-1 rounded-md bg-sidebar overflow-auto prose max-w-full"
            />
        </div>
    );
}
