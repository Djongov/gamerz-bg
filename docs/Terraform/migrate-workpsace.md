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

```bash
terraformExecutable='terraform'
```

Go to the source workspace

```bash
$terraformExecutable workspace select $workspaceA
```

Pull the state into a file

```bash
$terraformExecutable state pull > import.tfstate
```

Select the destination workspace, create if it does not exist

```bash
$terraformExecutable workspace select $workspaceB || $terraformExecutable workspace new $workspaceB
```

Upload the remote state

```bash
$terraformExecutable state push import.tfstate
```

Print the state list, make sure there is soemthing returned

```bash
$terraformExecutable state list
```

Good to actually do a terraform plan and verify it is the same as before

```bash
$terraformExecutable plan -out test.plan (-var-file xxxx.tfvars if needed)
```

Select the source workspace again

```bash
$terraformExecutable workspace select $workspaceA
```

Empty it

```bash
for resource in $($terraformExecutable state list); do     $terraformExecutable state rm '$resource'; done
```

Go back to the new workspace (because you cannot delete the workspace while in it)

```bash
$terraformExecutable workspace select $workspaceB
```

Delete the source workspace

```bash
$terraformExecutable workspace delete $workspaceA
```

Now you are left with the destination workspace only

If you trust this sequence enough here is it in a full snippet:

```bash
workspaceA='XXX'
workspaceB='YYY'
terraformExecutable='terraform'
$terraformExecutable workspace select $workspaceA
$terraformExecutable state pull > import.tfstate
$terraformExecutable workspace select $workspaceB || $terraformExecutable workspace new $workspaceB
$terraformExecutable state push import.tfstate
$terraformExecutable state list
$terraformExecutable plan -out test.plan -var-file bastion.tfvars
$terraformExecutable workspace select $workspaceA
for resource in $($terraformExecutable state list); do     $terraformExecutable state rm '$resource'; done
$terraformExecutable workspace select $workspaceB
$terraformExecutable workspace delete $workspaceA
```

or in a full bash script :)

```bash
#!/usr/bin/env bash
set -euo pipefail

workspaceA="XXX"
workspaceB="YYY"
terraformExecutable="terraform"

# Select source workspace
if ! $terraformExecutable workspace select "$workspaceA"; then
  echo "Failed to select source workspace $workspaceA"
  exit 1
fi

# Pull state
$terraformExecutable state pull > import.tfstate
if [ ! -s import.tfstate ]; then
  echo "State file is empty or missing — aborting."
  exit 1
fi

# Select or create destination workspace
if ! $terraformExecutable workspace select "$workspaceB" 2>/dev/null; then
  echo "Creating workspace $workspaceB"
  $terraformExecutable workspace new "$workspaceB" || { echo "Failed to create destination workspace"; exit 1; }
fi

# Push state
$terraformExecutable state push import.tfstate || { echo "State push failed"; exit 1; }

# Validate that state exists in new workspace
stateList=$($terraformExecutable state list || true)
if [ -z "$stateList" ]; then
  echo "No resources found in workspace $workspaceB — aborting cleanup."
  exit 1
fi

echo "State list after import:"
echo "$stateList"

# Run test plan
if ! $terraformExecutable plan -out test.plan -var-file bastion.tfvars; then
  echo "Terraform plan failed — aborting cleanup."
  exit 1
fi

# Manual confirmation before cleanup
read -p "Do you confirm the state and plan look correct? Type 'y' to continue: " confirm
if [ "$confirm" != "y" ]; then
  echo "Aborted by user."
  exit 0
fi

# Cleanup old workspace only if all succeeded
$terraformExecutable workspace select "$workspaceA"
while read -r resource; do
  $terraformExecutable state rm "$resource" || echo "Failed to remove $resource"
done <<< "$stateList"

$terraformExecutable workspace select "$workspaceB"
$terraformExecutable workspace delete "$workspaceA" || echo "Failed to delete old workspace"

echo "Migration complete."
```
