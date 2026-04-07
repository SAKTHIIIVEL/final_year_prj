# DiPharma — Presentation Slide Content (12 Slides)

---

## SLIDE 1 — Title Slide

### **Pharma Web Application Using MERN Stack**
#### *A Full-Stack Pharmaceutical Web Application*

---

**Tagline:** Pharma Web Application Using MERN Stack

| Detail | Info |
|---|---|
| **Project Name** | Pharma Web Application Using MERN Stack |
| **Type** | Full-Stack MERN-Lite Web Application |
| **Tech Stack** | React + Vite (Frontend) · Node.js + Express (Backend) · MongoDB (Database) |
| **Deployment** | Vercel (Frontend) · Cloud-hosted REST API (Backend) |
| **Version** | v3.0 |

> *A complete digital platform for a pharmaceutical company — covering public-facing browsing, lead management, career applications, AI-powered chatbot support, and multi-tier admin control.*

---

## SLIDE 2 — Project Overview & Objectives

### **What is DiPharma?**

DiPharma is a **full-stack pharmaceutical company website** built to digitize and automate a company's online presence and internal operations. It serves three distinct user types through a single unified platform.

---

### **Core Objectives**

| # | Objective |
|---|---|
| 1 | Provide a professional, responsive **public website** for visitors to explore products, services, and careers |
| 2 | Enable **easy contact and inquiry submission** with automated email acknowledgements |
| 3 | Allow job seekers to **apply for careers** with resume uploads |
| 4 | Offer an **chatbot** for real-time visitor assistance and navigation |
| 5 | Give **Admins** a secure dashboard to manage all content and submissions |
| 6 | Give the **Super Admin** full system-level control including admin management and analytics |

---

### **User Roles**

```
┌───────────────────────────────────────────────┐
│               DiPharma Platform                │
├──────────────┬──────────────┬─────────────────┤
│  Public User │    Admin     │   Super Admin   │
│  (Visitor)   │  (Staff)     │  (System Owner) │
└──────────────┴──────────────┴─────────────────┘
```

---

## SLIDE 3 — Technology Stack

### **Technology Stack — Full Picture**

---

### Frontend

| Technology | Purpose |
|---|---|
| **React 18** | UI Component Library |
| **Vite 5** | Lightning-fast build tool & dev server |
| **React Router v6** | Client-side routing with nested routes & layouts |
| **Redux Toolkit (RTK Query)** | Global state management + API data fetching & caching |
| **Framer Motion** | Smooth animations and page transitions |
| **GSAP 3** | Advanced scroll-based animations |
| **Recharts** | Interactive analytics charts on dashboards |
| **Axios** | HTTP client for legacy API calls |
| **Lucide React & React Icons** | Icon libraries |
| **SweetAlert2** | Beautiful confirmation dialogs |
| **Vanilla CSS** | Custom styling (no CSS framework) |

---

### Backend

| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose 9** | NoSQL database + ODM |
| **JSON Web Token (JWT)** | Stateless authentication (Access + Refresh tokens) |
| **bcryptjs** | Password hashing (12 salt rounds) |
| **Multer** | File upload handling (resume PDFs) |
| **Cloudinary** | Cloud-based image storage |
| **Brevo (Sendinblue)** | Transactional email delivery |
| **Winston** | Structured application logging |
| **Helmet** | HTTP security headers |
| **express-rate-limit** | API rate limiting & abuse prevention |
| **express-validator** | Input validation |
| **ExcelJS** | Excel report generation |

---

## SLIDE 4 — System Architecture

### **System Architecture Diagram**

---

```
                        ┌─────────────────────────────────────────┐
                        │            BROWSER (Client)             │
                        │  React 18 + Vite + Redux Toolkit        │
                        │                                          │
                        │  ┌────────────┐  ┌───────────────────┐  │
                        │  │ Public UI  │  │  Admin / Super    │  │
                        │  │ (Visitor)  │  │  Admin Dashboard  │  │
                        │  └────────────┘  └───────────────────┘  │
                        └──────────────────┬──────────────────────┘
                                           │ HTTPS REST API calls
                                           │ (RTK Query + Axios)
                                           ▼
                        ┌─────────────────────────────────────────┐
                        │         BACKEND (Express.js Server)     │
                        │                                          │
                        │  ┌──────────┐  ┌──────────────────────┐ │
                        │  │ Helmet   │  │   express-rate-limit │ │
                        │  │ CORS     │  │   express-validator  │ │
                        │  └──────────┘  └──────────────────────┘ │
                        │                                          │
                        │          JWT Auth Middleware             │
                        │                                          │
                        │  ┌──────────────────────────────────┐   │
                        │  │           Route Handlers          │   │
                        │  │ /auth  /products  /services       │   │
                        │  │ /jobs  /applications  /inquiries  │   │
                        │  │ /faqs  /chatbot  /dashboard       │   │
                        │  │ /company-info  /upload  /search   │   │
                        │  └──────────────────────────────────┘   │
                        └──────────┬──────────────┬───────────────┘
                                   │              │
                          ┌────────▼──────┐ ┌────▼─────────┐
                          │   MongoDB     │ │  Cloudinary  │
                          │  (Database)   │ │  (Images)    │
                          └───────────────┘ └──────────────┘
                                                    │
                                            ┌───────▼──────┐
                                            │   Brevo SMTP │
                                            │   (Emails)   │
                                            └──────────────┘
```

---

