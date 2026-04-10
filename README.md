# Voting System

A production-ready fullstack voting system for time-limited events. Users can participate by casting and updating votes, while admins manage events and monitor hourly vote trends.

**Backend:**

- Node.js with TypeScript
- Express.js
- Prisma ORM
- MySQL 8.0
- JWT authentication

**Frontend:**

- React 18
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
