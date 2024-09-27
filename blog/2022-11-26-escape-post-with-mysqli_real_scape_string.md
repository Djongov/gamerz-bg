---
slug: escape-post-array-mysqli-real-escape-string
title: Escape $_POST with mysqli_real_escape_string
description: If you want to apply mysqli_real_escape_string() to an entire $_POST array here is how you can do it
image: https://waf-demo.sunwellsolutions.com/assets/images/logo2.webp
keywords: [php, escape, mysqli]
authors: djo
tags: [php]
---

If you want to apply mysqli_real_escape_string() to an entire $_POST array here is how you can do it

:::tip
assuming $conn is your mysqli connection
:::

``` jsx title="PHP"
foreach ($_POST as $key=>$value) {
    $_POST[$key] = mysqli_real_escape_string($conn, $_POST[$key]);
}
```

Also good to note that you should always use prepared statements and do not rely on this function alone for security. I personally use this function not as a security measure but to fix dynamic SQL statements that otherwise break my synthax.
