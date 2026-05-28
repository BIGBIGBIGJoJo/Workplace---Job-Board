# Workplace Job Board Backend

Express API backed by MongoDB.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp .env.example .env
```

3. Start local MongoDB and the backend:

```bash
npm run dev:local
```

The API runs on `http://localhost:4000` by default.

## Environment

```env
PORT=4000
DB_URL=mongodb://127.0.0.1:27017
```

The app uses the `Work-Place` database with `Users` and `Jobs` collections.
