# zhengeek-blog
ZhenGeek is my first long-term full-stack personal digital platform.

It integrates technical blogging, learning records, life logs, project portfolio, artistic expression, and future community interaction.

More than a full-stack project, it is a visible record of my journey from zero toward becoming a better engineer.

## Deployment

ZhenGeek v1.0 uses a separated frontend/backend deployment:

- Vue frontend built as static files.
- Spring Boot backend running as a Jar.
- MySQL stores article data.
- Admin APIs are protected by Bearer token authentication.

See [docs/deployment-v1.md](docs/deployment-v1.md) for environment variables, build commands, and the v1.0 acceptance checklist.
