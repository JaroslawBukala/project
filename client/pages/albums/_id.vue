<template>
    <div>
        <h1>Results for {{$route.params.id}}</h1>
        
        <div v-if='albumExists'>
            <div v-for="(album, index) in albums">
            <Card
            :title="album.collectionCensoredName"
            :image="album.artworkUrl100"
            :artistName="album.artistName"
            :url="album.artistViewUrl"
            :color="picker(index)"
            />
            </div>
        </div>
        <div v-else>
                <h1>Could not find album</h1>
        </div>
    </div>
</template>

<script>
import Card from '~/components/Card.vue';
export default {
data () {
            return {
                albums: this.$store.state.albums
            }
        }, 
middleware: 'search',

methods: {
    picker(index){
       return index % 2 == 0 ? 'red':'blue'
    }
},
computed: {
    albumExists(){
        return this.$store.state.albums.length>0;
    }
},
components: {
    Card
}
}
</script>

