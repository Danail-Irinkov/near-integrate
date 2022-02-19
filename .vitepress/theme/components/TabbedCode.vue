<template>
	<div class='wrapper'>
		<tabs :mode="mode" ref="tabs">
			<tab v-for="(el, slot, index) in $slots"
				:title="getTitle(slot)"
				:show_tab="index === $refs?.tabs?.selectedIndex">
				<slot :name="slot"></slot>
			</tab>
		</tabs>
<!--		<button class='change__style' @click='changeStyle()'>Dark Mode</button>-->
	</div>
</template>

<script>
import Tab from './Tab.vue'
import Tabs from './Tabs.vue'
export default {
	components: {
		Tab,
		Tabs
	},
	data () {
		return {
			mode: 'dark'
		}
	},
	created () {
	},
	methods: {
		getTitle (name) {
			switch (name) {
				case 'js':
					return 'JS';
				case 'node_js':
					return 'Node JS';
				case 'php':
					return 'PHP';
				default:
					return 'No Title'
			}
		},
		changeStyle () {
			if (this.mode === 'dark') {
				this.mode = 'light'
			} else {
				this.mode = 'dark'
			}
		}
	}
}
</script>

<style lang="css">
* {
	margin: 0;
	padding: 0;
	font-family: 'Karla', sans-serif;
}
.wrapper {
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	/*min-height: 100vh;*/
	background-color: transparent;
	margin: 0;
	padding: 0;
}
.change__style {
	background-color: #eee;
	font-size: 1em;
	margin-bottom: 10px;
	padding: 5px;
}
</style>
