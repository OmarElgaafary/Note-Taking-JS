const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })
  .promise();

async function getAllNotes(req, res) {
  try {
    const [notes] = await pool.query("SELECT * FROM my_notes;");
    return notes;
  } catch (error) {
    return res.json({ success: false, msg: "Error while fetching notes." });
  }
}

async function getNoteById(req, res, note_id) {
  try {
    const [note] = await pool.query(
      "SELECT * FROM my_notes WHERE note_id = ?",
      [note_id]
    );
    console.log(note[0]);
    return note[0];
  } catch (error) {
    return res.json({ success: false, msg: "Error while fetching note." });
  }
}

async function createNote(req, res, noteTitle, noteContent) {
  try {
    const [result] = await pool.query(
      "INSERT INTO my_notes (title, content) VALUES (?, ?);",
      [noteTitle, noteContent]
    );
    const newNoteId = String(result.insertId);
    return getNoteById(req, res, newNoteId);
  } catch (error) {
    return res.json({ success: false, msg: "Error while creating note." });
  }
}

async function updateNote(req, res, noteID, noteTitle, noteContent) {
  try {
    const [result] = await pool.query(
      "UPDATE my_notes SET title = ?, content = ? WHERE note_id = ?;",
      [noteTitle, noteContent, noteID]
    );
    const newNoteId = String(result.insertId);
    return getNoteById(req, res, newNoteId);
  } catch (error) {
    return res.json({ success: false, msg: "Error while updating note." });
  }
}

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
};
