<template>
	<AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
  <button v-else
    type="button"
    class="group leading-6 font-medium flex items-center space-x-3 sm:space-x-4 w-full py-2"
  >
    <IconSearch
      class="text-gray-400 group-hover:text-gray-500 transition-colors duration-200"
    >
    </IconSearch>

    <span
      class="text-gray-500 hover:text-gray-600 transition-colors duration-200"
    >
      Quick search<span class="hidden sm:inline"> for anything</span>
    </span>
  </button>
</template>

<script setup>
import { useData } from 'vitepress'
const { page, theme } = useData()
</script>
<script>
import IconSearch from '../icons/IconSearch.vue'
import AlgoliaSearchBox from './AlgoliaSearchBox.vue'

export default {
  components: { IconSearch, AlgoliaSearchBox },
	computed: {
		algolia() {
			return (
				this.theme?.algolia
			)
		},
		
		isAlgoliaSearch() {
			return !!(this.algolia && this.algolia.apiKey && this.algolia.indexName)
		}
	},
}
</script>
