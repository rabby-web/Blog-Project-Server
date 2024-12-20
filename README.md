# Blog Platform Backend

## Overview
This project provides the backend for a blogging platform where users can write, update, and delete blogs. It includes secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

---

## Features

### User Roles
- **Admin**:
  - Manually created in the database with predefined credentials.
  - Can delete any blog.
  - Can block any user by updating a property `isBlocked`.
  - Cannot update any blog.
- **User**:
  - Can register and log in.
  - Can create, update, and delete their own blogs.
  - Cannot perform admin actions.

### Authentication & Authorization
- Secure user authentication using JWT.
- Role-based access control for Admin and User roles.

### Blog API
- Public API for fetching blogs:
  - Includes search, sort, and filter functionalities.
  - Provides blog title, content, author details, and more.

---

## Technologies Used
- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**

---

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 16.x)
- **npm** (>= 8.x)
- **MongoDB**

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url/blog-platform-backend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-platform-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create an `.env` file in the root directory and configure the environment variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/blog-platform
   JWT_SECRET=your_jwt_secret_key
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Access the API at `http://localhost:3000`.

---

## API Endpoints

### 1. Authentication
- **POST** `/api/auth/register`
- **POST** `/api/auth/login`

### 2. Blog Management
- **POST** `/api/blogs`
- **PATCH** `/api/blogs/:id`
- **DELETE** `/api/blogs/:id`
- **GET** `/api/blogs`

### 3. Admin Actions
- **PATCH** `/api/admin/users/:userId/block`
- **DELETE** `/api/admin/blogs/:id`

---

## Error Handling
A consistent error response format is used across all API endpoints:
```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": "Additional details" },
  "stack": "Stack trace"
}
```

---

## Scripts
- **Start Development Server**:
  ```bash
  npm run dev
  ```
- **Start Production Server**:
  ```bash
  npm start
  ```
- **Linting**:
  ```bash
  npm run lint
  ```

---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature.
3. Commit and push your changes.
4. Open a pull request.

---

## License
This project is licensed under the MIT License.