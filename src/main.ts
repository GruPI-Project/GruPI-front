import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

import { createPinia } from 'pinia'


//Main color #9D1B32FF
const GrupiPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#fce6e7',
            100: '#fad0d3',
            200: '#f79ea5',
            300: '#f46273',
            400: '#d42847',
            500: '#9d1b32',
            600: '#7e1427',
            700: '#660e1e',
            800: '#4b0813',
            900: '#32030a',
            950: '#1f0104'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{primary.500}',
                    inverseColor: '#ffffff',
                    hoverColor: '{primary.600}',
                    activeColor: '{primary.700}'
                },
                highlight: {
                    background: '{primary.750}',
                    focusBackground: '{primary.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            },
            dark: {
                primary: {
                    color: '{primary.50}',
                    inverseColor: '{primary.950}',
                    hoverColor: '{primary.100}',
                    activeColor: '{primary.200}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                }
            }
        }
    }
});

const pinia = createPinia()

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: GrupiPreset,
        options: {
            prefix: 'p',
            darkModeSelector: '.my-app-dark',
            cssLayer: false,
        }
    }
});
app.use(pinia);
app.mount('#app');