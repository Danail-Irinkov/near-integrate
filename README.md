# Simplified Tailwindcss documentation site clone

Build with [VitePress](https://vitepress.vuejs.org) and [Tailwind CSS](https://tailwindcss.com)

## Why?

I love building elegant websites, especially when both design and css are taken care of :stuck_out_tongue_winking_eye:. Inspired by [vuejs/blog](https://github.com/vuejs/blog).

## What's missing?

As you can see on the [website](https://vitepress-tailwind-clone.netlify.app), many functionalities and styles are not implemented for simplicity.

## Development

### Add a new document

Put your document inside `docs` folder. Note: nested directories are not supported.

And then edit `.vitepress/config.js`

```js
module.exports = {
  ...
  themeConfig: {
    ...
    collections: {
      'New category': [
        'your document',
      ],
      ...
    },
  },
}
```

### Configuration

Take a look at [VitePress](https://vitepress.vuejs.org/guide/customization.html)'s documentation might help you further understand the structure.

## License

[MIT](https://github.com/haoranpb/vitepress-tailwind-documentation/blob/main/LICENSE)

- The `near-contract-parser` UMD Bundle
In some integrations importing the dependency wasn't possible, 
so we had to develop and UMD Bundle, that can be loaded from a CDN
https://www.jsdelivr.com/package/npm/near-contract-parser

- Search NEAR Net
We created this website to easily test our contracts,
but it is also turned out interesting to tool for 
finding the most popular contracts on NEAR.
It is using the NEAR RPC and an Elastic.io cluster 
to index all transaction receipts on the Network
Check it out at: https://searchnear.net


- NEAR Integrate
We gathered a lot of insights during creating all these integrations, 
and we wanted to summarize this knowledge in a modern documentation website, 
so everyone could start building with NEAR in no time
Check it out at: https://nearintegrate.dev
