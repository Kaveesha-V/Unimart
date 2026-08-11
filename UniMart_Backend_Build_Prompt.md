# UniMart Backend Build Prompt (for IntelliJ IDEA + Spring Boot)

> Copy everything inside the fenced block below and paste it into IntelliJ IDEA's AI assistant (or use it as your own build checklist) to generate the backend. It locks in the exact stack and structure from Guide 03, and is wired to match the frontend contract from Guide 02 — same base path, same feature names, same auth flow — so the two sides plug together without rework.

---

```
You are building the backend for "UniMart" — a monolithic Spring Boot REST API
for a full-stack e-commerce marketplace student project. Follow the stack,
structure, and conventions below exactly. Do not substitute alternative
frameworks, versions, or package layouts.

## 1. Project identity
- Group: lk.ac.kln | Artifact: unimart-backend | Name: UniMart Backend
- Base package: lk.ac.kln.unimart
- Build: Maven Wrapper | Packaging: JAR | Java: 21 (LTS)
- Spring Boot: current stable 4.1.x, generated via Spring Initializr —
  never hand-mix starter versions.
- Dependencies: Spring Web, Spring Data JPA, Validation, Spring Security,
  OAuth2 Resource Server, MySQL Driver, Flyway Migration, Actuator,
  Spring Boot Test.

## 2. Package-by-feature MVC structure (create exactly this)
src/main/java/lk/ac/kln/unimart/
  UniMartApplication.java
  common/
    api/          → ApiError, global exception handler, pagination helpers
    exception/
    validation/
  config/
    CorsConfig.java
    SecurityConfig.java
  security/
    JwtService.java
    CurrentUser.java
  auth/
    controller/  dto/  entity/  repository/  service/
  listing/
    controller/  dto/  entity/  repository/  service/  mapper/
  review/
    controller/  dto/  entity/  repository/  service/  mapper/
  order/
  notification/

src/main/resources/
  application.yml
  application-local.yml
  application-prod.yml
  db/migration/          → Flyway versioned migrations (V1__..., V2__...)

src/test/java/lk/ac/kln/unimart/
  listing/
  review/
  integration/

This is MVC: controllers handle HTTP, services implement use cases,
repositories access data, and the React frontend is the view.

## 3. Layer responsibility rules (enforce strictly)
- Controller: parse path/query/body, trigger validation, call service, map
  HTTP status. NEVER call repositories directly, manage transactions, do
  complex authorization, or serialize entities.
- Service: business rules, ownership checks, transactions, orchestration.
  NEVER depend on HTTP-specific objects (e.g. HttpServletRequest) unless
  strictly necessary.
- Repository: query and persist entities only. NEVER make workflow
  decisions.
- Entity: persistence state, simple invariants, relationships. NEVER
  returned directly from a controller; NEVER store plain-text passwords.
- DTO/Mapper: define the API contract and map to/from entities. NEVER leak
  internal fields such as passwordHash or version unless required.

## 4. API conventions (must match the frontend exactly)
- Base path: `/api/v1` — this MUST match the frontend's
  `VITE_API_BASE_URL=http://localhost:8080/api/v1` from the React app's
  `.env.local`. Every controller is mounted under this prefix.
- Plural resource names: `/api/v1/listings`, `/api/v1/reviews`,
  `/api/v1/auth/*`, `/api/v1/orders`.
- Return DTOs only, never JPA entities. All timestamps ISO-8601 UTC.
- Status codes: 201 Created on create, 204 No Content on delete, 400 on
  validation failure, 401 on missing/invalid auth, 403 on insufficient
  permission, 404 on absent resource, 409 on state conflict.
- Collection endpoints are paginated from the start (page/size/sort query
  params, wrapped response with total count).
- One global `@RestControllerAdvice` exception handler returning a
  consistent `ApiError` shape:
  ApiError(code, message, path, timestamp, fieldErrors)
- Keep controller methods short enough to read on one screen.
- Shape DTO fields to line up with the frontend's TypeScript types
  (`features/auth/authTypes.ts`, `features/listings/listingTypes.ts`,
  `features/reviews/reviewTypes.ts`) — e.g. use the same field names
  (camelCase) so the RTK slices/API layers don't need remapping logic.

## 5. Security architecture (must match the frontend auth flow)
- Passwords hashed with BCrypt, never logged.
- Public endpoints: `/api/v1/auth/register`, `/api/v1/auth/login`,
  `/api/v1/auth/refresh`, public listing reads (`GET /api/v1/listings`,
  `GET /api/v1/listings/{id}`), and `/api/v1/public/**` (including
  `/actuator/health` as configured).
