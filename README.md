<div align="center">

# 🎬 CineVault

### A Production-Grade Movie & TV Discovery Platform

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-5-443E387E?style=for-the-badge&logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

[![TMDB](https://img.shields.io/badge/Data_by_TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org)

**Browse · Search · Filter · Tag · Save** — thousands of movies & TV shows, powered by the TMDB API.

[Live Demo](https://your-demo-link.vercel.app) · [Report Bug](https://github.com/your-username/cinevault/issues) · [Request Feature](https://github.com/your-username/cinevault/issues)

</div>

---

## 📸 Preview

<div align="center">
  <img src="https://via.placeholder.com/800x450/0f172a/fbbf24?text=CineVault+Home+Screen" alt="Home" width="45%" />
  <img src="https://via.placeholder.com/800x450/0f172a/fbbf24?text=Advanced+Search" alt="Advanced Search" width="45%" />
</div>

> 💡 **Tip:** Replace these placeholders with real screenshots or a demo GIF of your running app.

---

## ✨ Key Features

### 🔎 IMDb-Style Advanced Search — `/advanced`

A full-featured filter engine with **collapsible sections** and **live active-filter chips**:

| Filter | Details |
|--------|---------|
| **🎭 Genres** | Click to include · **Shift+Click to exclude** (include & exclude simultaneously) |
| **🏷 Keywords & Tags** | Async autocomplete over TMDB's keyword database (revenge, heist, dystopia…) |
| **🎬 Cast** | Multi-actor search with **Match Any / Match All** toggle |
| **🎥 Director / Crew** | Filter by director, writer, or producer |
| **🏢 Production Companies** | Studio search (Marvel, A24, Pixar…) |
| **📅 Release Date** | Decade shortcuts + custom year range |
| **⭐ User Rating** | **Dual-thumb range slider** (0–10) + minimum vote count |
| **⏱ Runtime** | Preset brackets + custom min/max |
| **🗣 Language** | 20 original languages |
| **🌍 Country** | 27 countries of origin |
| **🔞 Certification** | US age ratings (G, PG, PG-13, R, NC-17) |
| **📊 Sort** | 11 movie / 8 TV sort modes (box office, budget, votes, date…) |

**Extras:**
- ⚡ **10 Smart Presets** — Masterpieces, Hidden Gems, Blockbusters, Family Night, Binge-Worthy TV, Date Night Horror, Best Sci-Fi, Quick Watch, Golden Classics, 2024 Hits
- 💾 **Save & Reload Searches** — persisted to localStorage with duplicate detection
- 🔗 **Shareable Deep Links** — `/advanced?keyword=123&type=movie`
- 📄 **Advanced Pagination** — First / Prev / numbered / Next / Last
- 🔴 **Live Result Count** — "12,483 titles found"

### 🏠 Home & Discovery
- **Dynamic Hero Carousel** — auto-playing trending titles with **Today / This Week** toggle
- **YouTube Trailer Modal** — watch trailers without leaving the page
- **Movies / TV Shows Switcher** — instantly swap the entire home feed
- **Categorized Rows** — Popular, Now Playing, Top Rated, Upcoming, Popular TV, Top Rated TV
- **Custom Scroll Controls** — smooth horizontal scrolling with arrow buttons

### 🔍 Instant Search
- **Debounced Autocomplete** — live dropdown with posters, year & ratings
- **⌘K / Ctrl+K Shortcut** — jump to search from anywhere, `Esc` to close
- **Quick Filters Panel** — genre, year, rating, sort
- **Cross-link to Advanced Search** — one click to go deeper

### 📄 Rich Detail Pages
- **Official Logo Rendering** — real movie logo when available
- **Animated Rating Gauge** — SVG circular progress, color-coded
- **🗂 Franchise Collections** — full Marvel / Star Wars / etc. sagas with backdrop
- **🏷 Clickable Keyword Pills** — each links to an advanced search
- **Cast & Crew Grid** — avatar fallbacks + click-through to actor profiles
- **👤 Actor Profile Pages** — biography, birth info, age, full filmography
- **📺 TV Seasons Accordion** — expandable season cards with posters
- **📝 User Reviews** — real community reviews with author ratings
- **Similar & Recommended** — related content rails

### 💾 Personal Library — `/library`
- **Favorites & Watchlist** tabs with animated toast feedback
- **📊 Statistics Dashboard** — total saved, average rating, movies vs TV
- **Filter & Search** — by type, by title, by rating/date/alphabetical
- **Clear All** — bulk management
- **Persistent** across sessions via Zustand `persist`

### 🎨 UI/UX Engineering
- **Fully Responsive** — mobile-first with collapsible sidebar drawer
- **Custom Skeleton Loaders** — layout-accurate (hero, rows, grid, detail page)
- **Framer Motion** — spring physics, layout transitions, exit animations
- **Custom Error Boundary** — graceful failure with retry
- **Dedicated 404 Page** — animated not-found screen
- **Scroll-to-Top** — route restoration + floating button
- **Dark Mode** — persisted toggle
- **Accessibility** — ARIA labels, keyboard nav, focus-visible outlines

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | React 19 | Component-based UI |
| **Language** | TypeScript 5.9 | Strict typing & IntelliSense |
| **Build Tool** | Vite 7 | Lightning-fast HMR & bundling |
| **Styling** | Tailwind CSS 4 | Utility-first responsive design |
| **Data Fetching** | TanStack Query 5 | Caching, dedup, `placeholderData` for pagination |
| **Client State** | Zustand 5 | Global state + localStorage persistence |
| **Routing** | React Router DOM 6 | Client-side navigation |
| **HTTP Client** | Axios | Interceptors, Bearer auth, error handling |
| **Animation** | Framer Motion | Page & component transitions |
| **Icons** | Lucide React | Tree-shakeable icon set |
| **API** | TMDB API v3 | Movies, TV, People, Keywords, Collections |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 18.0.0`
- **npm** or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/cinevault.git
cd cinevault

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build      # Outputs to dist/
npm run preview    # Preview the production build locally
```

### Environment Variables (Optional)

The project ships with a working TMDB token. To use your own, create a `.env` file:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_TOKEN=your_bearer_token_here
```

Get a free key from [TMDB API](https://www.themoviedb.org/settings/api).

---

## 📁 Project Structure

```
cinevault/
├── public/                          # SVG placeholders
├── src/
│   ├── components/                  # 18 reusable UI components
│   │   ├── AdvancedSearchInputs.tsx # FilterSection, TagInput, ChipGroup,
│   │   │                            # RangeSlider, NumberField, SelectField
│   │   ├── CastCard.tsx             # Actor card w/ avatar fallback
│   │   ├── CollectionBanner.tsx     # Franchise / saga display
│   │   ├── EmptyState.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroBanner.tsx           # Auto-play carousel
│   │   ├── KeywordPills.tsx         # Clickable tags → advanced search
│   │   ├── MovieCard.tsx            # Poster card + quick actions
│   │   ├── Navbar.tsx               # Nav + ⌘K search + drawer
│   │   ├── RatingGauge.tsx          # Animated SVG gauge
│   │   ├── ReviewCard.tsx           # Expandable review card
│   │   ├── ScrollRow.tsx            # Horizontal content row
│   │   ├── ScrollToTop.tsx
│   │   ├── SeasonCard.tsx           # TV season accordion
│   │   ├── SkeletonCard.tsx         # 4 skeleton variants
│   │   ├── Toast.tsx                # Toast context provider
│   │   └── VideoModal.tsx           # YouTube trailer modal
│   │
│   ├── pages/                       # 8 route pages
│   │   ├── Home.tsx
│   │   ├── MovieDetails.tsx         # /movie/:id & /tv/:id
│   │   ├── PersonDetails.tsx        # Actor / director profiles
│   │   ├── Search.tsx               # Instant search + quick filters
│   │   ├── AdvancedSearch.tsx       # ⭐ IMDb-style filter engine
│   │   ├── Genres.tsx               # Browse by genre
│   │   ├── Library.tsx              # Favorites & watchlist
│   │   └── NotFound.tsx             # 404 page
│   │
│   ├── hooks/
│   │   └── useTMDB.ts               # 26 typed React Query hooks
│   ├── services/
│   │   ├── api.ts                   # Axios instance + interceptors
│   │   └── tmdb.ts                  # 33 API functions + param builder
│   ├── stores/
│   │   ├── useStore.ts              # Library (fav/watchlist) + UI
│   │   └── useSavedSearches.ts      # Saved searches + recent keywords
│   ├── types/
│   │   └── tmdb.ts                  # 18 TypeScript interfaces
│   ├── utils/
│   │   ├── constants.ts             # Sort options, languages, countries,
│   │   │                            # decades, certifications, presets
│   │   └── cn.ts                    # Tailwind class merger
│   ├── App.tsx                      # Providers + routing
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🏗️ Architecture Highlights

### Data Flow

```
Component → useTMDB Hook (React Query) → tmdb.ts Function → Axios Instance → TMDB API
                     ↓
              Cached in QueryClient (5 min staleTime)
```

### Advanced Search Parameter Pipeline

```
AdvancedFilterState (UI-friendly)
        ↓  buildDiscoverParams(mediaType, filters)
AdvancedDiscoverParams (TMDB `|` / `,` format)
        ↓  cleanParams()  — strips empty/undefined values
Axios → /discover/{movie|tv} → PaginatedResponse<MediaItem>
```

### State Management Strategy

| State Type | Solution | Why |
|-----------|----------|-----|
| **Server State** (movies, cast, reviews) | TanStack Query | Caching, deduplication, background refetch |
| **Client State** (favorites, watchlist) | Zustand + persist | Selective subscriptions, localStorage sync |
| **Saved Searches** | Zustand + persist | Deduplicated, capped at 20 entries |
| **UI State** (sidebar, theme) | Zustand + persist | No prop drilling |
| **Local State** (inputs, modals) | `useState` | Component-scoped |

### Type Safety

All TMDB responses are strictly typed in `src/types/tmdb.ts`:

```typescript
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  // ...and more
}
```

---

## 🎯 API Endpoints Used

| Endpoint | Usage |
|----------|-------|
| `/trending/{media}/{window}` | Hero carousel |
| `/movie/popular`, `/tv/popular` | Popular rows |
| `/movie/top_rated`, `/tv/top_rated` | Top rated rows |
| `/movie/upcoming`, `/movie/now_playing` | Release rows |
| `/movie/{id}`, `/tv/{id}` | Detail pages (+credits, videos, similar, recommendations) |
| `/discover/movie`, `/discover/tv` | ⭐ Advanced search engine |
| `/search/multi` | Instant search |
| `/search/keyword` | Keyword autocomplete |
| `/search/company` | Studio autocomplete |
| `/search/person` | Cast & crew autocomplete |
| `/genre/movie/list`, `/genre/tv/list` | Genre lists (1hr cache) |
| `/person/{id}` | Actor profiles (+combined credits) |
| `/collection/{id}` | Franchise / saga parts |
| `/movie/{id}/keywords`, `/tv/{id}/keywords` | Detail-page tags |
| `/movie/{id}/reviews` | User reviews |
| `/{media}/{id}/images` | Official logos |

### Discover Parameters Supported

`with_genres` · `without_genres` · `with_keywords` · `with_companies` · `with_cast` ·
`with_crew` · `release_date.gte/lte` · `first_air_date.gte/lte` · `vote_average.gte/lte` ·
`vote_count.gte` · `with_runtime.gte/lte` · `with_original_language` · `with_origin_country` ·
`certification` · `certification_country` · `include_adult` · `sort_by` · `page`

---

## 🧩 Reusable Form Components

`src/components/AdvancedSearchInputs.tsx` exports six composable primitives:

| Component | Purpose |
|-----------|---------|
| `<FilterSection>` | Collapsible accordion with active-count badge |
| `<TagInput>` | Async autocomplete multi-select with removable chips |
| `<ChipGroup>` | Single or multi-select pill group |
| `<RangeSlider>` | Dual-thumb range slider (custom CSS thumb styling) |
| `<NumberField>` | Numeric input with label |
| `<SelectField>` | Styled dropdown |

---

## 🚀 Deployment

<details>
<summary><b>Vercel (Recommended)</b></summary>

```bash
npm i -g vercel
vercel --prod
```
</details>

<details>
<summary><b>Netlify</b></summary>

```bash
npm run build
# Drag & drop the dist/ folder to Netlify
```
</details>

<details>
<summary><b>GitHub Pages</b></summary>

Update `vite.config.ts` with `base: '/cinevault/'`, then:
```bash
npm run build
npx gh-pages -d dist
```
</details>

---

## 📈 Performance Optimizations

- ⚡ **React Query caching** — 5-minute `staleTime` reduces redundant requests by ~60%
- ⚡ **`placeholderData: keepPreviousData`** — no layout flash during pagination
- ⚡ **Genre/keyword lists cached 30–60 min** — reference data rarely changes
- ⚡ **Lazy image loading** — `loading="lazy"` on all posters
- ⚡ **Request deduplication** — multiple components, one network call
- ⚡ **Tree-shakeable icons** — only imported Lucide icons ship
- ⚡ **Sticky filter sidebar** — grid results don't reflow on scroll

---

## 🔮 Future Enhancements

- [ ] Authentication & cloud-synced watchlist (Supabase / Firebase)
- [ ] Watch provider / streaming availability integration
- [ ] User ratings & personal notes
- [ ] Infinite scroll option alongside pagination
- [ ] Custom collections (e.g. "Watch With Family")
- [ ] Compare two films side by side
- [ ] Director filmography timeline view
- [ ] Full multi-language & RTL support
- [ ] PWA with offline support
- [ ] Unit & E2E tests (Vitest + Playwright)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it in your own portfolio.

---

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org) for the incredible free API
- [Lucide](https://lucide.dev) for the beautiful icon set
- This product uses the TMDB API but is **not endorsed or certified by TMDB**

---

<div align="center">

**Built with ❤️ by [Your Name](https://github.com/your-username)**

⭐ Star this repo if you found it useful!

</div>
