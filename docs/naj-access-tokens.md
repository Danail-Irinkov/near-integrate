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
- **Function Call (FC) Token** - Used to execute contract method calls without deposit. It has an allowance of 0.25 NEAR to spend on gas or storage fees. ***Each FC Token is scoped to One Sender and One Receiver account***

## Custodians of FA Tokens

In the spirit of Web3 to only the owner of the wallet should have a copy of the FA key. If the key leaks, the account will most probably get compromised.

## Token Specifications
TODO: Encryption
TODO: Public / Private key explanation 
TODO: Generation of tokens
TODO: Storage of tokens
