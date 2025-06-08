<template>
  <div class="home">
    <div class="recipe-header">
    <div class="home-icon" @click="goBack">
  <i class="fas fa-arrow-left"></i> 
</div>
    <h1>Редактирование рецепта</h1> 
      <form @submit.prevent="submitRecipe">
        <div v-if="recipes && ingredients" class="head">
          <div class="input-recipe"> 
          <textarea v-model="recipes.name" placeholder="Введите название рецепта" @input="upperCase()" maxlength="70" required>
          </textarea>
          <span class="counter">{{ 70 - recipes.name.length }} символов осталось</span>
        </div> 
        <div class="input-description"> 
        <textarea v-model="recipes.description" placeholder="Введите описание рецепта" @input="textareaHeight($event)"
      class="size-textarea" required>
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
           <div class="input-portion"> 
          <my-input type="text" v-model:value="recipes.number_portion" placeholder="Введите количество  порций" @input="filterNumberPortion" required></my-input>
         
        </div> 
           <h2>Ингредиенты:</h2>
          <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-group">
            <div class="ingredient-name">
            <my-input v-model:value="ingredient.name" @input="upperCaseName(index)"></my-input>
            <span class="counter">{{ 40 - ingredient.name.length }} символов осталось</span>
            </div>
            <my-input type="text" v-model:value="ingredient.number" @input="filterIngredientNumber(index)"></my-input>
            <my-input v-model:value="ingredient.measure" @input="upperCaseMeasure(index)"></my-input>
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
      updateRecipeByUid: 'editingRecipe/updateRecipeByUid',
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
      this.ingredients.push({name:"", number:"", measure:""})
    },
     textareaHeight(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
      this.upperCaseDescription();
    },
    upperCase() {
      if (this.recipes.name) {
      this.recipes.name = this.recipes.name.charAt(0).toUpperCase() + this.recipes.name.slice(1);
      if (this.recipes.name.length > 70) {
      this.recipes.name = this.recipes.name.substring(0, 70);
    }
  }
},
upperCaseDescription() {
      if (this.recipes.description) {
    this.recipes.description = this.recipes.description.charAt(0).toUpperCase() + this.recipes.description.slice(1);
  }
},
upperCaseName(index) {
    let name = this.ingredients[index].name;
  if (name) {
    if (name.length > 0) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    if (name.length > 40) {
      name = name.substring(0, 40);
    }
    this.ingredients[index].name = name;
  }
},
upperCaseMeasure(index) {
    let measure = this.ingredients[index].measure;
    if (measure) {
      if (measure.length > 0) {
      measure = measure.charAt(0).toUpperCase() + measure.slice(1);
    }
      if (measure.length > 20) {
        measure = measure.substring(0, 20);
    }
    this.ingredients[index].measure = measure;
  }
},
filterNumberPortion() {
   let value = this.recipes.number_portion.toString();
  value = value.replace(/[^\d]/g, '');
  if (value.length > 1) {
    value = value.replace(/^0+/, '');
  }
  this.recipes.number_portion = value;
},
filterIngredientNumber(index) {
  let value = this.ingredients[index].number.toString();
  value = value.replace(',', '.');
  value = value.replace(/[^0-9.]/g, '');
  if (/^0[0-9]+/.test(value)) {
    value = value.replace(/^0+/, '');
  }
  this.ingredients[index].number = value;
},
  async submitRecipe() {
      this.updateRecipeByUid({
      name: this.recipes.name,
      description: this.recipes.description,
      number_portion: this.recipes.number_portion,
      ingredients: JSON.stringify(this.ingredients),
      photo: this.photo ? this.photo : this.recipes.photo,
      recipeId: this.recipes.id,
      status: this.recipes.status
       })
    },
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
.input-portion, 
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
 resize: none;
 
}
.ingredient-group { 
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 10px;
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
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.ingredient-name {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
}

.counter {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
  align-self: flex-end;
}
.size-textarea {
  min-height: 60px; 
  max-height: 300px; 
  overflow-y: auto; 
  resize: none; 
  white-space: pre-wrap; 
  line-height: 1.5; 
}
</style>