FROM postgres:17

# Копируем скрипт восстановления
COPY restore.sh /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/restore.sh

# Копируем бэкап
COPY sbp_zoo_dump.backup /docker-entrypoint-initdb.d/