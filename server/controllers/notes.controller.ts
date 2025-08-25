import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllNotes = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const userId = authHeader.split(" ")[1];
        console.log(userId);

        const notes = await prisma.notes.findMany({
            where: { user_id: userId },
        });

        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const createNote = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const userId = authHeader.split(" ")[1];

        const { title, slug } = req.body;

        const note = await prisma.notes.create({
            data: {
                user_id: userId,
                id: slug,
                title,
                content: "",
            },
        });

        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export { getAllNotes, createNote };
