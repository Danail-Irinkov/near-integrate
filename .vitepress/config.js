const { fetchDocs } = require('./fetchDocs')

module.exports = {
  title: 'NEAR Integrations',
  description: 'Simplified NEAR documentation',
  themeConfig: {
    repo: 'https://github.com/Danail-Irinkov/near-integrate',
    pages: fetchDocs(),
    collections: {
      'RPC': [
        'rpc-installation',
        'rpc-getting-access-tokens',
        'upgrading-to-v2',
        'using-with-preprocessors',
        'optimizing-for-production',
        'browser-support',
        'intellisense',
      ],
      'NEAR-API-JS': [
	      'naj-installation',
	      'naj-getting-access-tokens',
        'responsive-design',
        'dark-mode',
        'adding-base-styles',
        'extracting-components',
        'adding-new-utilities',
      ],
    },
  },
}
