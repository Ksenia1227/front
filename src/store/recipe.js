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
            recipes.data.reverse()
            if (recipes) return commit('setRecipes', recipes.data)
            return
        },
        async getRecipeById(commit, id) {
            const recipe = await instance.get(`/api/recipe/recipe/${id}`)
            console.log(recipe)
            if (recipe) return commit('setRecipes', recipe.data)
            return
        },

    },
    namespaced: true
}
