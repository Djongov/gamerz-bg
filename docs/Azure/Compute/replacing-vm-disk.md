---
id: replacing-vm-disk
title: How to replace a VM's disk with a new one with Az cli
tags:
  - Azure
  - az cli
---

In this scenario we will replace the os disk of a VM with a new one moving from HDD to a SSD. Here are the steps:

Set your variables

```PowerShell
$rg = "ResourceGroupName"
$vmName = "VM"
$oldDiskName = "vm-os-disk"
$newDiskName = "vm-os-disk-premium"
```

Stop the machine

```PowerShell
az vm stop \
  --resource-group $rg \
  --name $vmName
```

Create a snapshot of existing disk, specify the new disk SKU (we move from Standard_LRS to Premium_LRS)

```PowerShell
az snapshot create \
  --resource-group $rg \
  --name $($vmName)-snap \
  --source $oldDiskName \
  --sku Premium_LRS
```

Create the new disk from the snapshot

```PowerShell
az disk create \
  --resource-group $rg \
  --name $newDiskName \
  --source $($vmName)-snap \
  --sku Premium_LRS
```

Attach new disk to VM

```PowerShell
az vm update \
  --resource-group $rg \
  --name $vmName \
  --os-disk $newDiskName
```

Start the VM

```PowerShell
az vm start \
  --resource-group $rg \
  --name $vmName
```
