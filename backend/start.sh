#!/bin/bash
cd backend
python manage.py migrate
gunicorn ngo_cms.wsgi:application --bind 0.0.0.0:$PORT
