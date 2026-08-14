# Production Dockerfile for Laravel 11 Backend on Render
FROM php:8.2-cli-alpine

# Install system dependencies & Postgres PDO extension
RUN apk add --no-cache \
    postgresql-dev \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_pgsql zip bcmath

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Set storage permissions
RUN chmod -R 777 storage bootstrap/cache

# Expose port (Render automatically sets $PORT)
EXPOSE 10000

# Start Laravel production server with clean migration & seeding
CMD php artisan config:cache && php artisan route:cache && (php artisan migrate --seed --force || php artisan migrate:fresh --seed --force) && php artisan serve --host=0.0.0.0 --port=${PORT:-10000}
