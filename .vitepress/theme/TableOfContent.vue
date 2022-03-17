<template>
  <div class="hidden xl:text-sm xl:block flex-none w-64 pl-8 mr-8">
    <div
      class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-16) pt-10 pb-6 top-16"
    >
      <div class="mb-8" v-if="page.headers">
        <h5
          class="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs"
        >
          On this page
        </h5>

        <ul class="overflow-x-hidden text-gray-500 font-medium">
          <li
            v-for="section in page.headers"
            :key="section.slug"
            :class="{ 'ml-4': section.level == 3 }"
          >
            <a
              :href="'#' + section.slug"
              class="block transform transition-colors duration-200 py-2 hover:text-gray-900"
              :class="{ 'text-gray-900': activeHash === '#' + section.slug }"
            >
              {{ section.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
const { page, theme } = useData()
let activeHash = ref(null)
const props = defineProps({
	anchors: Array
})

function initActiveHash() {
	// console.log('initActiveHash page', page)
	activeHash.value = page.headers
		? '#' + page.headers[0].slug
		: null
}
function handleScroll() {
	const y = window.pageYOffset
	const windowHeight = window.innerHeight
	
	if (y < 0) {
		initActiveHash()
	} else if (y + windowHeight >= document.body.scrollHeight) {
		activeHash.value = page.headers
			? '#' + page.headers[page.headers.length - 1].slug
			: null
	} else {
		const middle = y + windowHeight / 2
		for (let i = 0; i < props.anchors.length; i++) {
			if (middle >= props.anchors[i].offsetTop) {
				activeHash.value = props.anchors[i].hash
			}
		}
	}
}
onMounted(() => {
	initActiveHash()
	window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll)
})
watchEffect(() => {
	if(page && page.headers)
		initActiveHash()
})
</script>
