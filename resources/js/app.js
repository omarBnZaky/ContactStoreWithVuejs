require('./bootstrap');

window.Vue = require('vue');

let axios = require('axios');

Vue.component('contacts-component', require('./components/ContactsComponent.vue').default);


const app = new Vue({
    el: '#app'
});
