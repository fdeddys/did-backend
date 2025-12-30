# 🐳 Docker Multi-Environment Setup Guide

Complete guide untuk setup dan run aplikasi dengan Docker di berbagai environment.

---

## 📦 Prerequisites

- Docker Desktop installed and running
- Node.js 20+ (untuk development tanpa Docker)
- PostgreSQL client tools (optional, untuk debugging)

---

## 🚀 Quick Start

### 1. Initial Setup

```bash
# Clone repository
git clone <your-repo>
cd <project-directory>

# Copy environment file
cp .env.example .env.dev

# Edit .env.dev dengan config Anda
nano .env.dev
```

### 2. Start Development Environment

```bash
# Option 1: Using docker compose directly
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# Option 2: Using npm scripts (recommended)
npm run docker:dev:build
```

### 3. Run Migrations

```bash
# Run migrations
npm run migration:docker:dev

# Or manually
docker exec backend-app-dev npm run migration:run
```

### 4. Access Application

- **API**: http://localhost:3000
- **PostgreSQL**: localhost:5433
  - Username: postgres
  - Password: (from .env.dev)
  - Database: db_distributor

---

## 📋 Available Environments

| Environment | Docker Compose File | .env File | Database |
|-------------|-------------------|-----------|----------|
| **Development** | docker-compose.dev.yml | .env.dev | PostgreSQL in Docker |
| **Sandbox** | docker-compose.sandbox.yml | .env.sandbox | External DB |
| **Production** | docker-compose.prod.yml | .env.prod | Managed DB (RDS) |

---

## 🛠️ NPM Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    // Development
    "docker:dev": "docker compose -f docker-compose.yml -f docker-compose.dev.yml up",
    "docker:dev:build": "docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d",
    "docker:dev:down": "docker compose -f docker-compose.yml -f docker-compose.dev.yml down",
    "docker:dev:logs": "docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f",
    
    // Sandbox
    "docker:sandbox": "docker compose -f docker-compose.yml -f docker-compose.sandbox.yml up",
    "docker:sandbox:build": "docker compose -f docker-compose.yml -f docker-compose.sandbox.yml up --build -d",
    "docker:sandbox:down": "docker compose -f docker-compose.yml -f docker-compose.sandbox.yml down",
    
    // Production (use with caution)
    "docker:prod": "docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d",
    "docker:prod:build": "docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d",
    "docker:prod:down": "docker compose -f docker-compose.yml -f docker-compose.prod.yml down",
    
    // Migrations
    "migration:docker:dev": "docker exec backend-app-dev npm run migration:run",
    "migration:docker:sandbox": "docker exec backend-app-sandbox npm run migration:run",
    "migration:docker:prod": "docker exec backend-app-prod npm run migration:run",
    
    "migration:revert:docker:dev": "docker exec backend-app-dev npm run migration:revert"
  }
}
```

---

## 💻 Common Commands

### Starting & Stopping

```bash
# Start development (foreground - see logs)
npm run docker:dev

# Start development (background - terminal free)
npm run docker:dev:build

# Stop development
npm run docker:dev:down

# Stop and remove volumes (⚠️ data will be lost!)
docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```

### Viewing Logs

```bash
# All logs
npm run docker:dev:logs

# App logs only
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f app

# Postgres logs only
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f postgres
```

### Executing Commands in Container

```bash
# Enter app container
docker exec -it backend-app-dev sh

# Enter postgres container
docker exec -it backend-postgres-dev sh

# Run migration
docker exec backend-app-dev npm run migration:run

# Run tests
docker exec backend-app-dev npm run test

# Access PostgreSQL CLI
docker exec -it backend-postgres-dev psql -U postgres -d nestjs_product_db_dev
```

### Rebuilding

```bash
# Rebuild after Dockerfile or package.json changes
npm run docker:dev:build

# Force rebuild (no cache)
docker compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache
npm run docker:dev:build
```

---

## 🔄 Development Workflow

### 1. Normal Development (Hot Reload)

```bash
# Start Docker
npm run docker:dev:build

# Edit files in src/
# Changes are automatically detected and app restarts!

# View logs
npm run docker:dev:logs
```

### 2. Adding New Dependencies

```bash
# Edit package.json
# Add new dependency

# Rebuild container
npm run docker:dev:build
```

### 3. Database Schema Changes

```bash
# Edit entity file (e.g., src/users/entities/user.entity.ts)

