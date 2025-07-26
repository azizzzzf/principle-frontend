# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Principle** is an AI-powered interactive learning platform that transforms complex topics into visual, deconstructible knowledge maps. The system consists of a Next.js frontend with React Flow for canvas visualization, a FastAPI backend, PostgreSQL database, Redis cache, and Gemini AI integration.

## Architecture

```
Frontend (Next.js 14+)     Backend (FastAPI)       External Services
├── Canvas System          ├── Auth Service        ├── Gemini AI API
├── Real-time Collab       ├── Canvas API          ├── PostgreSQL
├── State Management       ├── WebSocket Server    └── Redis Cache
└── UI Components          └── AI Integration
```

## Development Commands

### Frontend (Next.js)

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Backend (FastAPI)

```bash
# Start development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Run with specific environment
uvicorn main:app --reload --env-file .env.local

# Database migrations
alembic upgrade head
alembic revision --autogenerate -m "description"

# Run tests
pytest
pytest tests/test_canvas.py -v
pytest -k "test_canvas_creation"

# Run linting
ruff check .
ruff format .

# Type checking
mypy .
```

### Database

```bash
# Connect to local PostgreSQL
psql -h localhost -U principle_user -d principle_db

# Run migrations
alembic upgrade head

# Create new migration
alembic revision --autogenerate -m "add new table"

# Reset database (development only)
alembic downgrade base && alembic upgrade head
```

## Project Structure

### Frontend (`/frontend`)

- `app/` - Next.js 14 App Router pages and layouts
- `components/` - Reusable UI components
  - `canvas/` - Canvas-related components (PrincipleNode, QuestionNode, etc.)
  - `ui/` - Basic UI components (Button, Modal, etc.)
  - `collaboration/` - Real-time collaboration components
- `lib/` - Utility functions and configurations
  - `store/` - Zustand state management
  - `api/` - API client functions
  - `websocket/` - WebSocket connection handling
- `types/` - TypeScript type definitions
- `hooks/` - Custom React hooks

### Backend (`/backend`)

- `app/` - FastAPI application
  - `api/` - API route handlers
    - `v1/` - API version 1 endpoints
      - `auth.py` - Authentication endpoints
      - `canvas.py` - Canvas CRUD operations
      - `ai.py` - AI integration endpoints
      - `collaboration.py` - Real-time collaboration
  - `core/` - Core configurations and utilities
    - `config.py` - Application settings
    - `database.py` - Database connection
    - `security.py` - Auth and security utilities
  - `models/` - SQLAlchemy database models
  - `schemas/` - Pydantic request/response schemas
  - `services/` - Business logic services
    - `canvas_service.py` - Canvas operations
    - `ai_service.py` - Gemini AI integration
    - `auth_service.py` - Authentication logic
  - `websocket/` - WebSocket handlers

## Key Technologies & Patterns

### Frontend

- **Canvas**: `@xyflow/react` for node-based canvas
- **State**: Zustand for client state, React Query for server state
- **Real-time**: Socket.IO client for WebSocket connections
- **Styling**: Tailwind CSS with custom components
- **Forms**: React Hook Form with Zod validation

### Backend

- **API**: FastAPI with automatic OpenAPI docs
- **Database**: SQLAlchemy ORM with Alembic migrations
- **Cache**: Redis for session storage and API response caching
- **Auth**: JWT tokens with 4-hour expiration
- **WebSocket**: python-socketio for real-time features
- **AI**: Google Generative AI (Gemini) for content generation

## Environment Setup

### Required Environment Variables

```bash
# Backend (.env)
DATABASE_URL=postgresql://user:pass@localhost:5432/principle_db
REDIS_URL=redis://localhost:6379
GEMINI_API_KEY=AIzaSyB1lceprGeVsydbuEjMw_yKZz23M6LDfP0
JWT_SECRET_KEY=your_jwt_secret
CORS_ORIGINS=http://localhost:3000

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

## Development Workflow

### Setting Up New Features

1. Create database migration if needed: `alembic revision --autogenerate`
2. Add/update Pydantic schemas in `backend/app/schemas/`
3. Implement business logic in `backend/app/services/`
4. Create API endpoints in `backend/app/api/v1/`
5. Add TypeScript types in `frontend/types/`
6. Create React components in `frontend/components/`
7. Add API client functions in `frontend/lib/api/`

### Canvas Node Types

- **PrincipleNode**: Core concept nodes (💡 icon)
- **QuestionNode**: Interactive question nodes (🤔 icon)
- **ConnectionNode**: Real-world application nodes (🌎 icon)

### WebSocket Events

All real-time features use Socket.IO with these event patterns:

- `node:move` - Node position changes
- `node:create` - New node creation
- `node:delete` - Node deletion
- `connection:create` - Edge creation
- `user:cursor` - Cursor position tracking

### API Response Format

```typescript
interface APIResponse<T> {
  data: T;
  message?: string;
  error?: string;
}
```

### Database Patterns

- Use UUIDs for primary keys
- Store canvas data as JSONB for flexibility
- Use timestamps with `DEFAULT NOW()`
- Foreign key constraints for data integrity

## Testing Strategy

### Frontend Tests

- Unit tests: Jest + React Testing Library
- Integration tests: Playwright for E2E
- Component tests: Storybook for visual testing

### Backend Tests

- Unit tests: pytest with fixtures
- API tests: FastAPI test client
- Database tests: pytest-postgresql for isolated DB tests

## Performance Considerations

### Frontend

- Canvas virtualization for >100 nodes
- React.memo for expensive node components
- Debounced auto-save (30 second intervals)
- WebSocket message batching

### Backend

- Redis caching for Gemini API responses (24h TTL)
- Database connection pooling
- Rate limiting: 100 requests/minute per user
- Async/await for all I/O operations

## Security Requirements

- JWT tokens with 4-hour expiration
- Input validation with Pydantic schemas
- SQL injection prevention via SQLAlchemy
- Rate limiting on all public endpoints
- CORS configuration for frontend domains only

## AI Integration

### Gemini API Usage

- Model: `gemini-1.5-pro-latest`
- Rate limit: 60 requests/minute per user
- Caching: Redis with 24h TTL
- Fallback: Return cached responses on API failures

### Prompt Templates

Located in `backend/app/services/prompts.py`:

- `DECONSTRUCTION_PROMPT` - Break down concepts into principles
- `QUESTION_GENERATION_PROMPT` - Generate probing questions
- `REAL_WORLD_CONNECTIONS_PROMPT` - Find practical applications

## Common Issues & Solutions

### Canvas Performance

- Use `React.memo` for node components
- Implement viewport-based rendering for large canvases
- Batch WebSocket updates every 100ms

### Database Migrations

- Always backup before running migrations in production
- Test migrations on staging with production data copy
- Use `alembic revision --autogenerate` but review generated SQL

### WebSocket Scaling

- Use Redis pub/sub for multiple server instances
- Implement graceful disconnection handling
- Add reconnection logic with exponential backoff

## Development Prerequisites

- Node.js 18+ for frontend
- Python 3.11+ for backend
- PostgreSQL 14+ for database
- Redis 7+ for caching
- Gemini API key for AI features
