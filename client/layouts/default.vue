<template>
  <v-app style="background: #E3E3EE">
    <tool-bar />
 
      <v-container class="mt-4">
        <transition name="fade">
          <nuxt :key="componentKey" />
        </transition>
        <!-- AuthSnackbar -->
        <v-snackbar v-if="user" color="success"  v-model="authSnackbar" :timeout="1000"  bottom left>
          <v-icon class="mr-3">check_circle</v-icon>
            <h3>{{user.email}} You are now signed in</h3>
            <v-btn dark flat  @click="authSnackbar=false">close</v-btn>
        </v-snackbar>

        <v-snackbar v-if="authError" color="info"  v-model="authErrorSnackbar" :timeout="5000"  bottom left>
          <v-icon class="mr-3">cancel</v-icon>
            <h3>{{authError.message}}</h3>
            <v-btn dark flat to="/auth/signin" >Signin</v-btn>
        </v-snackbar>

      </v-container>
 
  </v-app>

</template>

<script>
import ToolBar from '~/components/Toolbar.vue';
import NavDrawer from '~/components/NavDrawer.vue';
import {mapGetters} from 'vuex';
export default {
   data(){
            return{
                  componentKey: 0,
                  authSnackbar: false,
                  authErrorSnackbar: false
            }
  },
  computed:{
     ...mapGetters(["authError", "user"])

    //   isUserLoggedIn(){
    //       return !!this.$store.state.user
    //   }
    },
    watch:{
            user(newValue, oldValue){
                    if(newValue){
                        this.$router.push('/auth/profile')
                         this.authSnackbar = true
                    }
            },
            authError(newValue, oldValue){
              //if auth error is not null, we shoud show auth error snackbar
              if(newValue){
                this.authErrorSnackbar = true
                // this.$router.push('/')
                 
              }
            }
    },
    methods:{
    forceRerender() {
      this.componentKey += 1;
    }
    },
    
  

 // middleware:'isAuth',
// created(){
//    console.log('is that working??')
//         this.$store.dispatch('getCurrentUser')
// },
    components: {
      ToolBar,
      NavDrawer

    },
    transition: 'page'
}
</script>
<style>


html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0 auto;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.fade-enter-active,
.fade-leave-active {
    transition-property: all;
    transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-25px)
 
}


.button--grey:hover {
  color: #fff;
  background-color: #35495e;

}
</style>