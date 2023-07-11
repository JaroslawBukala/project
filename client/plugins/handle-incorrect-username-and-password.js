import Vue from 'vue'
import FormAlert from '../components/Shared/FormAlert'

export default ({error}, nuxtContext) => {
   
    Vue.component('areteLOL', FormAlert)
}