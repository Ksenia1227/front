import { createRouter, createWebHistory } from 'vue-router'
import RegistrationView from '../views/RegistrationView.vue'
import AboutView from '../views/MainView.vue'
import Login from '../views/Login.vue'
import UserPage from '../views/User.vue'
import AddRecipe from '../views/AddRecipe.vue'
import Favourite from '../views/FavouriteView.vue'
import RecipeById from '../views/RecipeById.vue'
import EditingRecipe from '../views/EditingRecipe.vue'
import instance from '@/middlewares'

const routes = [
  {
    path: '/registration',
    name: 'registrationPage',
    component: RegistrationView
  },
  {
    path: '/main',
    name: 'mainPage',
    component: AboutView,
    meta: { auth: true }
  },
  {
    path: '/',
    name: 'loginPage',
    component: Login
  },
  {
    path: '/userPage',
    name: 'userPage',
    component: UserPage
  },
  {
    path: '/addRecipe',
    name: 'addRecipePage',
    component: AddRecipe
  },
  {
    path: '/favourite',
    name: 'favouritePage',
    component: Favourite
  },
  {
    path: '/recipeById/:id',
    name: 'recipeById',
    component: RecipeById
  },
  {
    path: '/editingRecipe/:id',
    name: 'editingRecipe',
    component: EditingRecipe
  },
 ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(async (to, from, next) => {
  try {
    const requireAuth = to.matched.some(record => record?.meta.auth)
    if (requireAuth) {
      const response = await instance.get('/api/user/user')
      console.log(response.status)
      if (response.status == 200 ) {
        return next()
      } else if (response.status == 401 ) {
        return next('/')
      }
    }
    return next()
  } catch (error) {
    return next('/')
  }
})

export default router
