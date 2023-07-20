FROM php:8.2.8-fpm-alpine

# Install packages
RUN apk add --no-cache curl git build-base zlib-dev oniguruma-dev autoconf bash
RUN docker-php-ext-install opcache

# Xdebug
RUN apk add --update linux-headers
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug
COPY ./docker/php-fpm/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

# Configure non-root user.
ARG PUID=1000
ARG PGID=1000
RUN apk --no-cache add shadow && \
    groupmod -o -g ${PGID} www-data && \
    usermod -o -u ${PUID} -g www-data www-data

# Source code
RUN chown www-data:www-data /var/www
COPY --chown=www-data:www-data ./ /var/www
WORKDIR /var/www

USER www-data

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-interaction


# RUN apk add --no-cache mariadb-server php php-fpm php-mbstring php-opcache php-xml php-zip php-curl php-mysql php-cli \
#     curl git -y
CMD php-fpm

EXPOSE 9000