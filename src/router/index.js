import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetail from '../views/MovieDetail.vue'
import TVDetail from '../views/TvDetail.vue'
import PersonDetail from '../views/PersonDetail.vue'
import MovieDetailCast from '../views/MovieDetailCast.vue'
import SearchResults from '../views/SearchResults.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/movie/:id',
    name: 'Movie Detail',
    component: MovieDetail,
  },
  {
    path: '/movie/:id/cast',
    name: 'Movie Detail Cast',
    component: MovieDetailCast,
  },
  {
    path: '/tv/:id',
    name: 'TV Detail',
    component: TVDetail,
  },
  {
    path: '/person/:id',
    name: 'Person Detail',
    component: PersonDetail,
  },
  {
    path: '/search/:id',
    name: 'Search Results',
    component: SearchResults,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
