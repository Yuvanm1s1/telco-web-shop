# Telco Web Shop — Complete Project README

Welcome to the fullstack Telco Web Shop!
This repository contains both the **frontend** and **backend** code powering a microservices-based e-commerce platform, deployed with modern DevOps techniques and integrated external services, all hosted securely on AWS.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack \& Microservices](#tech-stack--microservices)
- [Architecture Diagram](#architecture-diagram)
- [Local Development](#local-development)
- [Deployment on AWS](#deployment-on-aws)
    - [Backend (EC2, Docker)](#backend--ec2-docker)
    - [Frontend (Static Hosting / Local Dev)](#frontend--static-hosting--local-dev)
    - [Prometheus \& Grafana Integration](#prometheus--grafana-integration)
- [External Integrations](#external-integrations)
    - [Stripe Payments](#stripe-payments)
    - [MongoDB](#mongodb)
    - [Clerk Authentication](#clerk-authentication)
- [Security \& DevOps](#security--devops)
- [Versioning \& Repository Hygiene](#versioning--repository-hygiene)
- [How to Run the Project](#how-to-run-the-project)
- [Proof of Live AWS Deployment](#proof-of-live-aws-deployment)
- [Screenshots](#screenshots)
- [Troubleshooting \& FAQ](#troubleshooting--faq)
---

## Project Overview

- **Frontend:** Modern React (Vite), styled for a seamless customer experience.
- **Backend:** Node.js/Express REST API, with Dockerized microservices.
- **Database:** MongoDB for fast, flexible data storage.
- **Payments:** Integrated Stripe API for secure, real-time payment processing.
- **Authentication:** Managed by Clerk for easy, modern identity flow.
- **Monitoring:** Real-time metrics via Prometheus, visualized with Grafana dashboards.
- **Cloud Hosting:** AWS EC2 for back-end, flexible static site host for front-end.


## Tech Stack \& Microservices

| Layer | Technology | Notes |
| :-- | :-- | :-- |
| Frontend | React (Vite) | Next-gen JS, fast reload, SPA |
| Backend | Node.js / Express | Core business/API logic, REST endpoints |
| Database | MongoDB (official Docker image) | Document store, running as a Docker container |
| Payment Processor | Stripe API | Secure web payments |
| Auth | Clerk | User registration/login, JWTs |
| Monitoring | Prometheus (Docker) | Backend/infra metrics, scrapes `/metrics` |
| Visualization | Grafana (Docker) | Live dashboards |
| Orchestration | Docker Compose | Easy multi-service, local \& prod parity |
| Cloud | AWS EC2 | Ubuntu 24.04 LTS server for backend \& monitoring |
| Static Hosting | Netlify/Vercel/Local for Dev | Frontend built and published separately |

## Architecture Diagram

```
+-------------------+           +-----------------------------+
|   Frontend (Vite) | <-------> |  Backend API (Node/Express) |
|  (Local/Netlify)  |   HTTP    |     (EC2, Docker)           |
+-------------------+           +-----------^-----------------+
                                      |       |
                                      |       +-------------------+
                                      |                           |
                        +-----------------------+     +---------------------+
                        |      MongoDB (Docker) |     |  Clerk (External)   |
                        +-----------------------+     +---------------------+
                                      |
                          +------------------------+
                          | Stripe Payments (API)  |
                          +------------------------+
                                      |
                        +-----------------------+      +-------------------+
                        | Prometheus (Docker)   |<---->| Grafana (Docker)  |
                        +-----------------------+      +-------------------+
```


## Local Development

### Prerequisites

- Node.js ≥ 18
- Docker \& Docker Compose
- npm or yarn


### Clone and Setup

```bash
git clone https://github.com/Yuvanm1s1/telco-web-shop.git
cd telco-web-shop

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies (not needed if using Docker for backend)
cd ../backend
npm install
```


### Local Run (Frontend)

```bash
# In 'frontend'
npm run dev
# Opens: http://localhost:5173/
```

- By default, the frontend assumes the backend API is running on a remote EC2 instance.
- Set up the `.env` with:

```
VITE_API_BASE_URL=http://<EC2-PUBLIC-IP>:3000
```


## Deployment on AWS

### Backend (EC2, Docker)

1. **Launch AWS EC2 instance:**
Ubuntu 24.04, t2.micro or better.
2. **SSH to your instance:**

```bash
ssh -i <pem-key> ubuntu@<EC2-PUBLIC-IP>
```

3. **Install Docker \& Docker Compose Plugin:**

```bash
sudo apt update
sudo apt install docker.io docker-compose-plugin -y
sudo usermod -aG docker ubuntu   # (logout and log in if needed)
```

4. **Transfer project files:**
Upload only the **backend/** folder and the `docker-compose.yml`, plus any configs (like `.env`, `prometheus.yml`).
5. **Build and run containers:**

```bash
docker compose down --rmi all --volumes
docker compose build --no-cache
docker compose up
```

    - Starts `backend`, `mongo`, `prometheus`, `grafana` in isolated containers.
6. **Configure AWS Security Group:**
    - Allow inbound: 22 (SSH), 3000 (backend), 9090 (Prometheus), 3001 (Grafana), (optionally 80/443 for frontend)
    - Lock down 22 to your IP only for security.

### Frontend (Static Hosting / Local Dev)

- Build locally:

```bash
npm run build
```

- For production: upload `dist/` (Vite) or `build/` (CRA) to Netlify, Vercel, or AWS S3.
- For integration/testing: run with `npm run dev` and point `VITE_API_BASE_URL` to your EC2 backend.


## Prometheus \& Grafana Integration

- **Prometheus** deployed via Docker Compose, scrapes `/metrics` endpoint from backend for real-time App/Infra metrics.
- **Grafana** also comes up in Docker Compose, preconfigured with Prometheus as a data source.
    - **Grafana URL:** `http://<EC2-PUBLIC-IP>:3001`
    - **Prometheus data source URL:** Set as `http://prometheus:9090` inside Grafana (when both in Docker Compose).


## External Integrations

### Stripe Payments

- Handles secure payments using Stripe API.
- Keys stored in backend `.env` (not checked into git).
- All payment workflows handled via `/api/payment/create-payment-intent` backend endpoint.


### MongoDB

- Runs in its own Docker container.
- Persistent volume mapped as `mongo-data:/data/db`.
- Connection string (in Compose):
`MONGO_URI=mongodb://mongodb:27017/my-mongo`


### Clerk Authentication

- Frontend uses Clerk React SDK for user login/signup flow.
- Backend validates JWTs received from Clerk in API request headers.
- No passwords stored on our infrastructure.


## Security \& DevOps

- **.env files are git-ignored.** Never commit secrets/keys.
- **Node modules are git-ignored and rebuilt from `package.json` in Docker.**
- **Stripe, Clerk, and other secrets must be set only in production environment files.**
- **Backups:**
    - All data (MongoDB) uses Docker volumes; EBS snapshot backups are recommended for prod.
- **Monitoring:**
    - Prometheus scrapes service metrics
    - Grafana visualizes system/infra state.


## Versioning \& Repository Hygiene

- Uses git for fullstack monorepo versioning; only tracks source, never node_modules, builds, or secrets.
- To remove accidentally-committed secrets, use cleaning tools (`git filter-repo`) and force-push updated history.
- Repo branches based on features, hotfixes, and releases; see the commit graph for project evolution.


## How to Run the Project

1. Clone the repo:

```bash
git clone https://github.com/Yuvanm1s1/telco-web-shop.git
```

2. Set up `.env` files in both `frontend/` and `backend/` per provided `.env.example` templates.
3. To run everything locally:
    - Use Docker Compose for backend/infra (`docker compose up` inside `backend/`)
    - Start React frontend locally (`npm run dev` in `frontend/`)
4. For production:
    - Deploy backend on AWS EC2 as described.
    - Host frontend statically via Netlify/Vercel/S3.
5. Test end-to-end by browsing your frontend and verifying API, payment (use Stripe test card), and monitoring dashboards.

## Proof of Live AWS Deployment

**Show proof in one or more of these ways:**

- Share the live API endpoint:
`http://<EC2-PUBLIC-IP>:3000/api/deployed-on`
- Screenshots of the AWS EC2 Console, `docker compose ps`, and live API calls from within the remote instance.
- Public endpoints for Grafana, Prometheus, and your backend.


## Screenshots


<img width="332" height="388" alt="Screenshot 2025-07-23 214641" src="https://github.com/user-attachments/assets/053e4a7d-6348-4815-8dac-a78fd7ffe58e" />
<img width="1077" height="731" alt="Screenshot 2025-07-23 224238" src="https://github.com/user-attachments/assets/39030062-1e79-4b13-a86f-cf3fc0fab355" />
<img width="2841" height="1506" alt="Screenshot 2025-07-24 001419" src="https://github.com/user-attachments/assets/93f90014-f348-430b-b5f2-c2f32fa481d0" />
<img width="2861" height="1573" alt="Screenshot 2025-07-24 001432" src="https://github.com/user-attachments/assets/f4fb1cbe-fb85-4fdb-a8fa-933f77e358a4" />
<img width="2828" height="1683" alt="Screenshot 2025-07-24 001526" src="https://github.com/user-attachments/assets/b4628c7d-6e92-440f-aac6-42217f786ad0" />
<img width="2863" height="1608" alt="Screenshot 2025-07-24 001535" src="https://github.com/user-attachments/assets/5c89d554-af54-4e43-81b3-084070a44cbb" />
<img width="1911" height="991" alt="Screenshot 2025-07-24 001852" src="https://github.com/user-attachments/assets/9206718b-676d-4434-aff6-79f021f2f6b3" />
<img width="875" height="881" alt="Screenshot 2025-07-24 001914" src="https://github.com/user-attachments/assets/df257dd3-8296-46b7-908e-313ba9f8da6f" />
<img width="1905" height="912" alt="Screenshot 2025-07-24 001945" src="https://github.com/user-attachments/assets/0d25f998-2de1-4e96-ab8b-4ca14eb70ffb" />
<img width="1550" height="919" alt="Screenshot 2025-07-24 003728" src="https://github.com/user-attachments/assets/a78bf37b-62ae-44a7-b53a-b598db1cdd45" />



