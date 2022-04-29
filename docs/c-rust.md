---
title: Rust SDK
description: Using Rust to create NEAR Contracts
---

## Overview

Rust is more mature and complex toolchain than Assembly Script for creating smart contracts.

We suggest that you start learning Smart Contracts with Assembly Script first.

If you want to learn Rust or you already have some experience with Rust, 
you can explore the possibilities of the
[NEAR Rust SDK](https://www.near-sdk.io/)

## The Setup

Make sure you have [near-cli](https://github.com/near/near-cli) installed to be able to deploy the contract.
```bash
npm install -g near-cli
```

For installing the Rust Toolchain on your machine, please follow the instructions from these links:

[Official Rust Installation](https://www.rust-lang.org/tools/install)  
[NEAR Rust SDK Guide](https://www.near-sdk.io/)

In linux & macOS you can use this command
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Then install the WASM toolchain
```bash
rustup target add wasm32-unknown-unknown
```

Create a folder to contain the Rust contract.  
For example: /contract/rust

```bash
cd /contract/rust
cargo init --lib

```

Then add near-sdk-rs to your project in the newly created `Cargo.toml`

```toml
...
[lib]
crate-type = ["cdylib"]

[dependencies]
near-sdk = "4.0.0-pre.7"

[profile.release]
codegen-units = 1
# Tell `rustc` to optimize for small code size.
opt-level = "z" # Experiment with 's' or 'z' to see which produces a smaller bundle
lto = true
debug = false
panic = "abort"
# Opt into extra safety checks on arithmetic operations https://stackoverflow.com/a/64136471/249801
overflow-checks = true
# rustflags = ["-C link-arg=-s"]

```

Then some sample code to your /src/lib.rs

```rust
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Contract {
    // SETUP CONTRACT STATE
    counter: u8
}

#[near_bindgen]
impl Contract {
    // ADD CONTRACT METHODS HERE
    pub fn increment_counter(&mut self) {
        self.counter += 1;
    }

    pub fn get_counter(&self) -> u8 {
        self.counter
    }
}

```

Then you can compile your Rust contract.

```bash
cargo build --target wasm32-unknown-unknown --release

```

Get your wasm file from the `target/wasm32-unknown-unknown/release` folder.
The file name 
```bash
copy target\wasm32-unknown-unknown\release\[project_name].wasm contract.wasm
```

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
near deploy xxx.testnet contract.wasm
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
near call [Contract Account] increment_counter --accountId [Your Account]

# Expect to see "Counter Increased to 1"
```
    
## A more elaborate example

You can check the official [NEAR Rust Puzzle Example](https://github.com/near-examples/rust-template)

Or have a look the the [Search NEAR Rust Contract](https://github.com/Danail-Irinkov/near-search/blob/master/contract/src/lib.rs)

This contract is calling other NEAR Contract methods as request by the [Search Near](https://searchnear.net) users.

You can see we are supplying arguments (account_id, method_name and arguments)  
We are also accessing environment variables (predecessor_account_id, current_account_id, attached_deposit)

:::tip
The annotation
"#[payable]" 
is mandatory for NEAR Rust Contract Methods that can accept deposits
:::

Initially we are preventing infinite loops by checking the predecessor !== current account.

Then we are verifying that there is enough balance to pay for the transaction and fee.

Then we are calling the method on the other contract.

Then we are returning the result of the method.

```bash

```rust
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId, Promise};

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct NearSearch;

#[near_bindgen]
impl NearSearch {
    #[payable]
	pub fn call_contract(&mut self, account_id: AccountId, method_name: String, args: String) {
        let predecessor = env::predecessor_account_id();
        let current = env::current_account_id();

        if predecessor == current {
            env::log("Cannot \"call_contract\" from \"call_contract\"".as_bytes());
            return;
        }

        // this is 0.01 NEAR
        const tax: u128 = 10_000_000_000_000_000_000_000;
        let mut amount = env::attached_deposit();
        if amount > tax {
            Promise::new(current).transfer(tax);
            amount -= tax;
        }

        let gas = env::prepaid_gas();
		let promise_index = env::promise_create(
            account_id,
            method_name.as_bytes(),
            args.as_bytes(),
            amount,
            gas/2 // A more accurate split of the gas between the functions is preferable
        );
        env::promise_return(promise_index);
	}
}
```

