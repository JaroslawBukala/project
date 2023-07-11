<template>

    <v-container class="mt-4">
     
        <br>
        <br>
        <br>
                <br>
        <br>
        <br>
        <div v-if="getCurrentUser">{{getCurrentUser.email}}{{getCurrentUser._id}}</div>
          <br>
          <br>
          <br>

    </v-container>
   
</template>

<script>
import {mapGetters} from 'vuex';
export default {
      data() {
    return {
     
    }
  },
        // created(){
        //    this.$store.dispatch('getCurrentUser')
        //    console.log(this.getCurrentUser+ ' we are looging for the CURRENT USER')

        // },
          computed:{
         
               ...mapGetters(["getCurrentUser"]),
          },
          watch:{
            user(newValue, oldValue){
                    if(newValue){
                        
                         this.authSnackbar = true
                    }
            }
    },

        //   watch:{
        //     user(value){
        //             if(!value){
        //                // console.log(user.email + ' we are testing THE REFRESH')
        //                  this.$cookiz.set('apollo-token', '')
        //             }  
        //     }
        // },
          // methods:{
          //      currentUser(){
          //       console.log('INSIDE OF TYHE COMPONENT')
          //       }
          // },
         middleware:'isAuth',
            
  }

</script>