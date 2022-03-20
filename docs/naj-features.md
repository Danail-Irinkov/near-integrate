---
title: Features
description: Quick guide on how to use each feature of near-api-js
---

## Get Account

```js
let account = await near.account('devtest.testnet');
```

## Get Balance

```js
import { utils } from 'near-api-js'

let state = await account.state();
let balnce = utils.format.formatNearAmount(state.amount || 0 )
```

## Get Keys from Blockchain

```js
let accessKeys = await account.getAccessKeys();
```

## Making Function Call

```js
import { providers } from 'near-api-js'

let params = {
	contractId: 'devtest.testnet',
	methodName: 'whoSaidHi',
	args: { ex_param: 'test123'} // this will provide parameter 'ex_param', if it exists in the method, for ex. whoSaidHi(ex_param)
}
if (deposit) params.attachedDeposit = deposit

const functionCallResponse = await account.functionCall(params)
const result = providers.getTransactionLastResult(functionCallResponse)

```

## Transfer Tokens

```js
const senderAccount = await near.account(sender_account);
const result = await senderAccount.sendMoney(receiver_account, amount_yocto);
```

## Mint NFT
## ...
