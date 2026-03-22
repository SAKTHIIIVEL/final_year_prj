# 🤖 DiPharma Chatbot — Complete Guide

## How the Chatbot Works

The chatbot uses a **rule-based matching system** (no external AI API). When a user sends a message, the backend (`chatbotController.js`) checks it against these layers **in order**:

```
1.  Greeting check         →  "hi", "hello", "hey" etc.
2.  Navigation intents     →  "go to contact", "show services" etc.
3a. Company phone/email    →  "phone number", "email" etc. (hardcoded COMPANY_INFO)
3b. Company Info DB        →  Queries the CompanyInfo collection (admin-managed)
4.  FAQ matching           →  Fuzzy-matches against FAQ records (shown on public site)
5.  Product matching       →  Matches against Product records in MongoDB
6.  Service matching       →  Matches against Service records in MongoDB
7.  Help / Thank you       →  "help", "thanks" etc.
8.  Default fallback       →  Generic "I don't know" reply
```

> **Step 3b fires before FAQs.** Company Info answers have priority over the public FAQ section.

---

## 📌 How to Feed Company Details to the Chatbot

### ✅ Method 1 — Admin Panel: Company Info Page *(Recommended)*

This is a **dedicated section** for chatbot-only company data. It does **not** appear in the public FAQ section on the website.

**Steps:**
1. Log in as **Admin** or **Super Admin**
2. Click **🤖 Company Info** in the left sidebar
3. Click **+ Add Entry** and fill in:

| Field | Description | Example |
|---|---|---|
| **Category** | Group for organization | `Contact`, `About`, `Certifications` |
| **Question** | The topic/question this answers | `Where is DiPharma located?` |
| **Keywords** | Comma-separated trigger words | `address, location, where are you, head office` |
| **Answer** | The exact chatbot response | `Our HQ is at 123 Pharma Street, Chennai.` |
| **Status** | Toggle Active/Inactive | `Active` |

**How matching works:**
- **Keyword match (first):** If the user's message contains any keyword → answer is returned instantly
- **Fuzzy match (fallback):** If no keyword matches, the chatbot scores the user's message against the *Question* text — if score ≥ 2, the answer is returned

**Example entries to add:**

| Question | Keywords | Answer |
|---|---|---|
| Where is DiPharma located? | `address, location, where are you, office` | Our headquarters is at 123 Pharma Street, Chennai, Tamil Nadu - 600001. |
| When was DiPharma founded? | `founded, established, since, history, year` | DiPharma was established in 2010 with a mission to make quality healthcare accessible. |
| Who is the CEO of DiPharma? | `ceo, founder, who runs, leadership, director` | DiPharma is led by Mr. Sakthivel, who founded the company in 2010. |
| Does DiPharma export products? | `export, international, global, countries` | Yes, DiPharma exports pharmaceutical products to over 15 countries across Asia and Africa. |
| What certifications does DiPharma have? | `certified, certification, iso, gmp, standards` | DiPharma is ISO 9001:2015 certified and follows WHO-GMP manufacturing standards. |
| How can I partner with DiPharma? | `partner, partnership, collaborate, distributor` | Contact our partnerships team at sssakthivel928@gmail.com or call +91-9677787817. |

---

### ✅ Method 2 — Edit Hardcoded `COMPANY_INFO` (For Core Contact Details)

**File:** `DiPharma_backend/src/controllers/chatbotController.js` — lines 20–25

```js
const COMPANY_INFO = {
  phone: "+91-9677787817",
  email: "sssakthivel928@gmail.com",
  name: "DiPharma",
  description: "DiPharma is a pharmaceutical company providing quality healthcare products and services.",
};
```

This is triggered by:
- `"phone"` / `"call"` / `"number"` → returns `COMPANY_INFO.phone`
- `"email"` / `"mail"` → returns `COMPANY_INFO.email`

Update these values directly when core contact details change.

---

### ⚠️ Method 3 — Use Public FAQs (NOT recommended for company-only data)

The chatbot also queries the **public FAQ collection**, but FAQs appear on the public website FAQ section. Use FAQs only for generic Q&A that you want visible to all users on the website.

---

## 📂 Files Involved in the Chatbot

| File | Purpose |
|---|---|
| `backend/src/controllers/chatbotController.js` | Main chatbot logic — all 8 matching steps |
| `backend/src/models/CompanyInfo.js` | **NEW** — Dedicated MongoDB model for chatbot company data |
| `backend/src/controllers/companyInfoController.js` | **NEW** — CRUD controller for CompanyInfo |
| `backend/src/routes/companyInfoRoutes.js` | **NEW** — CRUD routes at `/api/v1/company-info` |
| `backend/src/routes/chatbotRoutes.js` | POST `/api/v1/chatbot/message` with `chatbotLimiter` |
| `backend/src/models/ChatbotInteraction.js` | Logs every conversation to MongoDB |
| `backend/src/config/cors.js` | CORS — allows `x-session-id`, `Authorization`, `Content-Type` |
| `backend/src/middleware/rateLimiter.js` | `chatbotLimiter` — 200 req / 15 min (vs global 100) |
| `frontend/src/components/ChatbotIcon.jsx` | Chat UI — floating 🤖 button, message window, voice input |
| `frontend/src/pages/admin/AdminCompanyInfo.jsx` | **NEW** — Admin page for managing Company Info entries |
| `frontend/src/store/api.js` | RTK Query: `sendChatMessage`, `getCompanyInfo`, and CRUD hooks |
| `frontend/src/components/layouts/AdminLayout.jsx` | 🤖 Company Info nav item added |
| `frontend/src/components/layouts/SuperAdminLayout.jsx` | 🤖 Company Info nav item added |

---

## 🚀 Quick Reference — Chatbot Keywords

| User Says... | Bot Does... |
|---|---|
| "hi" / "hello" / "hey" | Greeting with feature overview |
| "phone" / "call" / "number" | Returns phone from `COMPANY_INFO` |
| "email" / "mail" | Returns email from `COMPANY_INFO` |
| Any keyword from CompanyInfo | Returns that entry's **Answer** from DB |
| "contact" / "appointment" / "book" | Navigates to `/contact` |
| "services" / "show services" | Lists services from DB + navigates |
| "products" / "medicine" | Lists products from DB + navigates |
| "about" / "who are you" | Navigates to `/about` |
| "career" / "jobs" / "apply" | Navigates to `/career` |
| "home" / "go home" | Navigates to `/` |
| "help" | Lists all chatbot capabilities |
| "thank" / "thanks" | Appreciation reply |
| Any other query | Fuzzy-matches CompanyInfo → FAQs → Products → Services |

---

## 🔄 Matching Priority (Full Order)

```
Greetings
  ↓
Navigation keywords (contact, services, about…)
  ↓
Phone / Email (hardcoded)
  ↓
CompanyInfo keyword match  ← ADMIN PANEL (🤖 Company Info)
  ↓
CompanyInfo fuzzy match    ← ADMIN PANEL (🤖 Company Info)
  ↓
FAQ fuzzy match            ← ADMIN PANEL (FAQs) — also visible on website
  ↓
Product name match         ← Auto-pulled from Products DB
  ↓
Service name match         ← Auto-pulled from Services DB
  ↓
Help / Thank you
  ↓
Default fallback
```
