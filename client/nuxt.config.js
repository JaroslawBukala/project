const colors = require('vuetify/es5/util/colors').default
const Cookies = require('js-cookie')
const onError = require('apollo-link-error')



module.exports = {
  mode: 'universal',
  
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/getCurrentUser.js', '~/plugins/apollo-error-handler.js', '~/plugins/handle-incorrect-username-and-password.js', '~/plugins/directives.js', '~/plugins/uniqueId.js'],
  //css: ['~/assets/app.styl'],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxtjs-mdi-font',
    '@nuxtjs/vuetify',
    '@nuxtjs/proxy',
    '@nuxtjs/apollo',
    ['cookie-universal-nuxt', { alias: 'cookiz', parseJSON: false }],

  ],
  buildModules: [
    // Simple usage
    // '@nuxtjs/vuetify'

  ],
  apollo: {
    authenticationType: '',
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
   
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    // watchLoading: '~/plugins/apollo-watch-loading-handler.js',
    // optional
    //errorHandler: '~/plugins/apollo-error-handler.js',
    clientConfigs: {
     
      default: {
       // link: errorLink,
        // Graphpack
        httpEndpoint: `http://localhost:4000/graphql`,
        // Subscription
        wsEndpoint: 'ws://localhost:4000/graphql',
        httpLinkOptions: {
          credentials: 'same-origin'
        },
  // setup a global query loader observer (see below for example)
      watchLoading: '~/plugins/apollo-watch-loading-handler.js',
      
      // setup a global error handler (see below for example)
      // errorHandler: '~/plugins/apollo-error-handler.js',
        tokenName: '',
       
        websocketsOnly: false,
        use: {
          loader: 'gql-loader'
        }
      }
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (networkError) {
        console.log("[networkError]", networkError);
      }
  
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          console.dir(err);
          if (err.name === "AuthenticationError") {
            // set auth error in state (to show in snackbar)
            store.commit("error", err);
            console.log("[networkError]+iodfhgdipfghipfgidfpgpifghifdgd", networkError);
            // signout user (to clear token)
            store.dispatch("signoutUser");
          }
        }
      }
    }

 
  },
  axios: {
    baseURL: ''
  },
  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: 'http://localhost:4000/graphql', method: 'post', propertyName: 'token' },
  //         logout: { url: 'http://localhost:4000/graphql', method: 'post' },
  //          user: { url: 'http://localhost:4000/graphql', method: 'get', propertyName: 'user' }
  //       },
  //       tokenRequired: true,
  //       tokenType: ''
  //     }
  //   }
  // },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  /*
  ** Build configuration
  */
 
//  vuetify: {
//   customVariables: ['~/assets/app.styl']
// },
  build: {
    //vendor: ['vuetify'],
    //
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
