import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useStore = defineStore({
	id: 'main',
	state: () => {
		return {
			code_lang: useStorage('code_lang', 'js'),
		}
	},
	getters: {
		getCodeLang(){
			return this.code_lang
		},
	},
	actions: {
		setCodeLang(lang){
			return this.code_lang = lang
		},
	},
})
