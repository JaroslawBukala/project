<template>
        
    <v-layout row wrap>
                <v-flex xs12 sm6 offset-sm3>
                            <v-card color="blue" dark>

                              <v-container>
                                <v-form @submit.prevent="submitForm(loginInfo)" v-model="bla">

                                    <v-layout row>
                                        <v-flex xs12>
                                             <v-text-field v-model="loginInfo.username" 
                                             prepend-icon="face" label="Name" 
                                             type="text" 
                                             :rules="[required('name')]"
                                             v-if="hasName" 
                                             />    
                                             
                                        </v-flex>
                                    </v-layout>

                                   <v-layout row>
                                        <v-flex xs12>
                                             <v-text-field v-model="loginInfo.email" 
                                             prepend-icon="@" label="email" 
                                             type="text" 
                                             :rules="[required('email'), emailFormat()]" 
                                             />
                                      
                                        </v-flex>
                                    </v-layout>

                                    <v-layout row>
                                        <v-flex xs12>
                                             <v-text-field v-model="loginInfo.password" 
                                             prepend-icon="extension" 
                                             label="Password" 
                                             :type="showPassword ? 'text' : 'password'"
                                             :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                                             @click:append="showPassword = !showPassword"
                                             counter=true
                                             :rules="[required('password'), minLength('password', 8), maxLength('password', 100)]"

                                             />   
                                        </v-flex>
                                    </v-layout>
                                    
                                       <v-layout row v-if="dontHaveAccount">
                                        <v-flex xs12>
                                             <v-text-field v-model="loginInfo.passwordConfirmation" 
                                             prepend-icon="gavel" 
                                             label="Confirm Password" 
                                             :type="showPassword ? 'text' : 'password'"
                                             :rules="[confirmation('password')]"
                                             />   

                                             
                                        </v-flex>
                                    </v-layout>        

                                      <v-layout row>
                                        <v-flex xs12 v-if="hasAccount" >
                                             <v-btn :disabled="!bla || loading" color="orange" type="submit">
                                                 <span v-if="loading" class="custom-loader"><v-icon light>cached</v-icon></span>
                                                 Signin</v-btn>    
                                             <h4> Don't have an account?
                                                 <router-link to="/Auth/signup">Signup</router-link>
                                            </h4> 
                                        </v-flex>
                                    </v-layout>

                                    <v-layout row>
                                        <v-flex xs12 v-if="dontHaveAccount">
                                             <v-btn :disabled="!bla || loading" color="info" type="submit">
                                                 <span v-if="loading" class="custom-loader"><v-icon light>cached</v-icon></span>
                                                 Signup</v-btn>    
                                            <h4> Already have an account?
                                                 <router-link to="/Auth/signin">Signin</router-link>
                                            </h4>
                                        </v-flex>
                                    </v-layout>


                                  
                                </v-form>
                             </v-container>

                            </v-card>
                </v-flex>
        </v-layout>
</template>

<script>
import validations from "~/Utils/validations";

export default  {
   data(){
        return{
           showPassword: false,
           bla:false,
           loginInfo:{
                username:'',
                email: '',
                password:'',
                passwordConfirmation:''
            },
            ...validations
        
        }
    },
  watch: {
        bla(newValue, oldValue){
          
            console.log(`old value inside WATCH ${oldValue}, plus new value ${newValue}`);
        }

 },
    props: ["loading", "submitForm", "buttonText", "hasName", "hasAccount", "dontHaveAccount"],
    

}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>