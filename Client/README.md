# VigilStream Client

A modern, responsive video streaming platform client built with React 19 and Vite. This application provides a sleek user interface for video management, user authentication, and admin controls.

---

## 🛠️ Tech Stack

| Technology | Description | Logo |
|------------|-------------|------|
| **React 19** | UI Library | ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white) |
| **Vite 7** | Build Tool & Dev Server | ![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite&logoColor=white) |
| **Tailwind CSS 4** | Utility-First CSS Framework | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white) |
| **Redux Toolkit** | State Management | ![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white) |
| **React Router 7** | Client-Side Routing | ![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat&logo=reactrouter&logoColor=white) |
| **Axios** | HTTP Client | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) |
| **Framer Motion** | Animation Library | ![Framer](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white) |
| **GSAP** | Advanced Animations | ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=white) |
| **Socket.io Client** | Real-time Communication | ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socketdotio&logoColor=white) |
| **Lucide React** | Icon Library | ![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=flat&logo=lucide&logoColor=white) |

---

## 📁 Project Structure

```
Client/
├── 📄 index.html                    # HTML entry point
├── 📄 package.json                  # Dependencies & scripts
├── 📄 vite.config.js                # Vite configuration
├── 📄 README.md                     # This file
│
└── 📂 src/                          # Source code
    ├── 📄 main.jsx                  # React entry point with Redux Provider
    ├── 📄 App.jsx                   # Main app with routing configuration
    ├── 📄 index.css                 # Global styles & Tailwind imports
    │
    ├── 📂 components/               # Reusable UI components
    │   ├── 📄 Navbar.jsx            # Navigation bar with user menu
    │   ├── 📄 RoleRoute.jsx         # Role-based access control wrapper
    │   ├── 📄 UploadModal.jsx       # Video upload modal component
    │   ├── 📄 VideoPlayerModal.jsx  # Video playback modal
    │   ├── 📄 DeleteParamsModal.jsx # Delete confirmation modal
    │   │
    │   └── 📂 ui/                   # Base UI components (shadcn-style)
    │       ├── 📄 button.jsx        # Reusable button component
    │       └── 📄 input.jsx         # Reusable input component
    │
    ├── 📂 pages/                    # Page components (routes)
    │   ├── 📄 Landing.jsx           # Public landing page
    │   ├── 📄 Login.jsx             # User login page
    │   ├── 📄 Register.jsx          # User registration page
    │   ├── 📄 Dashboard.jsx         # Main dashboard (protected)
    │   ├── 📄 Profile.jsx           # User profile page (protected)
    │   └── 📄 AdminPage.jsx         # Admin panel (admin only)
    │
    ├── 📂 redux/                    # Redux state management
    │   ├── 📄 store.js              # Redux store configuration
    │   └── 📄 authSlice.js          # Authentication state slice
    │
    ├── 📂 hooks/                    # Custom React hooks
    │
    ├── 📂 lib/                      # Utility libraries
    │   └── 📄 utils.js              # Helper functions (cn for classnames)
    │
    └── 📂 utils/                    # Utility functions
        └── 📄 axios.js              # Axios instance with base config
```

---

## 🎯 Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Protected routes for authenticated users
- Role-Based Access Control (RBAC) - Admin routes

### 📹 Video Management
- Video upload with drag & drop support (react-dropzone)
- Video playback modal
- Delete video functionality

### 🎨 UI/UX
- Dark theme with modern glassmorphism design
- Smooth animations with Framer Motion & GSAP
- Responsive design for all screen sizes
- Toast notifications (react-toastify)
- Lucide icons throughout the app

### 🔄 State Management
- Centralized state with Redux Toolkit
- Persistent authentication state

### 🌐 Real-time Features
- Socket.io integration for real-time updates

---

## 📦 Dependencies Breakdown

### Core Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.2.3 | UI library |
| `react-dom` | ^19.2.3 | React DOM rendering |
| `react-router-dom` | ^7.11.0 | Client-side routing |

### State Management
| Package | Version | Purpose |
|---------|---------|---------|
| `@reduxjs/toolkit` | ^2.11.2 | Redux state management |
| `react-redux` | ^9.2.0 | React-Redux bindings |

### Styling
| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^4.1.18 | Utility-first CSS |
| `@tailwindcss/vite` | ^4.1.18 | Vite plugin for Tailwind |
| `clsx` | ^2.1.1 | Conditional classnames |
| `tailwind-merge` | ^3.4.0 | Merge Tailwind classes |

### Animation
| Package | Version | Purpose |
|---------|---------|---------|
| `framer-motion` | ^12.23.26 | React animations |
| `gsap` | ^3.14.2 | Advanced animations |

### HTTP & Real-time
| Package | Version | Purpose |
|---------|---------|---------|
| `axios` | ^1.13.2 | HTTP client |
| `socket.io-client` | ^4.8.3 | WebSocket client |

### UI Components
| Package | Version | Purpose |
|---------|---------|---------|
| `lucide-react` | ^0.562.0 | Icon library |
| `react-dropzone` | ^14.3.8 | File upload drag & drop |
| `react-toastify` | ^11.0.5 | Toast notifications |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager

### Installation

1. **Navigate to the Client directory**
   ```bash
   cd Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or with yarn:
   ```bash
   yarn install
   ```

### Running the Application

#### Development Mode
Start the development server with hot reload:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

#### Production Build
Create an optimized production build:
```bash
npm run build
```

#### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

#### Linting
Run ESLint to check code quality:
```bash
npm run lint
```

---

## ⚙️ Configuration

### API Base URL
The API base URL is configured in `src/utils/axios.js`:
```javascript
baseURL: 'http://localhost:5001/api'
```
Update this URL to match your backend server address.

### Path Aliases
The project uses `@` as an alias for the `src` directory:
```javascript
import Component from '@/components/Component'
```

---

## 🔗 Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Landing | Public | Landing page |
| `/login` | Login | Public | User login |
| `/register` | Register | Public | User registration |
| `/dashboard` | Dashboard | Protected | Main dashboard |
| `/profile` | Profile | Protected | User profile |
| `/admin` | AdminPage | Admin Only | Admin panel |

---

## 📝 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start development server |
| `build` | `vite build` | Create production build |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint . --ext js,jsx` | Run ESLint |

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
