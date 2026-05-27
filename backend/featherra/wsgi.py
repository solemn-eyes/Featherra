import os

import pymysql
from django.core.wsgi import get_wsgi_application

pymysql.version_info = (1, 4, 6, "final", 0)
pymysql.install_as_MySQLdb()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'featherra.settings')

application = get_wsgi_application()