# Generate migration
docker exec backend-app-dev npm run migration:generate src/database/migrations/UpdateUserTable

# Run migration
npm run migration:docker:dev

# Verify
docker exec -it backend-postgres-dev psql -U postgres -d nestjs_product_db_dev
\d users
```

---

## 🌍 Environment-Specific Setup

### Development (Local)

```bash
# 1. Setup
cp .env.example .env.dev
# Edit DB_PASSWORD, JWT_SECRET, etc.

# 2. Start
npm run docker:dev:build

# 3. Run migrations
npm run migration:docker:dev

# 4. Test
curl http://localhost:3000/users
```

**Features:**
- ✅ Hot reload
- ✅ PostgreSQL in Docker
- ✅ Verbose logging
- ✅ Port 5433 exposed for pgAdmin

---

### Sandbox

```bash
# 1. Setup
cp .env.example .env.sandbox
# Edit with sandbox database credentials

# 2. Start
npm run docker:sandbox:build

# 3. Run migrations
npm run migration:docker:sandbox
```

**Features:**
- ✅ Connect to external database
- ✅ No PostgreSQL container
- ✅ Auto-restart on failure
- ✅ Run migrations automatically

---

### Production

```bash
# 1. Setup (on production server)
cp .env.example .env.prod
# Edit with production database credentials

# 2. Build optimized image
npm run docker:prod:build

# 3. Run migrations
npm run migration:docker:prod
```

**Features:**
- ✅ Optimized production build
- ✅ Multi-stage Dockerfile (smaller image)
- ✅ No hot reload (better performance)
- ✅ Connect to managed database
- ✅ Always restart on failure

---

## 🔍 Troubleshooting

### Port Already in Use

**Problem:** Port 5432 or 3000 already in use

**Solution:**
```bash
# Check what's using the port
lsof -ti:5432
lsof -ti:3000

# Kill the process
kill -9 <PID>

# Or change port in docker-compose.dev.yml
ports:
  - "5434:5432"  # Use different host port
```

---

### Cannot Connect to Database

**Problem:** App can't connect to PostgreSQL

**Solution:**
```bash
# 1. Check postgres container is healthy
docker compose -f docker-compose.yml -f docker-compose.dev.yml ps

# 2. Check logs
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs postgres

# 3. Test connection manually
docker exec -it backend-postgres-dev psql -U postgres

# 4. Verify environment variables
docker exec backend-app-dev env | grep DB_
```

---

### Hot Reload Not Working

**Problem:** Code changes not detected

**Solution:**
```bash
# 1. Verify volume mounts
docker inspect backend-app-dev | grep Mounts -A 20

# 2. Restart container
npm run docker:dev:down
npm run docker:dev:build

# 3. Check if node_modules is protected
# /app/node_modules should be an anonymous volume
```

---

### Module Not Found After npm install

**Problem:** New package not found

**Solution:**
```bash
# Always rebuild after package.json changes
npm run docker:dev:build
```

---

## 📊 Docker Compose File Hierarchy

```
docker-compose.yml (BASE)
    ├── Shared configuration
    ├── Network definition
    └── Volume definition
            ↓
docker-compose.dev.yml (OVERRIDES)
    ├── Development-specific config
    ├── PostgreSQL service
    └── Hot reload volumes
            ↓
RESULT: Merged configuration for development
```

**Merge Priority:**
1. Environment-specific file (dev/sandbox/prod)
2. Base file (docker-compose.yml)

---

## 🔒 Security Best Practices

### ✅ DO:
- Use `.env` files for secrets
- Add `.env.*` to `.gitignore`
- Use strong passwords in production
- Rotate JWT secrets regularly
- Use managed databases in production

### ❌ DON'T:
- Commit `.env` files to Git
- Use same secrets across environments
- Use weak passwords ("password123")
- Expose database ports in production
- Use `synchronize: true` in production

---

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [NestJS Docker Guide](https://docs.nestjs.com/recipes/dockerfile)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)

---

## 🆘 Getting Help

If you encounter issues:

1. Check logs: `npm run docker:dev:logs`
2. Verify environment: `docker exec backend-app-dev env`
3. Check database: `docker exec -it backend-postgres-dev psql -U postgres`
4. Rebuild from scratch: `docker compose down -v && npm run docker:dev:build`

---

Happy Coding! 🚀
