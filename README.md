# Voting System

A production-ready fullstack voting system for time-limited events. Users can participate by casting and updating votes, while admins manage events and monitor hourly vote trends.

## Tech Stack

**Backend:**

- Node.js with TypeScript
- Express.js
- Prisma ORM
- MySQL
- JWT authentication

**Frontend:**

- React
- TypeScript
- Vite
- React Router
- Tanstack Query
- Axios

## Quick Start

### Using Docker Compose

```bash
docker-compose up
```

This will start:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Database:** MySQL (exposed on 3306)

### Manual Setup

**Prerequisites:**

- Node.js 20+

**Backend Setup:**

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

**Frontend Setup:**

```bash
cd frontend
npm install
npm run dev
```

## Demo Credentials

- Admin: `admin` / `admin123`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Events

- `POST /api/events` - Create voting event (admin only)
- `GET /api/events` - List all events
- `GET /api/events/:eventId` - Get event details
- `GET /api/events/:eventId/trends` - Get hourly event vote trends

### Voting

- `POST /api/votes` - Cast/update vote
- `GET /api/votes/me` - Get own votes in all events
- `GET /api/votes/me/:eventId` - Get own vote in event

## Assumptions & Design Decisions

### 1. JWT Authentication

- **Choice**: Store JWT in localStorage (SPA-friendly)
- **Rationale**: Simpler for frontend SPA; httpOnly cookies would require additional backend support
- **Trade-off**: Slightly lower security than httpOnly; Chose simplicity over refresh tokens (can be added easily)

### 2. Vote Trends Aggregation

- **Choice**: Real-time aggregation
- **Rationale**: Simpler implementation; sufficient for low vote volumes
- **Enhancement**: Add caching or pre-computed Trends for high traffic

### 3. Vote Uniqueness Enforcement

- **Choice**: Database constraint (unique index on userId, eventId)
- **Rationale**: Ensures data integrity; prevents race conditions with proper transaction handling
- **Implementation**: Prisma `upsert` with atomic read-modify-write

## How to Test

1. Login as admin -> /admin/events -> Create event
2. Login as user -> Vote on event -> Refresh -> Vote should persist
3. Admin -> View trends (every choice shown, even 0 votes)
4. Try voting outside time window (protected by both frontend and backend)
