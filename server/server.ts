import express from "express";
import type { Request, Response } from "express";
import notesRouter from "./routes/notes.router.ts";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use("/api/notes", notesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
