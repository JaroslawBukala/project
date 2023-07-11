<template>
    <div>
        <h1>Results for {{$route.params.id}}</h1>
        
        <div v-if="getBook">
   
  
            <bookCard focus
            :name="getBook.name"
            :genre="getBook.genre"
            :authorName="getBook.createdBy.name"
            :authorAge="getBook.createdBy.age"
            :color="picker(getBook.id)"
            />
        </div>
  
        
        <div v-else>
                <h1>{{notFound}}</h1>
        </div>
    </div>
</template>

<script>
import bookCard from '~/components/bookCard.vue';

export default {
data () {
            return {
                    bookName: '',
                   // book: Object,
                    notFound: ''
            }
        },

//middleware: 'search',
 created(){

        //   if(this.allBooks){

             this.$store.dispatch("getBook",{
                name: this.$route.params.id
                })
        //    } else {
        //        this.notFound = 'Could not find book'
        //    }
         
 },      
methods: {
    picker(index){
      //  console.log(this.$params.route.id+' in comp')
       return index % 2 == 0 ? 'red':'blue'
    }

},
computed: {
    getBook(){
       
         var book = this.$store.state.book.getBook
        
       
        this.notFound = 'Could not find book'
        return book
    }

    //  allBooks(){
    //                           var vm=this;

    //                          var  books = this.$store.state.books.getBooks
                             
    //                //     console.log(this.$params.id+'in books')
    //                         books.map(function(book){
                               
    //                             if(vm.$route.params.id===book.name){
                              
    //                                vm.book = book
    //                                console.log(vm.book.name +' console logged'+ vm.book.genre + " "+ book.createdBy.name)
    //                             }
    //                         })
    //                           return vm.book
	// }                     
},
components: {
    bookCard
}
// methods:{
//     handleGetBooks(){
//       // reach out to Vuex store, fire action that gets books
      
//       this.$store.dispatch('getBooks')
//        this.$store.dispatch('setBooks')
      
//     }
// }
}
</script>

