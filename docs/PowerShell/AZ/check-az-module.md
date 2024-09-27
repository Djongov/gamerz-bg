---
id: check-az-module
title: Check Az Module
tags:
  - PowerShell
  - AZ Module
---

If you want to check if there is already an AZ context (current session has been authenticated) here is how you can check for it:

``` jsx title="PowerShell"
# Check if Az module is installed
if (-not (Get-Module -ListAvailable -Name Az)) {
    Write-Host "Az module is NOT installed. Exiting script." -ForegroundColor Red
    Exit 1  # Exit with a non-zero status to indicate failure
} else {
    Write-Host "Az module is installed. Continuing execution..."
}

# Check if Az module is loaded
if (Get-Module -Name Az) {
    Write-Host "Az module is loaded."
} else {
    Write-Host "Az module is NOT loaded." -ForegroundColor Red
    Import-Module -Name Az
}
```
