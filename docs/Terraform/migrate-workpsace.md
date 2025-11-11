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

```bash title="Define source workspace name"
workspaceA='XXX'
```

```bash title="Define the workspace name for the destination (where you want to go)"
workspaceB='YYY'
```

```bash title="Define your terraform executable if it's different than terraform"
terraformExecutable='terraform'
```

```bash title="Define your plan command"
planCommand='$terraformExecutable plan -out tf.plan -var-file xxx.tfvars'
```

```bash title="Go to the source workspace"
$terraformExecutable workspace select $workspaceA
```

```bash title="Pull the state into a file"
$terraformExecutable state pull > import.tfstate
```

```bash title="Select the destination workspace, create if it does not exist"
$terraformExecutable workspace select $workspaceB || $terraformExecutable workspace new $workspaceB
```

```bash title="Upload the remote state"
$terraformExecutable state push import.tfstate
```

```bash title="Print the state list, make sure there is soemthing returned"
$terraformExecutable state list
```

```bash title="Good to actually do a terraform plan and verify it is the same as before"
$planCommand
```

```bash title="Select the source workspace again"
$terraformExecutable workspace select $workspaceA
```

```bash title="Empty the source repo so we can delete it"
for resource in $($terraformExecutable state list); do     $terraformExecutable state rm '$resource'; done
```

```bash title="Go back to the new workspace (because you cannot delete the workspace while in it)"
$terraformExecutable workspace select $workspaceB
```

```bash title="Delete the source workspace"
$terraformExecutable workspace delete $workspaceA
```

Now you are left with the destination workspace only

If you trust this sequence enough here is it in a full snippet:

```bash title="PHP"
# ========= Control panel start =============#
# Change those values to your values
workspaceA='XXX'
workspaceB='YYY'
terraformExecutable='terraform'
planCommand='$terraformExecutable plan -out tf.plan -var-file xxx.tfvars'
# ========= Control panel end =============#
$terraformExecutable workspace select $workspaceA
$terraformExecutable state pull > import.tfstate
$terraformExecutable workspace select $workspaceB || $terraformExecutable workspace new $workspaceB
$terraformExecutable state push import.tfstate
$terraformExecutable state list
$planCommand
$terraformExecutable workspace select $workspaceA
for resource in $($terraformExecutable state list); do     $terraformExecutable state rm '$resource'; done
$terraformExecutable workspace select $workspaceB
$terraformExecutable workspace delete $workspaceA
```

or in a full bash script :)

```bash title="PHP"
#!/usr/bin/env bash
set -euo pipefail
# ========= Control panel start =============#
workspaceA="XXX"
workspaceB="YYY"
terraformExecutable="terraform"
planCommand='$terraformExecutable plan -out tf.plan -var-file xxx.tfvars'
# ========= Control panel end =============#
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
if ! $terraformExecutable workspace select $workspaceB 2>/dev/null; then
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
if ! $planCommand; then
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
$terraformExecutable workspace select $workspaceA
while read -r resource; do
  $terraformExecutable state rm "$resource" || echo "Failed to remove $resource"
done <<< "$stateList"

$terraformExecutable workspace select $workspaceB
$terraformExecutable workspace delete $workspaceA || echo "Failed to delete old workspace"

echo "Migration complete."
```
