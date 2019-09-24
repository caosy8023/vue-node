import {
    ADD_COUNT,
    SHOPCAR_LIST
} from './mutation-types'
export default{
    add({
        commit,
        state
    },id){
        commit('ADD_COUNT',id)
    },
    SHOPCAR_LIST({
        commit,
        state
    }){
        commit('SHOPCAR_LIST')
    }
}