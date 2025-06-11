import instance from '@/middlewares'
import router from '@/router'


export default {
    name: 'addRecipePage',
    state: () => ({
        ingredients: []
    }),
    getters: {
    },
    mutations: {
    },
    actions: {
        async addRecipe(_, { name, description, number_portion, ingredients, photo }) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('number_portion', number_portion);
            formData.append('ingredients', JSON.stringify(ingredients)); 
            formData.append('photo', photo); 
            try { 
                const response = await instance.post('/api/recipe/recipes', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data', 
                  }
                });
                console.log(response.status)
                if (response.status === 200) {
                  console.log('Recipe added');
                  window.alert('Вы успешно создали рецепт')
                  router.push('/main')
                } else {
                  console.log('Error:', response.statusText);
                  window.alert('Error:', response.statusText)
                }
              } catch (error) {
                console.error('Error while adding recipe:', error);
              }
            }
    },
    namespaced: true
}
