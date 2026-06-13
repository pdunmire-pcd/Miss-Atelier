# Miss Atelier

**Designer Knitwear Storefront**
Server-side Web Development Capstone Project (SDEV 333)

**Team Members:**

- Paris (github: pdunmire-pcd)
- Nadia (github: nadia5129)
- Seadrah (github: seadrahbe)
- Jessica (github: hebert87)

---

## Local artisans, high-quality knitwear

Miss Atelier is a storefront for a renowned group of designers, specializing in
knitwear and crocheted goods. Known for their hand-made, one-of-a-kind pieces and
luxury materials, Miss Atelier has a deep focus on quality craftsmanship. For those
who'd prefer to knit their own clothing, they sell yarn and materials to make their
designs accessible.

This project demonstrates a full-stack web application architecture using:

- Server-Side Rendering (SSR) with EJS templates
- Express.js (v5)
- MVC architecture
- MySQL database integration
- REST-style API endpoints

It serves as a portfolio-ready example of structured, maintainable web application
development.

---

## Tech Stack

| Layer     | Technology                   |
| --------- | ---------------------------- |
| Runtime   | Node.js (>= 18, ES Modules)  |
| Framework | Express.js 5                 |
| Views     | EJS                          |
| Database  | MySQL (via `mysql2/promise`) |
| Config    | dotenv                       |
| Tooling   | ESLint, Nodemon              |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A running [MySQL](https://www.mysql.com/) server

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root (it is git-ignored):

```env
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=missatelier
DB_PASSWORD=your_password
DB_NAME=miss_atelier

SESSION_SECRET=your_session_secret
```

### 3. Set up the database

Create the database, then run the schema and seed scripts:

```bash
mysql -u root -p -e "CREATE DATABASE miss_atelier;"
mysql -u root -p miss_atelier < scripts/schema.sql
mysql -u root -p miss_atelier < scripts/seed.sql
```

- `scripts/schema.sql` creates the `products` and `users` tables.
- `scripts/seed.sql` populates it with sample knitwear products.

### 4. Run the app

```bash
npm run dev
```

The server starts on `http://localhost:<PORT>` (default `3000`) with live reload
via Nodemon.

---

## Available Scripts

| Command        | Description                                 |
| -------------- | ------------------------------------------- |
| `npm run dev`  | Start the server with Nodemon (live reload) |
| `npm run lint` | Lint the codebase with ESLint               |
| `npm test`     | Placeholder — no tests configured yet       |

---

## Project Structure

```
.
├── public/                 # Static assets served directly
│   ├── css/                # Stylesheets
│   ├── images/             # Image assets
│   ├── js/                 # Client-side scripts
│   └── videos/             # Video assets
├── scripts/
│   ├── schema.sql          # Database table definitions
│   └── seed.sql            # Sample product data
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── controllers/        # Request handlers (store + API)
│   ├── model/              # DB connection + data access (repo)
│   ├── routers/            # Route definitions
│   ├── services/           # Business logic between controllers and model
│   ├── utility/            # Helper functions
│   └── views/              # EJS templates and partials
├── eslint.config.js
└── package.json
```

The app follows an **MVC + service/repository** flow:

```
Router → Controller → Service → Repository (Model) → MySQL
```

---

## Routes

### Store pages (SSR)

| Method | Path            | Description                     |
| ------ | --------------- | ------------------------------- |
| GET    | `/`             | Home / landing page             |
| GET    | `/products`     | Product listing (filter + sort) |
| GET    | `/products/:id` | Product detail page             |
| GET    | `/about`        | About page                      |
| GET    | `/search`       | Search page                     |
| GET    | `/contact`      | Contact page                    |
| GET    | `/login`        | Login page                      |
| POST   | `/login`        | Authenticate user, set session  |
| GET    | `/register`     | Create account page             |
| POST   | `/register`     | Hash password, create user      |
| POST   | `/logout`       | Destroy session, redirect to /  |
| GET    | `/account`      | Account dashboard               |
| GET    | `/bag`          | Shopping bag                    |

### API

| Method | Path            | Description              |
| ------ | --------------- | ------------------------ |
| GET    | `/api/products` | Returns products as JSON |
| GET    | `/api/cart    ` | Returns cart items as JSON |
| GET    | `/api/products` | Returns products as JSON |
| GET    | `/api/products` | Returns products as JSON |

**Query parameters** (supported on `/products` and `/api/products`):

- `category` — filter by product category
- `maxPrice` — filter by maximum price
- `search` — match against product name
- `sort` — one of `price-low`, `price-high`, `name-asc`, `name-desc`,
  `category-asc`, `category-desc`

---

## Authentication

Session-based authentication is implemented using `express-session` and `bcrypt`.

**Register flow:**
1. User submits email + password via `POST /register`
2. Server checks the email is not already taken
3. Password is hashed with bcrypt (never stored as plaintext)
4. New user row is inserted into the `users` table
5. User is redirected to `/login`

**Login flow:**
1. User submits email + password via `POST /login`
2. Server looks up the user by email
3. `bcrypt.compare()` verifies the password against the stored hash
4. On success, `req.session.userId` is set and user is redirected to `/account`
5. On failure, the login form is re-rendered with an error message

**Logout flow:**
1. `POST /logout` calls `req.session.destroy()`
2. User is redirected to `/`

Passwords are hashed using bcrypt with 10 salt rounds. Sessions are signed with `SESSION_SECRET` from the environment to prevent cookie tampering.

---

## License

This project was created for educational purposes as part of the SDEV 333 capstone
at Green River College.
