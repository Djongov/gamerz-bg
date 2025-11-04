---
id: kusto-get-table-count
title: Kusto - get all table row count
tags:
  - Azure
  - Kusto
  - Log Analytics
  - Query
---

# Kusto - get all table row count

if you want to list the rows and tables in your Log Analytics workspace, here is a command to do so

```kusto
union withsource = __TableName *
| summarize RowCount = count() by __TableName
| order by RowCount desc
```

If you want to search for `xxxxxx` inside all of your tables and count the rows it appears in

```kusto
let something = "xxxxxx";
search *
| where * contains something
| summarize count() by $table
```

Later you can drill down even more. If you want to search for this something inside a particular table

```kusto
let something = "xxxxxx";
AzureActivity
| where * contains something
```
