# 💰 Cashwise Backend

Cashwise is a **group expense tracking application** that helps friends and groups manage shared expenses and settle accounts easily.

This backend is a **REST API** built with **Node.js**, **Express**, and **MongoDB**.  
It provides authentication, group expense management, and settlement calculation features.

---

## 📖 Overview
- **Authentication** – User registration, login, JWT-based sessions, protected routes  
- **Expense Management** – Track shared expenses, assign participants, manage settlements  

---

## 📱 Features

### 🔐 User Authentication
- Register with email and password  
- Secure login with JWT tokens  
- Protected routes with authentication middleware  

### 💵 Expense Management
- Create and track group expenses  
- Assign participants to expenses  
- Record who paid for each expense  
- Track settlements between participants  

---

## 🛠️ Tech Stack
- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)  
- [MongoDB](https://www.mongodb.com/) with **Mongoose ODM**  
- [JWT](https://jwt.io/) for authentication  
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) for password hashing  
- Security Middleware:  
  - [Helmet](https://helmetjs.github.io/) (security headers)  
  - [CORS](https://expressjs.com/en/resources/middleware/cors.html) protection  
  - XSS protection  

---

## 📡 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Login and receive JWT token  
- `POST /api/auth/logout` – Logout and clear cookie  

### 💵 Expenses
- `POST /api/expense/group` – Create group expenses with settlement info  
- `GET /api/expense/group` – Get user's expenses  

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Pratik-Karanjit/Cashwise-Backend.git
cd Cashwise-Backend
