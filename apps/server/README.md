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

Create a `.env.local` in `apps/server/` then copy and paste:

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

This project uses Supabase PostgreSQL database for data storage.\
The schema is already defined in the remote supabase instance.\
For offline or local development, spin the supabase docker container using:

```bash
npx supabase start
```

Then, run the development server:

```bash
npm run dev
```

The API is running at [http://localhost:3000](http://localhost:3000).

## What you will focus on

```
click-kos/
     └── apps/
            └── server/      # Backend API
```

Follow RESTful API design principles while adding new endpoints. e.g

- `GET /items` - Get all items
- `POST /items` - Create a new item
- `GET /items/:id` - Get a specific item
- `PUT /items/:id` - Update a specific item
- `DELETE /items/:id` - Delete a specific item

Make sure to validate request data and handle errors appropriately.

## Available Scripts

- `npm run dev`: Start all applications in development mode
- `npm run build`: Build all applications
- `npm run dev:web`: Start only the web application
- `npm run dev:server`: Start only the server
- `npm run check-types`: Check TypeScript types across all apps
- `npm run db:push`: Push schema changes to database
- `npm run db:studio`: Open database studio UI
- `cd apps/web && npm run generate-pwa-assets`: Generate PWA assets
