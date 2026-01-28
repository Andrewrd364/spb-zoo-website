FROM postgres:17
COPY restore.sh /docker-entrypoint-initdb.d/
COPY sbp_zoo_dump.backup /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/restore.sh
