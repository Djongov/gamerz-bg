---
id: intro
title: My document title
description: My document description
slug: /intro
sidebar_label: 'My Markdown page'
sidebar_position: 1
---

# H1

This is my **first Docusaurus document in bold**!

This is a Markdown page

- we are
    - we are are

``` jsx title="PHP"
if (empty($policies_array)) {
    echo '<p class="ml-4 mt-4 font-semibold text-red-500">No WAF Policies registered</p>';
    break 1;
}
```

---

:::tip Custom Useful Tip

🎯Use this awesome feature option

:::

:::caution

In development, you can only use one locale at a time.

:::

:::danger Danger

This action is dangerous

:::

[MDX](https://mdxjs.com/) makes things more **interactive**

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
      cursor: 'pointer',
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`)
    }}>
    {children}
  </span>
);

This is <Highlight color="#25c2a0">Docusaurus green</Highlight> !

This is <Highlight color="#1877F2">Facebook blue</Highlight> !

![This is the alt](https://mdg.imgix.net/assets/images/san-juan-mountains.jpg?auto=format&fit=clip&q=40&w=1080 "This is the title")

\* Without the backslash, this would be a bullet in an unordered list.

This **word** is bold. This <em>word</em> is italic.

## Mermaid Charts

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

flowchart LR
    id1{This is the text in the box}