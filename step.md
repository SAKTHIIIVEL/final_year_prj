# DiPharma Enterprise System — Step-by-Step Setup Guide

> Follow these steps **top to bottom** to get the entire project running from scratch.

---

## Prerequisites

Before you begin, ensure these are installed on your system:

| Tool                         | Version | Purpose                                |
| ---------------------------- | ------- | -------------------------------------- |
| **Node.js**                  | v18+    | Runtime for backend & frontend         |
| **npm**                      | v9+     | Package manager (comes with Node)      |
| **MongoDB Community Server** | v7+     | Database                               |
| **MongoDB Compass**          | Latest  | GUI to view/manage your database       |
| **Postman**                  | Latest  | API testing (optional but recommended) |
| **VS Code**                  | Latest  | Code editor                            |

---

## Step 1: Clone / Open the Project

Open the project folder in VS Code:

```
d:\Project\dipharma_prj\
├── DiPharma_backend/     ← Express.js API server
├── DiPharma_frontend/    ← React (Vite) frontend
└── step.md               ← This file
```

---

## Step 2: Start MongoDB

1. Open **MongoDB Compass**
2. Click **"New Connection"**
3. Use the default connection string: `mongodb://localhost:27017`
4. Click **Connect**
5. Verify you see the connection succeed (you'll see system databases like `admin`, `local`)

> ⚠️ MongoDB must be running before starting the backend. If Compass can't connect, make sure the MongoDB service is running:
>
> - Press `Win + R` → type `services.msc` → find **MongoDB Server** → click **Start**

---

## Step 3: Install Backend Dependencies

Open a terminal in VS Code and run:

```bash
cd d:\Project\dipharma_prj\DiPharma_backend
npm install
```

This installs: `express`, `mongoose`, `bcryptjs`, `jsonwebtoken`, `helmet`, `express-rate-limit`, `express-validator`, `multer`, `cloudinary`, `exceljs`, `winston`, `axios`, `cors`, `dotenv`, `uuid`

---

## Step 4: Configure Environment Variables

The `.env` file is already set up at `DiPharma_backend/.env`. Verify it contains:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dipharma_db

JWT_SECRET=dipharma_jwt_secret_key_2026
JWT_REFRESH_SECRET=dipharma_jwt_refresh_secret_2026
JWT_EXPIRE=1d
JWT_REFRESH_EXPIRE=7d

BREVO_API_KEY=<your-brevo-key>
OWNER_EMAIL=<your-email>
SENDER_EMAIL=<your-sender-email>

# Leave blank to use local file storage (Multer)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

> 💡 Change `MONGODB_URI` if your MongoDB is running on a different port or host.

---

## Step 5: Seed the Database

This creates the **Super Admin account** and **initial data** (products, services, jobs, FAQs):

```bash
cd d:\Project\dipharma_prj\DiPharma_backend
npm run seed
```

**Expected output:**

```
Connected to MongoDB for seeding...
✅ Super Admin created: admin@dipharma.com / DiPharma@2026
✅ 4 Products seeded
✅ 5 Services seeded
✅ 5 Jobs seeded
✅ 4 FAQs seeded

🎉 Seeding complete!
```

**After seeding**, open MongoDB Compass → click **Refresh** → you should see a new database called `dipharma_db` with these collections:

- `admins` (1 document — Super Admin)
- `products` (4 documents)
- `services` (5 documents)
- `jobs` (5 documents)
- `faqs` (4 documents)

---

## Step 6: Start the Backend Server

```bash
cd d:\Project\dipharma_prj\DiPharma_backend
npm run dev
```

**Expected output:**

```
🚀 DiPharma API running on http://localhost:5000
📋 Health check: http://localhost:5000/api/v1/health
```

**Verify it works:** Open your browser and visit:

```
http://localhost:5000/api/v1/health
```

You should see:

```json
{ "success": true, "message": "DiPharma API is running", "timestamp": "..." }
```

> 🔴 **Keep this terminal open!** The backend must stay running.

---

## Step 7: Install Frontend Dependencies

Open a **new terminal** (don't close the backend terminal) and run:

```bash
cd d:\Project\dipharma_prj\DiPharma_frontend
npm install
```

---

## Step 8: Verify Frontend Environment

Check `DiPharma_frontend/.env` contains:

```env
VITE_API_URL=http://localhost:5000
```

This tells the frontend where the backend API lives.

---

## Step 9: Start the Frontend

```bash
cd d:\Project\dipharma_prj\DiPharma_frontend
npm run dev
```

**Expected output:**

```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## Step 10: View the Public Website

Open your browser and visit:

| Page               | URL                                          | What to See                                                                            |
| ------------------ | -------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Home**           | `http://localhost:5173/`                     | Hero, About, Services, Products (with "View Products" button), Partners, FAQs, Contact |
| **About**          | `http://localhost:5173/about`                | Company info, team section                                                             |
| **Services**       | `http://localhost:5173/services`             | 5 clickable service cards → each navigates to detail page                              |
| **Service Detail** | `http://localhost:5173/services/doctor-will` | Dynamic content from database (hero, features, benefits)                               |
| **Products**       | `http://localhost:5173/products`             | Dynamic product cards from database                                                    |
| **Career**         | `http://localhost:5173/career`               | Dynamic job listings + application form                                                |
| **Contact**        | `http://localhost:5173/contact`              | Contact form → saves to DB + sends email                                               |
| **Chatbot Icon**   | Bottom-right corner on any page              | Floating 🤖 icon → opens chat popup                                                    |

---

## Step 11: Access the Admin Panel

1. Visit: **`http://localhost:5173/admin/login`**
2. Select **"Super Admin"** tab
3. Login with:
   - **Email:** `admin@dipharma.com`
   - **Password:** `DiPharma@2026`
4. You'll be redirected to the **Dashboard**

### Admin Panel Pages:

| Page             | What You Can Do                                                  |
| ---------------- | ---------------------------------------------------------------- |
| **Dashboard**    | View live stats (applications, inquiries, jobs count)            |
| **Products**     | Add / Edit / Delete products                                     |
| **Services**     | Add / Edit / Delete services with features & benefits            |
| **Jobs**         | Add / Edit / Delete / Activate / Deactivate job listings         |
| **Applications** | View career applications, update status, **download Excel**      |
| **Inquiries**    | View contact form submissions, update status, **download Excel** |
| **FAQs**         | Add / Edit / Delete FAQs                                         |

---

## Step 12: Test APIs with Postman (Optional)

1. Open **Postman**
2. Click **Import** → select `DiPharma_backend/dipharma_postman_collection.json`
3. Run **"Super Admin Login"** first — the token is auto-saved
4. Test any endpoint from the collection

---

## Quick Reference — Useful Commands

| Command         | Where to Run         | What It Does                    |
| --------------- | -------------------- | ------------------------------- |
| `npm run dev`   | `DiPharma_backend/`  | Start backend with auto-reload  |
| `npm run seed`  | `DiPharma_backend/`  | Seed database with initial data |
| `npm start`     | `DiPharma_backend/`  | Start backend (production)      |
| `npm run dev`   | `DiPharma_frontend/` | Start frontend dev server       |
| `npm run build` | `DiPharma_frontend/` | Build frontend for production   |

---

## Troubleshooting

| Issue                                  | Solution                                                      |
| -------------------------------------- | ------------------------------------------------------------- |
| `ECONNREFUSED` on backend start        | MongoDB is not running → start it via Services or Compass     |
| `CORS error` in browser console        | Make sure backend is running on port 5000                     |
| Seed says "Super Admin already exists" | Database was already seeded — this is fine                    |
| Login returns "Invalid credentials"    | Check email/password: `admin@dipharma.com` / `DiPharma@2026`  |
| Frontend shows "Loading..." forever    | Backend is not running or `VITE_API_URL` in `.env` is wrong   |
| File upload fails                      | Make sure the `uploads/` folder exists in `DiPharma_backend/` |

---

## Architecture Overview

```
Browser (localhost:5173)
    │
    ├── Public Pages ──→ Header + Page + Footer + ChatbotIcon
    │     ├── Home, About, Services, Products, Career, Contact
    │     ├── /services/:slug → ServiceDetailPage (fetches from API)
    │     └── /products → ProductsPage (fetches from API)
    │
    └── Admin Panel ──→ ProtectedRoute + AdminLayout
          ├── /admin/login
          └── /admin/dashboard, products, services, jobs, applications, inquiries, faqs
                │
                ▼
         Backend API (localhost:5000)
                │
                ├── JWT Auth + RBAC Middleware
                ├── Express Routes → Controllers → MongoDB
                ├── Email Service (Brevo API)
                └── Excel Export Service
                │
                ▼
         MongoDB (localhost:27017/dipharma_db)
```
