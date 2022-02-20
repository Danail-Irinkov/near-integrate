<template>
  <div
    class="space-y-20 sm:space-y-32 md:space-y-40 lg:space-y-44 overflow-hidden text-gray-500"
  >
    <header class="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto">
      <div class="px-4 sm:px-6 md:px-8 mb-14 sm:mb-20 xl:mb-8">
        <div
          class="border-b border-gray-200 py-4 flex items-center justify-between mb-16 sm:mb-20 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <SearchBox />

          <div class="flex items-center space-x-6 sm:space-x-10 ml-6 sm:ml-10">
            <a
              href="/docs/"
              class="text-base leading-6 font-medium text-gray-500 hover:text-gray-600 transition-colors duration-200 py-2"
            >
              <span class="sm:hidden">Docs</span>
              <span class="hidden sm:inline">Documentation</span>
            </a>

            <OutLink
              :href="theme.repo"
              class="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <span class="sr-only">Repository on GitHub</span>
              <IconGitHub />
            </OutLink>
          </div>
        </div>

        <Logo class="w-auto" style="max-width: 400px" />

        <h1
          class="text-4xl sm:text-6xl lg:text-7xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10"
        >
          Rapidly Integrate with NEAR Protocol.
        </h1>

        <p
          class="max-w-screen-lg text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11"
        >
          An example first cheatsheet to integrating with
          <code class="font-mono !text-gray-900 font-bold text-3xl">NEAR</code>
        </p>

        <div
          class="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 text-center"
        >
          <a
            class="w-full sm:w-auto flex-none bg-gray-900 hover:bg-gray-700 text-white text-xl leading-6 font-semibold py-4 px-8 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
            href="/docs/"
          >
            Get started
          </a>

<!--          <button-->
<!--            class="w-full sm:w-auto flex-none bg-gray-50 text-gray-400 hover:text-gray-900 font-mono leading-6 py-3 sm:px-6 border border-gray-200 rounded-xl flex items-center justify-center space-x-2 sm:space-x-4 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200"-->
<!--            @click="writeClipboard"-->
<!--          >-->
<!--            <span class="text-gray-900">-->
<!--              <span class="hidden sm:inline text-gray-500" aria-hidden="true">-->
<!--                $-->
<!--              </span>-->
<!--              npm install tailwindcss-->
<!--            </span>-->
<!--            <IconCopy />-->
<!--          </button>-->
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
const { page, theme } = useData()
</script>
<script>
import SearchBox from './components/SearchBox.vue'
import Logo from './components/Logo.vue'
import IconGitHub from './icons/IconGitHub.vue'
import IconCopy from './icons/IconCopy.vue'
import OutLink from './components/OutLink.vue'
import {useData} from 'vitepress'

export default {
  components: { SearchBox, Logo, IconGitHub, IconCopy, OutLink },
  methods: {
    writeClipboard() {
      navigator.clipboard.writeText('npm install tailwindcss')
    },
  },
}
</script>
