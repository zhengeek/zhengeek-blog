# ZhenGeek v1.0 Deployment Guide

This guide describes the first production-ready deployment shape for ZhenGeek:

- Frontend: Vue 3 static build served by Nginx or another static file server.
- Backend: Spring Boot Jar running with environment variables.
- Database: MySQL database named `zhengeek_blog`.

Do not commit real `.env` files, real database passwords, or generated build output.

## 1. Required Environment Variables

Backend production environment:

```env
DB_URL=jdbc:mysql://YOUR_DB_HOST:3306/zhengeek_blog?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com

ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN_SECONDS=86400
```

Frontend production environment:

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

## 2. Build

Frontend:

```powershell
cd frontend
npm.cmd run build
```

Backend:

```powershell
cd backend
mvn test
mvn package
```

The backend Jar is generated under `backend/target/`. This directory is build output and should not be committed.

## 3. Run Backend

Set the backend environment variables on the server, then run:

```powershell
java -jar backend/target/zhengeek-blog-backend-0.0.1-SNAPSHOT.jar
```

For Linux servers, use the same environment variable names and run the Jar with your preferred process manager.

## 4. Serve Frontend

Deploy the contents of:

```text
frontend/dist/
```

to your static site directory or Nginx root.

If using history mode routing, configure the frontend server to fall back to `index.html` for unknown paths.

## 5. v1.0 Acceptance Checklist

Public site:

- `/` loads.
- `/about` loads.
- `/projects` loads.
- `/blog` loads.

Backend:

- `GET /api/health` returns `status: ok`.
- `GET /api/articles` returns only `published` articles.
- `GET /api/admin/articles` returns `401` without a Bearer token.
- `POST /api/admin/login` returns a token with valid admin credentials.
- Admin article create, update, publish, pin, archive, and delete work after login.

Frontend admin:

- Visiting `/admin/articles` while logged out redirects to `/admin/login`.
- Login succeeds with production admin credentials.
- Refreshing an admin page keeps access while the token is not expired.
- Expired or invalid token shows a clear login/auth error.

## 6. Git Hygiene

Do not commit:

```text
backend/target/
frontend/dist/
node_modules/
.env
backend/.env
scripts/start-backend.local.ps1
```

If `backend/target` appears in `git status`, remove it from Git tracking without deleting local files:

```powershell
git rm --cached -r backend/target
git commit -m "chore: stop tracking backend build output"
```
