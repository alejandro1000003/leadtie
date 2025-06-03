#!/bin/sh

# Crear base de datos SQLite si no existe
if [ ! -f /var/www/html/database/leadtie.sqlite ]; then
    touch /var/www/html/database/leadtie.sqlite
    chmod 660 /var/www/html/database/leadtie.sqlite
fi

# Ejecutar migraciones sin confirmación (forzado)
php artisan migrate --force

# Arrancar servidor Laravel en puerto 10000
php artisan serve --host=0.0.0.0 --port=10000
