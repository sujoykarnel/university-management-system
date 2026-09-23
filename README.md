# UMS

A University Management System (UMS) API project for managing university administration, users, academic structure, course offerings, registration, attendance, examinations, results, and transcripts.

## API Base URL

```text
http://localhost:5000/api/v1
```

## Technology

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- Zod
- Redis
- JWT authentication

## Features

- User registration and login
- Google login
- Email verification
- Refresh token authentication
- User profile management
- Profile image upload
- University management
- Department management
- Program management
- Instructor management
- Course management
- Semester management
- Course offering management
- Course registration and payment
- Attendance management
- Examination management
- Result management
- Transcript management

## API Modules

| Module | Available Operations |
|---|---|
| Auth | Google Login, Register Student, Verify Email, Login User, Refresh Token |
| User | Get Me, Upload Profile Image |
| Admin | Create University, Department, Program, Instructor, Course, Semester, Course Offering |
| Course Offering | Get All, Update, Delete |
| Semester | Get All |
| Course Registration | Create Registration, Pay Pending Registration |
| Attendance | Create Attendance |
| Exam | Create Exam |
| Result | Create Result |
| Transcript | Transcript request |

## Authentication

The login endpoint is:

```http
POST /auth/login
```

Example request:

```json
{
  "email": "your-email@example.com",
  "password": "your-password"
}
```

For protected endpoints, authenticate the request using the authentication mechanism configured by the application.

## Postman Collection

A Postman collection is included in the project:

```text
UMS.postman_collection.json
```

Import this file into Postman to explore the available API requests. The collection is organized into Auth, User, Admin, Course Offering, Semester, Course Registration, Attendance, Exam, Result, and Transcript modules. fileciteturn0file0L8-L10

## Example Endpoint

Create a university:

```http
POST /api/v1/admin/university
```

Example body:

```json
{
  "name": "Dhaka University",
  "shortName": "DU"
}
```

The Postman collection currently defines this endpoint with the example request body above. fileciteturn0file0L126-L143

## Project Structure

```text
UMS/
├── src/
│   ├── app/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── module/
│   │   ├── routes/
│   │   └── utils/
│   ├── app.ts
│   └── server.ts
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

Create a `.env` file in the project root and configure the values required by the application.

```env
PORT=5000
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
REDIS_URL="your-redis-url"
```

> Add any additional environment variables required by your local implementation, such as email, Google OAuth, payment gateway, or file-storage configuration.

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd UMS
npm install
```

## Database Setup

Configure `DATABASE_URL` in `.env`, then run the Prisma commands used by the project.

```bash
npx prisma generate
npx prisma migrate dev
```

## Run the Project

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## API Documentation

Import `UMS.postman_collection.json` into Postman. The current collection contains the API module/request organization and several configured example requests. Some collection entries currently have empty URLs, so those requests should be updated with their final backend routes as the API implementation evolves. fileciteturn0file0L89-L108

## Development Notes

- Keep secrets and credentials in `.env` and do not commit `.env` to Git.
- Validate request data before passing it to Prisma.
- Use transactions for operations that modify multiple related records.
- Keep authentication and authorization checks in middleware.
- Keep business logic inside service modules rather than controllers.
- Update the Postman collection whenever a route or request contract changes.

## License

This project is for educational/development purposes unless a separate license is provided.

