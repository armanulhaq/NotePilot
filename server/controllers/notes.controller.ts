import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllNotes = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const userId = authHeader.split(" ")[1]; // user?.uid
        console.log("User ID:", userId);

        const notes = await prisma.notes.findMany({
            where: { user_id: userId },
        });

        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export { getAllNotes };
