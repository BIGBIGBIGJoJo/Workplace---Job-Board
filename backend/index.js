import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import "dotenv/config";
import { randomUUID } from "node:crypto";
import { OAuth2Client } from "google-auth-library";
import { WorkPlaceMongoDBService } from "./dist/MongoDBService.js";

const app = express();
const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

if (!DB_URL) {
  throw new Error("DB_URL environment variable is required");
}

app.use(express.json());
app.use(cors());

const mongoDb = new WorkPlaceMongoDBService(DB_URL);
const googleClient = new OAuth2Client();

const validateSigningForm = (user) => {
  const errors = {};

  if (!user.email?.match(/^[\w.%+-]+@([\w-]+\.)+[a-zA-Z]{2,}$/)) {
    errors.email = "Please enter a valid email";
  }
  if (!user.password || user.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  return errors;
};

const validateJobForm = (job) => {
  const errors = {};

  if (!job.title?.trim()) {
    errors.title = "Job title is required";
  }
  if (!job.description?.trim()) {
    errors.description = "Job description is required";
  }
  if (!job.location?.trim()) {
    errors.location = "Location is required";
  }
  if (!job.salary || Number.isNaN(Number(job.salary)) || Number(job.salary) <= 0) {
    errors.salary = "Please enter a valid salary";
  }

  return errors;
};

// Job fetching
app.get("/job-fetch", async (req, res) => {
  try {
    const jobs = await mongoDb.getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Job fetch error:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.post("/post-job", async (req, res) => {
  try {
    const jobData = req.body;
    const errors = validateJobForm(jobData);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: "Invalid job data", errors });
    }

    const normalizedJob = {
      title: jobData.title.trim(),
      description: jobData.description.trim(),
      location: jobData.location.trim(),
      salary: Number(jobData.salary),
      type: jobData.type || "full-time",
      company: {
        name: jobData.companyName?.trim() || "Workplace Employer",
        profile:
          jobData.companyProfile?.trim() ||
          "This employer is hiring through Workplace Job Board.",
      },
      postDate: new Date().toISOString().slice(0, 10),
      requirement: Array.isArray(jobData.requirement)
        ? jobData.requirement
        : ["Review the job description and apply with relevant experience."],
      nature: jobData.nature?.trim() || "General",
    };

    const createdJob = await mongoDb.addJob(normalizedJob);
    res.status(201).json(createdJob);
  } catch (error) {
    console.error("Post job error:", error);
    res.status(500).json({ error: "Failed to post job" });
  }
});

app.delete("/jobs/:id", async (req, res) => {
  try {
    const deleted = await mongoDb.deleteJob(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({ deleted: true });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(400).json({ error: "Invalid job id" });
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

    if (!email || !password) {
      return res.status(400).json({
        matched: false,
        errors: { form: "Email and password are required." },
      });
    }

    const userData = await mongoDb.getUser(email);

    if (!userData) {
      return res.status(401).json({
        matched: false,
        errors: { email: "Email not registered." },
      });
    }

    const passwordMatched = await bcrypt.compare(password, userData.password);

    if (passwordMatched) {
      return res.status(200).json({
        matched: true,
        user: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          role: userData.role,
        },
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

app.post("/auth/google", async (req, res) => {
  try {
    if (!GOOGLE_CLIENT_ID) {
      return res.status(503).json({
        errors: { form: "Google login is not configured on the server." },
      });
    }

    const { credential, role = "jobseeker" } = req.body;

    if (!credential) {
      return res.status(400).json({
        errors: { form: "Google credential is required." },
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload?.email || payload.email_verified !== true) {
      return res.status(401).json({
        errors: { form: "Google account email could not be verified." },
      });
    }

    const existingUser = await mongoDb.getUser(payload.email);

    if (existingUser) {
      return res.status(200).json({
        matched: true,
        user: {
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          role: existingUser.role,
        },
      });
    }

    const fallbackNameParts = (payload.name || payload.email.split("@")[0]).split(" ");
    const firstName = payload.given_name || fallbackNameParts[0] || "Google";
    const lastName =
      payload.family_name || fallbackNameParts.slice(1).join(" ") || "User";
    const safeRole = role === "employer" ? "employer" : "jobseeker";
    const disabledPassword = await bcrypt.hash(randomUUID(), 10);

    await mongoDb.addUser({
      firstName,
      lastName,
      email: payload.email,
      password: disabledPassword,
      role: safeRole,
    });

    res.status(200).json({
      matched: true,
      user: {
        firstName,
        lastName,
        email: payload.email,
        role: safeRole,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({
      errors: { form: "Google login failed. Try again later." },
    });
  }
});

try {
  await mongoDb.connect();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}\n`);
  });
} catch (error) {
  console.error("Failed to connect to MongoDB:", error);
  process.exit(1);
}
