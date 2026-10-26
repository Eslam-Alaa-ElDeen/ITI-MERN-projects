<div align="center">

# 🛒 Shop App API

### A secure, production-minded E-commerce REST API built with **Node.js, Express 5 & MongoDB**

JWT auth · Email OTP verification · Role-based access · Smart product search, filtering & pagination · Image uploads

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-FB015B?logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

</div>

---

## ✨ Features

| | |
|---|---|
| 🔐 **Authentication** | Signup, login, JWT-protected routes, bcrypt-hashed passwords |
| 📧 **Email OTP** | 6-digit one-time codes (hashed in the DB, expire in 5 min) for account confirmation and password reset |
| 🛡️ **Role-based access** | `user` / `admin` roles enforced by a reusable `restrictTo()` middleware |
| 📦 **Product catalog** | Full CRUD with categories (`clothes`, `sports`, `electronics`) |
| 🔎 **Powerful queries** | Filtering (`gte`, `gt`, `lte`, `lt`), sorting, field selection, pagination and full-text-style search, all via query string |
| 🗑️ **Soft delete** | Hide products and users without losing data |
| 🖼️ **Image upload** | Multer-powered, images only |
| ✅ **Validation** | Request bodies validated with Yup, with clean error messages |
| 🧯 **Centralized errors** | One global error handler for Mongoose, JWT, duplicate-key and JSON-parse errors |
| 🚧 **Hardened by default** | Helmet headers, CORS allow-list, rate limiting (100 requests / 15 min) |

---

## 🧰 Tech Stack

- **Runtime:** Node.js (CommonJS)
- **Framework:** Express 5
- **Database:** MongoDB + Mongoose 9
- **Auth:** jsonwebtoken, bcrypt
- **Validation:** Yup
- **Security:** helmet, cors, express-rate-limit, express-mongo-sanitize
- **Email:** Nodemailer (Gmail SMTP)
- **Uploads:** Multer
- **Misc:** nanoid (OTP generation), chalk (pretty logs), nodemon (dev)

---

## 📁 Project Structure

```
shop_app/
├── server.js                 # Entry point – starts the HTTP server
├── app.js                    # Express app: middleware, routes, error handling
├── config/
│   └── connectDB.js          # MongoDB connection
├── controller/               # Request handlers (business logic)
│   ├── auth.js
│   ├── product.js
│   └── user.js
├── routes/                   # Route definitions
│   ├── auth.js
│   ├── product.js
│   └── user.js
├── models/                   # Mongoose schemas
│   ├── product.js
│   └── user.js
├── middleware/
│   ├── auth.js               # JWT verification
│   ├── restricTo.js          # Role guard
│   ├── validetor.js          # Yup schema validation
│   ├── multer.js             # Image upload config
│   └── error.middleware.js   # Global error handler
├── validation/               # Yup schemas (auth, user, product)
├── utils/
│   ├── ApiFeatures.js        # filter / sort / fields / paginate / search
│   ├── AppError.js           # Custom operational error
│   ├── catchAsync.js         # Async error wrapper
│   └── sendEmail.js          # Nodemailer helper
└── public/                   # Uploaded images
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- A running [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) for sending OTP emails

### 1. Clone & install

```bash
git clone <your-repo-url>
cd shop_app
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Then fill in `.env`:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on (defaults to `3000`) | `3000` |
| `DB_URI` | MongoDB connection string (defaults to `mongodb://localhost:27017/shop_app`) | `mongodb://localhost:27017/shop_app` |
| `DEVELOPMENT` | Set to `development` to include stack traces in error responses | `development` |
| `SALT_ROUNDS` | bcrypt cost factor | `10` |
| `email_USER` | Gmail address used to send OTP emails | `you@gmail.com` |
| `email_PASS` | Gmail **App Password** (not your real password) | `abcd efgh ijkl mnop` |
| `JWT_SECRET` | Long, random secret used to sign tokens | `a-very-long-random-string` |
| `JWT_EXPIRES_IN` | Token lifetime | `7d` |

> ⚠️ **Never commit your `.env` file.** It's already in `.gitignore`. Use a strong, unique `JWT_SECRET` in production.

### 3. Run it

```bash
npm run dev     # development with auto-reload (nodemon)
npm start       # production
```

Visit `http://localhost:3000/` and you should see:

```json
{ "success": true, "message": "welcome to E-commerce app" }
```

---

## 📡 API Reference

**Base URL:** `http://localhost:3000`

Protected routes expect the JWT in the `authorization` header:

```
authorization: <your_jwt_token>
```

