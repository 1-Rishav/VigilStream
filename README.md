# VigilStream
### Next-Generation Secure Video Streaming Platform

![VigilStream Banner](https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=2664&auto=format&fit=crop)

> **VigilStream** is a robust, production-grade video streaming web application designed for security, scalability, and real-time responsiveness. It bridges the gap between secure content management and seamless playback, featuring an intelligent **Role-Based Access Control (RBAC)** system, **Real-Time Sensitivity Analysis**, and **Adaptive Streaming** powered by Cloudinary.

---

## 🌐 Technology Ecosystem

<div align="center">

### Frontend Core
| | | | | |
|:---:|:---:|:---:|:---:|:---:|
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width="50" /> | <img src="https://vitejs.dev/logo.svg" width="50" /> | <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width="50" /> | <img src="https://redux.js.org/img/redux.svg" width="50" /> | <img src="https://framerusercontent.com/images/48oVuDyvqGdX0rW3w6j5X5tqE.png" width="50" /> |
| **React** | **Vite** | **Tailwind** | **Redux** | **Framer** |

### Backend & Infrastructure
| | | | | |
|:---:|:---:|:---:|:---:|:---:|
| <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="55" /> | <img src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress" width="100" /> | <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Socket_io_logo_icon.svg" width="50" /> | <img src="https://cloudinary.com/images/logo-cloudinary_2x.png" width="100" /> | <img src="https://jwt.io/img/pic_logo.svg" width="50" /> |
| **Node.js** | **MongoDB** | **Socket.IO** | **Cloudinary** | **JWT** |

</div>

---

## 📂 Comprehensive Project Structure

Access the complete source code architecture below.

```graphql
VigilStream/
├── Client/                                 # Frontend Application (React + Vite)
│   ├── public/                             # Static public assets
│   ├── src/
│   │   ├── components/                     # Reusable UI Modules
│   │   │   ├── ui/                         # Atomic Design Elements (Buttons, Inputs)
│   │   │   ├── DeleteParamsModal.jsx       # Secure Deletion Confirmation
│   │   │   ├── Navbar.jsx                  # Main Navigation Bar
│   │   │   ├── UploadModal.jsx             # Drag-n-Drop Video Uploader
│   │   │   ├── VideoCard.jsx               # Video Display Unit
│   │   │   └── VideoPlayerModal.jsx        # HTML5 Video Player Overlay
│   │   ├── hooks/                          # Custom React Hooks
│   │   ├── lib/                            # Utility Libraries (Tailwind merge)
│   │   ├── pages/                          # Core Route Views
│   │   │   ├── AdminPage.jsx               # User Management Console (Admin Only)
│   │   │   ├── Dashboard.jsx               # Main Video Feed
│   │   │   ├── Landing.jsx                 # Public Welcome Page
│   │   │   ├── Login.jsx                   # User Authentication
│   │   │   └── Register.jsx                # New User Registration
│   │   ├── redux/                          # Global State Management
│   │   │   ├── authSlice.js                # Auth Actions/Reducers
│   │   │   └── store.js                    # Redux Store Config
│   │   ├── utils/
│   │   │   └── axios.js                    # Pre-configured HTTP Client
│   │   ├── App.jsx                         # App Root & Routing Logic
│   │   ├── main.jsx                        # Entry Point
│   │   └── index.css                       # Global Styles & Tailwind Directives
│   ├── .env                                # Client Environment Variables
│   ├── package.json                        # Frontend Dependencies
│   ├── postcss.config.js                   # CSS Processing Config
│   └── vite.config.js                      # Build Tool Configuration
│
├── Server/                                 # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── config/                         # System Configuration
│   │   │   ├── cloudinary.js               # CDN SDK Setup
│   │   │   └── db.js                       # Database Connection Logic
│   │   ├── controllers/                    # Business Logic Handlers
│   │   │   ├── authController.js           # Auth Logic (Login/Register/Cookie)
│   │   │   ├── userController.js           # Admin Logic (Role Management)
│   │   │   └── videoController.js          # Video Logic (Upload/Stream/Delete)
│   │   ├── middleware/                     # Request Interceptors
│   │   │   └── authMiddleware.js           # JWT Verification & RBAC Guards
│   │   ├── models/                         # Database Schemas (Mongoose)
│   │   │   ├── User.js                     # User Data Model
│   │   │   └── Video.js                    # Video Metadata Model
│   │   ├── routes/                         # API Endpoint Definitions
│   │   │   ├── authRoutes.js               # /api/auth
│   │   │   ├── userRoutes.js               # /api/users
│   │   │   └── videoRoutes.js              # /api/videos
│   │   └── services/                       # Background Services
│   │       └── processingService.js        # Video Analysis & Socket Events
│   ├── .env                                # Server Secrets (Port, Keys, DB URI)
│   ├── server.js                           # Server Entry Point
│   └── package.json                        # Backend Dependencies
│
└── README.md                               # Project Documentation (You are here)
```

---

## ⚡ Key Features

### 🔐 1. Robust Security
-   **Role-Based Access Control (RBAC)**: Distinct permission levels for **Viewers** (Watch-only), **Editors** (Upload/Manage own content), and **Admins** (Full System Control).
-   **HttpOnly Cookies**: JWT tokens are stored securely in cookies, preventing XSS attacks.
-   **Protected Routes**: Middleware ensures regular users cannot access Admin APIs.

### 📹 2. Intelligent Video Pipeline
-   **Adaptive Streaming**: Videos are served via Cloudinary's global CDN for buffer-free playback on any network.
-   **Real-Time Processing**: The `processingService` simulates an AI analysis phase, emitting live progress events (e.g., "Extracting Metadata...", "Running Sensitivity Analysis...") to the frontend via **Socket.IO**.
-   **Metadata Extraction**: Automatically fetches valid duration and file details upon upload.

### 👥 3. Advanced User Management
-   **Admin Console**: A dedicated dashboard for Administrators to view all users.
-   **Instant Role Switching**: Admins can promote/demote users between Viewer, Editor, and Admin roles instantly.

---

## 🚀 Installation & Setup Guide

Follow these steps to run the complete VigilStream ecosystem locally.

### Prerequisites
-   **Node.js** (v18+)
-   **MongoDB** (Local instance or Atlas URI)
-   **Cloudinary Account** (Free tier works perfectly)

### Step 1: Server Setup (Backend)

1.  Navigate to the Server directory:
    ```bash
    cd Server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `Server/` root with your credentials:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/VigilStream
    JWT_SECRET=your_secure_random_string
    NODE_ENV=development
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    > You should see: `Server running in development mode on port 5000`

### Step 2: Client Setup (Frontend)

1.  Open a **new terminal** and navigate to the Client directory:
    ```bash
    cd Client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React application:
    ```bash
    npm run dev
    ```
4.  Open your browser and visit:
    ```
    http://localhost:5173
    ```

---

## 📖 Usage Guide

1.  **Register**: Create a new account. By default, you will be a **Viewer** (or configured default).
2.  **Request Access**: Ask an Admin to promote you to **Editor** or **Admin** via the Admin Page.
3.  **Upload (Editor/Admin)**: Click the "Upload Video" button, drag & drop a file, and watch the real-time processing bars.
4.  **Manage**:
    -   **Editors** can delete their own videos.
    -   **Admins** can delete ANY video and manage ALL users.
5.  **Watch**: Click any video card to stream secure content instantly.

---

## 📜 License
Distributed under the MIT License.
