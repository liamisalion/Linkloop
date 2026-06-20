#!/bin/sh
set -e

echo "==> Running Prisma db push..."
npx prisma db push --skip-generate

if [ ! -f /app/prisma/.seeded ]; then
  echo "==> First run detected, seeding database..."
  npx tsx prisma/seed.ts
  touch /app/prisma/.seeded
  echo "==> Seed complete."
fi

echo "==> Starting LinkBase server..."
node server.js
