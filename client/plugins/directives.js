import Vue from 'vue'


  Vue.directive('focus', {
    // When the bound element is inserted into the DOM...
    inserted: function (el) {
      // Focus the element
      el.focus()
    }
  })


  // Vue.directive('refreshStore',{
  //   bind(el, binding, vnode){
  //       if(binding.value=='submit'){
  //         this.$store.dispatch('getBooks')
  //       }
  //   }
  // })