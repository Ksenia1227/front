<template> 
  <div class="home"> 
    <div class="form-container"> 
      <h1>Новый рецепт</h1> 
      <form @submit.prevent="submitRecipe"> 
        <div class="input-recipe"> 
          <textarea placeholder="Введите название рецепта" v-model="name" @input="upperCase()"  required>
          </textarea>
          <span class="counter">{{ 70 - name.length }} символов осталось</span>
        </div> 
        <div class="input-description"> 
        <textarea v-model="description" placeholder="Введите описание рецепта" @input="textareaHeight($event)"
      class="size-textarea" required>
          </textarea>
        </div> 
        <div class="file"> 
          <input 
            type="file" 
            ref="photo" 
            @change="onFileChange" 
            accept="image/*" 
            required 
          /> 
        </div> 
        <div class="input-portion"> 
          <my-input  type="text" placeholder="Введите количество  порций" v-model:value="number_portion" @input="filterNumberPortion" required></my-input>
        </div> 
        <h2>Ингредиенты:</h2>
        <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-group">
          <div class="ingredient-name">
          <my-input placeholder="Введите название" v-model:value="ingredients[index].name" @input="upperCaseName(index)" required></my-input> 
          <span class="counter">{{ 40 - ingredient.name.length }} символов осталось</span>
        </div>
          <my-input  type="text" placeholder="Введите количество" v-model:value="ingredients[index].number" @input="filterIngredientNumber(index)" required></my-input>
          <my-input placeholder="Введите единицу измерения" v-model:value="ingredients[index].measure" @input="upperCaseMeasure(index)" required></my-input> 
          <button type="button" @click="removeIngredient(index)" class="remove-btn">Удалить ингредиент</button> 
        </div> 
        <div class="button_recipe"> 
          <button type="button" @click="addIngredient()" class="add-ingredient-btn">Добавить ингредиент</button> 
        </div> 
        <div class="submit"> 
          <my-button type="submit" class="submit-btn">Добавить рецепт</my-button> 
        </div>
      </form> 
    </div> 
  </div> 
</template> 

<script> 
import { mapActions } from 'vuex' 

export default { 
  name: 'addRecipePage', 
  data() { 
    return { 
      name: '', 
      description: '', 
      photo: null, 
      number_portion:'',
      ingredients: [{name: "", number:"", measure:""}], 
    } 
  }, 
  methods: { 
    ...mapActions({ 
      addRecipe: 'addRecipe/addRecipe', 
    }), 
     textareaHeight(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
      this.upperCaseDescription();
    },
    onFileChange() { 
      this.photo = this.$refs.photo.files[0]; 
    }, 
    addIngredient() { 
      this.ingredients.push({name:"", number:"", measure:""}) 
    }, 

    removeIngredient(index) { 
      this.ingredients.splice(index, 1) 
    }, 
    upperCaseDescription() {
      if (this.description) {
    this.description = this.description.charAt(0).toUpperCase() + this.description.slice(1);
  }
},
    upperCase() {
      if (this.name) {
      this.name = this.name.charAt(0).toUpperCase() +this.name.slice(1);
      if (this.name.length > 70) {
      this.name = this.name.substring(0, 70);
    }
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
    this.ingredients[index].measure = measure.charAt(0).toUpperCase() + measure.slice(1);
  }
},
filterNumberPortion() {
   let value = this.number_portion.toString();
  value = value.replace(/[^\d]/g, '');
  if (value.length > 1) {
    value = value.replace(/^0+/, '');
  }
  this.number_portion = value;
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
      this.addRecipe({ 
        name: this.name, 
        description: this.description,
        number_portion: this.number_portion, 
        ingredients: this.ingredients, 
        photo: this.photo 
      }) 
    }
  } 
} 
</script> 

<style scoped> 
.home{
  background-color: rgba(73, 73, 73, 0.8); 
  background-size: cover;  
  background-image: url('@/assets/569.jpg');
  opacity:0.9; 
  background-position: center; 
  min-height: 100vh; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
} 

.form-container { 
  background-color: rgba(255, 255, 255, 0.95);  
  padding: 40px; 
  border-radius: 12px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  width: 600px; 
  display: flex; 
  flex-direction: column; 
  gap: 30px; 
} 
h1 { 
  text-align: center; 
  font-size: 30px; 
  color: #030203;  
  font-weight: 700; 
  margin-bottom: 10px; 
}
h2 { 
  text-align: center; 
  font-size: 22px; 
  color: #030203;  
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
  color: #030203;
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
  margin-top: 20px;
}

.submit { 
  display: flex; 
  justify-content: center; 
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
  min-height: 60px; /* Начальная высота */
  max-height: 300px; /* Максимальная высота */
  overflow-y: auto; /* Прокрутка при необходимости */
  resize: none; /* Отключаем ручное изменение размера */
  white-space: pre-wrap; /* Сохраняем переносы строк */
  line-height: 1.5; /* Улучшаем читаемость */
}
</style>