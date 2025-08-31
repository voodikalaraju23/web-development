const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/register", (req, res) => {
  const newStudent = req.body;
  let students = [];
  if (fs.existsSync("students.json")) {
    students = JSON.parse(fs.readFileSync("students.json"));
  }
  students.push(newStudent);
  fs.writeFileSync("students.json", JSON.stringify(students, null, 2));
  res.redirect("/");
});

app.get("/students", (req, res) => {
  if (!fs.existsSync("students.json")) {
    return res.send("<h2>No students registered yet.</h2>");
  }
  const students = JSON.parse(fs.readFileSync("students.json"));
  res.json(students);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
