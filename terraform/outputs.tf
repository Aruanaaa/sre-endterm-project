output "container_name" {
  value = docker_container.nginx_container.name
}

output "frontend_url" {
  value = "http://localhost:8081"
}