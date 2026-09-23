# 🎬 CineVault

> A modern movie & TV discovery platform built with React, TypeScript, Tailwind CSS, and TMDB.

CineVault is a feature-rich movie and TV discovery application designed to provide a smooth, responsive, and interactive experience for discovering movies, TV shows, actors, and more.

The application integrates with the **TMDB API** and includes advanced search, personalized libraries, detailed media pages, filtering, animations, and persistent local state.

## 🚀 Live Demo

**[View CineVault Live](https://cine-valut-aegyi937s-mohammedkhames792s-projects.vercel.app/)**

## ✨ Features

### 🏠 Home

* Dynamic hero carousel
* Featured movies and TV shows
* Movie & TV switching
* Trailer viewing
* Popular and trending content
* Smooth animations and transitions

### 🔎 Search

* Debounced movie and TV search
* Search suggestions
* Quick filters
* Keyboard shortcut support
* Advanced search integration

### 🎯 Advanced Search

Powerful filtering system with multiple criteria:

* Include / exclude genres
* Keyword search and autocomplete
* Cast filtering
* Match Any / Match All cast options
* Crew filtering
* Production companies
* Release date range
* Rating range
* Minimum vote count
* Runtime
* Language
* Country
* Certification
* Multiple sorting options
* Pagination
* Live result count
* Shareable search URLs

### 🎬 Movie & TV Details

* Full movie and TV information
* Ratings
* Genres
* Keywords
* Cast
* Crew
* Production information
* Collections
* Reviews
* Similar movies
* Recommended content
* TV seasons and episodes

### 👤 People

* Actor / crew profiles
* Biography information
* Known-for content
* Filmography

### ❤️ Library

Personal movie library powered by Zustand:

* Favorites
* Watchlist
* Persistent local storage
* Search and filtering
* Library statistics

### 🎨 UI / UX

* Fully responsive design
* Dark cinematic interface
* Skeleton loading states
* Smooth Framer Motion animations
* Error handling
* Custom 404 page
* Scroll-to-top behavior
* Accessible interactive components
* Mobile-friendly navigation

---

## 🛠️ Tech Stack

### Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Framer Motion
* Lucide React

### State & Data

* TanStack Query
* Zustand
* Axios

### API

* TMDB API

### Deployment

* Vercel

---

## 🏗️ Project Architecture

```text
src/
├── components/
├── pages/
├── hooks/
├── services/
├── store/
├── types/
├── lib/
├── utils/
└── App.tsx
```

The project follows a component-based architecture with separated concerns for:

* UI components
* Pages
* API services
* Custom hooks
* Global state
* Types
* Utility functions

---

## ⚡ Performance

CineVault uses several techniques to provide a smoother experience:

* TanStack Query caching
* Debounced search
* Lazy data fetching
* Optimized API requests
* Skeleton loading states
* Virtualized content where appropriate
* Client-side state persistence
* Responsive rendering

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_TOKEN=your_tmdb_access_token
```

> Never commit your `.env` file or expose private API credentials.

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/mohammedkhames792/Cine-Valut.git
```

Navigate to the project:

```bash
cd Cine-Valut
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
.env
```

Add your TMDB credentials, then run:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🏭 Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📱 Responsive Design

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

---

## 🔮 Future Improvements

Possible future improvements include:

* User authentication
* Backend integration
* Cloud-synchronized libraries
* Personalized recommendations
* Social features
* Advanced user profiles
* More detailed analytics
* Progressive Web App support

---

## 👨‍💻 Developer

**Mohammed Khames**

Frontend Developer focused on building modern, responsive, and interactive web applications with React and TypeScript.

* GitHub: https://github.com/mohammedkhames792

---

## 📄 License

This project was created for educational and portfolio purposes.
