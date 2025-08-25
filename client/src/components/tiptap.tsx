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
} from "lucide-react";

export default function FullTiptapEditor() {
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

    if (!editor) return null;

    const buttonClass = (active: boolean) =>
        `p-2 rounded hover:bg-gray-200 ${active ? "bg-gray-300" : ""}`;

    return (
        <div className="border bg-background shadow-md rounded-md w-full h-[80vh] m-10 flex flex-col">
            <div className="flex flex-wrap gap-1 p-2 border-b">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={buttonClass(editor.isActive("bold"))}
                >
                    <Bold className="w-5 h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
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
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={buttonClass(editor.isActive("strike"))}
                >
                    <Strikethrough className="w-5 h-5" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={buttonClass(editor.isActive("code"))}
                >
                    <CodeIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={() => {
                        const url = prompt("Enter link URL");
                        if (url)
                            editor.chain().focus().setLink({ href: url }).run();
                    }}
                    className={buttonClass(editor.isActive("link"))}
                >
                    <Link2 className="w-5 h-5" />
                </button>

                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                    className={buttonClass(
                        editor.isActive({ textAlign: "left" })
                    )}
                >
                    <AlignLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                    className={buttonClass(
                        editor.isActive({ textAlign: "center" })
                    )}
                >
                    <AlignCenter className="w-5 h-5" />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                    }
                    className={buttonClass(
                        editor.isActive({ textAlign: "right" })
                    )}
                >
                    <AlignRight className="w-5 h-5" />
                </button>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="p-4 flex-1 rounded-md bg-sidebar overflow-auto prose max-w-full"
            />
        </div>
    );
}
