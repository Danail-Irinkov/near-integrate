<template>
  <a
    :href="theme.pages[fileName].href"
    class="max-w-fit px-2 py-1 transition-colors duration-200 relative block rounded-md"
    :class="[
      getNameFromPath(page.relativePath) === fileName
        ? 'text-cyan-700 bg-cyan-50'
        : 'hover:text-gray-900 text-gray-500',
    ]"
  >
    <span>{{ theme.pages[fileName].title }}</span>
  </a>
</template>

<script setup>
import { useData } from 'vitepress'
import { getNameFromPath } from '../utils.js'
const { page, theme } = useData()
</script>
<script>
// import { getNameFromPath } from '../utils.js'
//
export default {
  props: {
    fileName: {
      type: String,
      required: true,
    },
  },
  computed: {
    // isActive() {
    //   return getNameFromPath(String(this?.page?.relativePath)) == this.fileName
    // },
  },
}
</script>
