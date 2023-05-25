import { defineCustomElement } from 'vue'
import App from '@/App.ce.vue'

const InfoChatApp = defineCustomElement(App)
customElements.define('infochat-app', InfoChatApp)