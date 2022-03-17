---
title: Testnet (Sandbox)
description: How to use the sandbox environment during development
---

# What is The Testnet?

This is the Sandbox network provided by NEAR

You can create an account there in a minute,
get some free tokens and start making transactions.

The API functionality is the same as the Mainnet
However the API endpoints are different

# Creating an Account

Go to the official Testnet Wallet to create your account

You can try the different password options, 
but for a Testnet account email verification is enough.

<center-content>
<near-button title="Testnet Wallet" route="https://wallet.testnet.near.org/"></near-button>
</center-content>

# Switching between Networks

Usually you will need to work with the Testnet API in your 'development' environment  
and the Mainnet during 'production'

In order to switch between them, we usually use a config.js file
with a function that returns the correct config based on an environment variable. 


<tabbed-code>
<template v-slot:js>

```js
function getConfig (env) {
	switch (env) {
        case 'production':
        case 'mainnet':
            return {
                networkId: 'mainnet',
                nodeUrl: 'https://rpc.mainnet.near.org',
                walletUrl: 'https://wallet.near.org',
                helperUrl: 'https://helper.mainnet.near.org'
            }
        case 'development':
        case 'testnet':
            return {
                networkId: 'testnet',
                nodeUrl: 'https://rpc.testnet.near.org',
                walletUrl: 'https://wallet.testnet.near.org',
                helperUrl: 'https://helper.testnet.near.org'
            }
        default:
            throw Error(`Unconfigured environment '${env}'`)
	}
}
```
</template>
</tabbed-code>