### 🔑 Auth — `/auth`

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/auth/signup` | `name`, `email`, `password` | Register and receive an OTP by email |
| `POST` | `/auth/confirm_email` | `email`, `OTP` | Verify the account with the emailed OTP |
| `POST` | `/auth/login` | `email`, `password` | Log in and receive a JWT |
| `POST` | `/auth/forget_password` | `email` | Send a password-reset OTP |
| `POST` | `/auth/reset_password` | `email`, `OTP`, `newPassword` | Set a new password using the OTP |

### 📦 Products — `/product`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/product` | List products (supports filtering, sorting, pagination, search) |
| `POST` | `/product` | Create a product |
| `GET` | `/product/:id` | Get one product |
| `PATCH` | `/product/:id` | Update a product |
| `DELETE` | `/product/:id` | Permanently delete a product |
| `DELETE` | `/product/soft/:id` | Soft delete (hides the product, keeps the data) |
| `POST` | `/product/upload` | Upload an image (`multipart/form-data`, field name `attachment`) |

**Product fields**

| Field | Type | Rules |
|---|---|---|
| `name` | string | required, unique, 3–50 chars |
| `description` | string | required, min 10 chars |
| `category` | string | required: `clothes` \| `sports` \| `electronics` |
| `price` | number | required, positive |
| `image` | string | optional, valid URL |

### 👤 Users — `/user` 🔒

All user routes require a valid JWT and a role of `admin` or `user`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/user` | List users (same query features as products) |
| `POST` | `/user` | Create a user (requires `confirmPassword`) |
| `GET` | `/user/:id` | Get one user |
| `PATCH` | `/user/:id` | Update a user |
| `DELETE` | `/user/:id` | Permanently delete a user |
| `DELETE` | `/user/soft/:id` | Soft delete a user |

Passwords and OTP hashes are never returned by the list and detail endpoints.

---

## 🔍 Querying Products

`GET /product` is powered by a chainable `ApiFeatures` helper, so you get a rich query language for free:

```bash
# Filter by category
GET /product?category=electronics

# Price range
GET /product?price[gte]=100&price[lte]=500

# Sort (prefix with - for descending). Default: newest first
GET /product?sort=-price,name

# Pick only the fields you need
GET /product?fields=name,price,image

# Pagination (default: page 1, limit 100)
GET /product?page=2&limit=10

# Search name and description (case-insensitive)
GET /product?search=wireless

# Combine everything
GET /product?category=sports&price[lte]=200&sort=price&page=1&limit=12&search=running
```

**Response**

```json
{
  "success": true,
  "results": 12,
  "total": 87,
  "products": [ ... ]
}
```

---

## 🧪 Quick Walkthrough

```bash
# 1. Sign up (an OTP is emailed to you)
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada Lovelace","email":"ada@example.com","password":"secret123"}'

# 2. Confirm your email
curl -X POST http://localhost:3000/auth/confirm_email \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com","OTP":"123456"}'

# 3. Log in and grab the token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com","password":"secret123"}'

# 4. Call a protected route
curl http://localhost:3000/user -H "authorization: <token>"

# 5. Create a product
curl -X POST http://localhost:3000/product \
  -H "Content-Type: application/json" \
  -d '{"name":"Running Shoes","description":"Lightweight shoes for daily runs","price":79.99,"category":"sports"}'

# 6. Upload an image
curl -X POST http://localhost:3000/product/upload -F "attachment=@./shoe.jpg"
```

---

## ⚠️ Error Format

Every error comes back in one consistent shape:

```json
{
  "success": false,
  "message": "Invalid email or password",
  "stack": "...only when DEVELOPMENT=development..."
}
```

Handled out of the box: validation errors, duplicate keys, invalid ObjectIds, invalid/expired JWTs, malformed JSON, and unknown routes (`404`).

---

## 🔒 Security Notes

- Passwords and OTPs are hashed with **bcrypt** before storage
- OTPs expire after **5 minutes**
- **Helmet** sets secure HTTP headers
- **CORS** is restricted to `http://localhost:4200` (change this in `app.js` for your frontend's origin)
- **Rate limiting:** 100 requests per IP every 15 minutes
- Uploads accept **images only**

---

## 🗺️ Roadmap

- [ ] Protect product write routes (`POST`/`PATCH`/`DELETE`) with `auth` + `restrictTo(["admin"])`
- [ ] Restrict user management routes to admins only
- [ ] Serve uploaded images statically (`express.static("public")`)
- [ ] Enable `express-mongo-sanitize` against NoSQL injection
- [ ] Shopping cart & orders
- [ ] Payments integration
- [ ] Product reviews & ratings
- [ ] Automated tests and CI
- [ ] Swagger / OpenAPI docs
- [ ] Docker setup

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the project
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**.

---

<div align="center">

**If this project helped you, drop it a ⭐**

</div>
