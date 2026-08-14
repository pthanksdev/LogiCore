# ⚙️ LogiCore Enterprise — Laravel 11 REST API Backend

The backend engine for LogiCore Enterprise SCM, built with **Laravel 11**, **PostgreSQL**, and **Laravel Sanctum**.

## 🚀 Development Setup

```bash
# Install PHP dependencies
composer install

# Environment config
cp .env.example .env
php artisan key:generate

# Execute database migrations and seed Supreme Admin user
php artisan migrate --force
php artisan db:seed --force

# Serve API locally
php artisan serve --port=8000
```

API routes are available at `http://localhost:8000/api/v1`.
