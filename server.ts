import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import multer from "multer";
import fs from "fs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'public', 'img');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const db = new Database("ceramics.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price TEXT,
    image_url TEXT,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admin_config (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed initial data if empty
const productCount = db.prepare("SELECT count(*) as count FROM products").get() as { count: number };
if (productCount.count === 0) {
  const insertProduct = db.prepare("INSERT INTO products (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)");
  insertProduct.run("Waza Antracytowa", "Ręcznie toczona waza o surowym wykończeniu, inspirowana teksturą skał.", "250 zł", "/img/waza1.jpeg", "Wazy");
  insertProduct.run("Misa Gliniana", "Głęboka misa z widocznymi śladami dłoni artysty, idealna na owoce.", "180 zł", "/img/misa1.jpeg", "Misy");
  insertProduct.run("Kubek Ziemisty", "Codzienny towarzysz porannej kawy, o ergonomicznym kształcie.", "65 zł", "/img/kubek.jpeg", "Kubki");
  insertProduct.run("Waza Pustynna", "Jasna ceramika o piaszczystej fakturze, idealna do suchych traw.", "320 zł", "/img/waza2.jpeg", "Wazy");
  insertProduct.run("Misa Oceaniczna", "Szkliwiona na głęboki błękit misa o falistych brzegach.", "210 zł", "/img/misa2.jpeg", "Misy");
  insertProduct.run("Zestaw Espresso", "Dwa małe kubeczki o minimalistycznym designie.", "110 zł", "/img/zestawespresso.jpeg", "Kubki");
}

const testimonialCount = db.prepare("SELECT count(*) as count FROM testimonials").get() as { count: number };
if (testimonialCount.count === 0) {
  const insertTestimonial = db.prepare("INSERT INTO testimonials (author, content, featured) VALUES (?, ?, ?)");
  insertTestimonial.run("Anna K.", "Piękno w najczystszej postaci. Każdy detal jest dopracowany.", 1);
  insertTestimonial.run("Marek S.", "Ceramika Terra & Form nadała mojej jadalni zupełnie nowy charakter.", 1);
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json());

  // API Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  app.get("/api/testimonials", (req, res) => {
    const testimonials = db.prepare("SELECT * FROM testimonials WHERE featured = 1 ORDER BY created_at DESC").all();
    res.json(testimonials);
  });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for 587 (TLS)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    console.log("Contact form submission:", req.body);

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `Nowa wiadomość z formularza Terra & Form od: ${name}`,
          text: `Imię: ${name}\nEmail: ${email}\n\nWiadomość:\n${message}`,
          replyTo: email
        });
        console.log("Email sent successfully!");
        res.json({ success: true });
      } else {
        console.log("Email credentials not configured in .env, skipping email sending.");
        // Simulate success for demo purposes if no credentials
        res.json({ success: true });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Product CRUD
  app.post("/api/products", (req, res) => {
    const { name, description, price, image_url, category } = req.body;
    const info = db.prepare("INSERT INTO products (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)")
      .run(name, description, price, image_url, category);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/products/:id", (req, res) => {
    db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Image Upload
  app.post("/api/upload", upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // Return relative path for frontend usage
    const imageUrl = `/img/${req.file.filename}`;
    res.json({ success: true, url: imageUrl });
  });

  // Testimonial CRUD
  app.post("/api/testimonials", (req, res) => {
    const { author, content } = req.body;
    const info = db.prepare("INSERT INTO testimonials (author, content, featured) VALUES (?, ?, ?)")
      .run(author, content, 1); // Default to featured for simplicity in this prototype
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/testimonials/:id", (req, res) => {
    db.prepare("DELETE FROM testimonials WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Admin Auth (Simple for demo)
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === "admin123") { // Simple hardcoded password for now
      res.json({ success: true, token: "fake-jwt-token" });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
