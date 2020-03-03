import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
    //存放所有数据
    state: {
        goodslist: [],
        totalPrice:0
    },
    //改变state的唯一方式
    mutations: {
        changeName(state, arr) {
            state.goodslist = arr
        },
        totalPrices(state, arr) {
            state.totalPrice = arr
        },

    },
})
//暴露store
export default store