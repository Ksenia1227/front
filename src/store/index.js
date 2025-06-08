import { createStore } from 'vuex'
import auth from '@/store/auth'
import user from '@/store/user'
import recipe from '@/store/recipe'
import addRecipe from '@/store/addRecipe'
import favourite from '@/store/favourite'
import recipeById from '@/store/recipeById'
import editingRecipe from './editingRecipe'
import moderator from './moderator'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: auth,
    user: user,
    recipe: recipe,
    addRecipe: addRecipe,
    favourite: favourite,
    recipeById:recipeById,
    editingRecipe: editingRecipe,
    moderator:moderator
  }
})
