# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GraphQL Job Board application built for the "GraphQL by Example" course. It demonstrates a full-stack GraphQL implementation with Apollo Server/Express backend and React frontend using both GraphQL-Request and Apollo Client.

## Architecture

### Backend (server/)
- **Apollo Server** with Express integration running on port 9000
- **SQLite database** with Knex.js ORM for data persistence
- **GraphQL schema** defining Job and Company types with queries and mutations
- **JWT authentication** middleware for protected routes
- **Database structure**: Companies and Jobs with relational data

### Frontend (client/)
- **React 19** with React Router for navigation
- **Vite** for development server and build tooling
- **GraphQL-Request** client for API communication
- **Bulma CSS** framework for styling
- **JWT handling** for authentication state

### Key Patterns
- GraphQL resolvers handle business logic and data fetching
- Database access isolated in db/ modules (jobs.js, companies.js, users.js)
- Client-side GraphQL queries/mutations separated in lib/graphql/
- Component-based React architecture with pages/ and components/ structure

## Development Commands

### Client (React Frontend)
```bash
cd client
npm run dev        # Start development server (Vite)
npm run build      # Build for production
npm run preview    # Preview production build
npx eslint .       # Run linting (ESLint configured)
```

### Server (GraphQL Backend)
```bash
cd server
npm start          # Start server with nodemon (auto-reload on .js/.graphql changes)
```

### Database Setup
```bash
cd server
node scripts/create-db.js        # Initialize SQLite database
node scripts/insert-50-jobs.js   # Populate with sample data
```

## Key Files

### GraphQL Schema & Resolvers
- `server/schema.graphql` - GraphQL type definitions
- `server/resolvers.js` - Query and mutation resolvers
- `server/auth.js` - JWT authentication middleware

### Database Layer
- `server/db/connection.js` - Knex database connection
- `server/db/jobs.js` - Job data access methods
- `server/db/companies.js` - Company data access methods
- `server/db/users.js` - User authentication data

### Frontend GraphQL
- `client/src/lib/graphql/queries.js` - GraphQL query definitions
- `client/src/lib/graphql/mutations.js` - GraphQL mutation definitions
- `client/src/lib/auth.js` - JWT token handling

### React Components
- `client/src/pages/` - Route components (HomePage, JobPage, etc.)
- `client/src/components/` - Reusable UI components

## Development Notes

### Running the Full Application
1. Start the GraphQL server: `cd server && npm start`
2. Start the React client: `cd client && npm run dev`
3. Access at http://localhost:5173 (client) and http://localhost:9000/graphql (GraphQL playground)

### Authentication Flow
- Users authenticate via `/login` endpoint (returns JWT)
- JWT stored in localStorage and included in GraphQL requests
- Protected mutations require valid authentication

### Database Schema
- **Companies**: id, name, description
- **Jobs**: id, title, description, companyId, createdAt
- **Users**: id, email, password (hashed)

### Known TODOs
- `server/resolvers.js:32` - Company ID is hardcoded for createJob mutation (should use authenticated user's company)