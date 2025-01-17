import instance from '@/middlewares'
import router from '@/router'



export default {
    name: 'recipeById',

    state: () => ({
        recipes: [],
        ingredients: [],
        favourite: null,
        user: null,
        res: null
    }),
    getters: {
    },
    mutations: {
        setRecipes(state, recipes) {
            state.recipes = recipes
        },
        setIngredients(state, ingredients) {
            state.ingredients = ingredients
        },
        setFavourites(state, favourite) {
            state.favourite = favourite
        },
        // setUser(state, user) {
        //     state.user = user
        // },
        setSrav(state, res) {
            state.res = res
        },
    },
    actions: {
        async getRecipesById({ commit }, id) {
            try {
                const recipes = await instance.get(`/api/recipe/recipe/${id}`)
                if (recipes.data) {
                    commit('setRecipes', recipes.data)                    
                }
            } catch (error) {
                console.error("Ошибка при загрузке рецептов:", error)
            }
        },
        async getIngredientById({ commit }, id) {
            try {
                const ingredients = await instance.get(`/api/ingredient/ingredients/${id}`)
                console.log(ingredients.data)
                if (ingredients.data) { 
                    ingredients.data.sort((a, b) => a.id - b.id);
                    commit('setIngredients', ingredients.data); 
                } 
            } catch (error) {
                console.error("Ошибка при загрузке ингредиентов:", error)
            }
        },
        async getFavouriteByUId({ commit }, id) {
            try {
                const favourite = await instance.get(`/api/favourites/favouriteById/${id}`)
                if (favourite.data) {
                    commit('setFavourites', true)
                } else {
                    commit('setFavourites', false)
                }
            } catch (error) {
                console.error("Ошибка при загрузке избранного:", error)
            }
        },
        async addFavouriteByUId(_, id_recipe) {
            try {
                await instance.post(`/api/favourites/favourites`, {
                    id_recipe
                })
            } catch (error) {
                console.error("Ошибка при загрузке избранного:", error)
            }
        },
        async deleteRecipe(_, id) {
            try {
                console.log(id)
                const favourite = await instance.get(`/api/favourites/favouriteById/${id}`)
                console.log(favourite)
                if(favourite){
                await instance.delete(`/api/favourites/favourites/${id}`)
                }
                const response = await instance.delete(`/api/recipe/recipes/${id}`)
                if (response.status == 200) {
                    window.alert('Вы успешно удалили рецепт')
                    router.push('/main')
                }
            } catch (error) {
                console.error("Ошибка при удалении рецепта:", error)
            }
        },
        // async getUserByUid({ commit }) {
        //      const user = await instance.get('/api/user/user')
        //     if (user){ commit('setUser', user.data)
        //     }
        //     return
        // },
        async sravnenie({ commit, state }){
        const userId =localStorage.getItem('uid')
          if ( userId === state.recipes.uid){
            commit('setSrav', true)
          }else{
            console.log("false")
            commit('setSrav', false)
          }
        }

    },
    namespaced: true
}
