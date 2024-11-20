---
id: get-access-token-az-cli
title: How to get an access token with Az cli
tags:
  - Azure
  - az cli
---

Sometimes you need to get an access token for the currently logged in user in Az cli.

``` az cli title="az cli access token"
az account get-access-token --resource=https://management.azure.com --output tsv --query accessToken
```

## Possible Values for `--resource`

1. **Azure Resource Manager (ARM)**:  
`https://management.azure.com/`

2. **Azure Key Vault**:  
`https://vault.azure.net/`

3. **Microsoft Graph**:  
`https://graph.microsoft.com/`

4. **Azure Storage**:  
`https://storage.azure.com/`

5. **Azure SQL Database**:  
`https://database.windows.net/`

6. **Azure Active Directory Graph** (legacy):  
`https://graph.windows.net/`

7. **Azure Data Lake Storage**:  
`https://datalake.azure.net/`

8. **Azure Cosmos DB**:  
`https://cosmos.azure.com/`

9. **Azure Monitor**:  
`https://monitor.azure.com/`

10. **Azure Service Bus**:  
 `https://servicebus.azure.net/`

11. **Azure Cognitive Services**:  
 `https://<your-region>.api.cognitive.microsoft.com/` (replace `<your-region>` with the appropriate region)

12. **Azure Batch**:  
 `https://batch.core.windows.net/`

13. **Azure DevOps**:  
 `https://dev.azure.com/`
