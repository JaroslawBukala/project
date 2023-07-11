<template>
    <v-container v-if="getPost" class="mt-3" flexbox center>
      
      <!-- PostCard -->
      <v-layout row wrap>
          <v-flex xs-12>
              <v-card hover>
                  <v-card-title>
                    <h1>{{getPost.title}}</h1>
                    <v-btn large icon v-if="getCurrentUser">
                      <v-icon large color="grey">favorite</v-icon>
                    </v-btn>
                      <h3 class="ml-3 font-weight-thin">{{getPost.likes}} LIKES</h3>
                      <v-spacer></v-spacer>
                      <v-icon @click="goToPreviousPage" color="info" large>arrow_back</v-icon>
                  </v-card-title>

                  <v-tooltip right>
                      <span>Click to enlarge image</span>
    
                  <v-img @click="toggleImageDialogue" slot="activator" :src="getPost.imageUrl" id="post__image"></v-img>
                  </v-tooltip>

                    <!-- Enlarge post image -->
                  <v-dialog v-model="dialog">
                    <v-card>
                      <v-img :src="getPost.imageUrl" height="80vh"></v-img>
                    </v-card>
                  </v-dialog>

                  <v-card-text align="left">
                    <span v-for="(category, index) in getPost.categories" :key="index">
                        <v-chip class="mb-3" color="accent" text-color="white">{{category}}</v-chip>
                    </span>
                    <h3>{{getPost.description}}</h3>
                  </v-card-text>
              </v-card>
          </v-flex>
      </v-layout>

     <!-- Messages Input -->
        <div class="mt-3">
          <v-layout class="mb-3" v-if="getCurrentUser">
            <v-flex xs12>
              <v-form @submit.prevent="handleAddPostMessage">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field v-model="messageBody" clearable 
                    :append-outer-icon="messageBody && 'send'" label="Add Message" type="text" @click:append-outer="handleAddPostMessage" prepend-icon="email" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
          </v-layout>
          <!-- Messages -->
          <v-layout row wrap>
            <v-flex xs12>
              <v-list subheader two-line>
                  <v-subheader>Messages ({{getPost.messages.length}})</v-subheader> 

                  <template v-for="message in getPost.messages">
                  <v-divider :key="message._id"></v-divider>

                    <v-list-tile avatar inset :key="message.title">
                      <v-list-tile-avatar>
                        <img src="message.messageUser.avatar">
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{message.messageBody}}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>
                          {{message.messageUser.username}}
                        </v-list-tile-sub-title>
                        <span class="grey--text text--lighten-1 hidden-xs-only">{{message.messageDate}}</span>
                      </v-list-tile-content>

                      <v-list-tile-action class="hidden-xs-only">
                        <v-icon color="grey">chat_bubble</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                  </template>

              </v-list>
            </v-flex>
          </v-layout>
        </div>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import getPostGql from '~/apollo/actions/getPost.gql'
import addPostMessageGql from '~/apollo/mutations/addPostMessage.gql'


export default {
  data(){
      return{
        dialog: false,
        messageBody: ''
      }
  },
  created(){
       this.$store.dispatch('getCurrentUser')
  },
  props: ["postId"],
  apollo:{
    getPost:{
       query: getPostGql,
        variables(){
          return{
            postId: this.postId
          }
        }
    }
  },
  computed:{
    ...mapGetters(['getCurrentUser'])
  },
  methods:{
    handleAddPostMessage(){
      const variables = {
        messageBody: this.messageBody,
        userId: this.getCurrentUser._id,
        postId: this.postId
      };
      this.$apollo.mutate({
        mutation: addPostMessageGql,
        variables,
        update: (cache, {data: {addPostMessage}}) => {
          const data = cache.readQuery({
            query: getPostGql,
            variables: {postId: this.postId}
            });
            data.getPost.messages.unshift(addPostMessage);
            cache.writeQuery({
            query: getPostGql,
            variables: {postId: this.postId},
            data
            });
        }
      }).then(({data}) => {
          console.log(data.addPostMessage)
      }).catch(err => console.error(err))
    },
    goToPreviousPage(){
      this.$router.go(-1)
    },
    toggleImageDialogue(){
        if(window.innerWidth > 500){
          this.dialog = !this.dialog
        }
    }
  }
}
</script>

<style scoped>
#post__image {
  height: 400px !important
}
</style>