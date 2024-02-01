const express = require("express");
const app = express();
const PORT = 8080;
const router = express.Router();
const fs = require("fs");
const FILE_PATH = "./data/entries.json";
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// function to read our local entries.json file
const readEntries = () => {
  const entriesData = fs.readFileSync(FILE_PATH);
  const response = JSON.parse(entriesData);
  return response;
};

app.get("/getEntry", (req, res) => {
  const entryData = readEntries();
  res.status(200).json(entryData);
});
//POST a note
app.post("/addEntry", (req, res) => {
  console.log(req.body);
  const entryObj = req.body;
  const newEntry = {
    id: uuidv4(),
    date: entryObj.date,
    entry: entryObj.entry,
  };
  console.log(newEntry);

  const entryData = readEntries();
  entryData.push(newEntry);
  fs.writeFileSync(FILE_PATH, JSON.stringify(entryData));

  res.status(201).json(newEntry);
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
