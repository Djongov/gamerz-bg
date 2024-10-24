---
id: clear-state
title: Clear terraform state
tags:
  - Terraform
---

Here is how you can empty your state:

``` hcl title="terraform"
for resource in $(terraform state list); do
    terraform state rm $resource
done
```

another way is to run this single command

``` hcl title="terraform"
terraform state list | xargs -n1 terraform state rm
```
