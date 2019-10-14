import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './action'
import mutations from './mutations'
import axios from 'axios'
Vue.use(Vuex)
// let data = []

// const data = [
//     {
//         id:1,
//         name:'小米1',
//         address:'西青区',
//         price:3299,
//         count:0,
//         allPrice:0,
//         },
//         {
//         id:2,
//         name:'小米2',
//         address:'西青区',
//         price:3299,
//         count:0,
//         allPrice:0,
//         },
//         {
//         id:3,
//         name:'小米3',
//         address:'西青区',
//         price:3299,
//         count:0,
//         allPrice:0,
//         },
//         {
//         id:4,
//         name:'小米4',
//         address:'西青区',
//         price:3299,
//         count:0,
//         allPrice:0,
//         }
// ]
// const car = JSON.parse(localStorage.getItem('car')) || data 
const state = {
    car:[]
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})