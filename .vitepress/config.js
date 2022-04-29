const { fetchDocs } = require('./fetchDocs')

module.exports = {
  title: 'NEAR Integrations',
  description: 'Simplified NEAR documentation',
	lastUpdated: true,
  themeConfig: {
    repo: 'https://github.com/Danail-Irinkov/near-integrate',
    pages: fetchDocs(),
    intro: ['index'],
	  outro: ['testnet', 'access-tokens',
		  'wallet-redirects', 'subgraphs', 'indexers', 'integrations'],
    collections: {
	    'NEAR-API-JS': [
		    'naj-installation',
		    'naj-features',
		    'naj-examples',
	    ],
      'RPC': [
        'rpc-installation',
        'rpc-features',
        'rpc-examples',
      ],
      'Contracts': [
	      'c-introduction',
	      'c-parsing',
	      'c-assembly',
        'c-rust',
	      'c-nfts',
        'c-examples'
      ],
      'NEAR': [
	      'n-introduction',
	      'n-community',
	      'n-wallet',
	      'n-ecosystem',
	      'n-exchanges',
      ],
    },
	  editLinks: true,
	  editLinkText: 'Edit this page on GitHub',
	  lastUpdated: 'Last Updated',
	  algolia: {
		  apiKey: 'your_api_key',
		  indexName: 'index_name'
	  }
  },
	vite: {
		mode: 'development'
	}
}
