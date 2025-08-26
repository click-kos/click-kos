# click-kos

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Next, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Next.js** - Full-stack React framework
- **Node.js** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **PWA** - Progressive Web App support
- **Turborepo** - Optimized monorepo build system
- **Docker Desktop** - For containerization and development environment

## Getting Started

First, install the dependencies:

```bash
npm install
```

## Backend: Supabase (Local)

We use Supabase in Docker to provide a self-contained local development backend, so make sure docker is running on your machine.

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Start Local Supabase

```bash
npx supabase start
```

This starts:

- Supabase Auth
- PostgreSQL
- Storage
- Studio (web dashboard)

Default ports:

- Supabase API: `http://localhost:54321`
- Studio: `http://localhost:54323`

### 3. Setup `.env.local`

Create a `.env` in `apps/server/` then copy and paste:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres
NEXT_PUBLIC_SUPABASE_URL='http://localhost:54321'
NEXT_PUBLIC_SUPABASE_ANON_KEY='your-local-anon-key'
```

> - Anon keys are printed in the terminal when you run `npx supabase start`.
> - Replace `your-local-anon-key` with the value of the anon key printed in your terminal
> - Once all that is done, the app will be running smoothly.

### 4. Supabase Client

The Supabase client is already configured inside the project. No need to create a new client — simply import it where needed.

---

## Database Setup

This project uses Supabase PostgreSQL database for data storage. Follow these steps to set up your local database:

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/server/.env` file with your PostgreSQL connection details.
3. Apply the schema to your database:

```bash
npm run db:push
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
click-kos/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   └── server/      # Backend API (Next)
```

## Available Scripts

- `npm run dev`: Start all applications in development mode
- `npm run build`: Build all applications
- `npm run dev:web`: Start only the web application
- `npm run dev:server`: Start only the server
- `npm run check-types`: Check TypeScript types across all apps
- `npm run db:push`: Push schema changes to database
- `npm run db:studio`: Open database studio UI
- `cd apps/web && npm run generate-pwa-assets`: Generate PWA assets

# frontend
Color Scheme

Primary Navy: #0E2148
Primary Purple: #483AA0
Primary Light Purple: #7965C1
Black and White for contrast