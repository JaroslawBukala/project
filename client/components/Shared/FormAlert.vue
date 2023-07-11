<template>
<v-alert type="error" :value="error" transition="scale-transition" dismissible>

    <h3>{{error.message}}</h3>
</v-alert>

</template>


<script>
import {mapGetters} from 'vuex';
export default {
computed:{
        ...mapGetters(["error"])
},
  props: ['message']
}
</script>