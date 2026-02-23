---
id: save-remote-state
title: Terraform save remote state locally
tags:
  - Terraform
---

Here is how you can run save current remote state to a local file (for backup mostly):

``` PowerShell title="PowerShell"
terraform state pull > backup-$(Get-Date -Format "yyyyMMdd-HHmmss").tfstate
```

``` bash title="bash"
terraform state pull > backup-$(date +"%Y%m%d-%H%M%S").tfstate
```
