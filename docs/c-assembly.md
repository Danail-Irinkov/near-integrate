---
title: Assembly Script SDK
description: Using Assembly Script to create NEAR Contracts
---

## Overview
The Assembly Script to compile .wasm is the newer and more modern way of coding your NEAR Contracts.  
Arguably it has less flexibility than the Rust toolchain,  
but it is very similar to JavaScript and much easier to use.  

In this section we will discuss a very basic contract to get you started with deploying a Smart Contract to NEAR.

## The Setup

Make sure you have [near-cli](https://github.com/near/near-cli) installed to be able to deploy the contract.
```bash
npm install -g near-cli
```

Install the Assembly Script Builder - [asbuild](https://github.com/AssemblyScript/asbuild)
```bash
npm install -g asbuild
```

Install the NEAR Assembly Script SDK - [near-sdk-as](https://github.com/near/near-sdk-as)
```bash
npm install -D near-sdk-as
```

Copy the folder structure from these examples:

[AS Counter Contract Repository](https://github.com/near-examples/counter)
[Example AS Contract](https://github.com/near-examples/counter/blob/master/assembly/main.ts)

What we are mostly interested is the ```/assembly``` folder and the config for the Assembly Script Builder - ```asconfig.js(on)```

## Configuring the AS Builder

Create a file `./asconfig.json`, where you specify the default 'near-sdk-as' config as a base  
and then configure your entry file and output file locations.  

```json
{
  "extends": "near-sdk-as/asconfig.json",
  "entry": "assembly/index.ts",
  "options": {
    "binaryFile": "out/contract.wasm"
  }
}

```

Then create a file in `./assembly/tsconfig.json`
```json
{
  "extends": "../node_modules/assemblyscript/std/assembly.json",
  "include": [
    "./**/*.ts"
  ]
}
```


## Creating the Contract

In the folder `/assembly` create a file `index.ts`

```typescript
import { context, storage, logging } from "near-sdk-as";

// --- contract code goes below

// Under this key, we will store/retrieve the last sender account in the NEAR blockcahin.
const LAST_SENDER_KEY  = 'last_sender'

// This is our change method. It modifies the state of the contract by
// storing the account_id of the sender under the key "last_sender" on the blockchain
export function sayHi(param:string|null = null): string {
  // context.sender is the account_id of the user who sent this call to the contract
  // It's provided by the Blockchain runtime. For now we just store it in a local variable.
  const sender = context.sender;
  // `near` class contains some helper functions, e.g. logging.
  // Logs are not persistently stored on the blockchain, but produced by the blockchain runtime.
  // It's helpful to use logs for debugging your functions or when you need to get some info
  // from the change methods (since change methods don't return values to the front-end).
  logging.log(sender + ' says "Hi!"');

	if(param)
		logging.log('sayHi param: '+param);

  // storage is a helper class that allows contracts to modify the persistent state
  // and read from it. setString allows you to persistently store a string value for a given string key.
  // We'll store the last sender of this contract who called this method.
  storage.setString(LAST_SENDER_KEY, sender);
	return sender + ' said Hi!';
}

// This is our view method. It returns the last account_id of a sender who called `sayHi`.
// It reads value from the persistent store under the key "last_sender" and returns it.
export function whoSaidHi(param:string|null = null): string | null {
  // getString returns a string value for a given string key.
	logging.log('whoSaidHi "Hello World Log!"');

	if(param)
		logging.log('whoSaidHi param: '+param);

  return storage.getString(LAST_SENDER_KEY);
}
```

## Building the WASM file

From the root folder of the repo run the following command:

```bash
asb --verbose
```

This will create `./out/contract.wasm` file


## Deploying to NEAR

First you need to have a NEAR account
and log into it with near-cli.

```bash
near login
# Follow the instructions
# Expect to see "Logged in as [ xxx.testnet ] with public key [ ed25519:7SsY83... ] successfully"
```

Make sure you have enough NEAR tokens to pay for the transaction.

Then you can deploy your Contract to NEAR.

```bash
near deploy xxx.testnet out/contract.wasm
# Expect to see "Done deploying to xxx.testnet"
```

## Confirming the Deployment

You can check the status of your deployment by visiting your NEAR wallet

[NEAR Wallet](https://wallet.near.org)  
[NEAR Testnet Wallet](https://wallet.testnet.near.org)

If you see the transaction,  
Congratulations you have deployed your first NEAR Rust contract!

To increment the counter you can call:


```bash
near call [Contract Account] sayHi --accountId [Your Account]

# Expect to see "[Your Account] said Hi!"
```

## Learn More

For more elaborate examples including deposits, value and identity management have a look at these repositories:

[Counter Example](https://github.com/near-examples/counter)  
[Collections Example](https://github.com/near-examples/collection-examples-as)  

Also refer to the official [Assembly Script Guide](https://docs.near.org/docs/develop/contracts/as/intro)
