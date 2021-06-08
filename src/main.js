import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap';
import './assets/main.css'

let app = createApp(App/*, {
    data() {
        return {
            formData: {}
        }
    }
}*/)
app.config.globalProperties.test = 'woo';
app.mount('#app')