const fs = require('fs');
const path = require('path');

function filterByQuery(query, notesArr) {
    let filteredArr = notesArr;

    if (query.title) {
        filteredArr = filteredArr.filter(
            (note) => note.title === query.title);
    }
    return filteredArr;
}

function filterById(id, notesArr) {
    const result = notesArr.filter((note) => note.id === id)[0];
    return result;
}

function createNewNote(body, notes) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    )
    return note;
}

function validateNote(note) {
    if (!note.title || !note.text) {
        return false;
    }
    return true;
}

function deleteNote(note, notes) {
    const index = notes.indexOf(note);
    notes.splice(index, 1);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    return notes;
}

module.exports = { filterByQuery, filterById, createNewNote, validateNote, deleteNote };