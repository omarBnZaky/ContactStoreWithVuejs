require('./bootstrap');

window.Vue = require('vue');

Vue.component('contacts-component', require('./components/ContactsComponent.vue').default);


const app = new Vue({
    el: '#app'
});
