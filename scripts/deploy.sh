#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$DIR/web"

echo "🔨 Building Next.js application..."
NEXT_PRIVATE_STANDALONE=true pnpm build

cd "$DIR/web/.next/standalone"
ln -sfn web/.next .next
cd "$DIR/web"

echo "⚡ Bundling Cloudflare Worker..."
pnpm exec opennextjs-cloudflare build

echo "🚀 Deploying live to Cloudflare..."
pnpm exec wrangler deploy

echo "✅ Live at: https://as-sunnah-event-platform.didar-bng.workers.dev"
