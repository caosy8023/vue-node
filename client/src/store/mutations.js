import {
    ADD_COUNT,
    REMOVE_COUNT,
    SHOPCAR_LIST
} from './mutation-types'
import axios from 'axios'
export default {
    [ADD_COUNT](state,id){
        state.car.forEach((item,index) => {
            if(item.id == id){
                item.count++
                axios({
                    method:'post',
                    url:'/api/addShopcar',
                    data:{
                        id:id,
                        name:item.name,
                        address:item.address,
                        price:item.price,
                        count:item.count,
                        allPrice:item.count * item.price
                    }
                }).then(res => {
                    
                }).catch(err => {
        
                })
            }
            item.allPrice = item.count * item.price
        })
        localStorage.setItem('car',JSON.stringify(state.car))
    },
    [REMOVE_COUNT](state,id){
        state.car.forEach((item,index) => {
            if(item.count <= 0){
                return
            }
            if(item.id == id){
                item.count--
                axios({
                    method:'post',
                    url:'/api/addShopcar',
                    data:{
                        id:id,
                        name:item.name,
                        address:item.address,
                        price:item.price,
                        count:item.count,
                        allPrice:item.count * item.price
                    }
                }).then(res => {
                    
                }).catch(err => {
                    console.log(err)
                })
            }
            item.allPrice = item.count * item.price
        })
        localStorage.setItem('car',JSON.stringify(state.car))
    },
    [SHOPCAR_LIST](state,userId){
        axios({
            method:'get',
            url:'/api/shopcarList',
            params:{
                userId:userId
            }
        }).then(res => {
            state.car = res.data.msg
            console.log(state.car)
        }).catch(err => {
        
        })
        localStorage.setItem('car',JSON.stringify(state.car))
    }
}