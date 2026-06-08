# ZhenGeek Codex Rules

## Allowed
- Edit source files inside this repository.
- Read files inside this repository.
- Run:
  - git status --short
  - git diff
  - cd frontend && npm.cmd run build
  - cd backend && mvn test

## Not allowed without explicit user instruction
- git add .
- git commit
- git push
- git rm
- git clean
- deleting files or directories
- taskkill
- changing PowerShell ExecutionPolicy
- editing .env
- editing scripts/start-backend.local.ps1
- writing real DB passwords
- adding backend/target, frontend/dist, node_modules

## Project notes
- Backend: Spring Boot 3 + Java 17 + MySQL, under backend/
- Frontend: Vue 3 + TypeScript + Vite, under frontend/
- Do not modify database security config unless explicitly asked.