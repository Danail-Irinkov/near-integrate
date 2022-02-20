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
import { useStore } from '../store/index'
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		mode: {
			type: String,
			default: 'light'
		}
	},
	setup() {
		const store = useStore()
		// const store = {}
		return {
			store
		};
	},
	data () {
		return {
			selectedIndex: -1, // the index of the selected tab,
			tabs: []         // all of the tabs
		}
	},
	created () {
		this.tabs = this.$slots.default()[0].children.filter(child => {
			return child?.type?.name === 'Tab' && child.props.title
		})
	},
	mounted () {
		let selected_code = this.store.getCodeLang
		this.selectCode(selected_code)
	},
	methods: {
		selectCode (selected_code) {
			let tab_index = this.tabs.findIndex((e)=> e.props.code === selected_code)
			if (tab_index !== -1) {
				this.selectTab(tab_index)
			}
		},
		selectTab (i) {
			this.selectedIndex = i
			if (this.store.getCodeLang !== this.tabs[i].props.code)
				this.store.setCodeLang(this.tabs[i].props.code)
		}
	},
	watch: {
		'store.code_lang' (newVal, oldVal) {
			if (newVal !== oldVal)
				this.selectCode(newVal)
		}
	}
})
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
