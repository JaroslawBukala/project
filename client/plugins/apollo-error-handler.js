// import { onError } from "apollo-link-error";

// export default ({ graphQLErrors, networkError, operation, forward }, nuxtContext) => {
//     console.log('Global error handler')
//       console.log(graphQLErrors, networkError, operation, forward)
    
//          if (networkError) {
//             console.log("[networkError]", networkError);
//           }
      
//           if (graphQLErrors) {
//             for (let err of graphQLErrors) {
//               console.dir(err);
    
//             }
//           }
//     }







//   console.log('Global error handler')
//   console.log(graphQLErrors, networkError, operation, forward)

//      if (networkError) {
//         console.log("[networkError]", networkError);
//       }
  
//       if (graphQLErrors) {
//         for (let err of graphQLErrors) {
//           console.dir(err);

//         }
//       }
// }

// import ApolloClient from 'apollo-boost';

// const client = new ApolloClient({
//   uri: `http://localhost:4000/graphql`,
//   // Apollo Boost allows you to specify a custom error link for your client
//   onError: ({ graphQLErrors, networkError, operation, forward }, {store}) => {
//     console.log(' THIS IS STORE')
//     if (graphQLErrors) {
//         for (let err of graphQLErrors) {
//           console.dir(err);
//           console.log('DOGND[OG[OGOG[OIFNHOIGFNHOIFGNHO[G')
//           if (err.name === "AuthenticationError") {
//             // set auth error in state (to show in snackbar)
//             store.commit("setAuthError", err);
//             // signout user (to clear token)
//             //store.dispatch("signoutUser");
//           }
//         }
//       }

//   if (networkError){
//     console.log('dsggsfhfghfghdghgfhgfhgf')
//     store.commit("setAuthError", networkError);
//   }

//   },
// });

// export default client




// export default ({ graphQLErrors, networkError, operation, forward }, nuxtContext) => {
//     console.log('======================Global error handler================================')
//     console.log(graphQLErrors, networkError, operation, forward)
//     if (networkError) {
//       store.commit("setAuthError", err);
//        console.log("[networkError]", networkError);
//      }
 
//      if (graphQLErrors) {
//        for (let err of graphQLErrors) {
//          console.dir(err);
//          if (err.name === "AuthenticationError") {
//            // set auth error in state (to show in snackbar)
//            store.commit("setAuthError", err);
//            // signout user (to clear token)
//            //store.dispatch("signoutUser");
//          }
//        }
//      }


//   }


  // import { ApolloClient } from 'apollo-client';
// import {createHttpLink} from 'apollo-link-http';
//import { onError } from 'apollo-link-error';
// import { InMemoryCache } from 'apollo-cache-inmemory';



// const requestLink = createHttpLink({
//     uri: `http://localhost:4000/graphql`,

// })
//   const errorLink = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors) {
//         for (let err of graphQLErrors) {
//           console.dir(err);
//           if (err.name === "AuthenticationError") {
//             // set auth error in state (to show in snackbar)
//             store.commit("setAuthError", err);
//             // signout user (to clear token)
//             //store.dispatch("signoutUser");
//           }
//         }
//       }

//   if (networkError){
//     store.commit("setAuthError", networkError);
//   }
//   })
//   const link = errorLink.concat(requestLink);
//   const cache = new InMemoryCache();
//    export default new ApolloClient({
//       link,
//       cache
//   })





// export default (ctx, inject) => {
//   const catchPlugin = function (func) {
//       return async function (args) {
//           try {
//               await func(args)
//           } catch (e) {
//               return console.error(e)
//           }
//       }
//   };
//   ctx.$catch = catchPlugin;
//   inject('catch', catchPlugin);
// }

// import { onError } from 'apollo-link-error'

// export default (ctx, inject) => {
//   const errorLink = onError(({ graphQLErrors, networkError }) => {
//     console.log('======================Global error handler================================')
//     console.log(graphQLErrors, networkError, operation, forward)
//     if (networkError) {
//       store.commit("setAuthError", networkError);
//        console.log("[networkError]", networkError);
//      }
 
//      if (graphQLErrors) {
//        for (let err of graphQLErrors) {
//          console.dir(err);
//          if (err.name === "AuthenticationError") {
//            // set auth error in state (to show in snackbar)
//            store.commit("setAuthError", err);
//            // signout user (to clear token)
//            //store.dispatch("signoutUser");
//          }
//        }
//      }
//      return {
//       link: errorLink,
  
//       // required
//       httpEndpoint: `http://localhost:4000/graphql`,
  
//       httpLinkOptions: {
//         credentials: 'same-origin'
//       }
//     };
//   })
//   ctx.$catch = errorLink;
//   inject('catch', errorLink);
// }



// import { onError } from "apollo-link-error";

// export default {
   
//        onError({ graphQLErrors, networkError }, {store}) {
//            console.log(' THIS IS STORE')
//             if (graphQLErrors) {
//                 for (let err of graphQLErrors) {
//                   console.dir(err);
//                   if (err.name === "AuthenticationError") {
//                     // set auth error in state (to show in snackbar)
//                     store.commit("setAuthError", err);
//                     // signout user (to clear token)
//                     //store.dispatch("signoutUser");
//                   }
//                 }
//               }
        
//           if (networkError){
//             store.commit("setAuthError", networkError);
//           }
        
     
//         }
//   }