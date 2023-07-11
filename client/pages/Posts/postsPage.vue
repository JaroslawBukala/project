<template>
    <div v-if="getCurrentUser">
    <postsPage/>
    </div>
    <div v-else>
        <h1>You need to log back in</h1>
    </div>
</template>

<script>
// import Vue from 'vue';
import {mapGetters} from "vuex";
import postsPage from '~/components/Posts/PostsPage.vue';
export default {
  
    computed: {
            ...mapGetters(["getCurrentUser"])
    },
    components:{
            postsPage
    },
     props: false
   

}
</script>