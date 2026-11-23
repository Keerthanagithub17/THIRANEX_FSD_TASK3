# 🛍️ ShopNest – Full Stack E-Commerce Web Application

ShopNest is a full-stack e-commerce web application that allows users to browse products, add items to their shopping cart, place orders, and track their purchases. It also provides an admin dashboard for managing products and customer orders.

## 🚀 Features

### 👤 User Features
- User registration and login
- Browse and search products
- Filter products by category
- View product details
- Add and remove products from cart
- Update product quantities
- Secure checkout
- Cash on Delivery payment option
- View order history
- Track order status

### 🔐 Admin Features
- Role-based access control (Admin/User)
- Admin dashboard
- Add new products
- Edit existing products
- Delete products
- Manage product inventory
- View customer orders
- Update order status

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- REST API

**Database**
- MySQL

**Authentication & Security**
- JSON Web Token (JWT)
- bcryptjs
- Role-based authorization

## 📁 Project Structure

```text
ShopNest/
├── database/
│   └── schema.sql
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── styles.css
│   ├── package.json
│   └── index.html
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ShopNest
```

### 2. Database Setup

- Open MySQL Workbench.
- Execute `database/schema.sql`.
- This creates the `shopnest` database and required tables.
- Sample products are inserted automatically.

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder using `.env.example` as a reference.

Configure your environment variables:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=shopnest
JWT_SECRET=your_secure_secret
```

Start the backend:

```bash
npm run dev
```

Backend URL: `http://localhost:5000`

### 4. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## 👨‍💻 Admin Account Setup

Newly registered accounts receive the User role by default.

To grant admin access, execute this query in MySQL Workbench:

```sql
USE shopnest;

UPDATE users
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

Log out and log in again to refresh your authentication token.

## 📦 Order Management

The application supports the following order statuses:

- Pending
- Processing
- Shipped
- Delivered
- Cancelled

Customers can view their order history and track order progress.

## 🔒 Security

- Password hashing using bcryptjs
- JWT-based authentication
- Protected API endpoints
- Admin-only product and order management
- Environment variables for sensitive configuration

## 💳 Payment

The current checkout implementation supports Cash on Delivery (COD). No real payment gateway is integrated.

## 🎯 Project Objective

This project was developed to gain practical experience in full-stack web development, REST API integration, database management, authentication, authorization, and real-world e-commerce workflows.

## 👩‍💻 Author

**Keerthana**

Full Stack Web Development Project

---

⭐ If you find this project useful, consider giving it a star!
