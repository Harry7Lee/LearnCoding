import Vue from 'vue'
import Vuex from 'Vuex'
import db from "@/firebase/init";
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        products: [
            { name: 'Banana Skin', price: 20 }
        ]
    },
    getters: {
        saleProducts: state => {
            var saleProducts = state.products.map(product => {
                return {
                    name: product.name + "discount",
                    price: product.price * 0.75 + "75% OFF"
                }
            })
            return saleProducts;
        }
    },
    mutations: {
        reductPrcie: state => {
            state.products.forEach(product => {
                product.price -= 1
            })
        }
    }
})