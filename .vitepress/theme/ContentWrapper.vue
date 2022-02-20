<template>
  <div class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
    <div class="pb-7 border-b border-gray-200 mb-6">
      <h1
        class="inline-block text-3xl font-extrabold text-gray-900 tracking-tight"
      >
        {{ page.title }}
      </h1>
      <p class="mt-1 text-lg text-gray-500">{{ page.description }}</p>
    </div>

    <Content class="prose" />

    <div class="mt-16 flex leading-6 font-medium text-gray-500"
					v-if="page.relativePath.indexOf('index.md') === -1">
      <a
        v-if="prevPage"
        :href="prevPage.href"
        class="flex mr-8 transition-colors duration-200 hover:text-gray-900"
      >
        <span aria-hidden="true" class="mr-2">←</span>
        {{ prevPage.title }}
      </a>
      <a
        v-if="nextPage"
        :href="nextPage.href"
        class="flex text-right ml-auto transition-colors duration-200 hover:text-gray-900"
      >
        {{ nextPage.title }}
        <span aria-hidden="true" class="ml-2">→</span>
      </a>
    </div>

    <div class="mt-12 border-t border-gray-200 pt-6 text-right">
      <OutLink
        class="mt-10 text-sm text-gray-500 hover:text-gray-900"
        :href="theme.repo + '/edit/main/' + page.relativePath"
      >
        Edit this page on GitHub
      </OutLink>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import {ref, watchEffect} from 'vue'
import {getNameFromPath} from './utils'
const { page, theme } = useData()
let prevPage = ref(null)
let nextPage = ref(null)

watchEffect(() => {
	if(theme && theme.value.collections) {
		const flatPages = Object.values(theme.value.collections)
			.map((item) => Object.values(item))
			.flat()
	
		const pageIndex = flatPages.indexOf(
			getNameFromPath(page.value.relativePath)
		)
		
		const prevPageID = pageIndex > 0 ? flatPages[pageIndex - 1] : null
		const nextPageID =
			pageIndex < flatPages.length - 1
				? flatPages[pageIndex + 1]
				: null
		
		prevPage.value = theme.value.pages[prevPageID]
		nextPage.value = theme.value.pages[nextPageID]
	}
})
</script>

<script>
import OutLink from './components/OutLink.vue'
// import { getNameFromPath } from './utils.js'
// import {useData} from 'vitepress'

export default {
  data() {
    return {
      prevPage: null,
      nextPage: null,
    }
  },
  components: { OutLink },
  emits: ['contentUpdated'],
  updated() {
    this.$emit('contentUpdated')
    // this.getPrevNextPage()
  },
  mounted() {
		// this.getPrevNextPage()
  },
  methods: {
    // getPrevNextPage() {
		//
    // },
  },
  computed: {
    // buildEditURL() {
		// 	if (this.theme)
    //   return this.theme.repo + '/edit/main/' + this.page.relativePath
    // },
  },
}
</script>
