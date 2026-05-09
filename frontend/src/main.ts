import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import any global CSS files here if you have them in the future
// Example: import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')