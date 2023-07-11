import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import getCurrentUserGql from '../apollo/actions/getCurrentUser.gql'
import signinUser from '../apollo/mutations/signinUser.gql'
import signupUser from '../apollo/mutations/signupUser.gql'
import getBookGql from '../apollo/actions/getBook.gql'
import getBooksGql from '../apollo/actions/getBooks.gql'
import getAuthorsGql from '../apollo/actions/getAuthors.gql'
import addBookAndAuthorGql from '~/apollo/mutations/addBookAndAuthor.gql'
import addAuthorGql from '../apollo/mutations/addAuthor.gql'
import getPostsGql from '~/apollo/actions/getPosts.gql'
import addPostMutationGql from '../apollo/mutations/addPostMutation.gql'


const STORAGE_KEY = 'vuex'

Vue.use(Vuex)

let vuexLocalStorage = null;

if (process.browser) {
    vuexLocalStorage = new VuexPersist({
      key: STORAGE_KEY, // The key to store the state on in the storage provider.
      
      storage: window.localStorage, // or window.sessionStorage or localForage

    })
   
}



const createStore = () => {

  return new Vuex.Store({
    state: {
      getCurrentUser: null,
      user: null,
      albums: [],
      books: [],
      book: Object,
      authors: [],
      posts: [],
      loading:false,
      error: null,
      authError: null


     // getItem: vuexLocalStorage.getItem(STORAGE_KEY.book.getBook.name)
  
    },
    // plugins: [createPersistedState()],
    // plugins: [
    //   createPersistedState({
    //     storage: {
    //       getItem: key => Cookies.get(key),
    //       // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
    //       setItem: (key, value) =>
    //         Cookies.set(key, value, { expires: 3, secure: true }),
    //       removeItem: key => Cookies.remove(key)
    //     }
    //   })
    // ],
    mutations: {
      getCurrentUser(state, payload){
          state.getCurrentUser = payload
      },

      signupUser(state, payload){
        state.user = payload
    },
      signinUser(state, payload){
          state.user = payload
      },
      setError(state, payload){
          state.error = payload
      },
      setAuthError(state, payload){
          state.authError = payload
      },
      clearError(state){
          state.error = null
      },
      clearUser(state){
        state.getCurrentUser=null
        state.user = null
    },
      setPosts(state, payload){
            state.posts = payload
      },
      setBook(state, payload, localStorage){
      // localStorage.setItem("book", payload);
          state.book = payload
      },
      setBooks (state, payload){
        //console.log('YEAH IT WORKS'+state.books)
       // Object.assign(state.books, payload);
            state.books = payload;
      },
      setAuthors (state, payload){
        state.authors = payload;
       },
       add(state, payload){
         state.albums = payload;
       },
       setLoading(state, payload){
         state.loading = payload;
       }
     
    },
    actions: {

      signupUser({commit}, payload){
        commit("clearError");
   
      commit("setLoading", true);
        this.app.apolloProvider.defaultClient.mutate({
            mutation: signupUser,
            variables: payload
        }).then(({data}) =>{
         console.log(data.signupUser.token+'  THIS IS THE DATA I WAS LOOKING FOR COMING BACK FROM SERVER')
         this.$apolloHelpers.onLogin(data.signupUser.token)
         //commit('signupUser', data.signupUser.token)
         commit('signinUser', data.signupUser.token)
         //commit('getCurrentUser', data.getCurrentUser)
         
         commit("setLoading", false);
        
        // this.$apolloHelpers.localStorage.setItem(data.signupUser.token)
         //localStorage.setItem("token", data.signupUser.token);
         // to make sure created method is run in main.js (we run getCurrentUser), reload the page
        // this.$router.go();
          //commit('setLoading', false)
         // commit('signupUser', data.signupUser)
         // this.$apolloHelpers.storage.setItem(data.signupUser.token)
         // localStorage.getItem('data')
           // commit('signupUser', data.signupUser)
           this.$router.push('/auth/profile')
        
        })
        .catch(err =>{
          
          commit("setLoading", false);
          commit("setError", err);
          console.error(err);
      })
    },
    async signinUser({commit}, payload){
      commit('clearError');
      commit('setLoading', true)
        this.$cookiz.set('apollo-token', '')

        await  this.app.apolloProvider.defaultClient.mutate({
              mutation: signinUser,
              variables: payload
          }).then(({data}) =>{
            commit('setLoading', false)
            //Cookies.set('auth.strategy', 'local') 
           //Cookies.set('auth._token.local', data.signinUser.token) 
           //this.$auth.setToken('local', data.signinUser.token)

            this.$apolloHelpers.onLogin(data.signinUser.token)
           // this.$router.go()
             commit('signinUser', data.signinUser.token)
              console.log(data.signinUser.token+' data plus sign user')
          })
          .catch(err =>{
            commit('setLoading', false)
            commit('setError', err)
            console.log(err.message + ' supposed to be error message')
            console.log(this.$apolloHelpers.err+ ' TESTING GETTING ERROR FROM HELPERS')
        })
      },

      getCurrentUser({commit}){
      //  commit("setLoading", true);
        
        this.app.apolloProvider.defaultClient.query({
        
            query: getCurrentUserGql
        }).then(({data}) => {
          commit('getCurrentUser', data.getCurrentUser)
           console.log(data.getCurrentUser)
         //  commit("setLoading", false)
    
             })
             .catch(err => {
              commit('setError', err)
              //commit("setAuthError", err);
           
             console.dir(err)
               this.$cookiz.set('apollo-token', '')
               commit("setLoading", false)
        
             
             });
      },
      
    async  signoutUser({commit}){
          //clear user in state
          commit('clearUser')
           //remove token in local storage and cookies
          //  this.$cookiz.set('apollo-token', '')
          this.$apolloHelpers.onLogout()
         localStorage.setItem("apollo-token", "");
      await this.app.apolloProvider.defaultClient.resetStore()
 
      this.$router.push('/')
      
         
          //end session

      },

      getPosts ({commit}) {
             commit("setLoading", true);
            //console.log(localStorage.getItem(STORAGE_KEY || '[]')+" local storage")
          this.app.apolloProvider.defaultClient.query({
                query: getPostsGql
            }).then(({data}) =>{
              // Get data from actions to state via mutations
              // console.log(data.getPosts+'SEARCHING FOR LIKES')
              commit('setPosts', data.getPosts)
              commit("setLoading", false)
      
              //commit passes data from actions to mutation function
    
            })
            .catch(err =>{
              //  commit("setLoading", false)
                console.log(err)
                
            })
          },
     
       getBook ({commit}, payload) {
     
          //console.log(localStorage.getItem(STORAGE_KEY || '[]')+" local storage")
            this.app.apolloProvider.defaultClient.mutate({
              mutation: getBookGql,
              variables: payload
          }).then(({data}) =>{
            // Get data from actions to state via mutations
             // console.log(data+'getting backt THE NEW DATA')
            commit('setBook', data)

    
            //commit passes data from actions to mutation function
  
          })
          .catch(err =>{
              console.log(err)
          })
        },

     getBooks ({commit}) {
      commit("setLoading", true);
      this.app.apolloProvider.defaultClient.query({
            query: getBooksGql
        }).then(({data}) =>{
          // Get data from actions to state via mutations
           // console.log(data+'getting backt THE NEW DATA')
          commit('setBooks', data.getBooks)
         commit("setLoading", false);

          //commit passes data from actions to mutation function

        })
        .catch(err =>{
            console.log(err)
        })
      },

      getAuthors ({commit}) {
        commit("setLoading", true);
        this.app.apolloProvider.defaultClient.query({
              query: getAuthorsGql
          }).then(({data}) =>{
            // Get data from actions to state via mutations
            commit('setAuthors', data)
            commit("setLoading", false);
            //commit passes data from actions to mutation function
          })
          .catch(err =>{
              console.log(err)
          })
        },

        addAuthorMutation({commit}, payload){
          this.app.apolloProvider.defaultClient.mutate({
            mutation: addAuthorGql,
            variables: payload


          })

          .then(({ data }) => {
         console.log("this is the data now" + data)
          })
          .catch(err => {
            console.log(err);
          });
        },


      addBookMutation({commit}, payload){
        this.app.apolloProvider.defaultClient.mutate({
          mutation: addBookAndAuthorGql,
          variables: payload
        })
        .then(({ data }) => {

        })
        .catch(err => {
          console.log(err);
        });
      },

      addPostMutation({commit}, payload){
        // console.log(payload);
        commit("setLoading", true);
        this.app.apolloProvider.defaultClient.mutate({
          mutation: addPostMutationGql,
          variables: payload,
          //store can be repalced with cache
          update: (cache, {data: { addPost } })=>{
             console.log(cache, addPost)
              const data = cache.readQuery({query: getPostsGql})
            //  // console.log(data+'DATA.GETPOSTS')
            //create updated data
                data.getPosts.unshift(addPost);
                //write updated data to that query
             // console.log(data)
             // console.log('NEW UPDATED DATA ABOVE')
              cache.writeQuery({
                query: getPostsGql,
                data
              })
          },
          optimisticResponse:{
            __typename: 'Mutation',
            addPost:{
              __typename: 'Post',
              _id:-1,
              ...payload
            }
          },
       //refetch queries after performing mutations
        //  refetchQueries: [
        //       {
        //         query: getPostsGql
        //       }
        //   ]
        })
        .then(({ data }) => {
          //commit("getPosts");
          commit("setLoading", false);
            //console.log('adding a post process' + data.addPost)
            this.$router.push('/posts/posts')

        })
        .catch(err => {
          console.log(err);
        });
      }
      
    },
    getters: {
      getCurrentUser: state => state.getCurrentUser,
      user: state => state.user,
      loading: state => state.loading,
      posts: state => state.posts,
      books: state => state.books,
     authors: state => state.authors,
      book: state => state.book,
      error: state =>state.error,
      authError: state =>state.authError
    }
     //plugins: process.browser ? [vuexLocalStorage.plugin] : []
})
}


export default createStore