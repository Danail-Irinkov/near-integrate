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

## Making Function Calls

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
import { utils } from 'near-api-js'

let sender_account = 'devtest.testnet'
let amount_yocto = utils.format.formatNearAmount(state.amount || 0 )

const senderAccount = await near.account(sender_account);
const result = await senderAccount.sendMoney(receiver_account, amount_yocto);
```

## Validating a NEAR Account input

```js
function validateAccountID(accountId: string){
  return (
    accountId.length >= 7 && // mininum length is 7, for ex. 'xx.near'
    accountId.length <= 64 &&
    /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/.test(accountId)
  );
}
```

## Mint NFT
## ...
