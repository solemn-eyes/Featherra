# Featherra core configuration package.
import pymysql

# Django's MySQL backend checks MySQLdb.version_info; patch PyMySQL to match.
pymysql.version_info = (1, 4, 6, "final", 0)
pymysql.install_as_MySQLdb()
