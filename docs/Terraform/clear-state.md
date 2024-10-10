---
id: clear-state
title: Clear terraform state
tags:
  - Terraform
---

Here is how you can empty your state:

``` jsx title="terraform"
for resource in $(terraform state list); do
    terraform state rm $resource
done
```
