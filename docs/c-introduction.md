---
title: Introduction
description: What are NEAR Contracts and how to use them
---

## Do I need a Contract?

If your app requires anything more than simple transactions.

For ex. NFT usage, on-chain-data-storage, escrow, splitting funds between parties,
executing value/ownership modifications based on the current state of the Block.

NEAR provides the building blocks to create any economic interaction
between an arbitrary amount of people in a maximum security context 
validated by the network Validators.

## What is a Contract?

Each NEAR account can host 1 Contract
Each contract can hold an arbitrary amount of methods/code

These methods can be called with or w/o a deposit,
they can be:

- View Methods -> Free of charge
- Change Methods -> ~ 0.02 USD per call (as of March 2022)

Using Contracts requires you to deposit ~10N per MB of code.

Contracts are used to build more complicated transaction flows
and are executed securely during the block verification by the NEAR Validators.

The Contracts use binary WebAssembly code
and there are two toolchains that are great for compiling to .wasm

Rust is the more mature toolchain, it is more difficult to learn 
and produces slightly larger bundles ( > ~0.4 MB )

Assembly Script is the more modern alternative, 
which is very similar to JS and produces smaller bundles ( > ~0.2 MB )

### Choose a WASM Toolchain
<center-content>
<near-button title="Rust" route="/docs/c-rust"></near-button>
<near-button title="Assembly Script" route="/docs/c-assembly"></near-button>
</center-content>


