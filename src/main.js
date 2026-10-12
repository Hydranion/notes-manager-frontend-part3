import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createServices } from './services/createServices'
import { SERVICES_KEY } from './services/keys'
import './styles/main.scss'

const app = createApp(App)
app.use(router)
app.provide(SERVICES_KEY, createServices(import.meta.env.VITE_API_URL))
app.mount('#app')
