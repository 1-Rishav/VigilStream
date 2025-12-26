# VigilStream Server

A robust, scalable backend API for the VigilStream video streaming platform built with Node.js, Express 5, and MongoDB. This server handles user authentication, video management, cloud storage integration, and real-time communication.

---

## 🛠️ Tech Stack

| Technology | Description | Logo |
|------------|-------------|------|
| **Node.js** | JavaScript Runtime | ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=nodedotjs&logoColor=white) |
| **Express 5** | Web Framework | ![Express](https://img.shields.io/badge/Express-5-000000?style=flat&logo=express&logoColor=white) |
| **MongoDB** | NoSQL Database | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) |
| **Mongoose 9** | MongoDB ODM | ![Mongoose](https://img.shields.io/badge/Mongoose-9-880000?style=flat&logo=mongoose&logoColor=white) |
| **JWT** | Authentication | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) |
| **Bcrypt** | Password Hashing | ![Bcrypt](https://img.shields.io/badge/Bcrypt-6-003A70?style=flat&logo=letsencrypt&logoColor=white) |
| **Cloudinary** | Cloud Media Storage | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) |
| **Multer** | File Upload Handling | ![Multer](https://img.shields.io/badge/Multer-2-FF6600?style=flat&logo=files&logoColor=white) |
| **Socket.io** | Real-time Communication | ![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?style=flat&logo=socketdotio&logoColor=white) |
| **Nodemon** | Development Server | ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=nodemon&logoColor=white) |

---

## 📁 Project Structure

```
Server/
├── 📄 server.js                     # Main entry point - Express app setup
├── 📄 package.json                  # Dependencies & scripts
├── 📄 .env                          # Environment variables (not in git)
├── 📄 README.md                     # This file
│
└── 📂 src/                          # Source code
    │
    ├── 📂 config/                   # Configuration files
    │   ├── 📄 db.js                 # MongoDB connection setup
    │   └── 📄 cloudinary.js         # Cloudinary & Multer configuration
    │
    ├── 📂 controllers/              # Route handlers (business logic)
    │   ├── 📄 authController.js     # Authentication logic (register, login, logout)
    │   ├── 📄 videoController.js    # Video CRUD operations
    │   └── 📄 userController.js     # User management (admin only)
    │
    ├── 📂 middleware/               # Custom middleware
    │   └── 📄 authMiddleware.js     # JWT verification & role authorization
    │
    ├── 📂 models/                   # Mongoose schemas
    │   ├── 📄 User.js               # User model with password hashing
    │   └── 📄 Video.js              # Video model with metadata
    │
    ├── 📂 routes/                   # API route definitions
    │   ├── 📄 authRoutes.js         # /api/auth/* routes
    │   ├── 📄 videoRoutes.js        # /api/videos/* routes
    │   └── 📄 userRoutes.js         # /api/users/* routes (admin)
    │
    ├── 📂 services/                 # Business services
    │   └── 📄 processingService.js  # Video processing with Socket.io updates
    │
    └── 📂 utils/                    # Utility functions
```

---

## 🎯 Features

### 🔐 Authentication & Authorization
- **User Registration** - Create new accounts with email validation
- **User Login** - JWT-based authentication with HTTP-only cookies
- **Password Hashing** - Secure bcrypt encryption (10 salt rounds)
- **Protected Routes** - JWT verification middleware
- **Role-Based Access Control (RBAC)** - Three roles: `viewer`, `editor`, `admin`

### 📹 Video Management
- **Video Upload** - Direct upload to Cloudinary (up to 100MB)
- **Video Streaming** - CDN-powered streaming via Cloudinary URLs
- **Video Metadata** - Title, description, category, duration, size
- **Video Processing** - Background processing with real-time progress updates
- **Sensitivity Analysis** - Rule-based content flagging system
- **Video Deletion** - Remove from both database and Cloudinary

### 👥 User Management (Admin Only)
- **List All Users** - View all registered users
- **Update User Roles** - Promote/demote users between roles

### 🌐 Real-time Features
- **Socket.io Integration** - Real-time video processing progress
- **Live Updates** - Instant notifications when videos are ready

### 🛡️ Security Features
- **CORS Configuration** - Restricted to allowed origins
- **HTTP-Only Cookies** - Secure token storage
- **Input Validation** - Mongoose schema validation
- **Error Handling** - Centralized error middleware

---

## 📦 Dependencies Breakdown

### Core Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.2.1 | Web framework |
| `mongoose` | ^9.0.2 | MongoDB ODM |
| `dotenv` | ^17.2.3 | Environment variables |

