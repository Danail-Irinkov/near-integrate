import 'tailwindcss/tailwind.css'
import './styles.css'
import Layout from './Layout.vue'
import NearButton from './components/NearButton.vue'
import CenterContent from './components/CenterContent.vue'
import TabbedCode from './components/TabbedCode.vue'

export default {
  Layout,
	enhanceApp({ app }) {
		app.component('NearButton', NearButton)
		app.component('CenterContent', CenterContent)
		app.component('TabbedCode', TabbedCode)
	}
}
