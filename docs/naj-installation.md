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

<tabbed-code>
<template v-slot:js>

```js
import { Buffer } from 'buffer'

if (window) {
    window.global = {}
    window.process = { env: {}}
    window.exports = {}
    window.Buffer = Buffer
}
```
</template>
<template v-slot:CDN>

```html
<script type="application/javascript" src="https://cdn.jsdelivr.net/gh/Danail-Irinkov/bufferUMD@master/dist/bundle.min.js"></script>
<script>
	if (window) {
        window.global = {}
        window.process = { env: {} }
        window.exports = {}
        window.Buffer = window.BufferUMD.Buffer
    }
</script>
```
</template>
</tabbed-code>


#### Firebase Functions
Due to missing browser polyfills 'near-api-js' will not be able to compose and URL and redirect the User to the wallet out of the box

```js
// In Firebase Functions this will not work
nearAPI.requestSignIn()
```

The methods that redirect to the NEAR Waller are meant for Browser Usage
However, if you need to get the redirect URL as a string,
please refer to our [RPC Login Documentation](/docs/rpc-wallet-redirects.html)

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
const keyStore = new nearAPI.keyStores.InMemoryKeyStore()
const keyPair = nearAPI.KeyPair.fromString(access_key)
await keyStore.setKey(network, account, keyPair) // Note the 'await'
config.deps = { keyStore: keyStore }

let near = await nearAPI.connect(config);
let walletAccount = new nearAPI.WalletAccount(near);
let accountId = walletAccount.getAccountId();
```
</template>
<template v-slot:CDN>

```html
<script src="https://cdn.jsdelivr.net/npm/near-api-js@0.41.0/dist/near-api-js.min.js"></script>
<script>
	// connect to NEAR
	const near = new nearApi.Near({
		keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
		networkId: 'testnet',
		nodeUrl: 'https://rpc.testnet.near.org',
		walletUrl: 'https://wallet.testnet.near.org'
	});

	// connect to the NEAR Wallet
	const wallet = new nearApi.WalletConnection(near, 'my-app');

	// connect to a NEAR smart contract
	const contract = new nearApi.Contract(wallet.account(), 'devtest.testnet', {
		viewMethods: ['whoSaidHi'],
		changeMethods: ['sayHi']
	});
</script>
```
</template>
</tabbed-code>

## Learn more
[NEAR Features](/docs/naj-features.html)  

[Official 'near-api-js' Documentation](https://near.github.io/near-api-js/)
