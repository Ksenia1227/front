<template>
  <div class="home">
    <div class="recipe-header">
    <div class="home-icon" @click="goBack">
  <i class="fas fa-arrow-left"></i> 
</div>
    <h1>Редактирование рецепта</h1> 
      <form @submit.prevent="submitRecipe">
        <div v-if="recipes && ingredients && recipes.name" class="head">
          <div class="input-recipe"> 
          <textarea placeholder="Введите название рецепта" v-model="recipes.name" required>
          </textarea>
        </div> 
        <div class="input-description"> 
        <textarea v-model="recipes.description" placeholder="Введите описание рецепта" required>
          </textarea>
        </div> 
        <div class="file"> 
          <input
            type="file"
            ref="photo"
            @change="onFileChange"
            accept="image/*"
          />
          <label>*Если файл не выбран, устанавливается старый</label>
           </div>
           <h2>Ингредиенты:</h2>
          <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-group">
            <my-input v-model:value="ingredient.name"></my-input>
            <my-input v-model:value="ingredient.number"></my-input>
            <button type="button" @click="deleteIngredient(ingredient.id, index)" class="remove-btn">Удалить ингредиент</button>
          </div>
          <div class="button_recipe"> 
          <button type="button" @click="addIngredient()" class = "add-ingredient-btn">Добавить ингредиент</button>
          </div>
          <div class="submit"> 
          <my-button type="submit" class="submit-btn">Добавить изменения</my-button>
        </div>
        </div>

        <div v-else class="loading">Загружается...</div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import feather from 'feather-icons';
import { mapState } from 'vuex';

export default {
  name: 'editingRecipe',
  data() {
    return {
      logOutIcon: feather.icons['log-out'].toSvg(),
      idNew: null,
      photo: null,
      };
  },
  computed: {
    ...mapState('editingRecipe', ['recipes', 'ingredients']), 
  },
  methods: {
    ...mapActions({
      getRecipeById: 'editingRecipe/getRecipesById',
      getIngredientsById: 'editingRecipe/getIngredientById',
      deleteIngredientById: 'editingRecipe/deleteIngredientById',
      updateRecipeByUid: 'editingRecipe/updateRecipeByUid'
    }),
     goBack() {
      this.$router.go(-1); 
    },
    async deleteIngredient(id, index) {
      console.log(id)
      if(id){
        await this.deleteIngredientById(id);
      }
        this.ingredients.splice(index, 1);
  },
  onFileChange() {
      this.photo = this.$refs.photo.files[0];
    },
   addIngredient() {
      this.ingredients.push({name:"", number:""})
    },
  async submitRecipe() {
      this.updateRecipeByUid({
      name: this.recipes.name,
      description: this.recipes.description,
      ingredients: JSON.stringify(this.ingredients),
      photo: this.photo ? this.photo : this.recipes.photo,
      recipeId: this.recipes.id,
       })
    }
  },
  beforeMount() {
    const recipeId = this.$route.params.id;
     this.getRecipeById(recipeId);
     this.getIngredientsById(recipeId);
    },
  async mounted() {
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
  background-color:rgb(122, 122, 122);
  background-image: url('@/assets/569.jpg');
  background-size: cover; 
  background-position: center; 
  min-height: 100vh; 
}
.recipe-header {
  max-width: 800px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.95);  
  padding: 40px; 
  border-radius: 12px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  width: 600px; 
  display: flex; 
  flex-direction: column; 
  gap: 30px; 
  position: relative;
}
h1 { 
  text-align: center; 
  font-size: 30px; 
  color: #333;  
  font-weight: 700; 
  margin-bottom: 5px; 
}
h2 { 
  text-align: center; 
  font-size: 22px; 
  color: #333;  
  font-weight: 600; 
  margin-bottom: 20px; 
}
.input-recipe, 
.input-description, 
.file { 
  display: flex; 
  flex-direction: column; 
  margin-bottom: 20px; 
}
textArea{
  border-radius: 12px; 
  padding: 10px;
  font-size: 14px; 
  gap:10px;
}
.ingredient-group { 
  display: flex; 
  margin-bottom: 10px; 
  gap: 15px; 
} 
.add-ingredient-btn, 
.submit-btn { 
  padding: 15px 80px; 
  font-size: 16px; 
  background-color: rgb(40, 165, 42); 
  color: white; 
  border: none; 
  cursor: pointer; 
  border-radius: 8px; 
  transition: background-color 0.3s ease, transform 0.3s ease; 
}

.add-ingredient-btn:hover, 
.submit-btn:hover { 
  background-color: rgb(20, 75, 23); 
  transform: scale(1.05); 
}
.remove-btn { 
  padding: 5px 10px; 
  font-size: 12px; 
  background-color: rgb(179, 22, 56); 
  color: white; 
  border: none; 
  cursor: pointer; 
  border-radius: 5px; 
  transition: background-color 0.3s ease, transform 0.3s ease; 
}

.remove-btn:hover { 
  background-color: rgb(69, 90, 160); 
  transform: scale(1.05); 
}
.button_recipe { 
  display: flex; 
  justify-content: center; 
  margin-bottom: 20px;
  margin-top: 40px;
}

.submit { 
  display: flex; 
  justify-content: center; 
}
.home-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 25px; 
}
</style>