### **Data Flow**
1. **Visitor** accesses the public-facing website via browser
2. **RTK Query** sends API requests to the Express REST API
3. **JWT Middleware** validates authentication for protected routes
4. **Controllers** process requests and interact with **MongoDB** via Mongoose
5. **Services** handle email dispatch (Brevo) and cloud image operations (Cloudinary)
6. Structured responses are returned to the frontend for rendering

---

## SLIDE 5 — Frontend Architecture & Public Pages

### **Frontend Architecture**

---

### **Application Layout System**

The frontend uses a **three-layout architecture** with React Router v6:

| Layout | Routes | Features |
|---|---|---|
| `PublicLayout` | `/`, `/about`, `/services`, `/products`, `/career`, `/contact` | Header + Footer + Chatbot Icon |
| `AdminLayout` | `/admin/*` | Sidebar navigation, admin-specific styling |
| `SuperAdminLayout` | `/super-admin/*` | Extended sidebar, analytics capabilities |

---

### **Public Pages**

| Page | Route | Key Content |
|---|---|---|
| **Home Page** | `/` | Hero section, Services preview, Products showcase, Partners, FAQ, Contact CTA |
| **About Page** | `/about` | Company story, mission, team, global presence |
| **Services Page** | `/services` | Service cards with animations |
| **Service Detail** | `/services/:slug` | In-depth service info (hero, features, benefits) |
| **Products Page** | `/products` | Product cards fetched from CMS |
| **Career Page** | `/career` | Job listings + Application form with resume upload |
| **Contact Page** | `/contact` | Contact form with email dispatch |
| **404 Page** | `*` | Custom not-found page |

---

### **Key Frontend Components**

- **`HeroSection`** — Animated landing banner
- **`ChatbotIcon`** — Floating AI assistant, visible on all public pages
- **`Partners`** — Scrolling partner logos
- **`FAQSection`** — Accordion-style FAQ
- **`FlightTimeline`** — Interactive visual timeline
- **`IsometricNetwork`** — 3D isometric SVG network animation
- **`Footer`** — Rich footer with site map

---

## SLIDE 6 — Admin Dashboard & CMS

### **Admin Panel — Content Management System**

---

### **Admin Login & Authentication**

- Admins access the portal via `/admin/login`
- Super Admins access via `/super-admin/login`
- JWT-based session: tokens stored in Redux state
- `ProtectedRoute` component guards all admin routes
- **Role-based access** — Regular Admin cannot access Super Admin pages

---

### **Admin Dashboard (`/admin/dashboard`)**

The Admin Dashboard provides a real-time operational overview:

| Metric Displayed | Description |
|---|---|
| Total Applications | Count of all job applications |
| Pending Applications | Applications awaiting review |
| Total Inquiries | Count of all contact submissions |
| Unread Inquiries | New, unactioned messages |
| Active Jobs | Currently listed job openings |
| Total Products & Services | CMS content counts |
| Daily Trends Chart | 30-day inquiry & application trend graph (Recharts) |

---

### **Admin CMS Modules**

| Module | Route | Operations Available |
|---|---|---|
| **Products** | `/admin/products` | Create, Edit, Delete products with image upload |
| **Services** | `/admin/services` | Full CRUD + slug management, features & benefits |
| **Jobs** | `/admin/jobs` | Post / update / remove job listings |
| **Applications** | `/admin/applications` | View, filter, update status (pending → shortlisted → rejected) |
| **Inquiries** | `/admin/inquiries` | View, mark as read/resolved |
| **FAQs** | `/admin/faqs` | Create, edit, delete FAQ entries |
| **Company Info** | `/admin/company-info` | Manage chatbot knowledge base entries |

---

## SLIDE 7 — Super Admin Dashboard

### **Super Admin — Full System Control**

---

### **Super Admin Capabilities**

The Super Admin role has elevated privileges beyond the regular admin:

| Capability | Description |
|---|---|
| **Manage Admins** | Create new admin accounts, view credentials, delete admins |
| **Platform Analytics** | System-wide statistics across all data types |
| **Access All CMS** | Full access to products, services, jobs, applications, inquiries, FAQs |
| **Chatbot Knowledge Base** | Manage company info for chatbot responses |

---

### **Super Admin Dashboard Analytics (`/super-admin/dashboard`)**

The Super Admin Dashboard (`SuperAdminDashboard.jsx`) presents a **comprehensive analytics view**:

#### Overview KPI Cards
| Metric | What It Shows |
|---|---|
| Total Inquiries | All contact form submissions |
| Total Applications | All career applications |
| Chatbot Messages | Total AI chatbot interactions |
| Total Admins | Number of admin accounts |
| Active Jobs / Products / Services / FAQs | Live content counts |

#### Analytics Charts (Recharts)
- **Inquiry Status Breakdown** — Doughnut chart (unread / read / resolved)
- **Application Status Breakdown** — Doughnut chart (pending / reviewed / shortlisted / rejected)
- **Daily Inquiries Trend** — 30-day Line chart
- **Daily Applications Trend** — 30-day Line chart
- **Chatbot Activity Trend** — 30-day Line chart
- **Top Application Roles** — Bar chart showing most applied positions

#### Recent Activity Tables
- Last 10 Inquiries (name, email, subject, status, date)
- Last 10 Applications (name, email, role, status, date)

---

### **Manage Admins (`/super-admin/manage-admins`)**

- View list of all Admin accounts
- Create new Admin (auto-sends welcome email with credentials via Brevo)
- Delete Admin accounts (Super Admins cannot be deleted)

---

## SLIDE 8 — Database Design (MongoDB Models)

### **Database Models — MongoDB (Mongoose Schemas)**

---

### **Admin Model**

