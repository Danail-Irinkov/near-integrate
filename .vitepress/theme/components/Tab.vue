<template>
	<div class='tab' v-show='show_tab'>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'Tab',
	props: {
		show_tab: {
			type: Boolean,
			default: false
		},
		code: {
			type: String,
			default: 'js'
		},
		title: {
			type: String,
			default: 'Tab'
		}
	},
	data () {
		return {
			// isActive: true
		}
	}
}
</script>

<style lang="css">
.tab {
	display: inline-block;
	color: black;
	padding: 0;
	width: 100%;
	/*min-width: 800px;*/
	border-radius: 5px;
	/*min-height: 400px;*/
}
.tab > div > pre {
	margin: 0!important;
}
</style>
