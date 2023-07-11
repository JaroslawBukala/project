<template :key='componentKey'>  

        <!-- <v-container text-xs-center>
        <h1>Posts</h1>
        <v-layout row>
            <v-dialog v-model="loading" persistent fullscreen>
                <v-container fill-height>
                        <v-layout row justify-center align-center>
                            <v-flex xs12 v-if="!loading && posts.length > 0">
                             <v-card v-for="post in posts" :key="post._id"  v-bind="{cycle: true}" interval="3000">
                           </v-card>
                           </v-flex>
                    </v-layout>
                </v-container>
            </v-dialog>
        </v-layout> -->
<v-flex xs12 sm6 offset-sm3 v-if="!loading && posts.length > 0">
  <v-container text-xs-center>
    
      <v-carousel  v-bind="{ 'cycle': true }" interval="5000">
        <v-carousel-item 
        
          v-for="post in posts"  :key="post.id"   class="mx-auto" dark max-width="400"
           :src="post.imageUrl" @click.native="goToPost(post._id)">
          <v-layout row wrap>
                



            <!-- v-for="(book, index) in books"
         
          v-bind:index="index"
          v-bind:key="book.id -->
                  

<v-row align="" justify="end">


        <v-avatar color="grey darken-3">
          <v-img
          
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-avatar>

        <v-list-item-content>
          <v-list-item-title>{{post.createdBy.username}}</v-list-item-title>
        </v-list-item-content>


        <v-row
          align="center"
          justify="end"
        >
          <v-icon class="mr-1">
            mdi-heart
          </v-icon>
          <span class="subheading mr-2">{{post.likes}}</span>

          
        </v-row>


</v-row>
<v-row>
     <v-flex xs7>
    <v-card-title primary-title>
                      <div class="headline">{{post.description}}</div>
       </v-card-title>
    </v-flex>
</v-row>





</v-layout>
        </v-carousel-item>
        
      </v-carousel>

  </v-container>
</v-flex>      
 
                

</template>

<script>
 //import getPostsGql from '~/apollo/actions/getPosts.gql';
// import {gql} from 'apollo-boost';
import {mapGetters} from 'vuex';
export default {
    data(){
            return{
              //  id:null,
              componentKey: 0,

            }
  },
    created(){
       // postsMethod()
           // this.$store.dispatch("getPosts");
           
    },
    
    computed:{
      ...mapGetters(["loading", "posts", "getCurrentUser"]),
      //  postsMethod(id){
      //     return  this.$state.posts.map((post) => 
      //         post.id === id ? true : false
      //       )
      //   }, 

 
            // user(){
            //     console.log(this.$store.state.user.signinUser)
            //    return this.$store.state.user.signinUser

            // },
    },
    methods:{
        picker(index){
       return index % 2 == 0 ? 'red':'blue'
    },
    forceRerender() {
      this.componentKey += 1;
    },
    goToPost(postId){
        this.$router.push(`/posts/${postId}`)
    }

    }
}
</script>

<style scoped>

#carousel__title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
}


.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
