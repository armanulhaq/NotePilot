import express from "express";
import type { Request, Response } from "express";
import notesRouter from "./routes/notes.router.ts";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

// Mount notes routes -> results in /api/notes/* (e.g., /api/notes/all-notes)
app.use("/api/notes", notesRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
