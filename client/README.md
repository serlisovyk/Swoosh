# Swoosh Frontend

Frontend part of the Swoosh project.

Built with Next.js, React, TypeScript, React Query, React Hook Form, and Zod.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a local `.env` file from `.env.sample`.

Required variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

This value should point to the backend API base URL.

### 3. Start the app

```bash
npm run dev
```

The frontend is usually available at:

```text
http://localhost:3000
```

## Structure

```text
src/
|-- app/
|   |-- (pages)/                # another application pages
|   |-- providers/              # app-level providers
|   |-- globals.css             # global styles
|   |-- layout.tsx              # root layout
|   `-- page.tsx                # home page
|-- features/                   # business features
|   |-- auth/                   # authentication
|   |-- privacy-policy/         # privacy policy page content
|   `-- profile/                # user profile
`-- shared/                     # reusable code across features
    |-- api/                    # axios instance, routes, query keys, helpers
    |-- config/                 # shared config
    |-- constants/              # app constants
    |-- form/                   # common form helpers and types
    |-- ui/                     # reusable UI components
    `-- utils/                  # shared utilities
```
