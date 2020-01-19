// import {
//     ADD_COUNT,
//     SHOPCAR_LIST
// } from './mutation-types'
export default{
    async add({
        commit,
        state
    },id){
        await commit('ADD_COUNT',id)
    },
    SHOPCAR_LIST({
        commit,
        state
    },userId){
        commit('SHOPCAR_LIST',userId)
    }
}