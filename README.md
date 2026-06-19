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

| Method | Path            | Access    | Description                     |
| ------ | --------------- | --------- | ------------------------------- |
| GET    | `/`             | Public    | Home / landing page             |
| GET    | `/login`        | Public    | Login page                      |
| POST   | `/login`        | Public    | Authenticate user, set session  |
| GET    | `/register`     | Public    | Create account page             |
| POST   | `/register`     | Public    | Hash password, create user      |
| POST   | `/logout`       | Public    | Destroy session, redirect to /  |
| GET    | `/about`        | Public    | About page                      |
| GET    | `/search`       | Public    | Search page                     |
| GET    | `/contact`      | Public    | Contact page                    |
| GET    | `/products`     | Protected | Product listing (filter + sort) |
| GET    | `/products/:id` | Protected | Product detail page             |
| GET    | `/account`      | Protected | Account dashboard               |
| GET    | `/bag`          | Protected | Shopping bag                    |

### API

All API routes are mounted under `/api` and are **protected**.

| Method | Path                          | Access    | Description              |
| ------ | ----------------------------- | --------- | ------------------------ |
| GET    | `/api/products`               | Protected | Returns products as JSON |
| GET    | `/api/cart`                   | Protected | Returns items in cart    |
| POST   | `/api/cart/items`             | Protected | Adds item to cart        |
| DELETE | `/api/cart/items/:productId`  | Protected | Deletes item from cart   |
| PATCH  | `/api/cart/items/:productId`  | Protected | Updates item quantity    |
| POST   | `/api/cart/clear`             | Protected | Clears items from cart   |

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

## Route Protection (Authorization)

Authorization is enforced by a reusable middleware, `requireAuth`, defined in
[`src/middleware/requireAuth.js`](src/middleware/requireAuth.js). It checks
`req.session.userId` and responds based on the type of route:

- **SSR pages** — unauthenticated users are redirected to `/login`.
- **API routes** (any path starting with `/api`) — return `401 Unauthorized`
  as JSON.

It is applied directly to the protected SSR routes (`/products`,
`/products/:id`) and mounted on the entire API router (`router.use(requireAuth)`),
so every `/api/*` endpoint — including all cart endpoints — is protected.

**Public routes** (no login required):

- `/` (landing page)
- `/login`, `POST /login`
- `/register`, `POST /register`
- `POST /logout`
- `/about`, `/search`, `/contact`

**Protected routes** (login required):

- `/products`
- `/products/:id`
- `/account`
- `/bag`
- All `/api/*` endpoints (including every cart endpoint)

---

## Session-Based Shopping Cart

The shopping cart is stored in the user's session (`req.session.cart`), so a separate database table isn't needed. Each logged-in user has their own cart, and it stays available while they're signed in and browsing the site.

The cart is updated through protected API routes using `fetch()`. When a user adds an item, removes an item, clears the cart, or changes the quantity, the server updates the session and returns the latest cart data. The page then updates the cart without needing a full page refresh.

When the user logs out, the session is destroyed, which also clears the shopping cart.

---

## License

This project was created for educational purposes as part of the SDEV 333 capstone
at Green River College.
