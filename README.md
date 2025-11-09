# Prescription App

Full-stack assignment implementation using **Spring Boot 3** (backend) and **React + Vite + Bootstrap** (frontend).

## Features

Backend (Spring Boot / H2):
- Secured with HTTP Basic; all endpoints require authentication (except H2 console).
- In-memory H2 database with auto-seeded users: `admin/admin123`, `user/user123`.
- CRUD REST API for prescriptions: create, read (list + single), update, delete.
- Date-range filter (defaults to current month when no `start`/`end` query params).
- Day-wise prescription count report.
- Alias endpoint required by spec: `GET /api/v1/prescription` (same as plural list).
- Swagger/OpenAPI UI at: `http://localhost:8080/swagger-ui.html`.
- CORS configured for React dev origin `http://localhost:5173`.

Frontend (React + Vite):
- Protected routes; unauthenticated users redirected to login.
- Login stores Basic Auth token in `localStorage`.
- Prescription list in table; date-range filters, default loads current month.
- Create/Edit form with client-side validation + server validation.
- Delete confirmation prompt.
- Day-wise report table.
- Drug interaction viewer consuming external API: RxNav.
- Responsive Bootstrap layout, navigation bar with logout.


## Project Structure
```
backend/  (Spring Boot API)
frontend/ (React SPA)
```

## Running the Backend

Prerequisites: Java 21+ (project property is 25; if unavailable edit `pom.xml` to a supported LTS like 21), Maven wrapper included.

```pwsh
cd "backend"
./mvnw spring-boot:run
```

Backend starts at `http://localhost:8080`.

Swagger UI: `http://localhost:8080/swagger-ui.html`  
H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:testdb`, user: `sa`, no password)

## Running the Frontend

```pwsh
cd "frontend"
npm install
npm run dev
```

App served at `http://localhost:5173`.

## Authentication
Use one of the seeded users:
- `admin / admin123`
- `user / user123`

Token is stored as base64 of `username:password` in `localStorage` (`auth_token`).

## API Summary
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/v1/prescriptions | List prescriptions (optional `start`, `end`) |
| GET | /api/v1/prescription | Alias list |
| GET | /api/v1/prescriptions/{id} | Get single |
| POST | /api/v1/prescriptions | Create |
| PUT | /api/v1/prescriptions/{id} | Update |
| DELETE | /api/v1/prescriptions/{id} | Delete |
| GET | /api/v1/report | Day-wise count (optional `start`, `end`) |
| GET | /api/v1/auth/login | Auth test endpoint |

## Validation Rules
| Field | Rules |
|-------|------|
| prescriptionDate | Required, valid date |
| patientName | Required, non-blank |
| patientAge | Required, integer 0-150 |
| patientGender | Required (Male/Female/Other) |
| nextVisitDate | Optional date |

Client-side + server-side validation ensures consistent error handling.

## Extending / Next Steps
- Replace Basic Auth with JWT for stateless scalability.
- Add pagination on list endpoints.
- Enhance Drug Interaction with search history & caching.
- Add unit tests & integration tests for controller/service.
- Switch to persistent DB (PostgreSQL/MySQL) + Flyway migrations.

## Troubleshooting
- If Swagger UI 404: verify dependency `springdoc-openapi-starter-webmvc-ui` loaded and app started without errors.
- CORS errors: ensure frontend runs on `5173` and backend CORS config matches.
- 401 responses: verify login and `auth_token` stored; clear `localStorage` and re-login if passwords changed.
- Java version mismatch: adjust `<java.version>` in `pom.xml` to one installed (e.g., 21).

## License
Educational assignment – no specific license applied.
