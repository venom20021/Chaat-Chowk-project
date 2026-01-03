const express = require("express");
const path = require("path");
const db = require("./db/database");

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

// Admin page
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "admin.html"));
});

// Admin data API
app.get("/admin/bookings", (req, res) => {
  db.all("SELECT * FROM bookings ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


// BOOKING SUBMIT (POST)
app.post("/book", (req, res) => {
  const { name, phone, date, guests } = req.body;

  const query = `
    INSERT INTO bookings (name, phone, date, guests)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [name, phone, date, guests], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    res.send("Booking confirmed successfully!");
  });
});

// OPTIONAL: prevent 405 confusion
app.get("/book", (req, res) => {
  res.send("Please submit the booking form from /booking");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

