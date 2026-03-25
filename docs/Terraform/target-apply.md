---
id: target-apply
title: Terraform target apply
tags:
  - Terraform
---

If you want to target a specific resouce to be touched alone

``` bash title="bash"
terraform apply -target='module.tests.azurerm_container_app_environment_dapr_component.default["env01.test"]'
```

if you work with tfvars files, make sure to add them

``` bash title="bash"
terraform apply -target='module.tests.azurerm_container_app_environment_dapr_component.default["env01.test"]' -var-file dev.tfvars
```

If you want to recreate a resouce with a target

``` bash title="bash"
terraform apply -replace='module.tests.azurerm_container_app_environment_dapr_component.default["env01.test"]' -target='module.tests.azurerm_container_app_environment_dapr_component.default["env01.test"]' -var-file dev.tfvars
```
