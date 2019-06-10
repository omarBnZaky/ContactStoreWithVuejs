<template>
    <div>
        <h1>Add & Contacts</h1>
        <form action="#" @submit.prevent="edit ? updateContact(contact.id) : createContact()">
            <div class="form-group">
                <label>Name</label>
                <input v-model="contact.name" type="text" name="name" class="form-control">
            </div>

            <div class="form-group">
                <label>Email</label>
                <input v-model="contact.email" type="email" name="email" class="form-control">
            </div>

          <div class="form-group">
                <label>Phone</label>
                <input v-model="contact.phone" type="text" name="phone" class="form-control">
            </div>
              <div class="form-group">
                  <button v-show="!edit" type="submit" class="btn btn-primary"> New contact </button>
                  <button v-show="edit" type="submit" class="btn btn-primary"> Update contact </button>

              </div>
        </form>
        <h1>contacts </h1>
        <ul class="list-group">    
             <li  class="list-group-item" v-for="contact in list.data" v-bind:key="contact.id">
              <strong>{{contact.name}}</strong>  <br> {{contact.email}} {{contact.phone}}
              <button @click="showContact(contact.id)" class="btn btn-default btn-xs">edit</button>
              <button @click="deleteContact(contact.id)" class="btn btn-danger btn-xs">delete</button>


            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        data: function(){
            return{
                edit:false,
                list:[],
                  contact:{
                    id:'',
                    name:'',
                    email:'',
                    phone:''
                    }
            }
        },
        mounted: function(){
            console.log('contacts component loaded..');
            this.fetchContactList();
        },
        methods:{

            fetchContactList:function(){
                console.log('fetch');
                  axios.get('api/contacts')
                    .then((response) => {
                        console.log(response.data);
                        this.list = response.data;
                    }).catch((error)=>{
                        console.log(error);
                });
            },

            createContact:function(){
                console.log('create');
                
                let self = this;
                let params = Object.assign({}, self.contact);

                axios.post('api/contacts',  params)
                 .then(function(){
                     self.contact.name = '';
                     self.contact.email = '';
                     self.contact.phone = '';
                     self.edit = false;
                     self.fetchContactList();

                 })
                .catch(function(error){
                    console.log(error);
                });
            },

             showContact: function(id){
                let self = this;
                axios.get('api/contacts/'+id)
                .then(function(response){
                    self.contact.id = response.data.id;
                    self.contact.name = response.data.name;
                    self.contact.email = response.data.email;
                    self.contact.phone = response.data.phone;
                })
                self.edit = true;
            },
            updateContact: function(id){
                console.log('Updating contact '+id+'...');
                let self = this;
                let params =Object.assign({}, self.contact);
                axios.patch('api/contacts/'+id, params)
                .then(function(){
                    self.contact.name = '';
                    self.contact.email = '';
                    self.contact.phone = '';
                    self.edit = false;
                    self.fetchContactList();
                })
                .catch(function(error){ 
                    console.log(error);
                });
            },
            
         deleteContact: function(id){
                             let self = this;

                axios.delete('api/contacts/'+id)
                .then(function(response){
                    self.fetchContactList();
                })
              .catch(function(error){ 
                    console.log(error);
                });
            },
        }
    }

</script>