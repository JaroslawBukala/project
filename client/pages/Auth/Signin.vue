<template  text-xs-center mt-5 pt-5>
 
    <section style="background: rgb(227, 227, 238)">
       
     <v-container text-xs-center mt-5 pt-5>
        <v-layout row wrap>
                <v-flex xs12 sm6 offset-sm3>
                    <h1>Please sign in</h1>
                </v-flex>
        </v-layout>

        <v-layout v-if="error" row wrap>
                <v-flex xs12 sm6 offset-sm3>
                    <areteLOL :message="error.message"></areteLOL>
                </v-flex>
        </v-layout>

         <v-layout>
                <UserAuthForm :loading="loading"  :submitForm="signinUser" :hasAccount="true"/>
        </v-layout>
                     
    </v-container>
    </section>
   
</template>

<script>
import UserAuthForm from "~/components/Auth/UserAuthForm";
import {mapGetters} from 'vuex';

export default  {
     computed:{
      ...mapGetters(["error", "loading", "user"]),

    },
    components:{
        UserAuthForm
       // FormAlert
    },
//     middleware ({ store, redirect }) {
        
//     //If the user is not authenticated
//     if (store.state.user) {
//       return redirect('/auth/profile')
//     }
//   },
    //    user(newValue, oldValue){
    //                 if(newValue){
    //                    // this.$router.push('/auth/profile')
    //                     // this.authSnackbar = true
    //                 }
    //         },
    methods:{
      async signinUser(loginInfo){
          
        //    this.$auth.loginWith('local',{ 
        //         email: loginInfo.email,
        //         password: loginInfo.password
        //         })

            
             
          let user = await this.$store.dispatch('signinUser', {
                email: loginInfo.email,
                password: loginInfo.password
            })
               this.$store.dispatch('getCurrentUser')
              
            
        }
    },
    // transition: 'page'
   
}
</script>