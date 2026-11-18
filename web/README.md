# Sprint 1 Starter Pack (overlay)

1. Create the app:  pnpm create next-app@latest web --typescript --tailwind --app --src-dir --eslint
2. Copy EVERYTHING in this folder into `web/` (overwrite when asked). Put CLAUDE.md in `web/` too.
3. cd web && pnpm add prisma@6 @prisma/client@6 framer-motion lucide-react zod && pnpm add -D tsx
4. cp .env.example .env     (edit values)
5. docker compose up -d
6. npx prisma migrate dev --name init
7. Add to package.json scripts:  "db:seed": "tsx prisma/seed.ts"   then run: pnpm db:seed
8. pnpm dev  -> http://localhost:3000
