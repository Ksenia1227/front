import instance from '@/middlewares'
export default {
    name: 'moderatorPage',
    state: () => ({
        recipes: [],
        rejectedRecipes: []
    }),
    getters: {
    },
    mutations: {
        setNewRecipes(state, recipes) {
            state.recipes = recipes
          },
         setRejectedRecipes(state, rejectedRecipes) {
            state.rejectedRecipes = rejectedRecipes
          },
      
    },
    actions: {
        async getPendingRecipes({ commit }) {
            try {
              const recipes = await instance.get(`/api/recipe/pendingRecipes`)
              recipes.data.reverse()
              if (recipes.data) {
                commit('setNewRecipes', recipes.data) 
              }
            } catch (error) {
              console.error("Ошибка при загрузке рецептов:", error)
            }
          },
           async getRejectedRecipes({ commit }) {
            try {
              const recipes = await instance.get(`/api/recipe/rejectedRecipes`)
              recipes.data.reverse()
              if (recipes.data) {
                commit('setRejectedRecipes', recipes.data) 
              }
            } catch (error) {
              console.error("Ошибка при загрузке рецептов:", error)
            }
          },

    },
    namespaced: true
}
