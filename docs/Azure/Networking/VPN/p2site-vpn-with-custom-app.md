---
id: p2site-vpn-with-custom-app
title: Azure Point-to-site VPN Setup with custom app
tags:
  - Azure
  - VPN
  - Azure Networking
  - Terraform
---


# Azure Point-to-site VPN Setup with custom app

Here is a guide on how to build a Point to site (P2S) VPN in Azure with your own App Registration/Enterprise App. We will be using terrafform but we will try to explain it how to do it by hand

## Prerequisits

This guide assumes that you already have a resource group with a VNET inside.

> We will be configuring a custom app, not using the generic Azure VPN client enterprise app.

