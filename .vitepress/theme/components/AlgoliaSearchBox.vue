<template>
  <div id="docsearch"></div>
</template>

<script setup>
import { useData } from 'vitepress'
const { router } = useData()
const $router  = router
</script>
<script>
function isSpecialClick(event) {
  return (
    event.button === 1 ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  )
}

export default {
  name: 'AlgoliaSearchBox',

  props: ['options'],

  watch: {
    $lang (newValue) {
      this.update(this.options, newValue)
    },

    options (newValue) {
      this.update(newValue, this.$lang)
    }
  },

  mounted () {
    this.initialize(this.options, this.$lang)
  },

  methods: {
    getRelativePath (absoluteUrl) {
      const { pathname, hash } = new URL(absoluteUrl)
      const url = pathname.replace(/^(?:\/\/|[^/]+)*\//, '') + hash

      return url
    },
    initialize (userOptions, lang) {
      Promise.all([
        import(/* webpackChunkName: "docsearch" */ '@docsearch/js'),
        import(/* webpackChunkName: "docsearch" */ '@docsearch/css')
      ]).then(([docsearch]) => {
        docsearch = docsearch.default

        docsearch(
          Object.assign(
            {
              placeholder: 'Search NEAR'
            },
            userOptions,
            {
              container: '#docsearch',
              // #697 Make DocSearch work well in i18n mode.
              searchParameters: Object.assign(
                {},
                // lang && {
                //   facetFilters: [`lang:${lang}`].concat(
                //     userOptions.facetFilters || []
                //   )
                // },
                userOptions.searchParameters
              ),
              navigator: {
                navigate: ({ suggestionUrl }) => {
                  const { pathname: hitPathname } = new URL(
                    window.location.origin + suggestionUrl
                  )

                  // Vue Router doesn't handle same-page navigation so we use
                  // the native browser location API for anchor navigation.
                  if (this.$router.history.current.path === hitPathname) {
                    window.location.assign(
                      window.location.origin + suggestionUrl
                    )
                  } else {
                    this.$router.push(suggestionUrl)
                  }
                }
              },
              transformItems: items => {
                return items.map(item => {
                  return Object.assign({}, item, {
                    url: this.getRelativePath(item.url)
                  })
                })
              },
              hitComponent: ({ hit, children }) => {
                return {
                  type: 'a',
                  ref: undefined,
                  constructor: undefined,
                  key: undefined,
                  props: {
                    href: hit.url,
                    onClick: event => {
                      if (isSpecialClick(event)) {
                        return
                      }

                      // We rely on the native link scrolling when user is
                      // already on the right anchor because Vue Router doesn't
                      // support duplicated history entries.
                      if (this.$router.history.current.fullPath === hit.url) {
                        return
                      }

                      const { pathname: hitPathname } = new URL(
                        window.location.origin + hit.url
                      )

                      // If the hits goes to another page, we prevent the native link behavior
                      // to leverage the Vue Router loading feature.
                      if (this.$router.history.current.path !== hitPathname) {
                        event.preventDefault()
                      }

                      this.$router.push(hit.url)
                    },
                    children
                  }
                }
              }
            }
          )
        )
      })
    },

    update(options, lang) {
      this.$el.innerHTML = '<div id="docsearch"></div>'
      this.initialize(options, lang)
    }
  }
}
</script>

<style>
#docsearch {
	@apply text-gray-400 group-hover:text-gray-500 transition-colors duration-200;
	width: 100%;
}
#docsearch > button {
	width: 100%;
	padding: 22px;
	border-radius: 12px;
}
.DocSearch {
  --docsearch-primary-color: #ffffff;
  --docsearch-highlight-color: var(--docsearch-primary-color);
  --docsearch-searchbox-shadow: inset 0 0 0 2px var(--docsearch-primary-color);
	--docsearch-searchbox-focus-background: var(--docsearch-primary-color);
	--docsearch-modal-background: rgba(235, 237, 240, 0.35);
	--docsearch-modal-background2: rgb(248 248 249);
}
.DocSearch-Button {
	background: var(--docsearch-modal-background) !important;
}
.DocSearch-Search-Icon {
	color: var(--docsearch-muted-color);
}
.DocSearch-Screen-Icon > svg {
	@apply mx-auto;
}
.DocSearch-Button-Key:nth-child(2) {
	line-height: 12px;
	font-size: 12px;
	padding-top: 2px;
}
.DocSearch-Modal {
	background: var(--docsearch-modal-background2) !important;
}
</style>
