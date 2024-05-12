#!/bin/bash

if [ ! -f vendor/autload.php ]; then
    composer install --no-progress --no-interaction  --no-dev --ignore-platform-reqs
fi

if [ ! -f ".env" ]; then
    echo -e "${RED}Env file not found, for $APP_ENV exiting!!${NC}"
    exit 1
fi

php artisan migrate
php artisan key:generate
php artisan cache:clear
php artisan config:clear
php artisan route:clear

php artisan serve --port=$PORT --host=$HOST --env=.env
exec docker-php-entrypoint "$@"
