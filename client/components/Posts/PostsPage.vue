<template>
    <v-container fluid grid-list-xl>
            <!-- post card -->
 <v-layout row wrap v-if="infiniteScrollPosts">
     <v-flex xs12 sm6 v-for="post in infiniteScrollPosts.posts" :key="post._id">
         <v-card hover>
            <v-img @click.native="goToPost(post._id)" :src="post.imageUrl" height="30vh" lazy></v-img>

     <v-card-actions>
        <v-card-title primary>
            <div>
              <div class="headline">{{post.title}}</div>
             <span class="grey--text">{{post.likes}} likes - {{post.messages.length}} comments</span>
           </div>

          </v-card-title>
          <v-spacer></v-spacer>
              <v-icon @click="showPostCreator=!showPostCreator">{{`keyboard_arrow_${showPostCreator ? 'up' :'down'}`}}</v-icon>


         </v-card-actions>

        <v-slide-y-transition>
            <v-card-text v-show="showPostCreator" class="grey lighten-4">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img :src="post.createdBy.avatar">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title class="text--primary">{{post.createdBy.username}}</v-list-tile-title>
                        <v-list-tile-sub-title class="font-weight-thin">Added {{post.createdDate}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon ripple>
                            <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-card-text>
        </v-slide-y-transition>
    

         </v-card>
     </v-flex>
 </v-layout>

 <v-layout v-if="showMoreEnabled" column>
     <v-flex xs12>
         <v-layout justify-center row>
             <v-btn color="info" @click="showMorePosts">Fetch More</v-btn>
         </v-layout>
     </v-flex>
 </v-layout>

        <!-- <div v-for=" post in infiniteScrollPosts.posts" :key="post._id">
            <img :src="post.imageUrl" height="100px">
            <h3>{{post.title}}</h3>
        </div>
        <v-btn @click="showMorePosts" v-if="showMoreEnabled">Fetch More</v-btn> -->
    </v-container>
</template>


<script>

import INFINITE_SCROLL_POSTS from '~/apollo/actions/INFINITE_SCROLL_POSTS.gql'

const pageSize = 2;

export default {
    name: "PostsPage",
    data(){
        return{
            pageNum: 1,
            showMoreEnabled: true,
            showPostCreator: false
        }
    },
    apollo: {
            infiniteScrollPosts: {
                query: INFINITE_SCROLL_POSTS,
                variables: {
                    pageNum: 1,
                    pageSize
                }
            }
    },
    methods: {
    goToPost(postId){
        this.$router.push(`/posts/${postId}`)
    },
        showMorePosts(){
            //fetch more posts
            this.pageNum += 1;
        
            this.$apollo.queries.infiniteScrollPosts.fetchMore({
                
                variables: {
                    //pageNum already incremented by 1
                    pageNum: this.pageNum,
                    pageSize
                },
                updateQuery: (prevResult, {fetchMoreResult}) =>{
          console.log("previous result", prevResult.infiniteScrollPosts.posts);
          console.log("fetch more result", fetchMoreResult);
                    const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
                    const hasMore= fetchMoreResult.infiniteScrollPosts.hasMore;
                    this.showMoreEnabled = hasMore;

                    return {
                        infiniteScrollPosts: {
                            __typename: prevResult.infiniteScrollPosts.__typename,
                            posts:[
                                ...prevResult.infiniteScrollPosts.posts,
                                ...newPosts
                            ],
                            hasMore

                            
                        }
                    }
                }
            })
        }
    }
}
</script>