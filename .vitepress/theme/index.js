import DefaultTheme from 'vitepress/theme'
import 'tailwindcss/tailwind.css'
import './styles.css'
import Layout from './Layout.vue'
import NearButton from './components/NearButton.vue'
import CenterContent from './components/CenterContent.vue'
import TabbedCode from './components/TabbedCode.vue'
import { createPinia } from 'pinia'


export default {
	DefaultTheme,
  Layout,
	enhanceApp({ app }) {
		app.use(createPinia())
		app.component('NearButton', NearButton)
		app.component('CenterContent', CenterContent)
		app.component('TabbedCode', TabbedCode)
	}
}
