import instance from '@/middlewares'
import router from '@/router'


export default {
    name: 'editingRecipe',
    state: () => ({
        ingredients: null,
        recipes: null
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
    },
    actions: {
        async getRecipesById({ commit, }, id) {
            try {
                const recipes = await instance.get(`/api/recipe/recipe/${id}`)
                if (recipes.data) {
                    commit('setRecipes', recipes.data)
                }
                console.log(recipes.data)
            } catch (error) {
                console.error("Ошибка при загрузке рецептов:", error)
            }
        },
        async getIngredientById({ commit }, id) {
            try {
                const ingredients = await instance.get(`/api/ingredient/ingredients/${id}`)
                if (ingredients.data) {
                    ingredients.data.sort((a, b) => a.id - b.id);
                    commit('setIngredients', ingredients.data);
                }
            } catch (error) {
                console.error("Ошибка при загрузке ингредиентов:", error)
            }
        },
        async deleteIngredientById(_, id) {
            try {
                await instance.delete(`/api/ingredient/ingredient/${id}`)
            } catch (error) {
                console.error("Ошибка удалении ингредиента", error)
            }
        },
        async updateRecipeByUid(_, { name, description, number_portion, ingredients, photo, recipeId, status }) {

            const role = localStorage.getItem('role')
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('number_portion', number_portion);
            formData.append('ingredients', ingredients);
            formData.append('recipeId', recipeId);
            formData.append('photo', photo);
            formData.append('status', status);
            try {
                let response;

                if (role == "user") {
                    response = await instance.put(`/api/recipe/upDateRecipes`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
                } else {
                    response = await instance.put(`/api/recipe/upDateRecipesById`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
                }
                if (response.status === 200) {
                    window.alert('Вы успешно обновили рецепт')
                    router.go(-1)
                } else {
                    console.log('Error:', response.statusText);
                    window.alert('Error:', response.statusText)
                }
            } catch (error) {
                console.error('Error while update recipe:', error);
            }
        },

    },
    namespaced: true
}