- Protected endpoints: listing write operations, review write operations,
  order operations, and any user-specific action — require a valid JWT
  bearer token in the `Authorization: Bearer <token>` header.
- Issue short-lived JWT access tokens on login; a refresh-token mechanism
  is added in the integration guide — design `JwtService` so a refresh
  endpoint can be slotted in later without reshaping the token payload.
- On successful login/register, return a response DTO shaped so the
  frontend's `authSlice.ts` can store it directly: e.g.
  `{ accessToken, tokenType, expiresIn, user: { id, email, name, roles } }`.
- CORS (`CorsConfig.java`): allow only the configured frontend origin(s) —
  `http://localhost:5173` (the Vite dev server port from Guide 02) — with
  credentials support for the Authorization header. Never use a wildcard
  origin together with credentials.
- Production secrets (DB credentials, JWT signing key) come from
  environment variables or a secret store — never committed to
  `application.yml` or Git history.

## 6. Minimal health endpoint (build first, verify before anything else)
Package: lk.ac.kln.unimart.common.api
Controller mounted at `/api/v1/public`, GET `/ping`, returns:
  { "service": "unimart-backend", "status": "UP", "time": <Instant.now()> }
Start the app and confirm `http://localhost:8080/api/v1/public/ping`
returns 200 before adding database configuration.

## 7. Build steps
1. Generate the project via Spring Initializr with the identity and
   dependencies in section 1. Open in IntelliJ, let Maven import resolve,
   run `./mvnw -v` and confirm Java 21 is used.
2. Create the package-by-feature folder structure from section 2 (empty
   packages are fine at this stage).
3. Implement `common/api` (ApiError + global exception handler) and the
   health endpoint from section 6; run `./mvnw spring-boot:run` and verify
   `/api/v1/public/ping` returns 200.
4. Implement `config/CorsConfig.java` and `config/SecurityConfig.java` per
   section 5, permitting `/api/v1/public/**` and the auth endpoints before
   anything else is locked down.
5. Implement the `auth` feature end-to-end (entity, repository, service,
   DTOs, controller, `JwtService`) so `/api/v1/auth/register` and
   `/api/v1/auth/login` work and return the response shape in section 5.
6. Implement the `listing` feature (entity, repository, service, mapper,
   DTOs, controller) with pagination, matching the frontend's
   `listingsApi.ts` expectations (list, get by id, create/update/delete
   behind auth).
7. Implement the `review` feature the same way, matching
   `reviewsApi.ts`.
8. Add Flyway migrations under `db/migration` for every entity introduced,
   version-controlled (`V1__init_users.sql`, `V2__init_listings.sql`, ...).
   No schema changes without a migration.
9. Write tests under `src/test/java/.../listing`, `.../review`, and
   `.../integration` covering at least one happy path and one failure path
   per endpoint. Run `./mvnw clean test` and fix all failures before
   stopping.
10. Confirm no passwords or secrets are present in `application.yml` or
    Git history; local-only values go in `application-local.yml` and are
    gitignored.

Do not insert any real passwords, tokens, student data, or assessment
answers into the codebase, config files, or prompts while building.
```

---

## How this lines up with the frontend guide

| Frontend (Guide 02) | Backend (Guide 03) | Alignment |
|---|---|---|
| `VITE_API_BASE_URL=http://localhost:8080/api/v1` | Base path `/api/v1` on port 8080 | Same origin the React app expects, no rewrite needed |
| Vite dev server on port 5173 | `CorsConfig.java` allows `http://localhost:5173` | Requests from the SPA aren't blocked by CORS |
| `features/auth/authSlice.ts` | `auth` feature, login/register response shape | Response DTO matches what the slice expects to store |
| `features/listings/listingsApi.ts` | `listing` feature, paginated `/listings` | Same resource name and shape, no client-side remapping |
| `features/reviews/reviewsApi.ts` | `review` feature | Same resource name and shape |
| `services/baseApi.ts` (will attach `Authorization` header) | JWT bearer auth on protected routes | Token issued by backend is exactly what the frontend base API sends back |
| `.env.local` never committed, no secrets in client bundle | Secrets only via env vars/secret store, never in `application.yml` | Consistent "no secrets in source control" rule on both sides |

## Notes for you (not part of the prompt)

- I intentionally left out the pure IDE/environment setup steps (installing IntelliJ, run-configuration clicks, the full common-errors table, and the completion checklist) since those aren't things an AI build agent needs to generate — happy to add a second "setup & troubleshooting" section to this file if you want it as a standalone reference too.
- Suggested build order once this prompt runs: verify `/ping` → verify `auth` register/login against the frontend's login form → verify `listings` against the frontend's listings page — that way you catch any DTO/shape mismatch early, one feature at a time.
