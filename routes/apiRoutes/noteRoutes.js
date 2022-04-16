const router = require('express').Router();
const { createNewNote, validateNote, filterById, filterByQuery, deleteNote } = require('../../lib/db')
const { v4: uuidv4 } = require("uuid");
const { notes } = require("../../db/db");

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.post("/notes", (req, res) => {

  req.body.id = uuidv4();

  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

router.delete("/notes/:id", (req, res) => {
  const result = filterById(req.params.id, notes); 
  if (result) {
    deleteNote(result, notes);
    res.json(result);
  } else {
    res.status(404).send("The note with the given id was not found.");
  }
})

module.exports = router;