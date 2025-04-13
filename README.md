
# 🏥 eCare - Healthcare Service Platform

A **modern healthcare web platform** built with **React**, **Redux**, **MongoDB**, **Tailwind CSS**, and **Firebase**. The application offers seamless **appointment management**, **doctor listings**, and **user authentication** with a sleek and responsive UI.

---

## 📋 Project Overview

**eCare** is designed to bridge the gap between patients and healthcare services. With user-friendly features and robust technologies, users can manage their appointments, explore doctors/services, and securely log in with Google.

### 🔑 Core Features

- 🗓️ Book, reschedule, and cancel appointments  
- 👨‍⚕️ Browse doctors with specialties  
- 🔐 Secure authentication with Google  
- ⚡ Fast and responsive UI using Tailwind CSS  
- 📱 Mobile-friendly responsive design  
- 🔄 Loading states and error handling for better UX

---

## 🛠️ Technologies Used

| Technology      | Purpose                        |
|----------------|--------------------------------|
| React          | Frontend framework             |
| Redux          | State management               |
| Firebase       | Authentication (Google Login)  |
| Tailwind CSS   | Utility-first CSS styling      |
| Vite           | Frontend build tool            |

---

## 🚀 Installation & Setup

### 1. 📥 Clone the repository

```bash
git clone [your-repository-url]
cd Client
```

### 2. 📦 Install dependencies

```bash
npm install
```

### 3. 🔐 Environment Variables

Create a `.env` file in the root of the project and add your Firebase credentials:

```env
VITE_APP_FIREBASE_API_KEY=your_api_key
VITE_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_APP_FIREBASE_PROJECT_ID=your_project_id
VITE_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_FIREBASE_APP_ID=your_app_id
```

🔁 **Backend Note**: Set up your backend server and make sure the URL is set in:

```env
VITE_BACKEND_URL=https://your-backend-url.com
```

---

## 🧪 Usage & Commands

| Command              | Description               |
|----------------------|---------------------------|
| `npm run dev`        | Start development server  |
| `npm run build`      | Build for production      |
| `npm run test`       | Run test suite            |

---

## 📁 Project Structure

```
Client/
├── index.html              # Main entry
├── public/                 # Public assets
├── src/
│   ├── components/         # Reusable components
│   │   └── card/           # UI Cards
│   ├── config/             # Firebase and others
│   ├── pages/              # Main route pages
│   └── utils/              # Helper functions
├── store/                  # Redux setup
└── tailwind.config.js      # Tailwind CSS config
```

---


