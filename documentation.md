# DiPharma — Full Project Documentation

> A pharmaceutical company web application with public-facing pages, admin CMS dashboards, AI-less rule-based chatbot, and comprehensive analytics.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Project Structure](#2-project-structure)
3. [Backend Architecture](#3-backend-architecture)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Authentication Flow](#5-authentication-flow)
6. [Chatbot System](#6-chatbot-system)
7. [Email System](#7-email-system)
8. [Dashboard Analytics](#8-dashboard-analytics)
9. [API Endpoint Reference](#9-api-endpoint-reference)
10. [Environment Variables](#10-environment-variables)
11. [Running the Project](#11-running-the-project)

---

## 1. Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT (jsonwebtoken)** | Authentication tokens (access + refresh) |
| **bcryptjs** | Password hashing |
| **Helmet** | HTTP security headers |
| **CORS** | Cross-origin request handling |
| **express-rate-limit** | Rate limiting (login, general) |
| **express-validator** | Input validation |
| **ExcelJS** | Excel export for inquiries & applications |
| **Cloudinary** | Image upload & hosting |
| **Multer** | File upload middleware (resume uploads) |
| **Axios** | HTTP client for Brevo email API |
| **Winston** | Structured logging |
| **dotenv** | Environment variable management |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **Vite** | Build tool & dev server |
| **React Router v6** | Client-side routing |
| **Redux Toolkit + RTK Query** | State management & API caching |
| **Recharts** | Dashboard charts (pie, area, bar) |
| **Framer Motion** | Page animations |
| **GSAP** | Advanced animations (globe, timeline) |
| **Lucide React + React Icons** | Icon libraries |
| **SweetAlert2** | Styled alert dialogs |
| **Web Speech API** | Browser-native voice input for chatbot |

---

## 2. Project Structure

```
dipharma_prj/
├── DiPharma_backend/
│   ├── server.js                    # Express app entry point
│   ├── package.json
│   ├── .env                         # Environment variables
│   ├── uploads/                     # Local file uploads (resumes)
│   └── src/
│       ├── config/
│       │   ├── db.js                # MongoDB connection
│       │   ├── cors.js              # CORS whitelist config
│       │   ├── cloudinary.js        # Cloudinary SDK setup
│       │   └── seed.js              # Database seeder script
│       ├── controllers/
│       │   ├── authController.js    # Login, create admin, get admins, delete admin
│       │   ├── productController.js # CRUD for products
│       │   ├── serviceController.js # CRUD for services
│       │   ├── jobController.js     # CRUD for job listings
│       │   ├── applicationController.js # Job applications + Excel export
│       │   ├── inquiryController.js # Contact inquiries + Excel export
│       │   ├── faqController.js     # CRUD for FAQs
│       │   ├── dashboardController.js # Admin + Super Admin analytics
│       │   ├── chatbotController.js # Rule-based chatbot logic
│       │   ├── searchController.js  # Global search across models
│       │   └── uploadController.js  # Image upload to Cloudinary
│       ├── models/
│       │   ├── Admin.js             # Admin user (name, email, password, role, displayPassword)
│       │   ├── Product.js           # Product (title, description, image, category, isActive)
│       │   ├── Service.js           # Service (title, slug, descriptions, images, features)
│       │   ├── Job.js               # Job listing (title, department, location, type, isActive)
│       │   ├── Application.js       # Job application (name, email, role, resume, status)
│       │   ├── Inquiry.js           # Contact form submission (name, email, subject, message, status)
│       │   ├── FAQ.js               # FAQ entry (question, answer, category)
│       │   └── ChatbotInteraction.js # Chatbot message log (userMessage, botReply, sessionId)
│       ├── routes/
│       │   ├── authRoutes.js        # /api/v1 — login, create admin, get/delete admins
│       │   ├── productRoutes.js     # /api/v1/products
│       │   ├── serviceRoutes.js     # /api/v1/services
│       │   ├── jobRoutes.js         # /api/v1/jobs
│       │   ├── applicationRoutes.js # /api/v1/applications
│       │   ├── inquiryRoutes.js     # /api/v1/inquiries
│       │   ├── faqRoutes.js         # /api/v1/faqs
│       │   ├── dashboardRoutes.js   # /api/v1/dashboard
│       │   ├── chatbotRoutes.js     # /api/v1/chatbot
│       │   ├── searchRoutes.js      # /api/v1/search
│       │   └── upload.routes.js     # /api/v1/upload
│       ├── middleware/
│       │   ├── auth.js              # JWT verification + role authorization
│       │   ├── rateLimiter.js       # Rate limiting (general + auth-specific)
│       │   ├── errorHandler.js      # Global error handler
│       │   └── validate.js          # express-validator result checker
│       ├── services/
│       │   └── emailService.js      # Brevo email: inquiry notification, application notification, admin credentials
│       ├── validators/
│       │   └── authValidator.js     # Login & create-admin validation rules
│       └── utils/
│           └── logger.js            # Winston logger configuration
│
├── DiPharma_frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx                  # Root router (public, admin, super admin routes)
│       ├── App.css
│       ├── main.jsx                 # React entry point with Redux Provider
│       ├── assets/                  # Static images (logos, banners, backgrounds)
│       ├── store/
│       │   ├── store.js             # Redux store configuration
│       │   ├── api.js               # RTK Query API (all endpoints)
│       │   └── slices/
│       │       └── authSlice.js     # Auth state (admin, tokens, login/logout)
│       ├── components/
│       │   ├── Header.jsx           # Public site header/navbar
│       │   ├── Footer.jsx           # Public site footer
│       │   ├── ChatbotIcon.jsx      # Chatbot widget (voice, navigation, session)
│       │   ├── ChatbotIcon.css
│       │   ├── ScrollToTop.jsx      # Scroll restoration on route change
│       │   ├── ProtectedRoute.jsx   # Auth guard (redirects if not logged in)
│       │   ├── FlightTimeline.jsx   # Animated timeline component
│       │   ├── GlobeSvg.jsx         # 3D globe visualization
│       │   └── layouts/
│       │       ├── PublicLayout.jsx  # Header + Footer + ChatbotIcon + Outlet
│       │       ├── AdminLayout.jsx  # Admin sidebar + topbar + ChatbotIcon + Outlet
│       │       ├── AdminLayout.css
│       │       ├── SuperAdminLayout.jsx  # SA sidebar + topbar + ChatbotIcon + Outlet
│       │       └── SuperAdminLayout.css
│       └── pages/
│           ├── HomePage.jsx         # Landing page
│           ├── AboutPage.jsx        # Company about page
│           ├── ContactPage.jsx      # Contact form page
│           ├── CareerPage.jsx       # Job listings + application form
│           ├── ServicePage.jsx      # Services listing
│           ├── ServiceDetailPage.jsx # Individual service detail
│           ├── ProductsPage.jsx     # Products grid
│           ├── NoPageAvailable.jsx  # 404 page
│           └── admin/
│               ├── AdminLogin.jsx          # Admin login (with eye icon)
│               ├── AdminLogin.css
│               ├── SuperAdminLogin.jsx     # Super admin login (with eye icon)
│               ├── Dashboard.jsx           # Admin dashboard (stats + charts)
│               ├── SuperAdminDashboard.jsx # SA dashboard (full analytics)
│               ├── SuperAdminDashboard.css
│               ├── ManageAdmins.jsx        # Admin CRUD (list, create, delete)
│               ├── ManageAdmins.css
│               ├── AdminProducts.jsx       # Product CRUD
│               ├── AdminServices.jsx       # Service CRUD
│               ├── AdminJobs.jsx           # Job CRUD
│               ├── AdminApplications.jsx   # Applications table + Excel export
│               ├── AdminInquiries.jsx      # Inquiries table + Excel export
│               └── AdminFAQs.jsx           # FAQ CRUD
│
├── documentation.md                 # This file
└── suggestions.txt                  # Future development suggestions
```

---

## 3. Backend Architecture

### 3.1 Server Setup (`server.js`)

The Express server initializes with:
- **Helmet** for security headers
- **CORS** with configurable whitelist
- **Rate limiting** (general + auth-specific)
- **JSON & URL-encoded** body parsing (10mb limit)
- **Static file serving** for uploads directory
- **Health check** at `GET /api/v1/health`
- All routes mounted under `/api/v1`
- Global error handler middleware
- MongoDB connection via Mongoose

### 3.2 Database Models

#### Admin
| Field | Type | Description |
|-------|------|-------------|
| name | String | Admin's full name |
| email | String | Unique login email |
| password | String | bcrypt-hashed password |
| displayPassword | String | Plain text password (for SA to view) |
| role | String | `ADMIN` or `SUPER_ADMIN` |
| timestamps | Date | createdAt, updatedAt |

#### Product
| Field | Type | Description |
|-------|------|-------------|
| title | String | Product name |
| description | String | Product details |
| image | String | Cloudinary URL |
| category | String | Product category |
| isActive | Boolean | Visibility toggle |

#### Service
| Field | Type | Description |
|-------|------|-------------|
| title | String | Service name |
| slug | String | URL-friendly identifier |
| shortDescription | String | Brief summary |
| fullDescription | String | Detailed HTML/text content |
| bannerImage | String | Hero image URL |
| featureImages | [String] | Gallery images |
| features | [Object] | Feature list with title/description |
| benefits | [Object] | Benefit list |
| isActive | Boolean | Visibility toggle |

#### Job
| Field | Type | Description |
|-------|------|-------------|
| title | String | Job position title |
| department | String | Department name |
| location | String | Job location |
| type | String | full-time / part-time / contract |
| description | String | Job description |
| requirements | String | Role requirements |
| isActive | Boolean | Whether actively hiring |

#### Application
| Field | Type | Description |
|-------|------|-------------|
| name | String | Applicant name |
| email | String | Applicant email |
| phone | String | Contact number |
| role | String | Applied position |
| resume | String | Uploaded file path |
| coverLetter | String | Optional cover letter |
| status | String | `pending` → `reviewed` → `shortlisted` / `rejected` |

#### Inquiry
| Field | Type | Description |
|-------|------|-------------|
| firstName | String | Contact's first name |
| lastName | String | Contact's last name |
| email | String | Contact's email |
| subject | String | Inquiry subject |
| message | String | Inquiry body |
| status | String | `unread` → `read` → `resolved` |

#### FAQ
| Field | Type | Description |
|-------|------|-------------|
| question | String | FAQ question |
| answer | String | FAQ answer |
| category | String | Category grouping |

#### ChatbotInteraction
| Field | Type | Description |
|-------|------|-------------|
| userMessage | String | What the user typed |
| botReply | String | What the bot responded |
| sessionId | String | Browser session identifier |

### 3.3 Middleware

- **`auth.js`** — `verifyJWT`: Validates JWT from `Authorization: Bearer` header OR `?token=` query param (for Excel downloads in new tabs). `authorizeRoles(…roles)`: Restricts access by admin role.
- **`rateLimiter.js`** — `generalLimiter` (100 req/15min) and `authLimiter` (5 req/15min for login).
- **`errorHandler.js`** — Catches all errors and returns consistent JSON response.
- **`validate.js`** — Checks `express-validator` validation results.

### 3.4 Email Service (`emailService.js`)

Uses **Brevo (SendinBlue) HTTP API** via Axios:
- `sendInquiryNotification(inquiry)` — Sends email to company when a contact form is submitted
- `sendApplicationNotification(application)` — Sends email when a job application is received
- `sendAdminCredentials(name, email, password)` — Sends welcome email with login URL + credentials when a new admin is created

---

## 4. Frontend Architecture

### 4.1 Routing (`App.jsx`)

Three route groups:

1. **Public Routes** (wrapped in `PublicLayout` — Header + Footer + Chatbot):
   - `/` — Home page
   - `/contact` — Contact form
   - `/about` — About DiPharma
   - `/career` — Job listings
   - `/services` — Services listing
   - `/services/:slug` — Service details
   - `/products` — Products grid

2. **Admin Routes** (wrapped in `ProtectedRoute` + `AdminLayout`):
   - `/admin/dashboard` — Admin analytics
   - `/admin/products` — Product management
   - `/admin/services` — Service management
   - `/admin/jobs` — Job management
   - `/admin/applications` — Application review
   - `/admin/inquiries` — Inquiry review
   - `/admin/faqs` — FAQ management

3. **Super Admin Routes** (wrapped in `ProtectedRoute(requiredRole="SUPER_ADMIN")` + `SuperAdminLayout`):
   - `/super-admin/dashboard` — Full analytics
   - `/super-admin/manage-admins` — Admin CRUD
   - All other management pages (same components)

### 4.2 State Management

**Redux Toolkit** with:
- **`authSlice.js`** — Stores `admin` object, `accessToken`, `refreshToken`. Handles login/logout. Persists tokens in `localStorage`.
- **`api.js` (RTK Query)** — Centralized API layer with tag-based cache invalidation. All API calls go through `fetchBaseQuery` with `baseUrl` + automatic `Authorization: Bearer` header injection.

### 4.3 Key Components

- **`ProtectedRoute`** — Checks auth state, redirects to login if not authenticated, checks role if `requiredRole` is specified.
- **`ChatbotIcon`** — Floating chatbot widget with: text input, voice input (Web Speech API), auto-navigation, session tracking, message formatting.
- **`AdminLayout` / `SuperAdminLayout`** — Fixed sidebar navigation with mobile-responsive slide-in overlay + backdrop. Topbar with ☰ toggle and welcome message.

---

## 5. Authentication Flow

```
1. User enters email + password on login page
2. Frontend sends POST /api/v1/super-admin/login (or /admin/login)
3. Backend validates credentials with bcrypt
4. If valid, generates:
   - Access token (JWT, 24h expiry, signed with JWT_SECRET)
   - Refresh token (JWT, 7d expiry, signed with JWT_REFRESH_SECRET)
5. Frontend stores tokens in localStorage + Redux state
6. All subsequent API requests include Authorization: Bearer <accessToken>
7. If access token expires (401 TOKEN_EXPIRED):
   - Frontend sends POST /api/v1/auth/refresh with refresh token
   - Backend verifies refresh token and returns new access token
   - Original request is retried automatically
8. Logout clears localStorage and Redux state
```

### Role-Based Access
| Role | Access |
|------|--------|
| **SUPER_ADMIN** | Full access + manage admins + analytics |
| **ADMIN** | Manage products, services, jobs, applications, inquiries, FAQs |

---

## 6. Chatbot System

### Architecture
The chatbot is **rule-based** (no AI API). Logic is in `chatbotController.js`.

### Processing Pipeline
```
User message → lowercase
  ↓
1. Navigation intent match (NAV_INTENTS keywords)
   → Returns action:"navigate" + path (frontend auto-redirects)
  ↓
2. Greeting detection ("hi", "hello", etc.)
   → Returns welcome message with capabilities list
  ↓
3. Company info match ("phone", "email", "address")
   → Returns contact details
  ↓
4. FAQ keyword search (queries MongoDB FAQs collection)
   → Returns matching FAQ answer
  ↓
5. Product name match (searches Products collection)
   → Returns product info
  ↓
6. Service name match (searches Services collection)
   → Returns service info
  ↓
7. Help intent
   → Returns capabilities list
  ↓
8. Thank you detection
   → Returns polite response
  ↓
9. Fallback
   → Suggests what user can ask about
```

### Navigation Keywords
| Keywords | Destination |
|----------|-------------|
| contact, appointment, book, booking, schedule, consultation | `/contact` |
| product, products, show products | `/products` |
| service, services, show services | `/services` |
| about, about dipharma, who are you | `/about` |
| career, jobs, apply, hiring | `/career` |
| home, homepage, main page | `/` |

### Session Tracking
- Frontend generates a unique session ID on mount: `sess_<timestamp>_<random>`
- Sent as `x-session-id` header with every message
- Backend stores it in `ChatbotInteraction` documents
- Groups all messages from one user session together

### Voice Input
- Uses Web Speech API (`webkitSpeechRecognition`)
- Mic button with red pulse animation when listening
- Auto-sends transcribed text after recognition completes
- Fallback message if browser doesn't support it

---

## 7. Email System

### Provider: Brevo (SendinBlue)
Uses HTTP API (`https://api.brevo.com/v3/smtp/email`) with `BREVO_API_KEY`.

### Email Types

| Trigger | Function | Recipient | Content |
|---------|----------|-----------|---------|
| Contact form submitted | `sendInquiryNotification()` | Company email | Name, email, subject, message |
| Job application submitted | `sendApplicationNotification()` | Company email | Name, email, role, resume link |
| New admin created | `sendAdminCredentials()` | New admin's email | Login URL, email, password |

---

## 8. Dashboard Analytics

### Admin Dashboard (`Dashboard.jsx`)
- **Stat Cards**: Total Inquiries, Applications, Jobs, Products (clickable → navigate to page)
- **Inquiry Status Pie Chart**: unread / read / resolved counts
- **Application Status Pie Chart**: pending / reviewed / shortlisted / rejected counts
- **Inquiries Trend**: 30-day area chart (daily submission counts)
- **Applications Trend**: 30-day area chart

### Super Admin Dashboard (`SuperAdminDashboard.jsx`)
All of the above, plus:
- **Overview Cards**: Inquiries, Applications, Chatbot Messages, Active Admins, Jobs, Products, Services, FAQs
- **Application by Role**: Bar chart (applications per job role)
- **Chatbot Usage Trend**: 30-day line chart
- **Recent Activity**: Latest inquiries and applications listed

### How Charts Change
See `suggestions.txt` Section 19 for detailed explanation of what user/admin actions trigger chart updates.

---

## 9. API Endpoint Reference

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/super-admin/login` | Public | Super admin login |
| POST | `/api/v1/admin/login` | Public | Admin login |
| POST | `/api/v1/super-admin/create-admin` | SUPER_ADMIN | Create new admin + send email |
| GET | `/api/v1/super-admin/admins` | SUPER_ADMIN | List all admins |
| DELETE | `/api/v1/super-admin/admins/:id` | SUPER_ADMIN | Delete admin |
| POST | `/api/v1/auth/refresh` | Public | Refresh access token |
| GET | `/api/v1/auth/me` | Authenticated | Get current admin profile |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/products` | Public | List all active products |
| GET | `/api/v1/products/:id` | Public | Get single product |
| POST | `/api/v1/products` | ADMIN+ | Create product |
| PUT | `/api/v1/products/:id` | ADMIN+ | Update product |
| DELETE | `/api/v1/products/:id` | ADMIN+ | Delete product |

### Services
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/services` | Public | List all active services |
| GET | `/api/v1/services/:slug` | Public | Get service by slug |
| GET | `/api/v1/services/admin/all` | ADMIN+ | List all services (incl. inactive) |
| POST | `/api/v1/services` | ADMIN+ | Create service |
| PUT | `/api/v1/services/:id` | ADMIN+ | Update service |
| DELETE | `/api/v1/services/:id` | ADMIN+ | Delete service |

### Jobs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/jobs` | Public | List active jobs |
| GET | `/api/v1/jobs/:id` | Public | Get single job |
| POST | `/api/v1/jobs` | ADMIN+ | Create job |
| PUT | `/api/v1/jobs/:id` | ADMIN+ | Update job |
| DELETE | `/api/v1/jobs/:id` | ADMIN+ | Delete job |

### Applications
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/applications` | ADMIN+ | List all applications |
| POST | `/api/v1/applications` | Public | Submit job application (multipart) |
| PATCH | `/api/v1/applications/:id/status` | ADMIN+ | Update application status |
| GET | `/api/v1/applications/export/excel` | ADMIN+ | Download Excel export |

### Inquiries
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/inquiries` | ADMIN+ | List all inquiries |
| POST | `/api/v1/inquiries` | Public | Submit contact form |
| PATCH | `/api/v1/inquiries/:id/status` | ADMIN+ | Update inquiry status |
| GET | `/api/v1/inquiries/export/excel` | ADMIN+ | Download Excel export |

### FAQs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/faqs` | Public | List all FAQs |
| POST | `/api/v1/faqs` | ADMIN+ | Create FAQ |
| PUT | `/api/v1/faqs/:id` | ADMIN+ | Update FAQ |
| DELETE | `/api/v1/faqs/:id` | ADMIN+ | Delete FAQ |

### Dashboard
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/dashboard/stats` | ADMIN+ | Admin dashboard stats |
| GET | `/api/v1/dashboard/super-admin-stats` | SUPER_ADMIN | Full analytics |

### Chatbot
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/chatbot/message` | Public | Send message to chatbot |

### Search
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/search?q=keyword` | Public | Search across all models |

### Upload
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/upload/image` | ADMIN+ | Upload image to Cloudinary |

---

## 10. Environment Variables

### Backend (`.env`)
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/dipharma
JWT_SECRET=<your-jwt-secret>
JWT_REFRESH_SECRET=<your-refresh-secret>
BREVO_API_KEY=<your-brevo-api-key>
SENDER_EMAIL=<sender@domain.com>
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
CLIENT_URL=http://localhost:5173
```

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:5000
```

---

## 11. Running the Project

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Brevo account (for emails)
- Cloudinary account (for images)

### Backend
```bash
cd DiPharma_backend
npm install
npm run seed     # Seeds initial data (super admin, sample products, etc.)
npm run dev      # Starts on http://localhost:5000
```

### Frontend
```bash
cd DiPharma_frontend
npm install
npm run dev      # Starts on http://localhost:5173
```

### Default Super Admin Credentials
Created by the seed script — check `src/config/seed.js` for the default email and password.