```
Admin {
  name:            String (required)
  email:           String (unique, lowercase)
  password:        String (bcrypt hashed, 12 rounds)
  displayPassword: String (plain for internal reference)
  role:            Enum ["SUPER_ADMIN", "ADMIN"]
  createdAt / updatedAt: Timestamps
}
Methods: comparePassword(), generateAccessToken(), generateRefreshToken()
```

---

### **Product Model**

```
Product {
  title:       String (required)
  description: String (required)
  icon:        String (Cloudinary URL)
  image:       String (Cloudinary URL)
  cardType:    Enum ["dark", "light"]
  order:       Number (display sort order)
  isActive:    Boolean
  createdAt / updatedAt: Timestamps
}
```

---

### **Service Model**

```
Service {
  title, slug (unique), shortDescription, fullDescription
  heroImage, overviewImage, featureImage, benefitImage1, benefitImage2
  features: [{ title, description }]
  benefits: [{ title, description }]
  isActive: Boolean
  createdAt / updatedAt: Timestamps
}
```

---

### **Other Models**

| Model | Key Fields |
|---|---|
| **Job** | title, roleFocus, location, type (Full/Part/Contract/Internship), isActive |
| **Application** | name, email, phone, countryCode, role, message, resumePath, status (pending→rejected) |
| **Inquiry** | firstName, lastName, email, phone, subject, message, status (unread/read/resolved) |
| **FAQ** | question, answer, isActive |
| **CompanyInfo** | category, keywords[ ], question, answer, isActive, order |
| **ChatbotInteraction** | userMessage, botReply, sessionId |

---

## SLIDE 9 — Backend API Architecture

### **REST API — Endpoint Reference**

---

### **API Base URL:** `/api/v1`

---

### **Authentication Routes (`/api/v1`)**

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/admin/login` | Public | Admin login → returns JWT |
| POST | `/super-admin/login` | Public | Super Admin login |
| POST | `/super-admin/create-admin` | SUPER_ADMIN | Create new admin account |
| GET | `/super-admin/admins` | SUPER_ADMIN | List all admins |
| DELETE | `/super-admin/admins/:id` | SUPER_ADMIN | Delete an admin |
| POST | `/auth/refresh` | Public | Refresh JWT token |
| GET | `/auth/me` | ADMIN/SUPER_ADMIN | Get current admin profile |

---

### **Content Routes**

| Resource | Public GET | Protected POST/PUT/DELETE |
|---|---|---|
| `/products` | ✅ List/Get by ID | ✅ Create, Update, Delete |
| `/services` | ✅ List/Get by Slug | ✅ Create, Update, Delete |
| `/jobs` | ✅ List active jobs | ✅ Create, Update, Delete |
| `/faqs` | ✅ List active FAQs | ✅ Create, Update, Delete |
| `/company-info` | ✅ List active entries | ✅ Create, Update, Delete |

---

### **Operational Routes**

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/applications` | GET | ADMIN+ | List with filters |
| `/applications/:id` | PATCH | ADMIN+ | Update status |
| `/inquiries` | GET | ADMIN+ | List with filters |
| `/inquiries/:id` | PATCH | ADMIN+ | Update status |
| `/dashboard/stats` | GET | ADMIN+ | Admin dashboard stats |
| `/dashboard/super-admin-stats` | GET | SUPER_ADMIN | Full analytics |
| `/chatbot/message` | POST | Public | Send chatbot message |
| `/search` | GET | Public | Search across resources |
| `/upload` | POST | ADMIN+ | Upload image to Cloudinary |

---

### **Legacy Endpoints (Backward Compatibility)**

| Endpoint | Description |
|---|---|
| `POST /submit-form` | Career application with resume (Multer + Brevo email) |
| `POST /api/contact` | Contact form submission (Brevo email) |

---

## SLIDE 10 — Security & Authentication

### **Security Architecture**

---

### **Authentication Flow**

```
1. Admin enters credentials → POST /admin/login or /super-admin/login
2. Backend verifies email exists in MongoDB
3. bcryptjs.compare() validates password (12 salt rounds)
4. Server generates:
   - Access Token  (JWT, expires: 1 day)
   - Refresh Token (JWT, expires: 7 days)
5. Tokens sent to frontend → Stored in Redux state
6. RTK Query automatically injects "Authorization: Bearer <token>" on all protected requests
7. verifyJWT middleware validates token on each request
8. authorizeRoles() middleware checks role (ADMIN vs SUPER_ADMIN)
```

---

### **Security Measures**

| Security Layer | Implementation |
|---|---|
| **Password Hashing** | bcryptjs with 12 salt rounds |
| **JWT Dual Token** | Short-lived access token + long-lived refresh token |
| **Role-Based Access** | `authorizeRoles("SUPER_ADMIN")` middleware |
| **HTTP Security Headers** | Helmet.js (XSS, clickjacking, MIME sniffing protection) |
| **CORS Policy** | Whitelist-only origin (configured `corsOptions`) |
| **Rate Limiting** | General: 100 req/15min · Auth: 10 req/15min · Chatbot: 200 req/15min |
| **Input Validation** | express-validator on all POST/PUT routes |
| **Protected Routes** | `ProtectedRoute` component guards all admin navigation |
| **File Upload Validation** | Multer MIME type filter (PDF/DOC/DOCX only, max 5MB) |

---

### **Frontend Route Protection**

```jsx
// ProtectedRoute.jsx — Checks Redux auth state
<Route element={<ProtectedRoute requiredRole="SUPER_ADMIN" />}>
  <Route path="/super-admin/*" element={<SuperAdminDashboard />} />
</Route>
```

