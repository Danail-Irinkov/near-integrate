const { fetchDocs } = require('./fetchDocs')

module.exports = {
  title: 'NEAR Integrations',
  description: 'Simplified NEAR documentation',
  themeConfig: {
    repo: 'https://github.com/Danail-Irinkov/near-integrate',
    pages: fetchDocs(),
    collections: {
	    'NEAR-API-JS': [
		    'naj-installation',
		    'naj-access-tokens',
		    'naj-features',
		    'naj-examples',
	    ],
      'RPC': [
        'rpc-installation',
        'rpc-access-tokens',
        'rpc-wallet-redirects',
        'rpc-features',
        'rpc-examples',
      ],
      'Contracts': [
	      'c-introduction',
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
  },
}
