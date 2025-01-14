import instance from '@/middlewares'


export default {
    name: 'userPage',
    state: () => ({
        user: null,
        recipes: []
    }),
    getters: {
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setRecipes(state, recipes) {
            state.recipes = recipes
          },
      
    },
    actions: {
        async getUserByUid({ commit }) {
            const user = await instance.get('/api/user/user')
            if (user) return commit('setUser', user.data)
            console.log(user);
            return
        },
        async getRecipesByUId({ commit }) {
            try {
              const recipes = await instance.get(`/api/recipe/recipesByUid`)
              recipes.data.reverse()
              if (recipes.data) {
                commit('setRecipes', recipes.data) 
              }
            } catch (error) {
              console.error("Ошибка при загрузке рецептов:", error)
            }
          },
     

    },
    namespaced: true
}
