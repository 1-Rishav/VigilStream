<p align="center">
  <img src="https://img.shields.io/badge/VigilStream-Video_Platform-8B5CF6?style=for-the-badge&logo=youtube&logoColor=white" alt="VigilStream" />
</p>

<h1 align="center">🎬 VigilStream</h1>

<p align="center">
  <strong>A secure, high-performance video streaming platform with real-time sensitivity analysis, role-based access control, and cloud-powered media delivery.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [User Roles & Permissions](#-user-roles--permissions)
- [Real-time Features](#-real-time-features)
- [Screenshots](#-screenshots)
- [Testing the Application](#-testing-the-application)
- [Security Features](#-security-features)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**VigilStream** is a full-stack video streaming application designed for organizations that need secure video management with content moderation capabilities. The platform features:

- 🔐 Enterprise-grade authentication with JWT and role-based access
- 📹 Cloud-powered video upload and streaming via Cloudinary CDN
- 🤖 Automated content sensitivity analysis engine
- ⚡ Real-time progress tracking with Socket.io
- 🎨 Modern, responsive UI with smooth animations

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **Secure Authentication** | JWT-based auth with HTTP-only cookies and bcrypt password hashing |
| 👥 **Role-Based Access Control** | Three-tier permission system (Viewer, Editor, Admin) |
| 📤 **Drag & Drop Upload** | Intuitive file upload with real-time progress tracking |
| 🎬 **Video Streaming** | CDN-powered adaptive streaming via Cloudinary |
| 🔍 **Sensitivity Analysis** | Automated content screening with Safe/Flagged classification |
| 📊 **Metadata Management** | Title, description, category, and duration tracking |
| ⚡ **Real-Time Updates** | Socket.io integration for instant status feedback |
| 🎨 **Premium UI/UX** | Modern glassmorphism design with Framer Motion animations |
| 📱 **Responsive Design** | Fully responsive across all device sizes |
| 🌙 **Dark Theme** | Eye-friendly dark mode interface |

---

## 🛠 Tech Stack

### Frontend Technologies

<p align="left">
  <img src="https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2.11.2-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/React_Router-7.11.0-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.1.18-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.23.26-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/GSAP-3.14.2-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Axios-1.13.2-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/Socket.io_Client-4.8.3-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.io" />
  <img src="https://img.shields.io/badge/Lucide_Icons-0.562.0-F56565?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide" />
</p>

### Backend Technologies

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-9.0.2-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/JWT-9.0.3-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Bcrypt-6.0.0-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white" alt="Bcrypt" />
  <img src="https://img.shields.io/badge/Cloudinary-2.8.0-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Multer-2.0.2-FF6600?style=for-the-badge&logo=files&logoColor=white" alt="Multer" />
  <img src="https://img.shields.io/badge/Socket.io-4.8.3-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.io" />
  <img src="https://img.shields.io/badge/Nodemon-3.1.11-76D04B?style=for-the-badge&logo=nodemon&logoColor=white" alt="Nodemon" />
</p>

### Development & Tools

<p align="left">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" />
  <img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code" />
</p>

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (React + Vite)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Landing   │  │    Login    │  │  Dashboard  │  │   Profile   │        │
│  │    Page     │  │   Register  │  │   Videos    │  │   Admin     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│         │                │                │                │                │
│         └────────────────┴────────────────┴────────────────┘                │
│                                    │                                        │
│                          ┌─────────┴─────────┐                              │
│                          │   Redux Store     │                              │
│                          │   (Auth State)    │                              │
│                          └─────────┬─────────┘                              │
└────────────────────────────────────┼────────────────────────────────────────┘
                                     │
                          ┌──────────┴──────────┐
                          │    HTTP (Axios)     │
                          │   WebSocket (io)    │
                          └──────────┬──────────┘
                                     │
┌────────────────────────────────────┼────────────────────────────────────────┐
│                              SERVER (Express)                               │
│                                    │                                        │
│  ┌─────────────────────────────────┴─────────────────────────────────┐     │
│  │                         API Routes                                 │     │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐                      │     │
│  │  │   /auth   │  │  /videos  │  │  /users   │                      │     │
│  │  └───────────┘  └───────────┘  └───────────┘                      │     │
│  └───────────────────────────────────────────────────────────────────┘     │
│                                    │                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Middleware  │  │ Controllers │  │   Models    │  │  Services   │        │
│  │  (JWT/RBAC) │  │  (Logic)    │  │ (Mongoose)  │  │ (Processing)│        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│         │                │                │                │                │
└─────────┼────────────────┼────────────────┼────────────────┼────────────────┘
          │                │                │                │
          │                │                │                │
┌─────────┴────────┐ ┌─────┴─────┐ ┌────────┴────────┐ ┌─────┴─────┐
│    Socket.io     │ │  MongoDB  │ │   Cloudinary    │ │    JWT    │
│  (Real-time)     │ │ (Database)│ │  (CDN Storage)  │ │  (Auth)   │
└──────────────────┘ └───────────┘ └─────────────────┘ └───────────┘
```

---

## 📁 Project Structure

```
VigilStream/
│
├── 📄 README.md                         # This file - Project documentation
│
├── 📂 Client/                           # Frontend React Application
│   ├── 📄 index.html                    # HTML entry point
│   ├── 📄 package.json                  # Frontend dependencies
│   ├── 📄 vite.config.js                # Vite configuration
│   ├── 📄 README.md                     # Client documentation
│   │
│   └── 📂 src/                          # Source code
│       ├── 📄 main.jsx                  # React entry point
│       ├── 📄 App.jsx                   # Main app with routing
│       ├── 📄 index.css                 # Global styles
│       │
│       ├── 📂 components/               # Reusable UI components
│       │   ├── 📄 Navbar.jsx            # Navigation bar
│       │   ├── 📄 RoleRoute.jsx         # RBAC route wrapper
│       │   ├── 📄 UploadModal.jsx       # Video upload modal
│       │   ├── 📄 VideoPlayerModal.jsx  # Video playback modal
│       │   ├── 📄 DeleteParamsModal.jsx # Delete confirmation
│       │   │
│       │   └── 📂 ui/                   # Base UI components
│       │       ├── 📄 button.jsx        # Button component
│       │       └── 📄 input.jsx         # Input component
│       │
│       ├── 📂 pages/                    # Page components
│       │   ├── 📄 Landing.jsx           # Public landing page
│       │   ├── 📄 Login.jsx             # User login
│       │   ├── 📄 Register.jsx          # User registration
│       │   ├── 📄 Dashboard.jsx         # Main dashboard
│       │   ├── 📄 Profile.jsx           # User profile
│       │   └── 📄 AdminPage.jsx         # Admin panel
│       │
│       ├── 📂 redux/                    # State management
│       │   ├── 📄 store.js              # Redux store config
│       │   └── 📄 authSlice.js          # Auth state slice
│       │
│       ├── 📂 hooks/                    # Custom React hooks
│       │
│       ├── 📂 lib/                      # Utility libraries
│       │   └── 📄 utils.js              # Helper functions
│       │
│       └── 📂 utils/                    # Utilities
│           └── 📄 axios.js              # Axios instance
│
└── 📂 Server/                           # Backend Node.js Application
    ├── 📄 server.js                     # Express app entry point
    ├── 📄 package.json                  # Backend dependencies
    ├── 📄 .env                          # Environment variables
    ├── 📄 README.md                     # Server documentation
    │
    └── 📂 src/                          # Source code
        ├── 📂 config/                   # Configuration
        │   ├── 📄 db.js                 # MongoDB connection
        │   └── 📄 cloudinary.js         # Cloudinary setup
        │
        ├── 📂 controllers/              # Route handlers
        │   ├── 📄 authController.js     # Auth logic
        │   ├── 📄 videoController.js    # Video CRUD
        │   └── 📄 userController.js     # User management
        │
        ├── 📂 middleware/               # Custom middleware
        │   └── 📄 authMiddleware.js     # JWT & RBAC
        │
        ├── 📂 models/                   # Database schemas
        │   ├── 📄 User.js               # User model
        │   └── 📄 Video.js              # Video model
        │
        ├── 📂 routes/                   # API routes
        │   ├── 📄 authRoutes.js         # /api/auth
        │   ├── 📄 videoRoutes.js        # /api/videos
        │   └── 📄 userRoutes.js         # /api/users
        │
        ├── 📂 services/                 # Business services
        │   └── 📄 processingService.js  # Video processing
        │
        └── 📂 utils/                    # Utility functions
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Download |
|-------------|---------|----------|
| Node.js | v18 or higher | [nodejs.org](https://nodejs.org/) |
| npm | v9 or higher | Comes with Node.js |
| MongoDB | v6 or higher | [mongodb.com](https://www.mongodb.com/try/download/community) |
| Git | Latest | [git-scm.com](https://git-scm.com/) |

You'll also need:
- **Cloudinary Account** - [Sign up free](https://cloudinary.com/users/register/free)

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/vigilstream.git
cd VigilStream
```

#### 2️⃣ Setup Backend Server

```bash
# Navigate to Server directory
cd Server

# Install dependencies
npm install

# Create environment file
# (See Environment Variables section below)

# Start development server
npm run dev
```

The server will start at `http://localhost:5001`

#### 3️⃣ Setup Frontend Client

```bash
# Open new terminal and navigate to Client directory
cd Client

# Install dependencies
npm install

# Start development server
npm run dev
```

The client will start at `http://localhost:5173`

### Quick Start Commands

```bash
# Terminal 1 - Start Backend
cd Server && npm run dev

# Terminal 2 - Start Frontend
cd Client && npm run dev
```

---

## 🔐 Environment Variables

### Server Configuration (`Server/.env`)

Create a `.env` file in the `Server` directory:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/VigilStream

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `NODE_ENV` | Environment (`development` / `production`) | Yes |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |

### Client Configuration

The client uses the following default configuration in `Client/src/utils/axios.js`:

```javascript
baseURL: 'http://localhost:5001/api'
```

Update this if your server runs on a different port.

---

## 📡 API Reference

### Base URL
```
http://localhost:5001/api
```

### Authentication Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/auth/register` | Public | Register new user |
| `POST` | `/auth/login` | Public | Login user |
| `GET` | `/auth/me` | Private | Get current user |
| `GET` | `/auth/logout` | Private | Logout user |

### Video Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/videos` | Private | Get all videos |
| `POST` | `/videos` | Editor/Admin | Upload new video |
| `GET` | `/videos/:id` | Private | Get single video |
| `DELETE` | `/videos/:id` | Owner/Admin | Delete video |
| `GET` | `/videos/:id/stream` | Private | Stream video |

### User Management Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/users` | Admin | Get all users |
| `PUT` | `/users/:id/role` | Admin | Update user role |

### Request/Response Examples

<details>
<summary><b>Register User</b></summary>

**Request:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "viewer"
  }
}
```
</details>

<details>
<summary><b>Upload Video</b></summary>

**Request:**
```bash
POST /api/videos
Content-Type: multipart/form-data
Authorization: Bearer <token>

{
  "video": <file>,
  "title": "My Video",
  "description": "Video description",
  "category": "Tutorial"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "title": "My Video",
    "status": "processing",
    "url": "https://res.cloudinary.com/..."
  },
  "message": "Video uploaded successfully. Processing started."
}
```
</details>

---

## 👥 User Roles & Permissions

VigilStream implements a three-tier Role-Based Access Control (RBAC) system:

| Role | Permissions |
|------|-------------|
| 👁️ **Viewer** | View videos, stream videos, view own profile |
| ✏️ **Editor** | All Viewer permissions + upload videos, delete own videos |
| 👑 **Admin** | All permissions + manage users, delete any video, access admin panel |

### Permission Matrix

| Action | Viewer | Editor | Admin |
|--------|:------:|:------:|:-----:|
| View Videos | ✅ | ✅ | ✅ |
| Stream Videos | ✅ | ✅ | ✅ |
| Upload Videos | ❌ | ✅ | ✅ |
| Delete Own Videos | ❌ | ✅ | ✅ |
| Delete Any Video | ❌ | ❌ | ✅ |
| View All Users | ❌ | ❌ | ✅ |
| Manage User Roles | ❌ | ❌ | ✅ |
| Access Admin Panel | ❌ | ❌ | ✅ |

---

## ⚡ Real-time Features

VigilStream uses Socket.io for real-time communication:

### Video Processing Progress

```javascript
// Client-side listener
socket.on(`video:progress:${videoId}`, (data) => {
  console.log(`Progress: ${data.progress}%`);
  console.log(`Status: ${data.status}`);
  console.log(`Message: ${data.message}`);
});
```

### Processing Stages

| Progress | Stage | Description |
|----------|-------|-------------|
| 0-20% | Uploading | File being uploaded to Cloudinary |
| 20-30% | Metadata | Extracting video metadata |
| 30-60% | Analysis | Running sensitivity analysis |
| 60-90% | Processing | Finalizing video processing |
| 100% | Complete | Video ready for streaming |

---

## 🖼 Screenshots

### Landing Page
```
┌─────────────────────────────────────────────────────────────┐
│  VigilStream                              [Login] [Register]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│              🎬 Welcome to VigilStream                      │
│                                                             │
│         Secure Video Streaming Platform                     │
│                                                             │
│              [Get Started]  [Learn More]                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│  V VigilStream    Dashboard    Admin Area    [👤 Username]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📤 Upload Video                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │         Drag & drop your video here                 │   │
│  │              or click to browse                     │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  📹 Your Videos                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │ Video 1 │  │ Video 2 │  │ Video 3 │  │ Video 4 │       │
│  │  SAFE   │  │ FLAGGED │  │  SAFE   │  │  SAFE   │       │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing the Application

### Step-by-Step Testing Guide

1. **Register a New Account**
   - Navigate to `http://localhost:5173/register`
   - Fill in username, email, and password
   - Click "Register"

2. **Login**
   - Navigate to `http://localhost:5173/login`
   - Enter your credentials
   - Click "Login"

3. **Upload a Video** (Editor/Admin only)
   - Go to Dashboard
   - Click "Upload Video" or drag & drop a video file
   - Fill in title, description, and category
   - Watch the real-time progress bar

4. **View Processing Results**
   - Observe the sensitivity analysis result (SAFE/FLAGGED)
   - Check the video metadata

5. **Stream a Video**
   - Click the play icon on any video card
   - Video will stream via Cloudinary CDN

6. **Admin Functions** (Admin only)
   - Navigate to Admin Area
   - View all users
   - Change user roles

### Test Accounts

For testing, you can create accounts with different roles:

```javascript
// Register as viewer (default)
{ "username": "viewer1", "email": "viewer@test.com", "password": "test123" }

// Register as editor
{ "username": "editor1", "email": "editor@test.com", "password": "test123", "role": "editor" }

// Register as admin
{ "username": "admin1", "email": "admin@test.com", "password": "test123", "role": "admin" }
```

---

## 🛡 Security Features

| Feature | Implementation |
|---------|----------------|
| **Password Hashing** | Bcrypt with 10 salt rounds |
| **JWT Authentication** | Signed tokens with 30-day expiry |
| **HTTP-Only Cookies** | Prevents XSS token theft |
| **CORS Protection** | Restricted to allowed origins |
| **Input Validation** | Mongoose schema validation |
| **Role-Based Access** | Middleware-enforced permissions |
| **Secure Headers** | Production-ready security headers |

### Security Best Practices

- ✅ Passwords are never stored in plain text
- ✅ JWT tokens are stored in HTTP-only cookies
- ✅ API endpoints are protected by authentication middleware
- ✅ Role-based access control on sensitive routes
- ✅ Input validation on all API endpoints
- ✅ CORS configured for specific origins only

---

## 📝 Available Scripts

### Client Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start development server |
| `build` | `npm run build` | Create production build |
| `preview` | `npm run preview` | Preview production build |
| `lint` | `npm run lint` | Run ESLint |

### Server Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `npm start` | Start production server |
| `dev` | `npm run dev` | Start with hot reload |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
   ```bash
   git fork https://github.com/yourusername/vigilstream.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation as needed
- Add tests for new features
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Express](https://expressjs.com/) - Web Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Cloudinary](https://cloudinary.com/) - Media Storage
- [Socket.io](https://socket.io/) - Real-time Communication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

<p align="center">
  Made with 💙 by the VigilStream
</p>

<p align="center">
  <a href="#-vigilstream">Back to Top ⬆️</a>
</p>
