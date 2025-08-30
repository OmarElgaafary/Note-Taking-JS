const utilDB = require("../database/database.js");

const getAllNotesHandler = async (req, res) => {
  const notes = await utilDB.getAllNotes(req, res);
  if (!notes) {
    return res.json({ success: false, msg: "Error while fetching notes." });
  }
  res.json({ success: true, msg: "Successfully fetched notes.", data: notes });
};

const getNoteByIdHandler = (req, res) => {
  const { noteID } = req.params;
  const note = utilDB.getNoteById(req, res, noteID);

  if (!note) {
    return res.json({
      success: false,
      msg: `Error while fetching note with ID '${noteID}'.`,
    });
  }

  res.json({ success: true, msg: "Successfully fetched note.", data: note });
};

const createNoteHandler = (req, res) => {
  const { title, content } = req.body;
  const { newNote } = utilDB.createNote(req, res, title, content);
};

const updateNoteHandler = (req, res) => {
  const { noteID } = req.params;
  const { title, content } = req.body;
  const { updatedNote } = utilDB.updateNote(req, res, noteID, title, content);
  res.json({
    success: true,
    msg: "Successfully updated note.",
    data: updatedNote,
  });
};

module.exports = {
  getAllNotesHandler,
  getNoteByIdHandler,
  createNoteHandler,
  updateNoteHandler,
};
