import '@/assets/main.css'
import api from '@/apijson'

import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'

import { useFormularStore } from './stores/formularStore.ts'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

loadJSONData();
registerTailWindComponents();

app.mount('#app')

function loadJSONData() : void {
    const formularStore = useFormularStore();

    api.get('formularSkabelon.json').then(res => {
        formularStore.setformularSkabelonListe(res.data);
    })

    api.get('formularSkabelonNavn.json').then(res => {
        formularStore.setformularSkabelonNavnListe(res.data);
    })

    api.get('formularSkabelonFelt.json').then(res => {
        formularStore.setformularSkabelonFeltListe(res.data);
    })

    api.get('maerkningsScenarie.json').then(res => {
        formularStore.setMaerkningsScenarieListe(res.data);
    });
}

function registerTailWindComponents() {
    app.component('tw-action-bar', defineAsyncComponent(() => import('./components/common/tailwind/tw-action-bar.vue')));
    app.component('tw-badge', defineAsyncComponent(() => import('./components/common/tailwind/tw-badge.vue')));
    app.component('tw-badge-simple', defineAsyncComponent(() => import('./components/common/tailwind/tw-badge-simple.vue')));
    app.component('tw-button', defineAsyncComponent(() => import('./components/common/tailwind/tw-button.vue')));
    app.component('tw-button-dropdown', defineAsyncComponent(() => import('./components/common/tailwind/tw-button-dropdown.vue')));
    app.component('tw-button-responsive', defineAsyncComponent(() => import('./components/common/tailwind/tw-button-responsive.vue')));
    app.component('tw-button-group', defineAsyncComponent(() => import('./components/common/tailwind/tw-button-group.vue')));
    app.component('tw-card', defineAsyncComponent(() => import('./components/common/tailwind/tw-card.vue')));
    app.component('tw-card-header', defineAsyncComponent(() => import('./components/common/tailwind/tw-card-header.vue')));
    app.component('tw-card-header-slot', defineAsyncComponent(() => import('./components/common/tailwind/tw-card-header-slot.vue')));
    app.component('tw-flex', defineAsyncComponent(() => import('./components/common/tailwind/tw-flex.vue')));
    app.component('tw-grid-cols-generic', defineAsyncComponent(() => import('./components/common/tailwind/tw-grid-cols-generic.vue')));
    app.component('tw-input', defineAsyncComponent(() => import('./components/common/tailwind/tw-input.vue')));
    app.component('tw-input-select', defineAsyncComponent(() => import('./components/common/tailwind/tw-input-select.vue')));
    app.component('tw-label', defineAsyncComponent(() => import('./components/common/tailwind/tw-label.vue')));
    app.component('tw-show-lg', defineAsyncComponent(() => import('./components/common/tailwind/tw-show-lg.vue')));
    app.component('tw-show-md', defineAsyncComponent(() => import('./components/common/tailwind/tw-show-md.vue')));
    app.component('tw-text-sizeable', defineAsyncComponent(() => import('./components/common/tailwind/tw-text-sizeable.vue')));
}