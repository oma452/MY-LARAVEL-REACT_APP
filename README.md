# MY-LARAVEL-REACT_APP

A full-stack product management app built with **Laravel 12** and **React 19 + TypeScript**, connected through **Inertia.js**.

## Features

- Authentication flow with protected dashboard and product pages
- Product create, list, edit, update, and delete workflows
- Product search by name and category filtering
- Validation for product create/update requests
- Inertia-powered Laravel + React page rendering

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Backend | PHP ^8.2, Laravel ^12 |
| Frontend | React ^19, TypeScript |
| Bridge | Inertia.js (`inertiajs/inertia-laravel`, `@inertiajs/react`) |
| Styling | Tailwind CSS ^4 |
| Tooling | Vite ^6, ESLint, Prettier |
| Testing | Pest + Laravel testing tools |
| Default DB | SQLite (`.env.example` uses `DB_CONNECTION=sqlite`) |

## Project Structure

```text
app/                 Application controllers, models, and core Laravel code
database/            Migrations, factories, seeders
resources/js/        React + TypeScript frontend (pages, layouts, components)
resources/views/     Blade templates
routes/              Web/auth/settings route files
tests/               Feature and unit tests
```

## Prerequisites

- PHP 8.2+
- Composer
- Node.js + npm
- SQLite (default) or another Laravel-supported database

## Installation & Setup

```bash
git clone https://github.com/oma452/MY-LARAVEL-REACT_APP.git
cd MY-LARAVEL-REACT_APP
composer install
npm install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
```

> If you use MySQL/PostgreSQL instead of SQLite, update your `.env` DB settings before running migrations.

## Environment Configuration

The base environment template is in `.env.example`. Key values:

- `APP_NAME` and `VITE_APP_NAME="${APP_NAME}"`
- `APP_URL`
- `DB_CONNECTION` (defaults to `sqlite`)

## Run the App

### Full local development stack (recommended)

Runs Laravel server, queue listener, and Vite together:

```bash
composer run dev
```

### SSR development flow

```bash
composer run dev:ssr
```

### Frontend-only development server

```bash
npm run dev
```

## Build & Quality Commands

```bash
# Production builds
npm run build
npm run build:ssr

# Code quality
npm run lint
npm run types
npm run format:check
npm run format

# Backend tests
php artisan test
```

## Web Routes (Product Area)

Defined in `routes/web.php` under `auth` + `verified` middleware:

| Method | URI | Route name |
| --- | --- | --- |
| GET | `/products` | `products.index` |
| GET | `/products/create` | `products.create` |
| POST | `/products` | `products.store` |
| GET | `/products/{product}/edit` | `products.edit` |
| PUT | `/products/{product}` | `products.update` |
| DELETE | `/products/{product}` | `products.destroy` |

Additional web entry points:

- `GET /` → `home`
- `GET /dashboard` → `dashboard` (authenticated + verified)

This repository currently uses web routes and Inertia pages; it does **not** define a `routes/api.php` API surface.

## Potential Future Improvements

- Expand automated feature tests for product workflows
- Add UI screenshots after image assets are intentionally captured and committed

## Author

- [oma452](https://github.com/oma452)

## License

This project is licensed under the [MIT License](LICENSE).
