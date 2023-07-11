<template>



 <!-- <ApolloQuery :query="getPostsQuery">
                    <template slot-scope="{result: { loading, data, error, networkStatus }}">
                            <div v-if="loading">Loading...</div>
                            <div v-else-if="error">Error!</div>
                            <div v-else-if="!loading">Network Status: {{networkStatus}}</div>
                            <ul v-else v-for="post in data.getPosts" :key="post._id"> 
                                <li>{{post.title}}</li>
                                <li>{{post._id}}</li>
                                <li>{{post.imageUrl}}</li>
                                <li>{{post.likes}}</li>
                            </ul>
                    </template>
        </ApolloQuery> -->
    <v-container text-xs-center>
        <h1>Posts</h1>
        <v-flex xs12>
                    <v-carousel v-bind="{cycle: true}" interval="3000">
                            <v-carousel-item v-for="post in getPosts" :key="post._id" :src="post.imageUrl">
                                <h1 id="carousel__title">{{post.title}}</h1>
                            </v-carousel-item>
                    </v-carousel>
        </v-flex>
      

    </v-container>
</template>


<script>
import getPostsGql from '~/apollo/actions/getPosts.gql'
import {gql} from 'apollo-boost'

export default {
   data(){
       return{
           posts:[]
       }
   },
   
  apollo: {
    getPosts: {
    
      query: gql`
                    query {
                        
                            getPosts {
                                _id
                                title
                                imageUrl
                                description
                                categories
                                                createdBy{
                                                username
                                                email
                                                joinDate
                                                password
                                            }
                                     }
                            }`,
                             result({data, loading, networkStatus}) {
                                // console.log(networkStatus)
                                                if(!loading){
                                                    this.posts = data.getPosts
                                          }
                            },
                             error(err){
                               console.error(err, '[THERE HAS BEEN AN ERROR]');
                               console.dir(err);
                           }
                           
                    }
},
  methods: {
    start () {
         
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  },
  head: {
    title: 'Posts'
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
// {
//   getposts{
//     _id
//     title
//     imageUrl
//     description
//     categories
//                     createdBy{
//                     username
//                     email
//                     joinDate
//                     password
//                 }
// }
// }