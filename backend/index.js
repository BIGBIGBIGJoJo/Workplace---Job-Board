const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const validateSigningForm = (user) => {
  const errors = {};

  if (!user.email.match(/^[\w.%+-]+@([\w-]+\.)+[a-zA-Z]{2,}$/)) {
    errors.email = "Please enter a valid email";
  }
  if (user.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  return errors;
};

const getUserDB = () => JSON.parse(fs.readFileSync("users.json", "utf8"));

const getJobDB = () => JSON.parse(fs.readFileSync("jobs.json", "utf8"));

const emailExists = (userDB, userData) =>
  userDB.some((user) => user.email === userData.email);

// const correctPassword = (userDB, userData) => userDB.some(user => user.email === userData.email && bcrypt.hash(userData.password, 10) === userData.password);

// job fetching
app.get("/jobFetch", (req, res) => {
  try {
    const jobData = getJobDB();
    res.json(jobData).status(201);
  } catch (error) {
    res.status(500).json({ error: "Failed to read JSON file" });
  }
});

// Signing, add to user to db with hashing
app.post("/signing", async (req, res) => {
  try {
    const newUserData = req.body;

    const errors = validateSigningForm(newUserData);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: "Invalid form", errors });
    }

    const userDB = getUserDB();

    // Existed email
    if (emailExists(userDB, newUserData)) {
      errors.email = "This email has been registrated.";
      return res.status(400).json({
        message: "Existed email",
        errors: errors,
      });
    }

    // No recorded email
    const hashedPassword = await bcrypt.hash(newUserData.password, 10);
    const newUser = {
      id: userDB.length,
      ...newUserData,
      password: hashedPassword,
    };

    userDB.push(newUser);
    fs.writeFileSync("users.json", JSON.stringify(userDB, null, 2)); // update db

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error:", error);
  }
});

// logging in
app.post("/login", async (req, res) => {
  try {
    const userData = req.body;
    const errors = {};

    const userDB = getUserDB();
    const target = userDB.find((user) => user.email === userData.email);

    if (!target) {
      errors.email = "Email has not been registrated.";
      return res.status(401).json({ errors: errors });
    }

    const passwordMatched = await bcrypt.compare(
      userData.password,
      target.password
    );
    if (passwordMatched) {
      res.status(200).json({
        matched: true,
        user: { firstName: target.firstName, lastName: target.lastName },
      });
    } else {
      errors.form = "Incorrect email or password. Please try again.";
      res.status(401).json({
        matched: false,
        errors: errors,
      });
    }
    console.log(
      `Recevied user (${userData.tab}) \n data: ${userData.email} and ${userData.password},\n in DB: ${target.firstName+ ' ' + target.lastName}`
    );
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(500)
      .json({ errors: { form: "An error occurred. Please try again." } });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
