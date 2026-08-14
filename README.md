# 📦 LogiCore Enterprise Supply Chain Management (SCM) Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

</div>

---

## 📖 Platform Overview

**LogiCore Enterprise SCM** is a high-performance, multi-tenant Supply Chain Management and Freight Logistics platform engineered for modern 3PL networks, multi-warehouse operators, and global commerce enterprises.

Built with a **decoupled micro-architecture**, LogiCore combines a lightning-fast **Next.js 16 (App Router)** and **React 19** frontend with a robust, production-ready **Laravel 11 PHP REST API** backend powered by persistent **PostgreSQL** storage and Laravel Sanctum token security.

From multi-location inventory synchronization and live carrier dispatch tracking to automated purchase order bidding engines and Supreme Admin escalation oversight, LogiCore delivers enterprise-grade operational control with a cinematic SaaS user experience.

---

## ✨ Core Features & Enterprise Capability

### 🏢 3-Tier Multi-Tenant Role-Based Access Control (RBAC)
- **Customer Tenant Dashboard:** Provision module subscriptions, track global parcel freight, manage organization team members, inspect billing invoices, and configure webhook integrations.
- **Admin Dashboard:** Real-time order dispatch approvals, warehouse inventory tracking, shipment route monitoring, and multi-channel customer support ticket resolution.
- **Supreme Admin Control Center:** Full enterprise oversight. System health telemetry monitoring, financial MRR analytics, cross-tenant audit logging, dynamic catalog module management, and escalation handling.

### ⚡ Power Features & Modern UX
- **Global Command Palette (`⌘K` / `Ctrl+K`):** Instant keyboard-first navigation and search across all enterprise modules, catalog items, freight parcels, and support queues.
- **Cinematic Framer Motion UI:** Dynamic scroll reveals, interactive ROI cost savings calculators, animated tab transitions, and subtle hover micro-interactions.
- **Rate-Limited API Defense:** Strict brute-force protection (`throttle:auth` 10 req/min), freight parcel rate limits (`throttle:tracking`), and authenticated API rate limiting (`throttle:api`).
- **Data Persistence & Audit Logging:** Comprehensive PostgreSQL schema backing `audit_logs`, `inventories`, `shipments`, `support_tickets`, `api_keys`, `webhooks`, `invoices`, and `customer_modules`.

---

## 🛠️ Technical Architecture & Stack

```text
┌─────────────────────────────────────────────────────────┐
│              Next.js 16 (App Router)                    │
│   React 19 • Tailwind CSS v4 • Framer Motion • TS      │
└────────────────────────────┬────────────────────────────┘
                             │ REST API (Bearer / Sanctum)
┌────────────────────────────▼────────────────────────────┐
│                  Laravel 11 PHP API                     │
│  Eloquent ORM • Rate Limiting • Middleware Role Guards  │
└────────────────────────────┬────────────────────────────┘
                             │ PostgreSQL Socket / TCP
┌────────────────────────────▼────────────────────────────┐
│                PostgreSQL 16 Database                   │
│   Users • Inventories • Shipments • Audits • Invoices   │
└─────────────────────────────────────────────────────────┘
```

### Frontend (`/web`)
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS v4 & Lucide Icons
- **Animation:** Framer Motion v13
- **Language:** TypeScript

### Backend (`/backend`)
- **Framework:** Laravel 11 PHP
- **Database:** PostgreSQL 16 (supported via standard or single `DATABASE_URL` string)
- **Authentication:** Laravel Sanctum Token & Stateful Cookies
- **ORM & Migrations:** Eloquent ORM with full relational models

---

## 📂 Repository Structure

```text
Supply-Chain-Management-System-main/
├── backend/                      # Production Laravel 11 REST API Engine
│   ├── app/
│   │   ├── Http/Controllers/Api/ # Dashboard, Auth, Order & Supreme Controllers
│   │   ├── Models/               # Eloquent DB Models (Shipment, Inventory, AuditLog, etc.)
│   │   └── Providers/            # RateLimiter & App Service Providers
│   ├── database/
│   │   ├── migrations/           # PostgreSQL Migrations
│   │   └── seeders/              # Database Seeders (Supreme Admin Initialization)
│   ├── routes/
│   │   └── api.php               # Rate-limited REST API Endpoints
│   └── .env.example              # Laravel Environment Template
│
├── web/                          # Next.js 16 Enterprise Frontend
│   ├── src/
│   │   ├── app/                  # App Router Pages ((public), (tenant), (supreme))
│   │   ├── components/           # Command Palette & Motion Primitives
│   │   └── lib/                  # Axios/Fetch API Clients
│   └── vercel.json               # Vercel Deployment Configuration
│
└── README.md                     # Project Documentation
```

---

## 🚀 Quickstart Local Development Guide

### 1. Backend Setup (Laravel API)

```bash
cd backend
composer install

# Copy environment config
cp .env.example .env

# Generate application encryption key
php artisan key:generate

# Configure database in .env (or DATABASE_URL)
# DB_CONNECTION=pgsql
# DATABASE_URL=postgres://user:password@127.0.0.1:5432/scm_db

# Execute migrations and seed initial Supreme Admin user
php artisan migrate --force
php artisan db:seed --force

# Start local API server
php artisan serve --port=8000
```

### 2. Frontend Setup (Next.js Web App)

```bash
cd ../web
npm install

# Start development server
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the LogiCore application platform.

---

## 🌐 Production Deployment

### Deploying Frontend to Vercel
1. Import the `/web` directory in [Vercel](https://vercel.com).
2. Set Environment Variable:
   `NEXT_PUBLIC_API_URL=https://your-laravel-api-domain.com/api/v1`
3. Click **Deploy**.

### Deploying Backend
Deploy the `/backend` directory to **Render**, **Railway**, **Fly.io**, or any VPS with PostgreSQL:
```ini
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=pgsql
DATABASE_URL=postgres://user:password@host:5432/scm_db
SANCTUM_STATEFUL_DOMAINS=your-app.vercel.app,localhost:3000
```

---

## 📝 License

This project is open-source software licensed under the MIT License.
# LogiCore
