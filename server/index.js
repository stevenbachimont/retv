const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;

const users = require("./users.json");
const rectodata = require("./recto-data.json");
const versodata = require("./verso-data.json");
const usersData = require("./user-data.json");


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

app.post("/api/auth", async (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    try {
      if (await argon2.verify(users[username], password)) {
        const token = jwt.sign({ username }, "your-secret-key", {
          expiresIn: "4h",
        });
        res.json({ token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to authenticate" });
    }
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.post("/api/users", async (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    res.status(400).json({ error: "Username already exists" });
  } else {
    try {
      const hash = await argon2.hash(password);
      users[username] = hash;

      fs.writeFile("./users.json", JSON.stringify(users), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Failed to write to file" });
        } else {
          res.status(201).json({ message: "User created successfully" });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to hash password" });
    }
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


    if (typeof userData !== 'object' || userData === null) {
      userData = {};
    }

    if (!userData[username]) {
      userData[username] = {};
    }

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



app.post("/api/verso-data", (req, res) => {
  const newData = req.body;

  fs.writeFile("./verso-data.json", JSON.stringify(newData), (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to write to file" });
    } else {
      res.status(200).json({ message: "Data updated successfully" });
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error("NOT WORKING !! ", err);
  } else {
    console.info(`WORKING on port ${port}`);
  }
});
