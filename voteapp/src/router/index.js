import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import addVote from '@/components/addVote'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/addVote',
            name: 'addVote',
            component: addVote
        },
    ]
})