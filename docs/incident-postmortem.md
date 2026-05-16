# Incident Report and Postmortem

## Incident Title
Order Service database connection failure.

## Date and Time
Insert your test date and time.

## Impact
Order creation and order retrieval were unavailable. Other services continued running, so the system experienced partial degradation instead of full outage.

## Detection
Prometheus detected that the Order Service error metric increased and the `/orders` endpoint returned `Database connection failed`.

## Root Cause
The `DATABASE_URL` environment variable was intentionally changed to an incorrect PostgreSQL hostname to simulate production misconfiguration.

## Mitigation
The database connection string was corrected in `docker-compose.yml`, and the Order Service container was restarted.

## Recovery
After restart, the `/ready` endpoint returned `database: connected`, `/orders` returned `database_time`, and Prometheus metrics normalized.

## Lessons Learned
Readiness checks must verify database connectivity, not only HTTP service availability. Configuration changes should be validated before deployment.

## Preventive Actions
1. Keep `/ready` endpoint for database dependency checks.
2. Add Prometheus alerts for error rate and service downtime.
3. Use Ansible deployment automation to reduce manual configuration mistakes.
4. Use Kubernetes readiness probes for safer rollouts.
