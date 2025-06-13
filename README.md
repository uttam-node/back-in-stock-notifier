# 🛒 Back-in-Stock Notification System

A backend system to allow users to subscribe to out-of-stock products and receive email notifications when stock is updated.

## 🚀 Features

- RESTful API with Express.js
- PostgreSQL database
- Redis + BullMQ job queue
- Nodemailer for email notifications
- Swagger API docs
- Clean modular code with controllers/models
- Background job every 5 minutes
- Logs each email notification

## 🧱 API Overview

- `POST /api/users` – Create a user
- `POST /api/products` – Add a product
- `PUT /api/products/:id/stock` – Update stock
- `POST /api/subscribe` – Subscribe to a product
- `GET /api/products` – List products (pagination, search)
- `GET /api-docs` – Swagger documentation

## 🗂️ Project Structure

```
src/
  controllers/
  models/
  routes/
  jobs/
  services/
  db.js
.env.example
```

## 🧪 Setup Instructions

### 1. Clone the Repo

```bash
git clone <your-repo-url>
cd back-in-stock-notifier
```

### 2. Configure .env

```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=backstock
DB_PORT=5432
EMAIL_USER=your_ethereal_email
EMAIL_PASS=your_ethereal_password
REDIS_URL=redis://localhost:6379
```

### 3. Run DB Script

```bash
psql -U postgres -d backstock -f db_dump.sql
```

### 4. Start Redis

```bash
redis-server
```

### 5. Install & Start Project

```bash
npm install
npm start
```

## 📬 Email Demo

Uses [Ethereal](https://ethereal.email/) for fake SMTP.

---

By Uttam Kumar
