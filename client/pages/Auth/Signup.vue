<template text-xs-center mt-5 pt-5>

    <section style="background: rgb(227, 227, 238)">
       
     <v-container text-xs-center mt-5 pt-5>

        <v-layout row wrap>
                <v-flex xs12 sm6 offset-sm3>
                    <h1>Get Started Here</h1>
                </v-flex>    
        </v-layout>

      
        <v-layout v-if="error" row wrap>
                <v-flex xs12 sm6 offset-sm3>
                    <areteLOL :message="error.message"></areteLOL>
                </v-flex>
        </v-layout>

        <v-layout row wrap>
                <UserAuthForm :loading="loading"  :submitForm="registerUser" buttonText="Register" hasName="true" :dontHaveAccount="true" />  
        </v-layout>
        
    </v-container>
    </section>
   
</template>

<script>
import {mapGetters} from 'vuex';
import UserAuthForm from "~/components/Auth/UserAuthForm";
import FormAlert from "~/components/Shared/FormAlert";

export default {
    components:{
        UserAuthForm,
        FormAlert
    },
    // watch:{
    //     user(value){
    //             if(value){
    //                 this.$router.push('/')
    //             }
    //     }
    // },
    computed:{
      ...mapGetters(["error", "loading","user"]),

    },
    methods:{
       async registerUser(registrationInfo){
           
            let user = await this.$store.dispatch('signupUser', {
                username: registrationInfo.username,
                email: registrationInfo.email,
                password: registrationInfo.password,
                // usernameRules:[

                // ]
            }).then(this.$store.dispatch('getCurrentUser'))
            // if(error){
            //     alert(error.message)
            // } else{
            //     alert('Thank you for getting registered ' + user.name);
            // }
            
        }
    }
   // middleware: 'isAuth'
}
</script>