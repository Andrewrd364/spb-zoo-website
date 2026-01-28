#!/bin/bash
set -e

echo "⏳ Waiting for postgres to be ready..."
until pg_isready -U postgres; do
  sleep 2
done

pg_restore \
  --no-owner \
  -U "$POSTGRES_USER" \
  -d spb_zoo \
  /docker-entrypoint-initdb.d/sbp_zoo_dump.backup

echo "✅ Database restored successfully"
