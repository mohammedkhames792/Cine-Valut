# 🎬 CineVault

> A modern movie & TV discovery platform built with React, TypeScript, Tailwind CSS, and the TMDB API.

CineVault is a responsive movie and TV discovery application that lets users explore trending and popular content, search across movies and TV shows, view detailed information, discover cast and crew members, and manage a personal library.

The project focuses on building a realistic, production-style frontend experience with modern React architecture, API integration, state management, responsive UI, animations, caching, and persistent client-side storage.

## 🚀 Live Demo

**[Visit CineVault]((https://cine-valut-3hvj.vercel.app/))**

## 📸 Preview

Add screenshots of the application here.

Recommended screenshots:

* Home page
* Movie details
* Advanced search
* Library
* Mobile responsive view

## ✨ Features

### 🏠 Home

* Trending movies and TV shows
* Popular content
* Featured content
* Movie / TV browsing
* Trailer playback
* Smooth animations
* Responsive layout

### 🔎 Search

* Movie and TV search
* Debounced search
* Search suggestions
* Quick filters
* Keyboard-friendly interactions
* Pagination

### 🎯 Advanced Search

A powerful discovery system with multiple filtering options:

* Include genres
* Exclude genres
* Keywords
* Cast
* Crew
* Production companies
* Release date range
* Rating range
* Minimum vote count
* Runtime range
* Original language
* Country
* Certification
* Multiple sorting options
* Pagination
* Shareable search parameters

### 🎬 Movie & TV Details

Each title has a dedicated details page containing:

* Ratings
* Genres
* Overview
* Cast
* Crew
* Keywords
* Production information
* Collections
* Reviews
* Similar content
* Recommendations
* Trailers
* TV seasons and episodes

### 👤 People

* Actor and crew profiles
* Biography
* Known-for content
* Filmography
* Profile information

### ❤️ Personal Library

Users can manage their own movie and TV library using Zustand:

* Favorites
* Watchlist
* Persistent local storage
* Library search
* Filtering
* Sorting
* Remove items
* Separate Movie / TV media handling

### 🎨 UI / UX

* Responsive design
* Dark cinematic interface
* Framer Motion animations
* Skeleton loading states
* Error states
* Custom 404 page
* Scroll-to-top behavior
* Mobile navigation
* Accessible interactive controls

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

## 🏗️ Architecture

The project follows a component-based architecture with clear separation of responsibilities.

```text
src/
├── components/
├── pages/
├── hooks/
├── services/
├── stores/
├── types/
├── utils/
└── App.tsx
```

### Main responsibilities

**Components**

Reusable UI components such as movie cards, ratings, cast cards, season cards, modals, and loading states.

**Pages**

Application-level screens including Home, Search, Details, People, Library, and other routes.

**Hooks**

Custom React hooks responsible for fetching and managing TMDB data through TanStack Query.

**Services**

Centralized TMDB API functions and Axios-based API communication.

**Stores**

Zustand stores for persistent client-side application state such as Favorites and Watchlist.

**Types**

TypeScript interfaces and types used throughout the application.

## ⚡ Performance

CineVault uses several techniques to improve the user experience:

* TanStack Query caching
* Debounced search
* Conditional data fetching
* Lazy API requests
* Skeleton loading states
* Virtualized content where appropriate
* Persistent local state
* Responsive rendering

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_TOKEN=your_tmdb_access_token
```

Never commit your `.env` file or expose private credentials.

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

Add your TMDB credentials, then start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## 🏭 Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 📱 Responsive Design

CineVault is designed to provide a consistent experience across:

* Desktop
* Laptop
* Tablet
* Mobile

## 🔮 Future Improvements

Possible future improvements include:

* User authentication
* Backend integration
* Cloud-synchronized libraries
* Personalized recommendations
* User profiles
* Social features
* Advanced analytics
* Progressive Web App support

## 👨‍💻 Developer

**Mohammed Khames**

Frontend Developer focused on building modern, responsive, and interactive web applications with React and TypeScript.

* GitHub: https://github.com/mohammedkhames792

## 📄 License

This project was created for educational and portfolio purposes.
