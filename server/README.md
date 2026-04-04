# Swoosh Backend

Backend API for the Swoosh project.

Built with NestJS, TypeScript, MongoDB, Mongoose, JWT auth, Swagger, and Resend.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a local `.env` file from `.env.sample`.

Main groups of variables:

- app settings
- JWT settings
- captcha settings
- MongoDB connection settings
- email settings
- throttling settings

See `.env.sample` for the full list.

### 3. Start the app

```bash
npm run start:dev
```

The API uses the global prefix:

```text
/api/v1
```

Swagger is usually available at:

```text
http://localhost:4000/api/v1/docs
```

## Structure

```text
src/
|-- common/                     # shared infrastructure
|   |-- email/                  # email service and templates
|   |-- mongo/                  # Mongo connection module and config
|   |-- swagger/                # Swagger setup helpers
|   `-- throttler/              # throttling module and config
|-- modules/                    # business modules
|   |-- auth/                   # authentication and token flow
|   |-- favorites/              # user favorites state and favorites list
|   |-- forms/                  # public forms and admin form management
|   |-- products/               # products CRUD and filtering
|   `-- user/                   # user profile and account data
|-- shared/                     # shared app-level helpers
|   |-- config/                 # shared bootstrap helpers
|   |-- constants/              # global constants
|   `-- utils/                  # shared utilities
|-- app.module.ts
`-- main.ts
```
