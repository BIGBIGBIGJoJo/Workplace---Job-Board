const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// temp data
const userEmail = "test1";
const userPassword = "test2";

app.post("/authentication", (req, res) => {
  const { userType, email, password } = req.body;

  if (userEmail === email && userPassword === password) {
    console.log("pass");
    res.status(200).json({ matched: true });
  } else {
    console.log("deny");
    res.status(401).json({ matched: false });
  }
  console.log(`Recevied user (${userType}) data: ${email} and ${password}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