### Authentication & Security
| Package | Version | Purpose |
|---------|---------|---------|
| `jsonwebtoken` | ^9.0.3 | JWT token generation/verification |
| `bcrypt` | ^6.0.0 | Password hashing |
| `cookie-parser` | ^1.4.7 | Parse cookies from requests |
| `cors` | ^2.8.5 | Cross-Origin Resource Sharing |

### File Upload & Storage
| Package | Version | Purpose |
|---------|---------|---------|
| `cloudinary` | ^2.8.0 | Cloud media storage |
| `multer` | ^2.0.2 | Multipart form data handling |
| `multer-storage-cloudinary` | ^4.0.0 | Cloudinary storage engine for Multer |

### Real-time Communication
| Package | Version | Purpose |
|---------|---------|---------|
| `socket.io` | ^4.8.3 | WebSocket server |

### Development
| Package | Version | Purpose |
|---------|---------|---------|
| `nodemon` | ^3.1.11 | Auto-restart on file changes |

---

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/register` | Public | Register new user |
| `POST` | `/login` | Public | Login user |
| `GET` | `/me` | Private | Get current user |
| `GET` | `/logout` | Private | Logout user |

### Video Routes (`/api/videos`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Private | Get all videos |
| `POST` | `/` | Editor/Admin | Upload new video |
| `GET` | `/:id` | Private | Get single video |
| `DELETE` | `/:id` | Owner/Admin | Delete video |
| `GET` | `/:id/stream` | Private | Stream video |

### User Routes (`/api/users`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Admin | Get all users |
| `PUT` | `/:id/role` | Admin | Update user role |

---

## 🔄 How It Works

### 1. Authentication Flow
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   Server    │────▶│  MongoDB    │
│  (Login)    │     │ (Validate)  │     │ (User Data) │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       │◀──────────────────│
       │   JWT Token +     │
       │   HTTP-Only Cookie│
```

### 2. Video Upload Flow
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   Multer    │────▶│ Cloudinary  │
│  (Upload)   │     │ (Process)   │     │  (Storage)  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  MongoDB    │
                    │ (Metadata)  │
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ Socket.io   │
                    │ (Progress)  │
                    └─────────────┘
```

### 3. Role-Based Access Control
| Role | Permissions |
|------|-------------|
| `viewer` | View videos, stream videos |
| `editor` | All viewer permissions + upload/delete own videos |
| `admin` | All permissions + manage users + delete any video |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas)
- **Cloudinary Account** (for video storage)

### Installation

1. **Navigate to the Server directory**
   ```bash
   cd Server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or with yarn:
   ```bash
   yarn install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the Server directory:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/VigilStream
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Running the Application

#### Development Mode
Start the server with hot reload (nodemon):
```bash
npm run dev
```
The server will be available at `http://localhost:5001`

#### Production Mode
Start the server without hot reload:
```bash
npm start
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5001` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/VigilStream` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your_api_secret` |

### CORS Configuration
The server allows requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:5174` (Alternative Vite port)

Update `server.js` to add more origins if needed.

---

## 📝 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `node server.js` | Start production server |
| `dev` | `nodemon server.js` | Start development server with hot reload |

---

## 🔌 Socket.io Events

### Server Emits
| Event | Payload | Description |
|-------|---------|-------------|
| `video:progress:{videoId}` | `{ videoId, progress, status, message }` | Video processing progress |
| `video:updated` | `Video object` | Video processing complete |

### Client Listens
```javascript
socket.on(`video:progress:${videoId}`, (data) => {
    console.log(`Progress: ${data.progress}%`);
});
```

---

## 🗄️ Database Models

### User Model
```javascript
{
    username: String,      // Required
    email: String,         // Required, unique, validated
    password: String,      // Required, min 6 chars, hashed
    role: String,          // 'viewer' | 'editor' | 'admin'
    createdAt: Date
}
```

### Video Model
```javascript
{
    title: String,              // Required
    description: String,
    category: String,           // Default: 'Uncategorized'
    filename: String,           // Original filename
    cloudinaryId: String,       // Cloudinary public ID
    url: String,                // Cloudinary URL
    size: Number,               // File size in bytes
    mimetype: String,           // MIME type
    duration: Number,           // Duration in seconds
    owner: ObjectId,            // Reference to User
    status: String,             // 'uploading' | 'processing' | 'ready' | 'failed'
    sensitivity: {
        status: String,         // 'pending' | 'safe' | 'flagged'
        reason: String,
        score: Number
    },
    processingProgress: Number, // 0-100
    createdAt: Date,
    updatedAt: Date
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is part of the VigilStream application.
