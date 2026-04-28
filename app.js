const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pdfs", pdfRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Bhagirathi Primary Teachers Training Institute API!");
});

module.exports = app;