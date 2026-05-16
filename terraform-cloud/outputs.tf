output "public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.sre_vm.public_ip
}

output "ssh_command" {
  description = "SSH command to connect to the instance"
  value       = "ssh ubuntu@${aws_instance.sre_vm.public_ip}"
}

output "grafana_url" {
  description = "Grafana URL"
  value       = "http://${aws_instance.sre_vm.public_ip}:3000"
}

output "prometheus_url" {
  description = "Prometheus URL"
  value       = "http://${aws_instance.sre_vm.public_ip}:9090"
}

output "http_url" {
  description = "HTTP URL"
  value       = "http://${aws_instance.sre_vm.public_ip}:80"
}