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

## Screens

### Dashboard
<img width="1919" height="964" alt="Dashboard" src="https://github.com/user-attachments/assets/d0cc4cc3-5b51-4c04-88be-c3c5d5420726" />

### News
<img width="1915" height="392" alt="News" src="https://github.com/user-attachments/assets/315c5d07-10be-4d0e-8d21-3858d3ee8756" />

### Create News
<img width="1891" height="454" alt="CreateNews" src="https://github.com/user-attachments/assets/0689f38b-eeee-4bdc-a4a2-daefa6730dff" />

### Messages
<img width="1901" height="368" alt="Message" src="https://github.com/user-attachments/assets/ca812beb-26c4-4068-9ae6-ef8210b698e9" />

### Create Messages
<img width="1883" height="968" alt="CreateMessage" src="https://github.com/user-attachments/assets/a284b4c2-01c2-4aee-b7d7-66ffaff92fd2" />

### Scrapers
<img width="1897" height="688" alt="Scrapers" src="https://github.com/user-attachments/assets/f4b2dec0-52bd-45ff-8033-1e91af17c3b4" />

### Create Scrapers
<img width="1905" height="747" alt="CreateScraper" src="https://github.com/user-attachments/assets/bf5eab97-0599-4055-82c6-722b18e27f3f" />

### Social
<img width="1895" height="380" alt="Social" src="https://github.com/user-attachments/assets/2c9e04bb-b47e-49cc-a2c4-478ba7f6f389" />

### Create Social
<img width="1895" height="500" alt="CreateSocial" src="https://github.com/user-attachments/assets/47120746-867a-4551-91fc-f69ed1378630" />

### Settings
<img width="1892" height="761" alt="Settings" src="https://github.com/user-attachments/assets/49f78e7e-6cd4-4cfe-964f-b84ce930f05e" />