- Unauthenticated users → redirected to login page
- Wrong role (Admin accessing Super Admin route) → redirected

---

## SLIDE 11 — AI Chatbot System

### **AI Chatbot — Intelligent Customer Assistant**

---

### **Overview**

DiPharma features an **intent-based NLP chatbot** built entirely without a third-party AI API. The chatbot handles navigation, FAQs, product/service queries, and company information — all from the live MongoDB database.

---

### **Chatbot Architecture**

```
User types message
       ↓
  POST /api/v1/chatbot/message
       ↓
  ┌─────────────────────────────────────────────────┐
  │          chatbotController.js — Logic Pipeline   │
  │                                                  │
  │  Step 1: Greeting detection                      │
  │  Step 2: Navigation intent matching              │
  │          (keywords → route)                      │
  │  Step 3: Phone / Email queries                   │
  │  Step 4: CompanyInfo DB keyword match            │
  │  Step 5: CompanyInfo fuzzy match (score ≥ 2)     │
  │  Step 6: FAQ fuzzy match (score ≥ 2)             │
  │  Step 7: Product keyword match                   │
  │  Step 8: Service keyword match                   │
  │  Step 9: Specific product/service name lookup    │
  │  Step 10: Help / Thank you / Default fallback    │
  └─────────────────────────────────────────────────┘
       ↓
  Returns: { reply, action?, path? }
       ↓
  ChatbotIcon.jsx handles navigation action
  (React Router programmatic navigate)
       ↓
  Interaction logged → ChatbotInteraction collection
```

---

### **Key Chatbot Features**

| Feature | Detail |
|---|---|
| **Greeting Detection** | Handles "hi", "hello", "hey", "good morning", etc. |
| **Navigation Intents** | Voice commands like "go to contact" navigate the page |
| **Appointment Booking** | "book", "appointment", "schedule" → navigates to Contact page |
| **FAQ Answering** | Fuzzy keyword matching on FAQ question words |
| **Product Queries** | Queries live product data from MongoDB |
| **Service Queries** | Queries live service data from MongoDB |
| **Company Info** | Answers from editable CompanyInfo collection |
| **Session Tracking** | SessionID tracked per browser session |
| **Interaction Logging** | All messages stored in `ChatbotInteraction` model |
| **Rate Limited** | 200 requests per 15 minutes |

---

### **Chatbot Rate Limiters**

| Limiter | Window | Limit |
|---|---|---|
| `generalLimiter` | 15 min | 100 req |
| `authLimiter` | 15 min | 10 req |
| `chatbotLimiter` | 15 min | 200 req |

---

## SLIDE 12 — Key Features Summary & Future Scope

### **Complete Feature Summary**

---

### **Public-Facing Features**

| Feature | Description |
|---|---|
| ✅ Responsive Design | Fully mobile-first, works on all screen sizes |
| ✅ Dynamic Products | Fetched from CMS, displayed with dark/light card types |
| ✅ Dynamic Services | Full detail pages with slug-based routing |
| ✅ Career Portal | Job listings + Resume upload + Email acknowledgement |
| ✅ Contact Form | Multi-field form with automated owner + applicant emails |
| ✅ AI Chatbot | 24/7 intelligent assistant with navigation & FAQ support |
| ✅ FAQ Section | Accordion section powered by CMS data |
| ✅ Animated UI | GSAP + Framer Motion powered interactions |

---

### **Admin Panel Features**

| Feature | Description |
|---|---|
| ✅ Secure Login | JWT + bcrypt with role-based access control |
| ✅ CMS (Products, Services, Jobs, FAQs) | Full CRUD with Cloudinary image uploads |
| ✅ Inquiry Management | Track, read, resolve contact form submissions |
| ✅ Application Management | Review, shortlist or reject career applications |
| ✅ Analytics Dashboard | 30-day trend charts + status breakdowns (Recharts) |
| ✅ Admin Management | Super Admin can create/delete admin accounts |
| ✅ Chatbot Knowledge Base | Admin-editable company info entries that feed the chatbot |
| ✅ Email Notifications | Automated Brevo emails for applications and contacts |

---

### **Future Scope**

| Enhancement | Description |
|---|---|
| 🔮 GPT / LLM Integration | Replace rule-based chatbot with OpenAI GPT for natural language |
| 🔮 Product Search & Filter | Client-side search, category filter on products page |
| 🔮 Application Portal | Candidates track own application status via email link |
| 🔮 Push Notifications | Real-time admin alerts for new inquiries/applications |
| 🔮 Analytics Export | Download reports as Excel/PDF from Super Admin dashboard |
| 🔮 Multi-language Support | Tamil / English toggle for wider regional reach |
| 🔮 Appointment Scheduling | Calendar integration for booking consultations |
| 🔮 Audit Logging | Track all admin actions for compliance |

---

### **Project Stats at a Glance**

| Metric | Count |
|---|---|
| Total Frontend Pages | 8 public + 10 admin = **18 pages** |
| Total Frontend Components | **35+ reusable components** |
| Total Backend Routes | **12 route modules** |
| Total API Endpoints | **40+ REST endpoints** |
| Database Models | **9 Mongoose models** |
| Backend Middleware | 5 (auth, rateLimiter, validator, upload, errorHandler) |
| Backend Services | 2 (emailService, excelService) |

---

*DiPharma — Building a smarter pharmaceutical digital presence.*

---
---

# 📣 Detailed Slide-by-Slide Explanation (Presenter Notes)

