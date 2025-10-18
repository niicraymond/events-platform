# Events Platform

A full-stack web application built for a small community business to create, share, and manage community events.  
Staff members can create and edit events, while regular users can register, pay (simulated), and add events to their Google Calendar.


## Live Demo

- **Frontend (Netlify):** [https://neon-cocada-8074fe.netlify.app/](https://neon-cocada-8074fe.netlify.app/)
- **Backend (Render):** [https://events-platform-4muy.onrender.com](https://events-platform-4muy.onrender.com)


### Core Features

- Staff Dashboard – Create, edit, and delete community events  
- User Sign-Up – Users can register and log in securely  
- Event Registration – Users can sign up or unsign from events  
- Payment Simulation – Handles paid vs free events logically  
- Google Calendar Integration – Add events to Google Calendar  
- JWT Authentication – Token-based login system  
- Deployed Full Stack – Frontend on Netlify, backend on Render  


## Tech Stack

### Frontend
- React (Vite)
- React Router
- Tailwind CSS

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- dotenv for environment variables
- CORS enabled for frontend/backend communication

### Hosting
- Frontend: Netlify  
- Backend: Render  
- Database: MongoDB Atlas  


## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/niicraymond/events-platform.git
cd events-platform
```

### 2. Install dependencies

**Backend**
```bash
cd backend
npm install
```

**Frontend**
```bash
cd ../frontend/vite-project
npm install
```


### 3. Environment Variables

Create `.env` in the backend directory:

```
PORT=3000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
```

Create `.env` in the frontend/vite-project directory:

```
VITE_API_URL=https://events-platform-4muy.onrender.com
```


### 4. Run Locally

**Backend**
```bash
cd backend
npm start
```

**Frontend**
```bash
cd ../frontend/vite-project
npm run dev
```

Then visit `http://localhost:5173` in your browser.


## User Roles

 - Staff - Create, edit, and delete events 
 - User - View, sign up, and pay for events 

## Scripts

### Frontend

 - npm run dev - Start development server 
 - npm run build - Build for production 

### Backend

 - npm start - Start server 
 - npm install - Install dependencies 


