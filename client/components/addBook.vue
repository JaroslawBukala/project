<template>
    <v-container>
        <v-form @submit.prevent="submit" v-model="valid">
 
      <v-layout wrap>
       
        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="bookName"
            :rules="bookRules"
            :counter="10"
            label="Book name"
            required
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
        >

          <v-text-field
            v-model="genre"
            :rules="genreRules"
            :counter="10"
            label="Genre"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>

<br><br>
    <v-layout>
      <v-flex xs12 sm6 d-flex>
<div v-focus>
          <select v-model="selected" >
          <option disabled value="">Please select one</option>
          <option required v-for="author in authors" :key='author._id'><input v-model="author._id">{{author.name}}</option>

</select>
<p>selectone</p>
<input type="text" v-focus>
<h3>Book choice</h3>
<p>Book name: {{bookName}}</p>
<p>Book genre: {{genre}}</p>
<p>Selected Author: {{ selected }}</p>
</div>

<br>
<div v-if="!selected">
  <p>Add a new Author</p>
<input placeholder="Enter Author Name" v-model="authorName" >
</div>
<br>
<div v-if="!selected">
  <p>Enter Author Age</p>
<input type="number" placeholder="Enter Author Age" v-model="authorAge">
</div>
      </v-flex>
    </v-layout>
     <v-btn  @click="submit" small color="blue" dark>Add</v-btn>
    </v-form>
  </v-container>
</template>

<script>
//var ObjectID = require('mongodb').ObjectID;
var ObjectID = require("bson-objectid");
import {mapGetters} from 'vuex';

  export default {
   data() {
           return{
                 valid: false,
                 selected:"",
                 bookName: "",
                 genre:"",
                 author:"",
                 authorName:"",
                 authorAge:"",
                 id: "",
              
     bookRules: [
        v => !!v || 'Book name is required',
        v => v.length > 0 || 'Name must be more than 0 characters',
      ],
      genreRules: [
        v => !!v || 'Genre is required'
      ]
    }
   },
   created (){
      this.handleGetBooks();
      this.handleGetAuthors();

  },
computed: {
        
        authorsId(){
                              var vm=this;
                            this.authors.map(function(author){
                                if(vm.selected===author.name){
                                  console.log(vm.id+" "+'inside computed')
                                    vm.id = author._id
                                }
                               
                            })
                              return vm.id
	},
      authors(){
        return this.$store.state.authors.getAuthors
      }
},
  methods: {
submit(){
          var objectId = '';
         var vm = this;
      if(this.selected){
          //console.log(this.bookName+'book plus genre and id'+this.genre+'ID-> '+this.authorsId)
          this.$store.dispatch("addBookMutation",{
                name: this.bookName,
                genre:this.genre,
                creatorId: this.authorsId
             })
      }
      else if(!this.selected){
        this.objectId= ObjectID()
            console.log(vm.id+'VM DOT IF')
              this.$store.dispatch("addAuthorMutation",{
                _id: this.objectId,
                name: this.authorName,
                age: parseInt(this.authorAge)
                }),
              this.$store.dispatch("addBookMutation",{
               
                name: this.bookName,
                genre:this.genre,
                creatorId: this.objectId
             })
             console.log(this.objectId+"authirsid")
      }
      
    },
    
    handleGetBooks(){
      // reach out to Vuex store, fire action that gets books
      
      this.$store.dispatch('getBooks')
    },
    handleGetAuthors(){
      // reach out to Vuex store, fire action that gets books
      
      this.$store.dispatch('getAuthors')
      this.$store.dispatch('setBooks')
 
    }
}
}
</script>
