import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')

// TODO: 1. use free maps instead of google maps
// TODO: 2. use native Geolocation API (https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)