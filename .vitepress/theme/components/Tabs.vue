<template>
	<div :class='{"tabs__light": mode === "light", "tabs__dark": mode === "dark"}'>
		<ul class='tabs__header'>
			<li v-for='(tab, index) in tabs'
					:key='tab.props.title'
					@click='selectTab(index)'
					:class='{"tab__selected": (index === selectedIndex)}'>
				{{ tab.props.title }}
			</li>
		</ul>
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		mode: {
			type: String,
			default: 'light'
		}
	},
	data () {
		return {
			selectedIndex: -1, // the index of the selected tab,
			tabs: []         // all of the tabs
		}
	},
	created () {
		console.log('this.$slots.default()[0]', this.$slots.default()[0].children)
		this.tabs = this.$slots.default()[0].children.filter(child => {
			return child?.type?.name === 'Tab' && child.props.title
		})
	},
	mounted () {
		this.selectTab(0)
	},
	methods: {
		selectTab (i) {
			this.selectedIndex = i
		}
	}
}
</script>

<style lang="css">

ul.tabs__header {
	display: block;
	list-style: none;
	margin: 0 0 0 20px;
	padding: 0;
}

ul.tabs__header > li {
	padding: 5px 30px;
	border-radius: 5px;
	margin: 0;
	display: inline-block;
	margin-right: 5px;
	cursor: pointer;
}

ul.tabs__header > li.tab__selected {
	font-weight: bold;
	border-radius: 5px 5px 0 0;
	border-bottom: 4px solid transparent;
}

.tabs__light .tab{
	background-color: #fff;
}

.tabs__light li {
	background-color: #ddd;
	color: #aaa;
}

.tabs__light li.tab__selected {
	background-color: #1f2937;
	color: #569CD6;
}

.tabs__dark .tab{
	background-color: #555;
	color: #eee;
}

.tabs__dark li {
	background-color: #ddd;
	color: #aaa;
}

.tabs__dark li.tab__selected {
	background-color: #1f2937;
	color: #569CD6;
	
}

</style>
