const db = require("../db/db.json");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
//const { handleNoteSave } = require("../public/assets/js/index");

router.get("/notes", (req, res) => {
  const results = db;
  res.json(results);
});

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
    const savedNote = JSON.parse(data);
    savedNote.push(input);
    console.log("saveNpote", savedNote);

    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(savedNote)
    );

    res.status(201).send("new note added!");
  });
});

module.exports = router;

// function createNewAnimal (body, animalsArray) {
//     const animal = body;
//     animalsArray.push(animal);

//     fs.writeFileSync(
//       path.join(__dirname, '../data/animals.json'),
//       JSON.stringify({ animals: animalsArray }, null, 2)
//     );

//     return animal;
//   }
