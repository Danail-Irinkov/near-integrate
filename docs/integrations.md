---
title: Integrations
description: A list of all NEAR Integrations we know of
---

# Integrations

- **Bubble**
- **Integromat**
- **Zapier**
- **Slack**
- **Webflow**
...

# CDN Packages

### near-api-js
My UMD bundle fork of the near-api-js.
Useful if you are unable to import if from npm

```html
<script src="https://cdn.jsdelivr.net/gh/Danail-Irinkov/near-api-js@master/dist/bundle.js"></script>
<script>
	console.log('nearApi', window.nearApi)
</script>
```

### near-contract-parser
My `near-contract-parser` UMD bundle, mounts the methods in window.nearContractParser
We have submitted a PR to the official repo

```html
<script src="https://cdn.jsdelivr.net/gh/Danail-Irinkov/near-contract-parser-umd@main/dist/bundle.js"></script>
<script>
  console.log('nearContractParser', window.nearContractParser)
</script>
```

### buffer
My `buffer` UMD bundle, mounts the buffer methods in window.BufferUMD.
We had various issues ing other CDN links, so we had to fork our own.

```html
<script src="https://cdn.jsdelivr.net/gh/Danail-Irinkov/bufferUMD@master/dist/bundle.min.js"></script>
<script>
  console.log('Buffer Test: ', window.BufferUMD.Buffer.from([123,456])) 
</script>
```


