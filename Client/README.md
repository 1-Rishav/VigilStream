# VigilStream Client

The frontend client for **VigilStream**, a secure video streaming application. Built with modern web technologies to provide a responsive, high-performance, and visually stunning user experience.

## 🛠️ Tech Stack & Dependencies

<div align="center">

| Technology | Description |
| :--- | :--- |
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width="40" height="40" /> **React** | Component-based UI library |
| <img src="https://vitejs.dev/logo.svg" width="40" height="40" /> **Vite** | Next-generation frontend tooling |
| <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width="40" height="40" /> **Tailwind CSS** | Utility-first CSS framework (v4) |
| <img src="https://redux.js.org/img/redux.svg" width="40" height="40" /> **Redux Toolkit** | State management for authentication |
| <img src="https://framerusercontent.com/images/48oVuDyvqGdX0rW3w6j5X5tqE.png" width="40" height="40" /> **Framer Motion** | Production-ready animation library |
| <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Socket_io_logo_icon.svg" width="40" height="40" /> **Socket.IO** | Real-time bi-directional event communication |

</div>

### Key Libraries
-   **React Router**: Dynamic client-side routing.
-   **Axios**: Promise-based HTTP client for API requests.
-   **React Toastify**: Sleek, customizable notification toasts.
-   **Lucide React**: Beautiful, consistent icon set.
-   **React Dropzone**: Drag-and-drop file upload handling.
-   **GSAP**: High-performance animations for complex sequences.

---

## 📂 Project Structure

A clean, modular architecture ensures scalability and maintainability.

```graphql
Client/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Generic UI elements (Buttons, Inputs)
│   │   ├── Navbar.jsx      # Main application navigation
│   │   ├── VideoCard.jsx   # Video display unit
│   │   ├── UploadModal.jsx # Drag-drop video uploader
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries (Class merging, etc.)
│   ├── pages/              # Main route views
│   │   ├── Landing.jsx     # Public landing page
│   │   ├── Login.jsx       # Authentication entry
│   │   ├── Dashboard.jsx   # Main video feed & management
│   │   └── AdminPage.jsx   # User management console
│   ├── redux/              # Global state management
│   │   ├── authSlice.js    # Auth state logic (Login/Logout)
│   │   └── store.js        # Redux store configuration
│   ├── utils/
│   │   └── axios.js        # Configured Axios instance
│   ├── App.jsx             # Main application root & routing
│   ├── index.css           # Global styles & Tailwind imports
│   └── main.jsx            # Application entry point
├── .env                    # Environment variables
├── package.json            # Project dependencies
└── vite.config.js          # Vite configuration
```

## 🧠 Core Features & Logic

### 1. Authentication (`redux/authSlice.js`)
We use **Redux Toolkit** to manage the user's session state.
-   **Login/Register**: communicating with the backend to receive a JWT (stored in HTTP-Only cookies by the browser).
-   **Persistence**: The state persists across page reloads via local storage (for user info, not tokens).
-   **Protection**: `ProtectedRoute` components in `App.jsx` check this state to guard sensitive routes.

### 2. Real-Time Dashboard (`pages/Dashboard.jsx`)
The heart of the application.
-   **Socket.IO**: Connects to the backend server to listen for `video:progress` events.
-   **Visual Feedback**: Updates video cards instantly from "Processing" (with dynamic progress bars) to "Ready" without page reloads.
-   **Filtering**: Client-side filtering for "Safe" vs "Flagged" content.

### 3. Video Management
-   **Upload**: `UploadModal` uses `react-dropzone` for file handling and `axios` for multipart form uploads.
-   **Playback**: `VideoPlayerModal` handles video streaming.
-   **Deletion**: Role-based logic (Admin vs Editor) controls visibility of delete actions.

### 4. Admin Console (`pages/AdminPage.jsx`)
A dedicated interface for system administrators.
-   **User Table**: Lists all registered users.
-   **Role Control**: Update user permissions (Viewer/Editor/Admin) instantly.
-   **Design**: Uses dark-themed UI components for a premium feel.

---

## 🚀 How to Run Locally

### Prerequisites
-   Ensure the **Server** is running on port `5000` (see server README).

### Steps

1.  **Navigate to Client Directory**
    ```bash
    cd Client
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start Development Server**
    ```bash
    npm run dev
    ```

4.  **Access Application**
    Open your browser and go to:
    ```
    http://localhost:5173
    ```

## 🎨 Styling System
We utilize **Tailwind CSS v4** for a utility-first design approach.
-   **Theme**: Dark mode enabled by default (`bg-black`, `text-white`).
-   **Accents**: Primary colors used for calls-to-action (Buttons, Progress Bars).
-   **Animations**: `Framer Motion` handles page transitions and modal appearances.

```css
/* Example Custom Override in index.css */
select option {
    background-color: #111; /* Ensures dropdowns match the dark theme */
    color: white;
}
```
