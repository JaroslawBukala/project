<template>
<section style="background: #E3E3EE">

    <!-- Side Navbar -->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="accent" dark flat>
        <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">VueShare</h1>
        </router-link>
      </v-toolbar>

      <v-divider></v-divider>

      <!-- Side Navbar Links -->
      <v-list>
        <v-list-tile ripple v-for="item in sideNavItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>

        <!-- Signout Button -->
        <v-list-tile v-if="getCurrentUser" @click="handleSignoutUser">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Signout</v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed dark color="blue" >
    <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text hidden-xs-only">
      <nuxt-link  class="title" to="/" tag="span" style="cursor: pointer">iTunes Search</nuxt-link>
    </v-toolbar-title>

 


<!-- Horizontal Navbar -->
    <v-toolbar fixed color="primary" dark>
      <!-- App Title -->
      <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          VueShare
        </router-link>
      </v-toolbar-title>



      <!-- Search Input -->
       <v-form @submit.prevent="submitAlbums">
      <v-text-field  v-model="searchAlbums" flex prepend-icon="search" placeholder="Search albums" color="accent" single-line hide-details></v-text-field>
    </v-form>
    

    <v-form @submit.prevent="submitBooks">
      <v-text-field  v-model="searchBooks" flex prepend-icon="search" placeholder="Search books" color="accent" single-line hide-details></v-text-field>
    </v-form>


    <v-form @submit.prevent="submit">
      <v-text-field  flex prepend-icon="search" placeholder="Search posts" color="accent" single-line hide-details></v-text-field>
    </v-form>


      <!-- Horizontal Navbar Links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-icon class="hidden-sm-only" left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>

        <!-- Profile Button -->
        <v-btn flat to="/auth/profile" v-if="getCurrentUser">
          <v-icon class="hidden-sm-only" left>account_box</v-icon>
          <v-badge right color="blue darken-2">
            <span slot="badge">1</span>
            Profile
          </v-badge>
        </v-btn>

        <!-- Signout Button -->
        <v-btn flat v-if="getCurrentUser" @click="handleSignoutUser">
          <v-icon class="hidden-sm-only" left>exit_to_app</v-icon>
          Signout
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>

  </v-toolbar> 

</section>
</template>
<script>

import getBookGql from '../apollo/actions/getBook.gql';
import {mapGetters} from 'vuex';
//Vue.forceUpdate();
//import JSON from 'json';
    export default {
      data(){
            return{
                  isAuthenticated: false,
                  searchAlbums:'',
                  searchBooks:'',
                  sideNav: false
       


            }
  },
        
  computed:{
    
     ...mapGetters(["user", 'getCurrentUser']),
      horizontalNavItems(){
       
        let items =[
          {icon: 'lock_open', title: 'Sign In', link: '/Auth/Signin'},
          {icon: 'create', title: 'Sign Up', link: '/Auth/Signup'}
        ]
        if(this.getCurrentUser){
           items =[
          {icon: 'stars', title: 'Create Post', link: '/Posts/AddPost'},
          {icon: 'chat', title: 'Posts', link: '/Posts/posts'},
          {icon: 'chat', title: 'Posts Page', link: '/Posts/postsPage'},
          
        ]
        }
        return items
      },
       sideNavItems(){
        let items =[
          {icon: 'chat', title: 'Posts', link: '/Posts/posts'},
          {icon: 'lock_open', title: 'Sign In', link: '/Auth/Signin'},
          {icon: 'create', title: 'Sign Up', link: '/Auth/Signup'}
        ]
        if(this.getCurrentUser){
          items = [
          {icon: 'account_box', title: `${this.getCurrentUser.email}`, link: '/Auth/profile'},
          {icon: 'chat', title: 'Posts', link: '/Posts/posts'},
          {icon: 'chat', title: 'Posts Page', link: '/Posts/postsPage'},
          {icon: 'stars', title: 'Create Post', link: '/Posts/AddPost'}

          ]
        }
        return items
      }
  },
  // watch:{
  //           user(value){
  //                   if(value){
                       
  //                       this.$router.push('/')

                         

  //                   }
  //           }
  //   },
  created(){
                this.$store.dispatch('getCurrentUser')
             
            
          },
  methods: {
  
    submitAlbums(event){
  
        this.$router.push(`/albums/${this.searchAlbums}`)
        this.searchAlbums='';
  
    },
    submitBooks(event){
      this.$route.params.id = this.searchBooks
       this.$router.push(`/books/${this.searchBooks}`)
      // this.searchBooks = '';

         //  localstorage.setItem('storage-book',`${this.$route.params.id}`)
    },
    toggleSideNav(){
      this.sideNav = !this.sideNav
    },
   async handleSignoutUser(){
     await this.$store.dispatch('signoutUser');
    }
  },
  middleware: 'search'
    }

</script>
<style scoped>
.title {
  text-decoration: none !important;
}
.title:visited{
  color: white;
}
</style>