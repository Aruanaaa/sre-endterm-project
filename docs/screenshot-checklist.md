# Screenshot Checklist for Final PDF

1. Docker Desktop running.
2. `docker compose up -d --build` successful output.
3. `docker ps` showing frontend, 7 microservices, PostgreSQL, Prometheus, Grafana.
4. Frontend opened at `http://localhost:8080`.
5. API Gateway `http://localhost:3008/system-status` showing service health.
6. Order Service `http://localhost:3003/orders` showing `database_time`.
7. Prometheus targets page `http://localhost:9090/targets` showing UP targets.
8. Prometheus query for `request_count`, `error_count`, and `up`.
9. Grafana dashboard panels for request rate, error count, service uptime, latency.
10. Incident screenshot: broken `DATABASE_URL` or stopped postgres/order-service.
11. Incident detection screenshot: Prometheus alert or error metric.
12. Recovery screenshot: fixed service and normalized metrics.
13. Docker Swarm: `docker swarm init` and `docker stack deploy` output.
14. Kubernetes: `kubectl get pods -n sre-project` and `kubectl get svc -n sre-project`.
15. Terraform: `terraform init`, `terraform plan`, `terraform apply` output.
16. Ansible: `ansible-playbook -i ansible/inventory.ini ansible/deploy.yml` output.
17. GitHub repository page with uploaded code.
