---
id: migrate-workpsace
title: Terraform migrate workspace
tags:
  - Terraform
---

Sometimes you need to move from one workspace to another. Here is how:

In this case we want to move from workspaceA (source) to workspaceB (destination), and remove workspaceA and end up only with workspaceB

So here are the commands to do so:

Define the workspace name from which you want to migrate and remove eventually.

Commands are bash

```bash
workspaceA='XXX'
```

Define the workspace name for the destination (where you want to go)

```bash
workspaceB='YYY'
```

Go to the source workspace

```bash
terraform workspace select $workspaceA
```

Pull the state into a file

```bash
terraform state pull > import.tfstate
```

Select the destination workspace, create if it does not exist

```bash
terraform workspace select $workspaceB || terraform workspace new $workspaceB
```

Upload the remote state

```bash
terraform state push import.tfstate
```

Print the state list, make sure there is soemthing returned

```bash
terraform state list
```

Good to actually do a terraform plan and verify it is the same as before

```bash
terraform plan -out test.plan (-var-file xxxx.tfvars if needed)
```

Select the source workspace again

```bash
terraform workspace select $workspaceA
```

Empty it

```bash
for resource in $(terraform state list); do     terraform state rm '$resource'; done
```

Go back to the new workspace (because you cannot delete the workspace while in it)

```bash
terraform workspace select $workspaceB
```

Delete the source workspace

```bash
terraform workspace delete $workspaceA
```

Now you are left with the destination workspace only
