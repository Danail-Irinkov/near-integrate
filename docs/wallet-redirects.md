---
title: Wallet Redirects
description: Learn how to redirect users to the NEAR wallet to sign transactions
---
 
## Overview

This section is meant for integration cases,  
where the default option of near-api-js/wallet/requestSignIn is not working for your environment.

This can be caused by environments that do not support the URL building and redirect methods used by the library.

You may also need to have the redirect URL as a string to send it to a 3rd party.

So here we will talk about how to manually build these URLs and perform NEAR Login with them.

## Redirect to sign an Access Token

Here is an example of building an URL to make the user sign a Function Call Access key for a contract,  
so he can easily call its methods in the future

```js
		let login_url = 'https://wallet.testnet.near.org/login?'

		if (contract_name) {
			const accessKey = KeyPair.fromRandom('ed25519')
			let public_key = accessKey.getPublicKey().toString()
			let private_key = accessKey.toString()
            
            // Store the key somewhere at this point for future use
          
			login_url +='&contract_id='+contract_name
			login_url +='&public_key='+accessKey.getPublicKey().toString()
		}

		if (method_names.length) {
			method_names.forEach(methodName => {
				login_url +='&methodNames='+String(methodName)
			});
		}

        let redirect_url = `https://us-central1-near-api-1d073.cloudfunctions.net/nearLoginRedirect/`
        if (payload.user_name) redirect_url+= `?slack_username=${payload.user_name}`
        if (payload.channel_id) redirect_url+= `&channel_id=${payload.channel_id}`
        if (payload.team_domain) redirect_url+= `&team_domain=${payload.team_domain}`
        
        login_url += '&success_url='+encodeURIComponent(redirect_url)
```

#### Make Request

```js
window.open(login_url)
```

:::tip
If you request to sign an Access Key for a Contract from the account that owns the contract,  
the system will by default grant you a Full Access Key
:::

## Redirect to sign a Transaction

First create the Transaction with `near-api-js

```js
import { connect, utils } from 'near-api-js'
import { transfer, createTransaction, functionCall } from 'near-api-js/lib/transaction'

async function generateTransaction (options, action = 'transfer') {
	try {
		// console.warn('generateTransaction options', options)
		const nearConnection = await connect(options)
		const account = await nearConnection.account(options.accountId)

		// We don't need a fullAccessKey to create a transaction, but we need to provide one anyway
		let key = (await account.getAccessKeys())
			.filter(key => key.access_key.permission === 'FullAccess')[0];

		if (key === undefined)
			return `${options.accountId} doens't have any full access keys. Cannot send near.`

		key = utils.key_pair.PublicKey.from(key.public_key);

		let near_action
		if (action === 'transfer')
			near_action = transfer(utils.format.parseNearAmount(options.amount))
		if (action === 'function') {
			near_action = functionCall(options.methodName, JSON.parse(options.args),
			options.gas || "300000000000000",
			utils.format.parseNearAmount(options.deposit))
		}
		// It seems that nonce and block hash can be random values
		const nonce = 7560000005
		const blockHash = [...new Uint8Array(32)].map( _ => Math.floor(Math.random() * 256))
		return createTransaction(options.accountId, key, options.receiverId, nonce, [near_action], blockHash)
	} catch (e) {
		return Promise.reject(e)
	}
}
```

Then pass the result of that function into `generateSignTransactionURL` 
to generate the URL to execute the transaction:

```js
async function generateSignTransactionURL(transaction, context) {
	try {
		const walletUrl = 'https://wallet.testnet.near.org';
		const signTransactionUrl = new URL('sign', walletUrl);

		// the key names must not be changed because this is what wallet is expecting

		const searchParams = {
			transactions: Buffer.from(transaction.encode()).toString('base64'),
			meta: JSON.stringify(context),
			callbackUrl: 'Redirect Url after signing the transaction',
		};

		Object.entries(searchParams).forEach(([key, value]) => {
			signTransactionUrl.searchParams.set(key, value);
		});

		return signTransactionUrl.href;
	} catch (e) {
		return Promise.reject(e)
	}
}
```
