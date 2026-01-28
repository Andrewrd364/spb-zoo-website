#!/bin/bash
set -e

echo "⏳ Ожидание запуска PostgreSQL..."
sleep 5

echo "📦 Восстановление базы данных из бэкапа..."
pg_restore \
  --no-owner \
  --no-privileges \
  --clean \
  --if-exists \
  -U postgres \
  -d spb_zoo \
  /docker-entrypoint-initdb.d/sbp_zoo_dump.backup

echo "✅ База данных успешно восстановлена"