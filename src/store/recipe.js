import instance from '@/middlewares'


export default {
    name: 'mainPage',
    state: () => ({
        recipes: null,
    }),
    getters: {
    },
    mutations: {
        setRecipes(state, recipes) {
            state.recipes = recipes
        },
    },
    actions: {
           async getApprovedRecipes({ commit }) {
            const recipes = await instance.get('/api/recipe/approvedRecipes')
            recipes.data.reverse()
            if (recipes) return commit('setRecipes', recipes.data)
            return
        },
    },
    namespaced: true
}
