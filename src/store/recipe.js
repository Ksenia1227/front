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
           async getRecipes({ commit }) {
            const recipes = await instance.get('/api/recipe/recipes')
            console.log(recipes.data)
            recipes.data.reverse()
            console.log(recipes.data)
            if (recipes) return commit('setRecipes', recipes.data)
            return
        },
    },
    namespaced: true
}
