# Student and Course Management System

## Project Overview

This project is a web-based Student and Course Management System built using Vue 3, Express.js, and MongoDB. It allows users to manage student records, create courses, and enroll students in available courses.

The application uses Vue 3 for the frontend, Pinia for state management, Vue Router for navigation, and Express.js for backend API requests. MongoDB Community Edition is used for persistent data storage.

## Technologies Used

- Vue 3
- JavaScript
- Pinia
- Vue Router
- Node.js
- Express.js
- MongoDB Community Edition
- Mongoose
- Axios
- Vite

## Features

### Student Management
- Add, view, search, and delete students.
- Validate required student information.
- Prevent duplicate student IDs.

### Course Management
- Add, view, and delete courses.
- Validate required course information.
- Prevent duplicate course IDs.

### Enrollment Management
- Enroll existing students in available courses.
- Prevent duplicate enrollments.
- View students enrolled in a selected course.
- Automatically delete associated enrollments when a student or course is deleted.

### Database Management
- Store students, courses, and enrollments in MongoDB.
- Use Mongoose schemas and models.
- Maintain data integrity through validation and unique constraints.
- Preserve records after restarting the server.

## Required Software

Install the following software before running the application:

- **Node.js and npm:** Used to install dependencies and run the application.
- **MongoDB Community Edition:** Used as the local database.
- **Git:** Used to clone the project repository.

## Environment Configuration

The project uses two `.env` files.

### Frontend `.env`

Located in the project root directory, outside the frontend and backend folders.

```env
VITE_ROOT_API=http://localhost:3000
```

This configures the API address used by the Vue frontend.

### Backend `.env`

Located inside the backend directory.

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/cis3339_homework1
```

These variables configure the Express server and local MongoDB connection.

## Installation

### 1. Install Frontend Dependencies

Open a terminal and run:

```bash
cd frontend
npm ci
```

### 2. Install Backend Dependencies

Open new terminal and run:

```bash
cd backend
npm ci
```

### 3. Configure Environment Variables

Make sure both `.env` files are present in their specified locations and contain the required variables listed above.

## Starting MongoDB Community Edition

Make sure MongoDB Community Edition is installed and running locally before starting the application.


## Production Build

From the frontend directory, run:

```bash
npm run build
```

This compiles and optimizes the Vue application and generates production files in the backend's `public` directory.

## Starting the Application

Make sure MongoDB Community Edition is running.

From the backend directory, run:

```bash
npm start
```

The Express server connects to MongoDB and serves the production frontend.

## Accessing the Application

Open the following URL in your browser:

**http://localhost:3000**

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Retrieve all students |
| POST | `/api/students` | Add a student |
| DELETE | `/api/students/:id` | Delete a student |
| GET | `/api/courses` | Retrieve all courses |
| POST | `/api/courses` | Add a course |
| DELETE | `/api/courses/:id` | Delete a course |
| GET | `/api/enrollments` | Retrieve all enrollments |
| POST | `/api/enrollments` | Add an enrollment |

## Database Structure

The application uses three MongoDB collections.

### Students
- `name`
- `id`
- `phone`
- `zip`

### Courses
- `id`
- `name`

### Enrollments
- `studentId`
- `courseId`

Enrollment records reference existing students and courses. When a student or course is deleted, its associated enrollment records are automatically removed.

## Running the Application After Installation

For normal use:

1. Start MongoDB Community Edition.
2. From the frontend directory, run `npm run build` whenever frontend changes need to be included in the production application.
3. From the backend directory, run `npm start`.
4. Open **http://localhost:3000** in your browser.

The application uses MongoDB for persistent storage, so student, course, and enrollment records remain available after restarting the server.