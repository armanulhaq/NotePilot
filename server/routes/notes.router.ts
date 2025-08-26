import express from "express";
import {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
} from "../controllers/notes.controller.ts";

const router = express.Router();

router.get("/all-notes", getAllNotes);
router.post("/create-note", createNote);
router.put("/update-note", updateNote);
router.delete("/delete-note", deleteNote);

export default router;
