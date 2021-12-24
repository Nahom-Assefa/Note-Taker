let db = require("../db/db.json");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
let savedNote = [];

// Read database at route
router.get("/notes", (req, res) => {
  const results = db;
  res.json(results);
});

// Push new notes to database
router.post("/notes", (req, res) => {
  const input = req.body;
  console.log("req.body", req.body);
  console.log("input", input);

  //read file turn to JSON
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
    if (err) {
      throw err;
    }
    console.log("line 22", data);
    console.log("line 23", JSON.parse(data));
    savedNote = JSON.parse(data);

    //add Id to new note object and push to array
    input.id = crypto.randomBytes(16).toString("hex");
    savedNote.push(input);
    console.log("saveNote", savedNote);

    //write to database
    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(savedNote)
    );

    res.status(201).send("new note added!");
  });
});

// Delete notes from database
router.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  const deleted = db.find((data) => data.id === id);
  if (deleted) {
    db = db.filter((data) => data.id !== id);
    res.status(200).json(deleted);
    console.log("line 50", deleted);
    console.log("line 51", db);
  } else {
    res.status(404).json({ message: "damn son wherdya find dis?" });
  }

  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(db));
});

module.exports = router;
