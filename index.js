const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Inventory data (temporary)
let inventory = [
  { id: 1, name: "Pen", stock: 120 },
  { id: 2, name: "Notebook", stock: 75 },
  { id: 3, name: "Marker", stock: 40 },
  { id: 4, name: "Stapler", stock: 15 }
];

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "staff" && password === "staff123") {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Get inventory
app.get("/inventory", (req, res) => {
  res.json(inventory);
});

// Place order
app.post("/order", (req, res) => {
  const { id, quantity } = req.body;
  const item = inventory.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (item.stock < quantity) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  item.stock -= quantity;
  res.json({ success: true, item });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
