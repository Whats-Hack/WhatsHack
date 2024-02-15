// todo write a cool backend application

require("dotenv").config();
const express = require("express");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

// importing the fs module
const fs = require("fs");
const db = require("./databases/db.json");

const server = jsonServer.create();
const router = jsonServer.router("./databases/db.json");
const middlewares = jsonServer.defaults();

const secretKey = process.env.SECRET_KEY || "your_secret_key"; // Секретный ключ для подписи JWT токена
const PORT = process.env.PORT || 5000;

server.use(express.json());
server.use(middlewares);
server.use(morgan("dev"));
server.use((req, res, next) => {
  // Middleware to disable CORS
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function login(req, res, next) {
  const { userName, password } = req.body;

  for (let i = 0; i < db.users.length; i++) {
    const user = db.users[i];
    if (user.username === userName) {
      if (user.password === password) {
        const token = jwt.sign(
          {
            id: user.id,
          },
          secretKey
        );
        res.json({ token: token });
      } else {
        res.status(400);
        res.json({ error: "Password are wrong" });
      }
      return;
    }
  }

  res.status(404);
  res.json({ error: "User not fround" });
}

function register(req, res, next) {
  const {
    email,
    avatar,
    username,
    password,
    firstName,
    lastName,
    birthday,
    city,
  } = req.body;

  if (!username || !password) {
    res.status(400);
    return res.json({ error: "Username and password are required" });
  }

  // validation for uniq username
  for (let i = 0; i < db.users.length; i++) {
    const user = db.users[i];
    if (user.username === username) {
      res.status(400);
      return res.json({ error: "This username is already chosen" });
    }
  }

  const _id = db.users.length;

  const newUser = {
    id: _id,
    creationDate: new Date(),
    lastConnection: new Date(),
    friends: [],
    chats: [],
    email: email || "",
    avatar: avatar || "",
    username: username,
    password: password,
    firstName: firstName || "",
    lastName: lastName || "",
    birthday: birthday || "",
    city: city || "",
    isActive: true,
  };

  // add a new one user
  db.users.push(newUser);

  // converting the JSON object to a string
  const data = JSON.stringify(db);

  // writing the JSON string content to a file
  fs.writeFile("./databases/db.json", data, (error) => {
    // throwing the error
    // in case of a writing problem
    if (error) {
      // logging the error
      res.status(500);
      return res.json({ error: error });
    }

    return res.json({
      data: newUser,
      message: "User is created",
      token: jwt.sign(
        {
          id: _id,
        },
        secretKey
      ),
    });
  });
}

server.post("/api/login", login);

server.post("/api/register", register);

server.use("/api", authenticateToken, router);

server.listen(PORT, () => {
  console.log(`JSON Server is running at port ${PORT}`);
});
