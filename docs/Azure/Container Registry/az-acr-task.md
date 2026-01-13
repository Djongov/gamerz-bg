---
id: az-acr-task
title: az acr task commands
tags:
  - Azure
  - Container Registry
---

```jsx title="bash"
 az acr run `
--registry xxx `
--cmd "acr purge --filter '.*:.*' --untagged --ago 1d --keep 1 --dry-run" `
/dev/null
```

```jsx title="bash"
az acr task create `
--registry xxx `
--name daily-untag-purge `
--cmd "acr purge --filter '.*:.*' --untagged --ago 1d --keep 1"
```
