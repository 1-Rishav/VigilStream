# VigilStream Server

The robust backend API for **VigilStream**, designed to handle secure video streaming, real-time data processing, and user management. Changes are instantly communicated to the client via WebSockets.

## 🛠️ Tech Stack & Dependencies

<div align="center">

| Technology | Description |
| :--- | :--- |
| <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="40" height="40" /> **Node.js + Express** | High-performance Javascript runtime and web framework. |
| <img src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress" width="100" height="40" /> **MongoDB** | NoSQL database for flexible data schemas (Mongoose ORM). |
| <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Socket_io_logo_icon.svg" width="40" height="40" /> **Socket.IO** | WebSocket library for real-time progress updates. |
| <img src="https://cloudinary.com/images/logo-cloudinary_2x.png" width="100" height="40" /> **Cloudinary** | Cloud-based image and video management/streaming CDN. |
| <img src="https://jwt.io/img/pic_logo.svg" width="40" height="40" /> **JWT** | Stateless authentication via JSON Web Tokens. |

</div>

### Internal Modules
-   **Multer**: Handling `multipart/form-data` for file uploads.
-   **Bcrypt**: Industry-standard password hashing.
-   **Cookie-Parser**: Secure handling of HTTP-Only auth cookies.

---

## 📂 Project Structure

The project follows the **MVC (Model-View-Controller)** pattern, adapted for an API-centric architecture (no views).

```graphql
Server/
├── server.js               # Entry point: App config, Middleware, Server start
├── src/
│   ├── config/             # Configuration files
│   │   ├── db.js           # MongoDB connection logic
│   │   └── cloudinary.js   # Cloudinary SDK setup
│   ├── controllers/        # Request handlers (Business Logic)
│   │   ├── authController.js   # Registration, Login, Cookie mgmt
│   │   ├── videoController.js  # Upload, Streaming, Deletion logic
│   │   └── userController.js   # Admin user management
│   ├── models/             # Mongoose Schemas (Data Layer)
│   │   ├── User.js         # User schema & password methods
│   │   └── Video.js        # Video metadata schema
│   ├── routes/             # API Route Definitions
│   │   ├── authRoutes.js   # /api/auth endpoints
│   │   ├── videoRoutes.js  # /api/videos endpoints
│   │   └── userRoutes.js   # /api/users endpoints
│   ├── middleware/         # Custom Middleware
│   │   └── authMiddleware.js # JWT verification & Role checks (RBAC)
│   └── services/           # Background Services
│       └── processingService.js # Simulates video analysis & Socket events
└── .env                    # Environment variables (IGNORED in Git)
```

## 🧠 Core Workflows & Logic

### 1. Security & Authentication
-   **JWT Flow**: On login, a signed JWT is generated and sent as an `HTTP-Only` cookie. This prevents XSS attacks from accessing the token.
-   **RBAC Middleware**: `protect` middleware verifies the token, while `authorize('admin')` checks the user's role before allowing sensitive actions.
-   **Password Security**: Passwords are never stored in plain text; they are hashed using `bcrypt` before saving.

### 2. Video Processing Engine (`processingService.js`)
-   **Architecture**: Uses an event-driven model.
-   **Flow**:
    1.  Video is uploaded to Cloudinary via `videoController`.
    2.  `processingService` is triggered asynchronously.
    3.  It fetches real metadata (duration) from Cloudinary.
    4.  It simulates an AI analysis phase (Checking for keywords).
    5.  Socket.IO emits progress events (`video:progress:ID`) every 500ms to the specific client.

### 3. Streaming Strategy
-   Instead of piping bytes through the Node server (which blocks threads), we generate **Signed URLs** or redirect to **Cloudinary's CDN**.
-   This ensures choppy-free playback and allows the CDN to handle adaptive bitrate streaming and caching.

---

## 🚀 How to Run Locally

### Prerequisites
-   **MongoDB**: Running locally or a URI for MongoDB Atlas.
-   **Cloudinary Account**: You need a `Cloud Name`, `API Key`, and `API Secret`.

### Steps

1.  **Navigate to Server Directory**
    ```bash
    cd Server
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root of `/Server` and populate it:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/VigilStream
    JWT_SECRET=your_super_secret_complex_string
    NODE_ENV=development
    
    # Cloudinary Credentials
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

4.  **Start the Server**
    For development (with hot-reload):
    ```bash
    npm run dev
    ```
    For production:
    ```bash
    npm start
    ```

5.  **Verification**
    The console should output:
    ```
    MongoDB Connected: localhost
    Server running in development mode on port 5000
    ```
