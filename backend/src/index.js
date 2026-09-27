const express = require("express");
const cors = require("cors");
const products = require("./products");

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for Netlify frontend, localhost, or any configured origin
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : "*";

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

app.use(express.json());

// In-memory demo stores (can be backed by Postgres/MongoDB in production)
const orders = [];
const inquiries = [];
const newsletterSubscribers = new Set();

// Root route
app.get("/", (req, res) => {
  res.json({
    brand: "NOIRÉ Haute Couture & Contemporary Indian Fashion",
    status: "online",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "production",
    documentation: {
      health: "GET /health or /api/health",
      products: "GET /api/products",
      singleProduct: "GET /api/products/:id",
      createOrder: "POST /api/orders",
      consultationInquiry: "POST /api/inquiry",
      newsletter: "POST /api/newsletter",
    },
  });
});

// Health check endpoint (for Railway health checks)
app.get(["/health", "/api/health"], (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "NOIRÉ Luxury Indian Fashion Backend",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    environment: process.env.NODE_ENV || "production",
  });
});

// GET /api/products - list all products with optional category and search filter
app.get("/api/products", (req, res) => {
  const { category, search, minPrice, maxPrice } = req.query;
  let result = [...products];

  if (category && category !== "ALL") {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.technique.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
    );
  }

  if (minPrice) {
    result = result.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    result = result.filter((p) => p.price <= Number(maxPrice));
  }

  res.json({
    success: true,
    count: result.length,
    total: products.length,
    products: result,
  });
});

// GET /api/products/:id - single product lookup
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      error: "Product not found in NOIRÉ Haute Couture archives",
    });
  }
  res.json({ success: true, product });
});

// POST /api/orders - create a new couture order
app.post("/api/orders", (req, res) => {
  const { items, customer, deliveryAddress, customMeasurements, notes } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({
      success: false,
      error: "Order must contain at least one couture garment.",
    });
  }

  // Calculate order totals
  let subtotal = 0;
  items.forEach((item) => {
    subtotal += (item.price || 0) * (item.quantity || 1);
  });

  const orderId = `NOIRE-ORD-${Date.now().toString().slice(-6)}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  const newOrder = {
    orderId,
    timestamp: new Date().toISOString(),
    status: "CONFIRMED_ATELIER_QUEUED",
    items,
    subtotal,
    currency: "INR",
    formattedSubtotal: `₹${subtotal.toLocaleString("en-IN")}`,
    customer: customer || { name: "Valued Patron" },
    deliveryAddress: deliveryAddress || null,
    customMeasurements: customMeasurements || null,
    notes: notes || null,
    estimatedDispatchDays: 14,
  };

  orders.push(newOrder);

  res.status(201).json({
    success: true,
    message: "Your haute couture order has been registered with the NOIRÉ Atelier.",
    order: newOrder,
  });
});

// POST /api/inquiry - book bespoke atelier consultation
app.post("/api/inquiry", (req, res) => {
  const { name, email, phone, city, preferredDate, occasion, garmentInterest, notes } = req.body;

  if (!name || (!email && !phone)) {
    return res.status(400).json({
      success: false,
      error: "Name and contact information (email or phone) are required.",
    });
  }

  const inquiryId = `NOIRE-INQ-${Date.now().toString().slice(-5)}`;
  const inquiry = {
    inquiryId,
    timestamp: new Date().toISOString(),
    name,
    email,
    phone,
    city: city || "Delhi / Mumbai / International",
    preferredDate: preferredDate || "Next Available Private Salon Slot",
    occasion: occasion || "Bridal / Gala",
    garmentInterest: garmentInterest || "Heirloom Saree / Lehenga",
    notes: notes || "",
    status: "CONCIERGE_ASSIGNED",
  };

  inquiries.push(inquiry);

  res.status(201).json({
    success: true,
    message: "Your private consultation request has been received. Our Master Concierge will contact you within 12 hours.",
    inquiry,
  });
});

// POST /api/newsletter - subscribe to private atelier salon journal
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid email address.",
    });
  }

  newsletterSubscribers.add(email.toLowerCase().trim());

  res.status(200).json({
    success: true,
    message: "Welcome to the NOIRÉ Private Couture Salon Journal.",
    subscriber: email.toLowerCase().trim(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint ${req.originalUrl} not found on NOIRÉ API`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("NOIRÉ API Internal Error:", err);
  res.status(500).json({
    success: false,
    error: "Internal Haute Couture Server Error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`✨ NOIRÉ Luxury Indian Fashion API running on port ${PORT}`);
  console.log(`🌐 Ready for Railway & Netlify deployments`);
});
