<template>
    <Post v-if="getCurrentUser" :postId="postId"/>
    
</template>

<script>
import Vue from 'vue';
import {mapGetters} from 'vuex'
import Post from '~/components/Posts/Post.vue';
export default {
    computed:{
       ...mapGetters(["getCurrentUser"]),
        postId(){
            return this.$route.params.postId
        }
        
    },
    components:{
        Post
    }


}
</script>