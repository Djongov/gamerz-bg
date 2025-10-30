---
id: save-remote-state
title: Terraform save remote state locally
tags:
  - Terraform
---

Here is how you can run save current remote state to a local file (for backup mostly):

``` hcl title="PowerShell"
terraform state pull > backup-$(Get-Date -Format "yyyyMMdd-HHmmss").tfstate
```
