---
title: Parsing Contracts
description: How to discover and use existing NEAR Contracts
---

### Installing `near-contract-parser`

 
If you are using a module bundler like:
- Vite
- Webpack
- Rollup or others

You will be able to download it from npm 
[near-contract-parser](https://github.com/encody/near-contract-parser)  

Alternatively available via [CDN](https://www.jsdelivr.com/package/npm/near-contract-parser)  


<tabbed-code>
<template v-slot:js>

```bash
yarn add near-contract-parser
```

---

```js
import {parseContract} from 'near-contract-parser'
```
</template>
<template v-slot:CDN>

```html
<script src="https://cdn.jsdelivr.net/npm/near-contract-parser@0.1.4/lib/index.min.js"></script>
<script type="application/javascript" src="https://cdn.jsdelivr.net/gh/Danail-Irinkov/bufferUMD@master/dist/bundle.min.js">
</script>
<script>
	window.Buffer = window.BufferUMD.Buffer
	console.log('Buffer Test: ', Buffer.from([123,456]))
</script>
```
</template>
</tabbed-code>


## Parsing Contracts

In order to parse the contract,  
you will need to first download it from the blockchain.


<tabbed-code>
<template v-slot:js>

```js
let near = await nearAPI.connect(options)

const { code_base64 } = await near.connection.provider.query({
	account_id: near_account,
	finality: 'final',
	request_type: 'view_code',
});

parsed_contract = await parseContract(code_base64)

console.log('Contract Methods: ', parsed_contract.byMethod)
```
</template>
<template v-slot:CDN>

```js
const response = await fetch('https://rpc.testnet.near.org', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		"jsonrpc": "2.0",
		"id": "dontcare",
		"method": "block",
		"params": {
			"account_id": "devtest.testnet",
			"request_type": "view_code",
			"finality": "final"
		}
	})
})
console.log('response: ', response)
let code_base64 = response.code_base64
let parsed_contract = await parseContract(code_base64)

console.log('Contract Methods: ', parsed_contract.byMethod)
```
</template>
</tabbed-code>


## Expected Response

The response from NEAR will look like this.
The Contract code is encode in result.code_base64

```json
{
  "jsonrpc": "2.0",
  "result": {
    "code_base64": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
    "hash": "7KoFshMQkdyo5iTx8P2LbLu9jQpxRn24d27FrKShNVXs",
    "block_height": 17814234,
    "block_hash": "GT1D8nweVQU1zyCUv399x8vDv2ogVq71w17MyR66hXBB"
  },
  "id": "dontcare"
}
```

After you parse it with near-contract-parser,
you will get a list of methods and/or probable interfaces of know contract types.

```json5
{
	byMethod: {sayHi: [], say_hi: [], whoSaidHi: [], who_said_hi: []},
	methodNames: ['sayHi', 'say_hi', 'whoSaidHi', 'who_said_hi'],
    probableInterfaces: []
}
````

If you want to provide further hints into how to use the methods,  
for ex. method parameters, typical deposit and results,  
you can have a look at my project, which uses Firebase and Elastic   
to parse all NEAR blocks and collect display this data

[https://searchnear.net](https://searchnear.net)  
[Github](https://github.com/Danail-Irinkov/near-search.git)


## Cleaning up duplicate methods

Best practice is to name Contract Methods in snake_case.
As you can see the methods which are in CamelCase get duplicated in snake_case.
I am using this function to clean up the results before showing them to users:

```js
function removeDuplicatedMethods(methods) { 
			let filtered_methods = []
			
			for (let method of methods) {
				let snake_case_method = method.replace(/[A-Z]/g, (letter, index) => { return index === 0 ? letter.toLowerCase() : '_'+ letter.toLowerCase();});
				let camel_case_method = method.toLowerCase().replace(/[-_][a-z]/g, (group) => group.slice(-1).toUpperCase());
				if (!filtered_methods.includes(method) && !filtered_methods.includes(snake_case_method) && !filtered_methods.includes(camel_case_method))
					filtered_methods.push(method)
			}
			return filtered_methods
		}
```

Any improvements are welcome :)
