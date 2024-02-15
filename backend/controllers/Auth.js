// ! modules
const fs = require("fs");

// ? middlewares
const { createJwtToken } = require("./../middlewares/Auth");
// ? utils
const { db } = require("./../utils/constants");

// sign in
function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    return res.json({ error: "Username and password are required" });
  }

  for (let i = 0; i < db.users.length; i++) {
    const user = db.users[i];
    if (user.username === username) {
      if (user.password === password) {
        res.json({ token: createJwtToken(user.id) });
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

// sing up
function register(req, res) {
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
      token: createJwtToken(_id),
    });
  });
}

module.exports = {
  login,
  register,
};
