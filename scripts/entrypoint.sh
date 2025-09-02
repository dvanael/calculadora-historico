#!/bin/sh

set -e

echo "Waiting for postgres..."
while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 0.1
done
echo "PostgreSQL started"

python manage.py migrate
python manage.py collectstatic --noinput
exec python manage.py runserver 0.0.0.0:8000
