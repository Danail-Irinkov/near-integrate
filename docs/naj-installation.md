---
title: Installation
description: Learn how to get NEAR-API-JS running in your project
---

## Requirements

- **Node.js v16^**. [Download Node.js](https://nodejs.org/).
- **Chrome/Firefox**. NEAR-API-JS is designed to run in the browser, but it requires some Node.js polyfills. Website bundlers like Webpack5 and Vite have removed these polyfills to reduce default bundle size. Check 'Caveats' to see how to handle such cases.
---

## Config

### Caveats
If installing on a browser, make sure that the client environment has access to .global & Buffer.
If not you will get errors in the browser console.

#### Set .global & Buffer in your index.js
```js
import { Buffer } from 'buffer'
// OR load it from a CDN link
// <script src="https://bundle.run/buffer"></script>

if (window) {
    window.global = {}
    window.process = {}
    window.Buffer = Buffer
}
```
#### Firebase Functions
Due to missing browser polyfills 'near-api-js' will not be able to compose and URL and redirect the User to the wallet out of the box

```js
// In Firebase Functions this might not work
nearAPI.requestSignIn()
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

// Adding a keystore is optional, but required for modifying the blockchain 
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

## Official NEAR Resources
[NEAR-API-JS Documentation](https://near.github.io/near-api-js/)
