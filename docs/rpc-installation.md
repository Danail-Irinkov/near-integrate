---
title: Installation
description: Learn how to make HTTP requests to NEAR
---

## Integration requirements

- **Ability to execute HTTP Requests** - Most platforms offer such functionality to connect with 3rd party APIs
- **Obtaining Access Tokens** - Wallet Login, LocalStorage or User Input
- **Managing Access Tokens** - True Web3 Apps contain Full Access tokens within the User's Device
- **A Great Idea** - Never underestimate a Great Idea :)
---

## RPC Endpoints

- **mainnet** https://rpc.mainnet.near.org
- **testnet** https://rpc.testnet.near.org
- **betanet** https://rpc.betanet.near.org (may be unstable)

## Creating an API client

<tabbed-code>
<template v-slot:js>

```javascript
import axios from 'axios'
let rpc = axios.create({
	baseURL: 'https://rpc.testnet.near.org',
	crossdomain: true,
	headers: {
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
		'Accept': 'application/json'
	}
})
```
</template>
<template v-slot:node_js>

```js
import axios from 'axios'
let rpc = axios.create({
	baseURL: 'https://rpc.testnet.near.org',
	crossdomain: true,
	headers: {
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
		'Accept': 'application/json'
	}
})
```
</template>
<template v-slot:php>

```php
No contributions
```
</template>
</tabbed-code>

## Official NEAR Resources
[NEAR RPC Documentation](https://docs.near.org/docs/api/rpc)
