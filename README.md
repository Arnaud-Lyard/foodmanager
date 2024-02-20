# Relaxing Hippoquests

## Table of Contents

- [Relaxing Hippoquests](#relaxing-hippoquests)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Features](#features)

## Installation

1. Create a `.env` and `.env.production` file at the project root, in the client and server folders.
2. Fill in the information using the `example.env` files for development.
3. Use the following command for development:
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```
4. Production deployment happens automatically upon pushing to the `main` branch.

## Prerequisites

- Docker
- pnpm
- Access to a manageable VPS with webhook, Caddy, and Docker installed
- DevOps knowledge

## Features

- Player grouping
- Display of the team's player list
- Display of the team and player rankings
- Display of a list of articles