> Use these notes to understand what each slide covers and what to say when presenting each one.

---

## 🎤 SLIDE 1 — Title Slide: What to Say

**Opening Statement:**
> "Good morning / afternoon everyone. Today I will be presenting my final year project: a full-stack pharmaceutical web application called **DiPharma**, built using the MERN-Lite technology stack — React, Node.js, Express, and MongoDB."

**What this slide covers:**
- The official name of the project and its purpose.
- It is a **real-world web application** simulating the digital platform of a pharmaceutical company called *Diverse Innovation Pharmaceuticals Pvt. Ltd.*
- Version 3.0 indicates this project has gone through multiple development iterations with progressively advanced features.
- The frontend is hosted on **Vercel** and the backend is deployed as a cloud REST API.

**Key point to emphasize:**
> "This is not just a static website — it is a fully functional application with a database, login system, content management, a custom AI chatbot, and role-based admin panels."

---

## 🎤 SLIDE 2 — Project Overview & Objectives: What to Say

**Opening Statement:**
> "Let me now explain what DiPharma actually does and the problems it solves."

**What this slide covers:**
DiPharma digitizes the complete online presence of a pharmaceutical company. It serves **three types of users**:

1. **Public Visitors** — Anyone browsing the website. They can explore the company's services, products, read FAQs, apply for jobs, and contact the company.
2. **Admins (Staff)** — Company employees who log in to manage content — approving job applications, responding to inquiries, updating products and services.
3. **Super Admin (System Owner)** — The highest authority in the system. They manage all admin accounts, view system-wide analytics, and have full control over all data.

**Core objectives to explain:**
- Automate inquiry and job application handling with email notifications.
- Provide a CMS (Content Management System) so a non-technical admin can update the website content without touching code.
- Offer a chatbot so visitors can get instant answers 24/7.
- Implement strong security with role-based access control.

**Key point to emphasize:**
> "The entire system is designed so that once deployed, a company employee can log in and manage everything — from adding new products to reviewing job applicants — without any developer involvement."

---

## 🎤 SLIDE 3 — Technology Stack: What to Say

**Opening Statement:**
> "Now let me walk you through the technologies used to build this application."

**What this slide covers:**
The technology stack is split into **Frontend** and **Backend**.

**Frontend:**
- **React 18** is the core UI library — it allows building reusable components and dynamic interfaces.
- **Vite 5** is the build tool — it makes the development server extremely fast.
- **Redux Toolkit with RTK Query** manages global application state (logged-in admin data, API cache) and handles all API calls with automatic caching and error handling.
- **React Router v6** handles navigation between pages without full page reloads (Single Page Application).
- **Framer Motion and GSAP** add smooth animations and scroll-triggered effects that make the UI feel premium.
- **Recharts** powers the analytics charts on admin dashboards.
- **Vanilla CSS** is used for all styling — no CSS framework like Bootstrap or Tailwind was used, giving full design control.

**Backend:**
- **Node.js + Express 5** is the web server that handles all API requests.
- **MongoDB + Mongoose** is the database — MongoDB stores data as flexible JSON-like documents, and Mongoose provides a structured schema layer.
- **JWT (JSON Web Token)** handles authentication — admin login generates tokens that are sent with every API request.
- **bcryptjs** securely hashes passwords before storing them in the database.
- **Multer** handles file uploads (PDF resumes from job applications).
- **Cloudinary** stores all product and service images in the cloud.
- **Brevo (formerly Sendinblue)** sends automated transactional emails — confirmation emails to applicants, notification emails to the company.
- **Helmet** adds security headers to protect against common web attacks.

**Key point to emphasize:**
> "Every technology was chosen deliberately — for example, RTK Query reduces boilerplate API code by 60%, and Cloudinary removes the need to manage image storage on the server itself."

---

## 🎤 SLIDE 4 — System Architecture: What to Say

**Opening Statement:**
> "Let me now explain how all these technologies connect together — the overall system architecture."

**What this slide covers:**
The diagram shows a **3-layer architecture**:

**Layer 1 — Browser (Client)**
- The user's browser runs the React application.
- It has two interfaces: the **Public UI** (for website visitors) and the **Admin/Super Admin Dashboard** (for staff).
- All API requests are made via RTK Query (for modern endpoints) and Axios (for legacy form endpoints).

**Layer 2 — Backend (Express.js Server)**
- Every request first passes through **Helmet** (security headers) and **CORS** (controls which origins can access the API).
- Then it goes through **rate limiting** (prevents API abuse) and **input validation** (sanitizes request data).
- Authenticated routes pass through **JWT middleware** which verifies the token and identifies the user's role.
- Then the request reaches the appropriate **Route Handler** (e.g., `/services`, `/products`, `/chatbot`).

**Layer 3 — Data & Services**
- **MongoDB** stores all application data (services, products, jobs, users, etc.).
- **Cloudinary** stores uploaded images.
- **Brevo SMTP** sends emails when a form is submitted.

**Data Flow to explain:**
1. A visitor fills the contact form → React sends a POST request to `/api/contact`.
2. The backend validates the data, saves it to MongoDB, and uses Brevo to send an email to the company owner and a confirmation email to the visitor.
3. The Admin logs in, sees the new inquiry in their dashboard, and marks it as resolved.

**Key point to emphasize:**
> "The separation of concerns here is very clean — the frontend only knows about the API, the backend only knows about the database. This makes the application scalable and maintainable."

---

## 🎤 SLIDE 5 — Frontend Architecture & Public Pages: What to Say

**Opening Statement:**
> "Now let me go deeper into the frontend structure — how the application is organized and what pages are available."

