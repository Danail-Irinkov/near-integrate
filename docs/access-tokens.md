---
title: Access Tokens
description: Learn how to get NEAR Access Tokens
---

## Why do you need Access Tokens

Access tokens are required for any mutation of the blockchain, for ex. transfer, recording data, deploying contracts, minting NFTs, etc.

---

## Token Types

NEAR supports two types of Access Tokens:

- **Full Access (FA) Token** - Used to deploy contracts and anything that requires transfer of tokens between accounts.
- **Function Call (FC) Token** - Used to execute contract method calls without deposit.  
**The FC Token always has an allowance of 0.25 NEAR to spend on fees.**  
**The FC Token can only be used with the predefined Sender and Receiver**

## Custodians of FA Tokens

In the spirit of Web3 to only the owner of the wallet should have a copy of the FA key.  
If the key leaks, the account will most probably get compromised.  

Any applications that have access to this key are called ***Custodian***.  
Nearly all people will **avoid** ***Custodian Apps***, due to the **High Risks and Trust** required to use them.

## Token Specifications

The NEAR tokens use "Ed25519" encryption
Ed25519 is an elliptic curve signing algorithm using EdDSA and Curve25519

Ed25519 standard uses a keyPair of a Public and a Private key.  
The Private key is used to sign transactions and Change Method Calls.  
The Public key is used to decode and verify the signed instructions.  

The high security of web3 is provided by keeping the Private Key on the user's device,  
while the Public key is stored on the blockchain to verify requests.

This flow is automatically handled by using 'near-api-js',  
when you want to make a new function call to a new contract.

However, if you want to just add an access key follow along.
To generate a new KeyPair you can use the 'near-api-js' utils:

```js
import { KeyPair } from 'near-api-js'

const new_key_pair = KeyPair.fromRandom('ed25519')
const public_key = new_key_pair.getPublicKey().toString()
const private_key = new_key_pair.toString()
```

Then you can add the key to the blockchain using the NEAR Wallet.  
For ex.

```js
window.open(`https://wallet.testnet.near.org/?contract_id=devtest.testnet&public_key=${public_key}`)
```

This will add a Function Call Key to your account,  
which is able to call methods on 'devtest.testnet' with a maximum allowance of 0.25N

### Storage of tokens

Most of web3 apps use the Browser's Localstorage to store the users keys,  
because it is the most secure/private place.  

To debug/explore Keys you will need to know how to read and write them to the LocalStorage.

```js
const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore()
//const keyStore = new nearAPI.keyStores.InMemoryKeyStore()

let accounts = await keyStore.getAccounts('testnet')
let networks = await keyStore.getNetworks()
let setKey = await keyStore.setKey('testnet', near_account, new_key_pair)
let getKey = await keyStore.getKey('testnet', near_account)
let removeKey = await keyStore.removeKey('testnet', near_account)
```

For more details please refer to the
[KeyStore Documentation](https://near.github.io/near-api-js/classes/key_stores_keystore.keystore.html)
