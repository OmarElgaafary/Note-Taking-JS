const express = require("express");
const router = express.Router();

const {
  getAllNotesHandler,
  getNoteByIdHandler,
  createNoteHandler,
  updateNoteHandler,
} = require("../controllers/note-controllers.js");

// get all notes
router.get("/", getAllNotesHandler);

// get note by ID
router.get("/:noteID", getNoteByIdHandler);

// create new note
router.post("/", createNoteHandler);

// update note by ID
router.put("/:noteID", updateNoteHandler);

module.exports = router;
