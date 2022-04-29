---
title: Features
description: Overview of the NEAR RPC capabilities
---

Deciding on the best way to extend a framework can be paralyzing, so here are some best practices to help you add your own utilities in the most idiomatic way possible.

---

## Get Account Info
## Get Balance
## Send Tokens
## Call Contract Methods

In this View Method Call example, we want to get all NFTs the user owns, note how
the body is stringified, due to using the browser's built in fetch()
as well as, the arguments presented to `getAllNFTsByOwner` are stringified and encoded with base64.

The result of the request is then decode and parsed to an array of JSON objects for each NFT

```js
const response = await fetch("https://rpc.testnet.near.org", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "jsonrpc": "2.0",
      "id": "dontcare",
      "method": "query",
      "params": {
        "request_type": "call_function",
        "finality": "final",
        "account_id": "two.nfts.testnet",
        "method_name": "getAllNFTsByOwner",
        "args_base64": btoa(JSON.stringify({"accountId":"w-adalo.testnet"}))
      }
    })
})
   
  let res_json = await response.json()

const decoded_result = JSON.parse((new TextDecoder()).decode(new Uint8Array(res_json.result.result)))
console.log('decoded_result', decoded_result)
```
## Get Transactions
## Mint NFT
## Transfer NFT
## List NFTs
