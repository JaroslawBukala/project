<template>
  <v-container text-xs-center mt-5 pt-5>

    <!-- Add Post Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="primary--text">Add Post</h1>
      </v-flex>
    </v-layout>

    <!-- Add Post Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>

        <v-form  @submit.prevent="handleAddPost()" v-model="bla">

          <!-- Title Input -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field :rules="[required('title') ]" v-model="title" label="Post Title" type="text" required></v-text-field>
            </v-flex>
          </v-layout>

          <!-- Image Url Input -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field :rules="[requiredImage('image')]" v-model="imageUrl" label="Image URL" type="text" required></v-text-field>
            </v-flex>
          </v-layout>

          <!-- Image Preview -->
          <v-layout row>
            <v-flex xs12>
              <img :src="imageUrl" height="300px">
            </v-flex>
          </v-layout>

          <!-- Categories Select -->
          <v-layout row>
            <v-flex xs12>
              <v-select v-model="categories" :rules="[categoriesRules('category')]" :items="['Art', 'Education', 'Travel', 'Photography', 'Technology']" multiple label="Categories"></v-select>
            </v-flex>
          </v-layout>

          <!-- Description Text Area -->
          <v-layout row>
            <v-flex xs12>
              <v-textarea class="primary--text" :rules="[required('Description'), minLength('Description', 2), maxLength('Description', 1000) ]" v-model="description" label="Description" type="text" required></v-textarea>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-btn :disabled="!bla || loading" color="info" type="submit">
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
                Submit</v-btn>
            </v-flex>
          </v-layout>

        </v-form>

      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import validations from "~/Utils/validations";
export default {
  name: "AddPost",
  data() {
    return {
      bla:false,
      isFormValid: true,
      title: "",
      imageUrl: "",
      categories: [],
      description: "",
      likes: 1,
      ...validations
    }
  },
  // created(){

  // },
  computed:{
        ...mapGetters(["getCurrentUser", "loading", "posts"])
  },
  watch: {
        bla(newValue, oldValue){
       
            console.log(`old value inside WATCH ${oldValue}, plus new value ${newValue}`);
           
           
        }

 },
  methods:{
       async handleAddPost(){
           await this.$store.dispatch("addPostMutation",{
                title: this.title,
                imageUrl:this.imageUrl,
                categories: this.categories,
                likes: 1,
                description: this.description,
                creatorId: this.getCurrentUser._id
           })
           
           //this.$router.push('/posts/posts')
           

           }
          
           
  }
 

  
};
</script>
