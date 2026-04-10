# Scoreboard

Scoreboard is a Next.js digital message board for displaying rotating content on a shared screen while giving admins a protected dashboard to manage what appears on it.

## What the project does

The public home page acts like a billboard. It combines several content sources into a slideshow and rotates through them automatically:

- weather cards for a configured location
- rich text messages
- scraped website content or screenshots
- embedded social media posts and videos

The header also shows rotating news items plus a live date and time display.

## Main features

- **Rotating billboard view** with animated transitions, optional progress indicators, and slide counters
- **Weather widget** powered by OpenWeather data with multiple icon styles and optional QR codes
- **Message publishing** with MDX content support for formatted announcements
- **News ticker/carousel** for short updates shown in the header
- **Web scraping tools** using Cheerio or Puppeteer, with text and screenshot output modes
- **Social media embeds** for Facebook, Instagram, LinkedIn, Pinterest, TikTok, X, Tweets, and YouTube
- **Admin dashboard** for creating, editing, searching, and deleting content entries
- **Protected dashboard access** with NextAuth credential login
- **Configurable runtime settings** for refresh intervals, data fetching mode, display style, and storage options

## Tech stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- NextAuth
- PostgreSQL
- Cloudinary for remote image storage
- OpenWeatherMap for weather data

## Getting started

### 1. Install dependencies

```bash
npm ci
```

### 2. Configure environment variables

Create a `.env.local` file with the values your setup needs:

```bash
POSTGRES_URL=
OPENWEATHERMAP_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

`CLOUDINARY_*` values are only needed when you use remote image storage.

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Optional: seed the database

The repository includes a seed route at `/seed` that creates the required tables and inserts sample auth data for local testing. Review the implementation before using it outside development.

## Available scripts

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint
- `npm run db:migrate` - run Prisma migrations
- `npm run db:studio` - open Prisma Studio

## Project areas

- `/app` - routes, layouts, dashboard pages, login, and seed route
- `/components` - billboard and content display components
- `/lib` - server actions, data access, configuration, and integrations
- `/ui` - dashboard tables, forms, charts, and shared UI building blocks

## Notes

- Dashboard routes require authentication.
- Runtime display settings are stored in `/app/settings.json`.
- Building in a restricted network may fail because `next/font` fetches Google Fonts during the build.
