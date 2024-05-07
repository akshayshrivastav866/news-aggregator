FROM php:8.2.0 as php

RUN apt-get update -y
RUN apt-get install -y unzip libpq-dev libcurl4-gnutls-dev
RUN docker-php-ext-install pdo pdo_mysql bcmath

RUN pecl install -o -f redis \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable redis

WORKDIR /var/www
COPY . .

# If you want to use local composer version, uncomment below line, uncomment curl command and update as per needed.
# COPY --from=composer:2.7.2 /usr/bin/composer /usr/bin/composer

RUN curl -sS https://getcomposer.org/download/2.7.2/composer.phar -o /usr/bin/composer && \
    chmod +x /usr/bin/composer

ENV port=8000
ENTRYPOINT [ ".docker/entryPoint.sh" ]
