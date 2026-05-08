# Omkar Bhatkar Spain Exhibition Diary

Interactive Next.js diary site for Omkar Bhatkar's 15-day Spain exhibition journey.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Edit Content

The diary content lives in `src/data/diary.ts`.

Each day supports:

- `day`, `date`, `location`, `title`, `summary`, and `story`
- `people`, `places`, and `activities`
- `paintings`
- `images`

## Replace Images

Placeholder visual assets are stored in `public/images`:

- `public/images/journey`
- `public/images/paintings`
- `public/images/people`
- `public/images/places`

Replace these files with Omkar's real photos and painting images, or update the image paths in `src/data/diary.ts`.

## Verify

```bash
npm run lint
npm run typecheck
npm run build
```