**What this slide covers:**

**Three-Layout Architecture:**
The app uses three completely separate layouts:
- **PublicLayout** — Wraps all visitor-facing pages. Includes the header (navbar), footer, and the floating chatbot icon.
- **AdminLayout** — Wraps all admin pages. Has a sidebar navigation, different styling.
- **SuperAdminLayout** — Similar to AdminLayout but with extended menu options for super-admin-only features.

This layout system ensures that visiting `/admin/products` never accidentally shows the public navbar/footer, and vice versa.

**Public Pages to explain:**
- **Home Page (`/`)** — The landing page with a hero section, animated service cards, product showcase, partner logos strip, FAQ accordion, and a contact call-to-action.
- **Services Page (`/services`)** — Shows all company services fetched from the database with animated cards. Clicking a card navigates to the detail page.
- **Service Detail Page (`/services/:slug`)** — A full-page breakdown of a single service — hero image, features list, benefits, and an overview section.
- **Products Page (`/products`)** — Displays all active products from the CMS with dark/light themed cards.
- **Career Page (`/career`)** — Lists open job positions and includes a form to upload a resume and apply.
- **Contact Page (`/contact`)** — A contact form with fields for name, email, phone, subject, and message. Triggers email via Brevo on submission.

**Key Components:**
- **ChatbotIcon** — A floating button on all public pages that opens the AI chatbot.
- **Partners** — An auto-scrolling marquee of partner company logos.
- **FlightTimeline & IsometricNetwork** — Custom animated SVG/canvas components that visually represent the company's reach and network.

**Key point to emphasize:**
> "All pages are fully responsive — they work correctly on mobile, tablet, and desktop screens. The mobile layout uses dedicated stacked or column-based designs with the same CSS media queries."

---

## 🎤 SLIDE 6 — Admin Dashboard & CMS: What to Say

**Opening Statement:**
> "Let me now explain the Admin Panel — the internal control interface for company staff."

**What this slide covers:**

**Authentication:**
- Admins navigate to `/admin/login`, enter their email and password.
- The backend verifies the password using bcrypt, then returns a JWT access and refresh token.
- These tokens are stored in Redux state. Every subsequent API request automatically includes the token in the header.
- A `ProtectedRoute` component in React checks the Redux state — if there's no valid token, the user is redirected to login.

**Admin Dashboard:**
The dashboard is the first thing an admin sees after logging in. It displays:
- Real-time counts of job applications (total and pending), contact inquiries (total and unread), active job listings, and content counts.
- A **30-day trend chart** (built with Recharts) showing how many inquiries and applications were received each day over the past month.
- This gives the admin a clear picture of the company's activity without opening individual records.

**CMS Modules — explain each:**
- **Products** — Admin can add new products (with image upload to Cloudinary), edit existing ones, or delete them. All changes appear on the public Products page immediately.
- **Services** — Similar to Products but more complex — each service has a slug (URL), a short description, a full description, features, benefits, and multiple images.
- **Jobs** — Admin can post new roles, mark them active/inactive, and delete old positions.
- **Applications** — When a visitor applies for a job, the submission appears here. Admin can view the resume, change the status (pending → shortlisted → rejected).
- **Inquiries** — All contact form submissions appear here. Admin can mark them as read or resolved.
- **FAQs** — Admin can add/edit/delete FAQ entries that appear on the public FAQ section.
- **Company Info** — This is the chatbot's knowledge base. Admin can add entries with keywords so the chatbot can answer specific questions about the company.

**Key point to emphasize:**
> "The entire website content — every product, every service, every job listing — is controlled through this admin panel. A non-technical manager can update the website simply by logging in and using forms, exactly like using a word processor."

---

## 🎤 SLIDE 7 — Super Admin Dashboard: What to Say

**Opening Statement:**
> "Above the Admin level, there is a Super Admin — the system owner with full control over everything."

**What this slide covers:**

**Who is the Super Admin?**
- The Super Admin account is created directly in the database (or added during initial setup). It cannot be deleted by anyone, including other Super Admins.
- There is only one Super Admin role in this system.

**Exclusive Capabilities:**
1. **Manage Admins** — The Super Admin can create new staff admin accounts. When a new admin is created, the system automatically sends them a welcome email with their login credentials via Brevo.
2. **Platform-wide Analytics** — The Super Admin dashboard shows comprehensive statistics across the entire system.
3. **Full CMS Access** — Complete access to all the same CMS modules as Admin, plus additional visibility.

**Analytics Dashboard — explain each chart:**
- **Doughnut Charts** — Show the breakdown of inquiry statuses (unread/read/resolved) and application statuses (pending/shortlisted/rejected). This helps management understand operational bottleneck.
- **30-day Line Charts** — Show inquiry, application, and chatbot interaction trends over time. Useful for identifying peak activity periods.
- **Top Application Roles Bar Chart** — Shows which job positions receive the most applications. Useful for HR planning.
- **Recent Activity Tables** — Last 10 inquiries and last 10 applications with key details visible at a glance.

**Key point to emphasize:**
> "This dashboard gives the company leadership a bird's-eye view of the entire digital operation — they don't need to read individual records. The charts immediately tell them whether activity is increasing or decreasing."

---

## 🎤 SLIDE 8 — Database Design: What to Say

**Opening Statement:**
> "Let me now explain how data is organized in the database — the MongoDB schema models."

**What this slide covers:**
The application uses **9 Mongoose models** (database tables/collections).

