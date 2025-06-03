# build contenedor -> sudo docker build -t demo/laravel:0.1 .
# start contenedor -> sudo docker run -p 8000:80 demo/laravel:0.1
# exportar al pen -> sudo docker export 36c99b5cc1ff -o "/media/alejandro/UBUNTU 24_0/laravel-container.tar"
FROM php:8.2-apache

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
    libzip-dev \
    sqlite3 \
    libsqlite3-dev \
    zip

# Enable mod_rewrite
RUN a2enmod rewrite

# Install PHP extensions
RUN docker-php-ext-install pdo_sqlite zip

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copy the application code
COPY . /var/www/html

# Set the working directory
WORKDIR /var/www/html

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install project dependencies
RUN composer install

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/database
RUN chmod -R 755 /var/www/html/database
RUN touch /var/www/html/database/leadtie.sqlite
RUN chmod 660 /var/www/html/database/leadtie.sqlite
