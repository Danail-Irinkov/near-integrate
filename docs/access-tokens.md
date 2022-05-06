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


## Generation of keys with [near-api-js](https://near.github.io/near-api-js/classes/key_stores_keystore.keystore.html)
We can use the multiple methods to generate and sign keys.
The most two popular ways are:


```js
import {KeyPair, keyStores} from 'near-api-js'

const accessKey = KeyPair.fromRandom('ed25519')
let public_key = accessKey.getPublicKey().toString()
let private_key = accessKey.toString()

const keyStore = new keyStores.BrowserLocalStorageKeyStore()
// const keyStore = new keyStores.InMemoryKeyStore()
await keyStore.setKey('testnet', [accountId], accessKey) // accountId to which the key will be added

let getKey = await keyStore.getKey('testnet', [accountId])
let removeKey = await keyStore.removeKey('testnet', [accountId])
```

For more details please refer to the
[KeyStore Documentation](https://near.github.io/near-api-js/classes/key_stores_keystore.keystore.html)

Then you can now add the key to the blockchain using the NEAR Wallet.
For ex.

```js
window.open(`https://wallet.testnet.near.org/login?contract_id=devtest.testnet&public_key=${public_key}&success_url=${success_redirect_url}`)
```

This will add a Function Call Key to your account,  
which is able to call methods on 'devtest.testnet' with a maximum allowance of 0.25N

:::tip
If the adding of the key is successful you will see `&all_keys=....`
in the query parameters in the redirect to the `success_url`.
If the login attempt has failed and `all_keys` is empty, you should remove the generated key from the LocalStorage
:::


## Learn more on wallet redirects
If you need to manually sign calls and transactions via the NEAR wallet, check our **Wallet Redirects Section**

<center-content>
<near-button title="Wallet Redirects" route="/docs/wallet-redirects"></near-button>
</center-content>


## Generating Keys with [near-cli](https://github.com/near/near-cli#near-generate-key)

This command will generate a key, store it in the local folder ~/.near-credentials

```bash
near generate-key xxx.testnet
```

Expect to see:
`Key pair with ed25519:A4HsXgfQSHadfkT7jN4Mdt3J5XJvPbWVpk8XPCVXrYFV public key for an account "xxx.testnet"`

Now you need to add this key to the blockchain, so you can use it to sign calls to a specific Contract:

```bash
near add-key [Your Account] ed25519:A4HsXgfQSHadfkT7jN4Mdt3J5XJvPbWVpk8XPCVXrYFV --contract-id [Contract Account]
```

Expect to see:
```
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/Hke6JuGHRV...
```

### Storage of tokens

As you can see you can generate keys freely, however have in mind where you store them!

These keys will allow anybody to access your account.
The DEFAULT storage place is only locally on your computer, either in a file or in local storage.
For high value accounts using a Hardware Wallet is recommended.

:::warn
Never store Full Access keys on 3rd party databases
:::
