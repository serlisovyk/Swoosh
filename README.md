# Swoosh

Swoosh is a full-stack store application with a separate frontend and backend inside one repository.

- `client` - Next.js application
- `server` - NestJS API
- `docs/rules` - modular project rules referenced by `AGENTS.md`

## Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- React Query
- React Hook Form
- Cloudflare Turnstile
- Zod

### Backend

- NestJS 11
- TypeScript
- MongoDB with Mongoose
- JWT auth
- Cloudflare Turnstile
- Swagger
- Resend email integration

## Quick Start

Open two terminals: one for the backend and one for the frontend.

### 1. Install dependencies

```bash
cd client
npm install
```

```bash
cd server
npm install
```

### 2. Configure environment variables

Create local `.env` files from the provided samples (`.env.sample`) in both `client` and `server` directories.

The frontend requires:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_TURNSTILE_SITE_KEY=turnstile_site_key
```

The backend requires app, auth, captcha, MongoDB, email, and throttling settings. Login, register, request-password-reset, and reset-password now expect a valid Cloudflare Turnstile token from the client. See `server/.env.sample` for the full list.

### 3. Start the backend

```bash
cd server
npm run start:dev
```

The backend uses the global prefix `/api/v1`.

Swagger is available at:

```text
http://localhost:4000/api/v1/docs
```

### 4. Start the frontend

```bash
cd client
npm run dev
```

The frontend is usually available at:

```text
http://localhost:3000
```
