# 📝 Sticky Notes API

A lightweight RESTful API for managing users and their sticky notes, built with **Node.js**, **Express 5**, and **MongoDB (Mongoose)**. It supports user signup/login, full CRUD on notes, pagination, content search, and aggregation-based lookups.

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the App](#-running-the-app)
- [API Reference](#-api-reference)
  - [User Endpoints](#user-endpoints)
  - [Note Endpoints](#note-endpoints)
- [Data Models](#-data-models)
- [Error Handling](#-error-handling)
- [Notes & Known Limitations](#-notes--known-limitations)
- [License](#-license)

---

## ✨ Features

- **User management** — signup, login, update, delete, and lookup by ID
- **Note management** — create, update (partial), replace (full), and delete notes
- **Ownership checks** — a note can only be modified or deleted by its owner
- **Pagination & sorting** — fetch a user's notes page by page, newest first
- **Search** — find notes by exact content match
- **Aggregation** — look up notes together with their owner's info via MongoDB `$lookup`
- **Environment-based configuration** — separate `.env` files for development and production
- **Centralized error handling** via Express middleware

---

## 🛠 Tech Stack

| Layer          | Technology                  |
|----------------|------------------------------|
| Runtime        | Node.js (ESM / `type: module`) |
| Web Framework  | [Express 5](https://expressjs.com/) |
| Database       | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) |
| Config         | [dotenv](https://www.npmjs.com/package/dotenv) + [cross-env](https://www.npmjs.com/package/cross-env) |

---

## 📁 Project Structure

```
sticky-notes-api/
├── config/
│   ├── config.service.js        # Loads env vars based on NODE_ENV
│   ├── .env.development         # Dev environment variables (gitignored)
│   └── .env.production          # Prod environment variables (gitignored)
├── src/
│   ├── main.js                  # App entry point
│   ├── DB/
│   │   ├── connection.db.js     # MongoDB connection logic
│   │   └── model/
│   │       ├── user.model.js
│   │       └── note.model.js
│   ├── middleware/
│   │   └── error.middleware.js  # Global error handler
│   ├── modules/
│   │   ├── user/
│   │   │   ├── user.controller.js
│   │   │   └── user.service.js
│   │   └── note/
│   │       ├── note.controller.js
│   │       └── note.service.js
│   └── common/
│       ├── enum/
│       │   └── user.enum.js
│       └── utils/
│           └── response/
│               └── success.response.js
├── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended, since the project uses native ESM and `node --watch-path`)
- A MongoDB connection string (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
git clone https://github.com/Eslam-Alaa-ElDeen/sticky-notes-api.git
cd sticky-notes-api
npm install
```

---

## 🔐 Environment Variables

Configuration is loaded per environment from the `config/` folder, based on `NODE_ENV`:

| File                        | Used when                      |
|-----------------------------|---------------------------------|
| `config/.env.development`   | `NODE_ENV=development`          |
| `config/.env.production`    | `NODE_ENV=production`           |

Each file should define:

```env
PORT=3000
DB_URI="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>"
```

> ⚠️ **Security note:** these files are already listed in `.gitignore` and should **never** be committed. If credentials are ever exposed (e.g. shared, pasted publicly, or pushed by mistake), rotate the database password immediately in your MongoDB provider's dashboard.

---

## ▶️ Running the App

```bash
# Development (auto-restarts on file changes)
npm run start:dev

# Production
npm run start:prod
```

By default the server listens on the `PORT` defined in your active `.env` file (falls back to `7000` if unset). On startup you should see:

```
DB connected successfully 💯
sticky_note app listening on port 3000!
```

---

## 📡 API Reference

Base URL: `http://localhost:<PORT>`

All responses follow this shape:

```json
{
  "status": 200,
  "message": "description of the result",
  "data": { }
}
```

### User Endpoints

Base path: `/user`

| Method | Endpoint        | Description                | Body / Query |
|--------|-----------------|-----------------------------|--------------|
| POST   | `/user/signup`  | Register a new user         | Body: `name`, `email`, `password`, `phone`, `age` |
| POST   | `/user/login`   | Log in with credentials     | Body: `email`, `password` |
| GET    | `/user`         | Get a user by ID            | Query: `id` |
| PATCH  | `/user/:id`     | Update a user's fields      | Params: `id` · Body: any updatable field (e.g. `email`, `phone`, `age`) |
| DELETE | `/user/:id`     | Delete a user               | Params: `id` |

**Example — Signup**

```bash
curl -X POST http://localhost:3000/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Eslam",
    "email": "eslam@example.com",
    "password": "securePass123",
    "phone": "01000000000",
    "age": 25
  }'
```

### Note Endpoints

Base path: `/note`

| Method | Endpoint                     | Description                                         | Body / Query |
|--------|-------------------------------|------------------------------------------------------|--------------|
| POST   | `/note`                       | Create a note for a user                              | Query: `id` (owner's user ID) · Body: `title`, `content` |
| PATCH  | `/note/update/:noteId`        | Partially update a note's title/content               | Params: `noteId` · Query: `userId` (must be owner) · Body: `title`, `content` |
| PUT    | `/note/replace/:noteId`       | Fully replace a note (including owner)                | Params: `noteId` · Query: `userId` (must be current owner) · Body: `userId`, `title`, `content` |
| POST   | `/note/all`                   | Update the title of a user's note                     | Query: `userId` · Body: `title` |
| DELETE | `/note/delete/:noteId`        | Delete a single note                                   | Params: `noteId` · Query: `userId` (must be owner) |
| DELETE | `/note/delete`                | Delete **all** notes belonging to a user               | Query: `userId` |
| GET    | `/note/sort/paginate-sort`    | Paginated list of a user's notes, newest first         | Query: `page`, `limit`, `userId` |
| GET    | `/note/get/note-by-content`   | Find notes by exact content match                      | Query: `content`, `userId` |
| GET    | `/note/get/note-with-user`    | Get a user's notes with owner email attached           | Query: `userId` |
| GET    | `/note/get/:noteId`           | Get a single note by ID                                | Params: `noteId` · Query: `userId` (must be owner) |
| GET    | `/note/aggregate`             | Find notes by title, joined with owner's name/email (MongoDB aggregation) | Query: `title` |

**Example — Create a note**

```bash
curl -X POST "http://localhost:3000/note?id=<USER_ID>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Note",
    "content": "Remember to buy groceries."
  }'
```

**Example — Paginate notes**

```bash
curl "http://localhost:3000/note/sort/paginate-sort?page=1&limit=10&userId=<USER_ID>"
```

---

## 🗃 Data Models

### User

| Field    | Type   | Required | Notes                  |
|----------|--------|----------|-------------------------|
| name     | String | ✅       |                          |
| email    | String | ✅       | Unique                  |
| password | String | ✅       |                          |
| phone    | String | ✅       |                          |
| age      | Number | ❌       | Must be between 18–60    |

### Note

| Field    | Type     | Required | Notes                                             |
|----------|----------|----------|-----------------------------------------------------|
| title    | String   | ✅       | Must follow Title Case — each word capitalized, e.g. `"My First Note"` |
| content  | String   | ✅       |                                                       |
| userId   | ObjectId | ✅       | References the owning `User`                        |

Notes include `createdAt` / `updatedAt` timestamps and use Mongoose's `optimisticConcurrency` for safe concurrent updates.

---

## ⚠️ Error Handling

All errors are caught by a global error-handling middleware and returned as:

```json
{
  "error": { },
  "error_message": "description of what went wrong",
  "stack": "..."
}
```

Common status codes used throughout the services:

| Status | Meaning                                   |
|--------|---------------------------------------------|
| 404    | Resource not found / user is not the owner  |
| 409    | Conflict (e.g. email already exists, invalid login) |
| 500    | Unhandled server error (default)            |

---

## 📎 Notes & Known Limitations

- Passwords are currently stored and compared in **plain text**. For any real deployment, hashing (e.g. with `bcrypt`) and proper auth (JWT/session) should be added.
- Route-level input validation (e.g. schema validation with `joi` or `zod`) is not yet implemented — invalid payloads currently rely on Mongoose schema validation only.
- "Ownership" checks currently return a `404` rather than a `403` when a user isn't the note's owner.
- The unmatched-route handler returns a `404` with `{ message: "Invalid application routing" }`.

Contributions to address these are welcome!

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**Eslam Alaa ElDeen**
Repository: [sticky-notes-api](https://github.com/Eslam-Alaa-ElDeen/sticky-notes-api)
