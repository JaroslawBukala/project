<template>
    
    <div v-if="getCurrentUser">
        <Posts/>
    </div>
    <div v-else>
        <h1>You need to log back in</h1>
    </div>
    
    

    
</template>

<script >

import Vue from 'vue';
import {mapGetters} from "vuex";
import Posts from '~/components/Posts/Posts.vue';
export default {
    data(){
        return{
             isAuthenticated:false,   
        }
    },
     components:{
        Posts
     },
     created(){
            this.$store.dispatch('getPosts')
            // this.$router.go()
            // return
     },
         computed:{
            
         ...mapGetters(["getCurrentUser"])
    },
    methods(){

    }
 


}
</script>