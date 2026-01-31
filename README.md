# KindKart – Charity Donation Platform (Backend)

A RESTful backend system for managing charities and donations with secure authentication, role-based access control, and payment processing.

## Tech Stack
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- REST APIs
- Razorpay Payment Gateway
- Multer (File Uploads)

## Features
- User and admin authentication using JWT
- Role-based access control (Admin / User)
- Charity management (create, update, view)
- Donation processing with Razorpay
- Secure payment verification using Razorpay webhooks
- File uploads for charity profiles using Multer
- Request validation and centralized error handling

## High-Level Design (OOD Overview)
- **API Layer (Express)**
  - Handles authentication, users, charities, and donations
  - Validates incoming requests and enforces RBAC

- **Service Layer**
  - Business logic for donations and payment verification
  - Razorpay order creation and webhook validation

- **Database Layer (MySQL + Sequelize)**
  - Relational models for users, charities, and donations
  - Maintains transactional integrity for payments

- **Middleware Layer**
  - JWT authentication
  - Role-based authorization
  - File upload handling (Multer)

## Project Structure
controllers/
routes/
models/
middleware/
services/
utils/
uploads/
app.js
.gitignore


## Setup & Run Locally
```bash
git clone https://github.com/your-username/kindkart-backend.git
cd kindkart-backend
npm install
npm start
```

## Environment Variables

Create a .env file:

PORT=3000

DB_HOST=localhost

DB_USER=your_db_user

DB_PASSWORD=your_db_password

DB_NAME=kindkart

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key

RAZORPAY_KEY_SECRET=your_razorpay_secret

RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

## What I Learned

Designing RESTful APIs using Node.js and Express

Relational data modeling with MySQL and Sequelize

JWT-based authentication and role-based access control

Secure payment processing using Razorpay and webhooks

Handling file uploads securely with Multer

API testing and validation using Postman

Robust error handling and request validation

## Author

Anjali R Nair

Backend / MERN Developer

GitHub: https://github.com/anjalei

LinkedIn: https://linkedin.com/in/anjalirnair/
