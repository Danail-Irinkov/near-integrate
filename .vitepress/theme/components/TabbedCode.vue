<template>
	<div class='wrapper'>
		<tabs :mode="mode" ref="tabs">
			<tab v-for="(el, code, index) in $slots"
				:code="code"
				:title="getTitle(code)"
				:show_tab="isTabSelected(index)">
				<slot :name="code"></slot>
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
		isTabSelected (index) {
			let selected = index === this.$refs?.tabs?.selectedIndex
			let no_options = index === 0 && this.$refs?.tabs?.selectedIndex > this.$slots.length
			return selected || no_options
		},
		getTitle (name) {
			const mySentence = name.replace('_', ' ');
			const words = mySentence.split(" ");
			
			for (let i = 0; i < words.length; i++) {
				words[i] = words[i][0].toUpperCase() + words[i].substr(1);
			}
			let result = words.toString().replace(',', ' ')
			
			return result.replace('Js', 'JS').replace('Php', 'PHP').replace('Cdn', 'CDN')
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
