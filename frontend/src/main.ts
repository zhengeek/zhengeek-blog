import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/vanguard.css'

const app = createApp(App)

app.use(router)

async function bootstrap() {
  await router.isReady()

  const initialRoute = router.currentRoute.value
  if (!initialRoute.path.startsWith('/admin') && initialRoute.path !== '/') {
    await router.replace('/')
  }

  app.mount('#app')
}

void bootstrap()
