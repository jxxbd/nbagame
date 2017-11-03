import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Trace from '@/components/trace'
import Game from '@/components/game'
import TeamDetail from '@/components/team-detail'
import News from '@/components/news'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/trace',
      name: 'Trace',
      component: Trace
    },
    {
    	path: '/game',
    	name: 'Game',
    	component: Game
    },
    {
    	path: '/team_detail',
    	name: 'team_detail',
    	component: TeamDetail
    },
    {
    	path: '/news',
    	name: 'news',
    	component: News
    },
    {
    	path: '/',
    	redirect: '/home'
    }
  ]
})
