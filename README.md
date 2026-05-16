# Comprehensive SRE Implementation for a Distributed Microservices System

This project demonstrates SRE practices for a distributed microservices system using Docker Compose, Docker Swarm, Kubernetes, Terraform, Ansible, Prometheus, Grafana, incident response, and capacity planning.

## Services

Microservices:
1. Auth Service — port 3002
2. Product Service — port 3001
3. Order Service — port 3003
4. User Service — port 3004
5. Chat Service — port 3005
6. Payment Service — port 3006
7. Notification Service — port 3007

Supporting components:
- API Gateway — port 3008
- Frontend — port 8080
- PostgreSQL — port 5432
- Prometheus — port 9090
- Grafana — port 3000

## Run with Docker Compose

```bash
docker compose up -d --build
docker ps
```

Test endpoints:

```bash
curl http://localhost:3008/system-status
curl http://localhost:3003/orders
curl http://localhost:9090/targets
```

## Run with Docker Swarm

```bash
docker swarm init
docker stack deploy -c docker-compose.yml sreapp
docker service ls
docker stack ps sreapp
```

Remove stack:

```bash
docker stack rm sreapp
docker swarm leave --force
```

## Run with Kubernetes

For Docker Desktop Kubernetes:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/postgres.yaml
kubectl apply -f k8s/app-services.yaml
kubectl apply -f k8s/hpa.yaml
kubectl get pods -n sre-project
kubectl get svc -n sre-project
```

## Terraform

Local Docker provider example:

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

AWS/cloud infrastructure files are in `terraform-aws/` and `terraform-cloud/`.

## Ansible

```bash
ansible-playbook -i ansible/inventory.ini ansible/deploy.yml
```

## SLIs and SLOs

SLIs:
- Availability
- Latency
- Error rate
- Request success rate

SLOs:
- Availability ≥ 99%
- Latency ≤ 200 ms
- Error rate ≤ 1%

## Incident Simulation

Simulate failure:
1. Change `DATABASE_URL` in `docker-compose.yml` from `postgres` to `wrong-postgres`.
2. Run `docker compose up -d --build order-service`.
3. Open `http://localhost:3003/orders`.
4. Confirm error: `Database connection failed`.

Recover:
1. Change `DATABASE_URL` back to `postgres`.
2. Run `docker compose up -d --build order-service`.
3. Open `http://localhost:3003/ready` and `http://localhost:3003/orders`.

## Final PDF Evidence

Use `docs/screenshot-checklist.md` and `docs/incident-postmortem.md` to prepare the final PDF. The final submission must include the GitHub repository link.
