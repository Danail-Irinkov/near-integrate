---
title: Getting started
description: Learn how to integrate NEAR with almost any Web App with examples
---

A NEAR Protocol Integration CheatSheet, 
built with [VitePress](https://vitepress.vuejs.org) 
and [Tailwind CSS](https://tailwindcss.com)
at [Github](https://github.com/Danail-Irinkov/near-integrate.git)

## Why NEAR Integrate?

NEAR Integrate summarizes most of the NEAR eco-system into a single Documentation

By the end of this course you will be able to Integrate all NEAR Features into any web platform.

Links to the original resources and in-depth documentation is provided for all libraries.

::: tip
The NEAR Protocol and its APIs are undergoing constant development.  
We have documented the most used APIs  
Contributors are welcome @ [NEAR Integrate](https://github.com/Danail-Irinkov/near-integrate)
:::
    
## Why NEAR Protocol?

- Easy Wallet & Staking
- Low Fees ~0.001NEAR
- Contracts
- NFTs 
- Fast ~1-2sec
- Scalable
- High Security
- Layer 1 Protocol
- Great Developers
- Modern Tech (Rust, AS, WASM)
- Great Education Program
- Utility focused team

You can learn more about opportunities with NEAR @
[NEAR University](https://www.near.university/)

## Integrating with NEAR

A NEAR Web Integration makes it easy for your partners and customers  
use the NEAR protocol and its features.

The best practice is to access NEAR from the client's browser,  
in order to avoid access keys leaking out of it,
thus providing high level of security.

::: info
The NEAR RPC API is the low level HTTP access method.  
https://docs.near.org/docs/api/rpc

The NEAR Javascript SDK 'near-api-js'  
is easier to use and has better examples and docs.  
https://docs.near.org/docs/api/naj-quick-reference
:::

***I would always use 'near-api-js' if possible***

### Methods of accessing NEAR
<center-content>
<near-button title="HTTP (RPC)" route="/docs/rpc-installation"></near-button>
<near-button title="NEAR-API-JS" route="/docs/naj-installation"></near-button>
</center-content>


## Costs

If you are building an app for NEAR, you will have to modify the blockchain,  
which will cost you something minimal:
- Reading - free
- Writing - ~ 0.001Ⓝ/transaction (March 2022)

During your initial learning you can use the NEAR Testnet for free  
and make as many calls and tokens as you want.

<center-content>
<near-button title="Testnet" route="/docs/testnet"></near-button>
</center-content>


## Executing Code on NEAR

Similarly to other web3.0 protocols,  
NEAR offers a secure and very fast context for working with the blockchain.

Each NEAR account can host a set of functions/methods,  
which are grouped in a 'Contract' (1 Contract per account)

<center-content>
<near-button title="Contracts" route="/docs/c-introduction"></near-button>
</center-content>


## Historical Queries

The NEAR blockchain is a public store of data,
We can read its current state within seconds,
However if we need historical data about the past of an account,
for ex. Listing Transactions or other events,
we will need to process thousands of blocks (~1/sec)
for the entire time-range we want to list.

It is very slow and completely impractical to download
and process so much information for each query.

The Solution would be to use a fast Indexer Database
to store the relevant information in an easy to query format.

## Tracking events of an account

If your app needs to track/list events happening to its main account,
the best practice would be to use
[The Graph](https://thegraph.com/)

It allows you to write some code that will execute with each new block, 
if there are events related to the selected account.

It is free to use

<center-content>
<near-button title="Subgraphs" route="/docs/subgraphs"></near-button>
</center-content>


## Tracking events on the network

You could track multiple accounts with The Graph, 
but if you need to track many accounts or stats on the entire network

You will need to create an indexer server that queries each block via HTTP  
and stores its results in a fast database for subsequent queries.

I created the indexer for https://searchnear.net using Firebase and Elastic.io,  
but you can use many other backends and databases

<center-content>
<near-button title="Indexers" route="/docs/indexers"></near-button>
</center-content>

## Tracking events on the NEAR network (Pro)

You could track multiple accounts with The Graph, 
but if you need to track many accounts or stats on the entire network

You will need to create an indexer server that queries each block via HTTP  
and stores its results in a fast database for subsequent queries.

I created the indexer for https://searchnear.net using Firebase and Elastic.io,  
but you can use many other backends and databases

<center-content>
<near-button title="Run a Node" route="https://near-nodes.io/validator/running-a-node"></near-button>
</center-content>


