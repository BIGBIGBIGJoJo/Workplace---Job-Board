import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import "dotenv/config";
import { readFileSync, writeFileSync } from "fs";
import { WorkPlaceMongoDBService } from "./dist/MongoDBService.js";
import { JsxEmit } from "typescript";

const app = express();
const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL;

app.use(express.json());
app.use(cors());

const mongoDb = new WorkPlaceMongoDBService(DB_URL);
mongoDb.connect();

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

// Job fetching
app.get("/job-fetch", async (req, res) => {
  try {
    const jobData = await mongoDb.getAllJobs();
    const job = JSON.parse(jobData);
    res.status(200).json(job); // 200 OK, not 201
  } catch (error) {
    res.status(500).json({ error: "Failed to read JSON file" });
  }
});

// Signing
app.post("/signing", async (req, res) => {
  try {
    const newUserData = req.body;
    const errors = validateSigningForm(newUserData);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: "Invalid form", errors });
    }

    if (await mongoDb.userExist(newUserData.email)) {
      return res.status(400).json({
        message: "Email already exists",
        errors: { email: "This email has been registered." },
      });
    }

    const hashedPassword = await bcrypt.hash(newUserData.password, 10);
    newUserData.password = hashedPassword;

    await mongoDb.addUser(newUserData);
  
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (await !mongoDb.userExist(email)) {
      return res.status(401).json({
        matched: false,
        errors: { email: "Email not registered." },
      });
    }

    const user = await mongoDb.getUser(email);
    let userData = JSON.parse(user);
    userData = userData[0];
  
    const passwordMatched = await bcrypt.compare(password, userData.password);

    if (passwordMatched) {
      return res.status(200).json({
        matched: true,
        user: { firstName: userData.firstName, lastName: userData.lastName, role: userData.role },
      });
    } else {
      return res.status(401).json({
        matched: false,
        errors: { form: "Incorrect email or password." },
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      errors: { form: "Server error. Try again later." },
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}\n`);
});
