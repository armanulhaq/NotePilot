import express from "express";
import {
    getAllNotes,
    // getNoteById,
    // createNote,
    // updateNote,
    // deleteNote,
} from "../controllers/notes.controller.ts";

const router = express.Router();

router.get("/all-notes", getAllNotes);
// router.get("/note/:id", getNoteById);
// router.post("/note", createNote);
// router.put("/note/:id", updateNote);
// router.delete("/note/:id", deleteNote);

export default router;
