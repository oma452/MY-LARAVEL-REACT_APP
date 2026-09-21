# Laravel React Product Management App

A full-stack product management application built with Laravel and React. The project uses Inertia.js to connect the Laravel backend with a TypeScript React frontend and provides authenticated users with product CRUD workflows, search, and category filtering.

## Features

- User authentication and an authenticated dashboard.
- Create, view, update, and delete products.
- Search products by name.
- Filter products by category.
- Product fields for name, price, description, and category.
- Server-side validation for product forms.
- React pages rendered through Inertia.js.
- Vite development tooling with Tailwind CSS.
- Server-side rendering configuration for the React entry point.

## Tech Stack

| Area | Technology |
| --- | --- |
| Backend | PHP 8.2+, Laravel 12 |
| Frontend | React 19, TypeScript |
| Application bridge | Inertia.js |
| Styling | Tailwind CSS 4 |
| Build tool | Vite 6 |
| Database | SQLite by default; other Laravel-supported databases can be configured |
| Testing | PestPHP |

## Project Structure

```text
app/                 Laravel application code, controllers, and models
bootstrap/            Laravel framework bootstrap files
config/               Application configuration
database/             Migrations, factories, seeders, and local database files
public/               Public entry point and generated assets
resources/css/        Application styles
resources/js/         React, TypeScript, pages, components, layouts, and types
resources/views/      Blade view templates
routes/               Web, authentication, and settings routes
storage/              Logs, cache, and generated application files
tests/                Automated tests
```

## Requirements

- PHP 8.2 or later
- Composer
- Node.js and npm
- SQLite, or another database supported by Laravel

## Installation

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/oma452/MY-LARAVEL-REACT_APP.git
   cd MY-LARAVEL-REACT_APP
   ```

2. Install PHP dependencies:

   ```bash
   composer install
   ```

3. Create the local environment file and application key:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Install JavaScript dependencies:

   ```bash
   npm install
   ```

5. Review `.env` and configure the database if needed. The example configuration uses SQLite by default. Run the migrations:

   ```bash
   php artisan migrate
   ```

## Running the Application

The repository includes a Composer development script that starts the Laravel server, queue listener, and Vite development server together:

```bash
composer run dev
```

Open the application at [http://localhost:8000](http://localhost:8000).

To run the frontend development server separately, use:

```bash
npm run dev
```

To create a production frontend build, use:

```bash
npm run build
```

## Application Routes

The product workflows are defined in `routes/web.php` and are protected by the `auth` and `verified` middleware:

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/products` | List products, with optional name search and category filtering |
| `GET` | `/products/create` | Display the product creation form |
| `POST` | `/products` | Create a product |
| `GET` | `/products/{product}/edit` | Display the product editing form |
| `PUT` | `/products/{product}` | Update a product |
| `DELETE` | `/products/{product}` | Delete a product |

This project does not currently expose a separate `routes/api.php` API surface; the product interface uses Laravel web routes and Inertia responses.

## Environment Variables

Copy `.env.example` to `.env` before running the application. Important values include:

- `APP_URL` — local application URL.
- `DB_CONNECTION` — database driver; the default is `sqlite`.
- `VITE_APP_NAME` — frontend application name exposed through Vite.

Do not commit `.env` or other files containing secrets.

## Quality Checks

Available project scripts include:

```bash
npm run types
npm run lint
npm run format:check
```

Laravel tests can be run with:

```bash
php artisan test
```

## Potential Future Improvements

- Add more automated coverage for product CRUD, filtering, and authentication flows.
- Add screenshots or a short demo once representative application screens are available.
- Add deployment instructions for the intended hosting environment.

## Author

- [oma452](https://github.com/oma452)

## License

This project is licensed under the [MIT License](LICENSE).
