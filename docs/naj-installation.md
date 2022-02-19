---
title: Installation
description: Learn how to get NEAR-API-JS running in your project
---

## Requirements

- **Autocomplete**. Intelligent suggestions for class names, as well as [CSS functions and directives](https://tailwindcss.com/docs/functions-and-directives).
- **Linting**. Highlights errors and potential bugs in both your CSS and your markup.
- **Hover Previews**. See the complete CSS for a Tailwind class name by hovering over it.
- **Syntax Highlighting**. Provides syntax definitions so that Tailwind features are highlighted correctly.

---

## Config

### Caveats
If installing on a browser, make sure that the client environment has access to .global & Buffer.
If not you will get errors in the browser console.

#### Set .global & Buffer in your index.js
```js
import { Buffer } from 'buffer'

if (window) {
    window.global = {}
    window.Buffer = Buffer
}
```


## Configuring Endpoints
You should create a function like this to switch the configuration between development and production environment

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
<template v-slot:node_js>

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


## Creating an API client

<tabbed-code>
<template v-slot:js>

```js
import * as nearAPI from 'near-api-js'

let config = getConfig('testnet')

// Adding a keystore is optional for executing view calls
let keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore()
config.deps = { keyStore: keyStore }

let near = await nearAPI.connect(config);
let walletAccount = new nearAPI.WalletAccount(near);
let accountId = walletAccount.getAccountId();
```
</template>
<template v-slot:node_js>

```js
import * as nearAPI from 'near-api-js'

let config = getConfig('testnet')

// SECURITY!!! This is a dummy key. Never hardcode any access keys in your code. 
// Import them from secure files, env variables or other configuration mangers
let access_key = 'ed25519:30J08h8380h38U3J038z3830ub3U03J3030389H783g3Gg38g7G3G33JIG3O3KLJONCDO3NP2M2P3Mldsjdkfjdk'

// Adding a keystore is optional for executing view calls
const keyStore = new keyStores.InMemoryKeyStore()
const keyPair = KeyPair.fromString(access_key)
await keyStore.setKey(network, account, keyPair) // Note the 'await'

config.deps = { keyStore: keyStore }

let near = await nearAPI.connect(config);
let walletAccount = new nearAPI.WalletAccount(near);
let accountId = walletAccount.getAccountId();
```
</template>
</tabbed-code>

## Official NEAR RPC Resources
[NEAR-API-JS Documentation](https://near.github.io/near-api-js/)
