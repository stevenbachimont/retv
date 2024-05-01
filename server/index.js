const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;

const users = require("./users.json");
const rectodata = require("./recto-data.json");
const usersData = require("./user-data.json");
const path = require("path");

app.use(bodyParser.json());

app.use(cors({ origin: '*' }));

app.get("/api/recto-data", (req, res) => {
  res.json(rectodata);
});
app.get("/api/verso-data", (req, res) => {
  res.json(versodata);
});

app.get("/api/userdata/:username", (req, res) => {
  const { username } = req.params;

  if (usersData[username]) {
    res.json(usersData[username]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.post("/api/auth", (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    bcrypt.compare(password, users[username], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to authenticate" });
      } else if (result) {
        const token = jwt.sign({ username }, "your-secret-key", {
          expiresIn: "1h",
        });
        res.json({ token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.post("/api/users", (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    res.status(400).json({ error: "Username already exists" });
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to hash password" });
      } else {
        users[username] = hash;

        fs.writeFile("./users.json", JSON.stringify(users), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to write to file" });
          } else {
            res.status(201).json({ message: "User created successfully" });
          }
        });
      }
    });
  }
});

app.post('/api/userdata', (req, res) => {
  const { username, ...formData } = req.body;

  fs.readFile('user-data.json', 'utf8', (readError, data) => {
    if (readError) {
      console.error('Error reading file:', readError);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    let userData = JSON.parse(data);

    // Check if userData is an object and not undefined
    if (typeof userData !== 'object' || userData === null) {
      userData = {};
    }

    // Create a new "database" for the user if it doesn't exist
    if (!userData[username]) {
      userData[username] = {};
    }

    // Store the form data in the user's "database"
    userData[username] = { ...userData[username], ...formData };

    fs.writeFile('user-data.json', JSON.stringify(userData), (writeError) => {
      if (writeError) {
        console.error('Error writing file:', writeError);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json({ message: 'User data saved successfully' });
    });
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error("NOT WORKING !! ", err);
  } else {
    console.info(`WORKING on port ${port}`);
  }
});
