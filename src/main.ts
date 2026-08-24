import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('tw-input-text', defineAsyncComponent(() => import('@/components/maerkning/tw-input-text.vue')));

app.use(createPinia())
app.use(router)

app.mount('#app')