**Admin Model:**
- Stores admin credentials. The password is never stored as plain text — it is hashed using bcrypt with 12 salt rounds.
- A `displayPassword` field stores the plain text version solely for the Super Admin to view when managing accounts — this is an internal business requirement.
- The model has methods: `comparePassword()` for login verification, `generateAccessToken()` and `generateRefreshToken()` for JWT creation.

**Product Model:**
- Stores product details including images (stored as Cloudinary URLs, not as actual file data in the database).
- `cardType` determines whether the card appears with a dark or light background on the public Products page.
- `order` allows admin to control the display sequence of products.

**Service Model:**
- The most complex model. It stores multiple images (hero, overview, feature, two benefit images), a slug for URL routing, a short description (shown on listing pages), and a full description (shown on the detail page).
- `features` and `benefits` are arrays of objects, each having a title and description — displayed as feature/benefit cards on the Service Detail page.

**Other Models:**
- **Job** — Stores job postings with type (Full-time, Part-time, Contract, Internship) and active status.
- **Application** — Stores each job application with the resume file path (hosted on the server or cloud) and a status field that progresses through a lifecycle.
- **Inquiry** — Every contact form submission. Status tracks whether the company has seen and responded to it.
- **FAQ** — Simple question-answer pairs with `isActive` to control visibility.
- **CompanyInfo** — The chatbot knowledge base. Each entry has `keywords` (an array of strings) that the chatbot matches against user messages.
- **ChatbotInteraction** — Logs every message sent to the chatbot, linked by a session ID. Used for analytics by the Super Admin.

**Key point to emphasize:**
> "The use of MongoDB was a deliberate choice — the flexible document structure is perfect for models like Service that have variable-length arrays (features, benefits) and multiple optional image fields. A rigid relational schema would be less suitable here."

---

## 🎤 SLIDE 9 — Backend API Architecture: What to Say

**Opening Statement:**
> "Now let me explain how the backend API is structured — the endpoints that the frontend communicates with."

**What this slide covers:**
The API follows **REST architecture** with all endpoints under the base path `/api/v1`.

**Authentication Routes:**
- `POST /admin/login` — Takes email + password, returns JWT tokens if valid.
- `POST /auth/refresh` — Takes the refresh token, returns a new access token when the old one expires. This keeps the admin logged in without requiring re-login every hour.
- `GET /auth/me` — Returns the currently logged-in admin's profile using the JWT token.
- Super Admin routes for creating and deleting admin accounts are strictly protected.

**Content Routes (Public):**
- All content (products, services, jobs, FAQs, company info) has public GET endpoints — any visitor can fetch this data.
- POST, PUT, DELETE operations on these endpoints require an admin JWT token.

**Operational Routes:**
- `GET /applications` — Returns job applications. Admins use this to see who has applied.
- `PATCH /applications/:id` — Updates the status of a specific application (e.g., from pending to shortlisted).
- Same pattern for inquiries.
- `GET /dashboard/stats` — Returns all the data needed for the Admin dashboard charts and counts.
- `GET /dashboard/super-admin-stats` — Returns the more detailed analytics data for the Super Admin dashboard.
- `POST /chatbot/message` — Receives the user's message and returns the chatbot's reply.
- `GET /search` — A cross-collection search endpoint that looks through products, services, and FAQs simultaneously.

**Legacy Endpoints:**
- The application also maintains two older form submission endpoints (`/submit-form`, `/api/contact`) for backward compatibility with earlier implementations that used Axios directly.

**Key point to emphasize:**
> "The API is designed with separation of public and protected routes. Anyone can read content, but only authenticated admins can modify it. This is a fundamental principle of secure API design called the principle of least privilege."

---

## 🎤 SLIDE 10 — Security & Authentication: What to Say

**Opening Statement:**
> "Security is a critical aspect of any web application. Let me explain all the layers of protection built into DiPharma."

**What this slide covers:**

**Authentication Flow (step by step):**
1. The admin submits their email and password via the login form.
2. The backend finds the admin record in MongoDB by email.
3. `bcryptjs.compare()` checks if the submitted password matches the stored hash. If not, login is refused.
4. On success, the server creates two tokens:
   - **Access Token** (expires in 1 day) — sent with every API request.
   - **Refresh Token** (expires in 7 days) — used to silently renew the access token when it expires.
5. Both tokens are stored in Redux state. RTK Query automatically attaches the access token to all API headers.
6. Every protected API request passes through `verifyJWT` middleware which decodes and validates the token.
7. `authorizeRoles()` middleware additionally checks whether the user's role matches what the route requires.

**Security Measures to explain:**
- **bcrypt with 12 salt rounds** — Even if the database is compromised, cracking any password would take computationally infeasible time.
- **JWT Dual Token system** — Short-lived access tokens limit exposure; refresh tokens allow seamless re-authentication.
- **Helmet.js** — Automatically adds HTTP response headers that protect against XSS (cross-site scripting), clickjacking, and MIME sniffing.
- **CORS** — Only the configured frontend origin can make API requests. If someone tries to call the API from an unauthorized domain, the browser blocks it.
- **Rate Limiting** — Prevents brute force attacks. The login endpoint allows only 10 requests per 15 minutes. The chatbot allows 200 (higher for UX). General API allows 100.
- **express-validator** — Validates and sanitizes all incoming POST/PUT data. For example, it ensures that an email field actually contains a valid email address before the controller even runs.
- **Multer file type filter** — When users upload resumes, only PDF, DOC, and DOCX files under 5MB are accepted. Malicious file types are rejected.
- **ProtectedRoute** — A React component that wraps all admin routes, redirecting unauthenticated users to the login page.

