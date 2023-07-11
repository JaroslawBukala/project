<template>
        <v-container text-xs-center>
    <v-flex xs12>
      <v-carousel v-bind="{ 'cycle': true }" interval="3000">
        <v-carousel-item 
          v-for="book in books"
         
        
          :key="book.id" v-bind:src="image">
          <h1 id="carousel__title">{{book.name}} {{book.genre}} written by {{book.createdBy.name}}</h1>
        </v-carousel-item>
        
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    data(){
      return{
          image: "https://cloudinary-res.cloudinary.com/image/upload/dpr_1,f_auto,q_auto,w_1920/b_rgb:000000/v1557415924/website/hero/dam_dark_days_over-LG.jpg"
      }
    },
    // created() {
    // this.$store.subscribe((mutation, state) => {
    //   if (mutation.type === 'getBooks') {
    //     console.log(`Updating to ${state.books.books}`);

    //     this.books = state.books.books
          
        
    //   }
    // })
    // },
  computed: {
               ...mapGetters(["books"])
  //   books: {
  //            get () {
  //                 return this.$store.state.books.getBooks
  //                    },
  //            set (newValue) {
  //                       console.log("new value insode computed"+newValue)
  //               //  this.$store.dispatch('getBooks', newValue)
  //                   }
  // }
  },
  
  
  // methods: {
  //     updateBooks(){
  //       this.books = this.$store.state.books.books
  //     }
    // handleGetBooks(){
    //   // reach out to Vuex store, fire action that gets books
    //   this.$store.dispatch('getBooks')
    // }
}
// watch: {
//         books(oldValue, newValue){
          
//             console.log(`old value inside WATCH ${oldValue}, plus new value ${newValue}`);
           
//         },
//         updateBooks(){
//             this.books = this.$store.state.books.books
//         }

//  }

</script>



<style>
#carousel__title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
}

</style>
