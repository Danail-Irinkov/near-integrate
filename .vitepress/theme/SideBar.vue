<template>
  <div style="max-width: 240px"
    class="fixed z-20 inset-0 lg:h-auto flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block lg:static"
    :class="{ hidden: !navOpen }"
    @click="$emit('update:clostNav')"
  >
    <div
      class="h-full overflow-y-auto lg:block lg:bg-transparent overflow-hidden lg:top-16 lg:h-auto lg:sticky bg-white mr-24 lg:mr-0"
      @click="(e) => e.stopPropagation()"
    >
      <div
        class="hidden lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white"
      />
      <nav
        class="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-14 lg:h-(screen-16)"
      >
				<ul class="mb-4 font-bold">
					<li v-if="!!theme?.intro"
							v-for="(menu_item) in theme.intro">
						<NavItem :fileName="menu_item" />
					</li>
				</ul>
				
        <ul v-if="!!theme?.collections"
          v-for="(collection, category) in theme.collections"
					class="pointer"
          :key="category"
        >
          <li class="mb-3 transition-colors text-gray-500 hover:text-gray-900 duration-200 pointer">
            <h4
              class="px-2 mb-2 lg:mb-2 uppercase tracking-wide font-semibold text-md lg:text-sm"
							@click="chevrons[category] = !chevrons[category]"
            >
              {{ category }}
							<chevron :class="{ forwards: chevrons[category], backwards: !chevrons[category] }"/>
            </h4>
	
						<expand-height-transition>
							<div v-if="chevrons[category]">
								<ul v-for="fileName in collection" :key="fileName">
									<li>
										<NavItem :fileName="fileName" />
									</li>
								</ul>
							</div>
						</expand-height-transition>
          </li>
        </ul>
	
				<ul class="mb-4 font-bold">
					<li v-if="!!theme?.outro"
							v-for="(menu_item) in theme.outro">
						<NavItem :fileName="menu_item" />
					</li>
				</ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
const { page, theme } = useData()
</script>
<script>
import NavItem from './components/NavItem.vue'
import chevron from './components/icons/chevron.vue'
import ExpandHeightTransition from './components/Transitions/ExpandHeightTransition.vue'

export default {
  props: {
    navOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:clostNav'],
  components: { NavItem, chevron, ExpandHeightTransition },
	data(){
		return {
			chevrons: {}
		}
	},
	watch: {
		page: {
			handler(page)
			{
				console.log('page', page)
				// console.log('page.relativePath', page.relativePath)
				for (let key in this?.theme?.collections) {
					let collection = this.theme.collections[key]
					for (let sub_col of collection) {
						if (page?.relativePath.indexOf(sub_col) !== -1) {
							this.chevrons[key] = true
						}
					}
				}
			},
			immediate: true
		}
	}
}
</script>

<style scoped>
.chevron {
	margin: 2px;
	transition: all .4s;
}
.forwards {
	transform: rotate(90deg);
	transition-timing-function: ease-out;
}
.backwards {
	transition-timing-function: ease-in;
}
</style>