**Key point to emphasize:**
> "Security was implemented at every layer — in the browser, in the API middleware, in the database model, and in file upload handling. This is called defense-in-depth."

---

## 🎤 SLIDE 11 — AI Chatbot System: What to Say

**Opening Statement:**
> "One of the most distinctive features of DiPharma is its custom-built AI chatbot. Let me explain how it works internally."

**What this slide covers:**

**What kind of AI is it?**
This is not a GPT or LLM-based chatbot — it is a **rule-based intent recognition system** built entirely in Node.js without any paid AI API. This was a deliberate design decision to make the chatbot free to run and fully controllable.

**How it works — 10-step pipeline:**

When a user types a message, it is sent to `POST /api/v1/chatbot/message`. The `chatbotController.js` processes it through 10 decision steps in sequence:

1. **Greeting Detection** — Checks if the message contains words like "hi", "hello", "hey", "good morning". If yes, responds with a welcome message. Stops here.
2. **Navigation Intent** — Checks for keywords like "go to services", "show products", "open contact". If matched, the response includes a `path` property that triggers React Router navigation on the frontend.
3. **Phone/Email Queries** — Checks for "phone number", "email", "call you". Fetches contact details from `CompanyInfo`.
4. **CompanyInfo Exact Keyword Match** — Compares the user's message words against the `keywords` array of every active `CompanyInfo` document. If all keywords of an entry exist in the message, it's a strong match.
5. **CompanyInfo Fuzzy Match (score ≥ 2)** — Even if not all keywords match, if 2 or more keywords match, it's considered a fuzzy match and responds.
6. **FAQ Fuzzy Match** — Similar scoring but against the FAQ collection's question words.
7. **Product Keyword Match** — Checks if the message contains the word "product" or related terms, then returns a product listing.
8. **Service Keyword Match** — Checks for "service" context, returns services list.
9. **Specific Product/Service Name Lookup** — If the user types an exact or partial name of a product or service, it looks it up and returns details.
10. **Help / Thank You / Default Fallback** — If none of the above matched, responds with a polite default message and a suggestion to contact the team.

**Key features:**
- **Navigation actions** — The chatbot can tell the frontend to navigate to a specific page. The `ChatbotIcon.jsx` component reads the `action` and `path` from the response and calls `useNavigate()`.
- **Session ID tracking** — Each browser session gets a unique ID, so all messages from the same visit are grouped.
- **Interaction Logging** — Every message exchange is saved to the `ChatbotInteraction` MongoDB collection, which feeds the Super Admin analytics chart.
- **Live Database Queries** — The chatbot reads live data from MongoDB. If an admin adds a new product, the chatbot can immediately answer questions about it — no redeployment needed.

**Key point to emphasize:**
> "The chatbot's strength is that it is **content-aware** — it reads the same database that the admin manages. The admin doesn't need to train a model or update code — just adding a CompanyInfo entry is enough to teach the chatbot a new fact."

---

## 🎤 SLIDE 12 — Key Features Summary & Future Scope: What to Say

**Opening Statement:**
> "Let me now consolidate everything we've covered and look at the complete feature list and where this project can go next."

**What this slide covers:**

**Public-Facing Features:**
- **Fully Responsive Design** — The entire website adapts to any screen size. Mobile users see a stacked/compact layout, tablet users see a 2-column grid, desktop users see the full design.
- **Dynamic Content** — Unlike a static website, all products, services, and FAQs come from the database. The homepage updates automatically when the admin adds new content.
- **Career Portal** — Visitors can browse open positions and submit their resume directly through the website. The system emails both the applicant (confirmation) and the company (notification).
- **AI Chatbot** — A 24/7 assistant that handles common questions, guides navigation, and is constantly learning through the CompanyInfo CMS.
- **Animated UI** — GSAP scroll-triggered animations and Framer Motion page transitions make the user experience feel polished and modern.

**Admin Panel Features:**
- **Full CMS** — Products, Services, Jobs, FAQs — all manageable without code.
- **Inquiry & Application Management** — A centralized inbox for all submissions with status tracking.
- **Analytics Dashboards** — Both Admin and Super Admin have rich chart-based dashboards.
- **Email Automation** — Brevo handles all transactional emails automatically.

**Project Statistics to mention:**
- **18 total pages** (8 public + 10 admin)
- **35+ reusable React components**
- **40+ REST API endpoints**
- **9 database models**
- **12 backend route modules**

**Future Scope — explain each:**
1. **GPT/LLM Integration** — Replace the rule-based chatbot with OpenAI GPT. The chatbot would understand natural language, context, and multi-turn conversations.
2. **Product Search & Filter** — Add a real-time search bar and category filter on the Products page.
3. **Application Tracking Portal** — Candidates could receive a unique link to track their application status without logging into the admin panel.
4. **Push Notifications** — Real-time browser notifications for admins when a new inquiry or application arrives.
5. **Analytics Export** — Allow Super Admin to download charts and data as Excel or PDF reports.
6. **Multi-language Support** — Add Tamil/English toggle, especially important for the local pharmaceutical market.
7. **Appointment Scheduling** — Integrate a calendar system so visitors can book consultations directly through the website.
8. **Audit Logging** — Record every admin action (e.g., "Admin X deleted Product Y at 3:00pm") for compliance and accountability.

**Closing Statement:**
> "In conclusion, DiPharma is a production-grade, full-stack pharmaceutical web platform. It demonstrates real-world backend security, content management, analytics, and conversational AI — all integrated into a single cohesive application. Thank you."

---

*End of Slide Explanations*
