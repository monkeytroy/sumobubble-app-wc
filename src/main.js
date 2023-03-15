import { defineCustomElement } from 'vue'
import App from './App.ce.vue'

const BeaconApp = defineCustomElement(App)
customElements.define('beacon-app', BeaconApp)
