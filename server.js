const express = require("express");
const path = require("path");

const app = express();

// middleware to read form data
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static(path.join(__dirname, "public")));

// HOME PAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// BOOKING PAGE (GET)
app.get("/booking", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "booking.html"));
});

// BOOKING SUBMIT (POST)
app.post("/book", (req, res) => {
  console.log("NEW BOOKING RECEIVED:");
  console.log(req.body);

  res.send("Booking received successfully!");
});

// OPTIONAL: prevent 405 confusion
app.get("/book", (req, res) => {
  res.send("Please submit the booking form from /booking");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
