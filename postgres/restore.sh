#!/bin/sh
set -e

echo "📦 Restoring database..."

pg_restore \
  --no-owner \
  --no-privileges \
  --clean \
  --if-exists \
  -U "$POSTGRES_USER" \
  -d "$POSTGRES_DB" \
  /docker-entrypoint-initdb.d/sbp_zoo_dump.backup

echo "✅ Database restored"
