# 🍃 UniMart - Backend REST API Service

UniMart Backend is a robust RESTful API built with **Java 21** and **Spring Boot 3**, providing secure authentication, marketplace listing management, and database persistence for the UniMart student marketplace platform.

---

## 🛠️ Tech Stack

- **Language:** Java 21
- **Framework:** Spring Boot 3.4.2
- **Security:** Spring Security & JJWT (JSON Web Tokens)
- **Database:** H2 In-Memory DB (Development default) / PostgreSQL support
- **ORM / Persistence:** Spring Data JPA & Hibernate
- **Build Tool:** Maven (Wrapper included)

---

## ✨ Main Features

- 🔑 **Authentication & Authorization:** Secure registration, login, role management (STUDENT, ADMIN), and JWT validation filters.
- 📋 **Listings API:** RESTful CRUD endpoints for creating, retrieving, updating, and deleting marketplace items.
- 🌐 **CORS Configuration:** Configured cross-origin support for local and production frontend integration.
- ⚡ **Global Exception Handling:** Standardized API error responses across all controllers.

---

## 🚀 Getting Started

### Prerequisites
- Java 21 JDK installed (`java -version`)
- Maven (optional, Maven Wrapper `mvnw` is included in the project)

---

### Running the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/Kaveesha-V/Unimart_back.git
   cd Unimart_back
   ```

2. Run using Maven Wrapper:

   - **Windows:**
     ```powershell
     .\mvnw.cmd spring-boot:run
     ```
   - **Linux / macOS:**
     ```bash
     ./mvnw spring-boot:run
     ```

3. The server will start at **`http://localhost:8080`**.

---

## 🗄️ Database & Consoles

### Default Configuration (H2 In-Memory)
- **URL:** `jdbc:h2:mem:unimart_db`
- **H2 Console:** Accessible at `http://localhost:8080/h2-console`
- **Username:** `sa`
- **Password:** *(leave blank)*

### Running with PostgreSQL Profile
If you prefer PostgreSQL, set the active profile:
```powershell
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=postgres
```

---

## 🔌 API Endpoints Summary (v1)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/v1/listings` | Paged/filterable list (`q`, `categoryId`, `status`) | No |
| `GET` | `/api/v1/listings/{id}` | Get listing details | No |
| `POST` | `/api/v1/listings` | Create listing (Authenticated seller) | Yes |
| `PUT` | `/api/v1/listings/{id}` | Replace listing fields (Owner/Admin) | Yes |
| `DELETE` | `/api/v1/listings/{id}` | Soft archive listing (Owner/Admin) | Yes |
| `GET` | `/api/v1/listings/{id}/reviews` | Paged reviews for listing | No |
| `POST` | `/api/v1/reviews` | Create review for completed order | Yes |
| `PUT` | `/api/v1/reviews/{id}` | Update review rating/comment | Yes |
| `DELETE` | `/api/v1/reviews/{id}` | Delete review | Yes |

---

## 🧪 Postman API Testing & Collection Runner (Guide 07)

The Postman test suite and environment files are located in the `postman/` directory:
- Collection: `postman/UniMart API v1.postman_collection.json`
- Environment: `postman/UniMart Local.postman_environment.json`

### How to Run with Postman Collection Runner:
1. Open **Postman**.
2. Click **Import** and select both files from the `postman/` directory.
3. Select the **UniMart Local** environment in the top right environment selector (`base_url = http://localhost:8080/api/v1`).
4. Open the **UniMart API v1** collection and click **Run Collection**.
5. Ensure the execution order is: **Auth → Listings → Reviews → Negative Tests**.
6. Click **Run UniMart API v1** and verify all positive and negative test cases pass.

> ⚠️ **Reminder for Lab Evidence Submission:** Always redact any sensitive access tokens, passwords, or secrets from your exported environment file before committing to source control!

---

## 👥 Author

Developed by **[Kaveesha-V](https://github.com/Kaveesha-V)**.
