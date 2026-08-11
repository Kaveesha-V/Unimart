# 🛍️ UniMart - Student Marketplace Platform

UniMart is a full-stack, modern marketplace platform designed specifically for university students to buy, sell, and exchange items easily and securely within their campus community.

---

## 🚀 Tech Stack

### Backend (`/unimart-backend`)
- **Framework:** Java 21 & Spring Boot 3.4.2
- **Security:** Spring Security with JWT (JSON Web Tokens)
- **Persistence:** Spring Data JPA & Hibernate
- **Database:** H2 In-Memory Database (Default for development) / PostgreSQL support
- **Build Tool:** Apache Maven (with Maven Wrapper)

### Frontend (`/unimart-frontend`)
- **Framework:** React 19 & TypeScript
- **Build Tool:** Vite
- **UI Component Library:** Material-UI (MUI v6)
- **State Management:** Redux Toolkit & React-Redux
- **Routing:** React Router v7
- **Icons:** MUI Icons & SVG assets

---

## 📁 Repository Structure

```
Unimart/
├── unimart-backend/          # Spring Boot REST API Service
│   ├── src/                  # Source code (Controllers, Services, Entities, DTOs)
│   ├── pom.xml               # Maven dependencies and configuration
│   └── mvnw.cmd / mvnw       # Maven wrappers
├── unimart-frontend/         # React + Vite Web Application
│   ├── src/                  # UI components, pages, Redux store, services
│   ├── package.json          # Dependencies & scripts
│   └── vite.config.ts        # Vite configuration
├── .gitignore                # Global git ignore rules
└── README.md                 # Project documentation
```

---

## ✨ Features

- 🔐 **User Authentication:** Student registration and login powered by JWT authentication.
- 📦 **Listing Management:** Browse, view details, and filter marketplace items.
- 💱 **Multi-Currency Support:** Integrated currency converter service.
- 🎨 **Modern UI/UX:** Dark/glassmorphic responsive layout crafted with Material-UI.
- ⚡ **RESTful API:** Clean API structure with global exception handling and unified error responses.

---

## 🛠️ Getting Started

### 1. Prerequisites
- **Java 21 JDK** or higher
- **Node.js** (v18 or higher) & `npm`
- **Git**

---

### 2. Backend Setup & Running

Navigate to the `unimart-backend` directory and run the application:

```bash
cd unimart-backend
```

#### Windows:
```powershell
.\mvnw.cmd spring-boot:run
```

#### macOS / Linux:
```bash
./mvnw spring-boot:run
```

The Spring Boot backend will start on **`http://localhost:8080`**.
- H2 Console is accessible at: `http://localhost:8080/h2-console`

---

### 3. Frontend Setup & Running

In a new terminal window, navigate to the `unimart-frontend` directory:

```bash
cd unimart-frontend
npm install
npm run dev
```

The Vite dev server will start at **`http://localhost:5173`**.

---

## 👥 Author

Developed by **[Kaveesha-V](https://github.com/Kaveesha-V)**.
