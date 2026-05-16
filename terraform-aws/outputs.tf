output "public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.sre_vm.public_ip
}

output "public_dns" {
  description = "Public DNS of the EC2 instance"
  value       = aws_instance.sre_vm.public_dns
}