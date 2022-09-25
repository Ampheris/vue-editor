import {createApp} from 'vue';
import App from './App.vue';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faFloppyDisk, faFolderOpen, faPlus} from '@fortawesome/free-solid-svg-icons';

import {QuillEditor} from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {createStore} from 'vuex'

import SocketClient from "@/services/ws.service";


// Create a new store instance.
const store = createStore({
    state() {
        return {
            count: 0,
            _id: '',
            message: '',
        }
    },
})

library.add(faFloppyDisk);
library.add(faFolderOpen);
library.add(faPlus);


createApp(App)
    .component('QuillEditor', QuillEditor)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(store)
    .provide('socket', new SocketClient())
    .mount('#app');
