Django Stack Exchange API

## Creamos entrono virtual

python3 -m venv venv
##### Activamos entorno virtual
source venv/bin/activate


## Ejecutamos

    python manage.py makemigrations
    python manage.py migrate
    python manage.py createsuperuser
            oscar
            pass12345
    python manage.py runserver