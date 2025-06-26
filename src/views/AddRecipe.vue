<template> 
  <div class="home"> 
    <div class="form-container"> 
        <div class="corner top-right"></div>
        <div class="corner bottom-left"></div>
        <div class="title-recipe">
    <h1>Новый рецепт</h1>
  </div>
      <form @submit.prevent="submitRecipe"> 
         <div class="input-main-recipe">
          <div class="input-recipe">
            <textarea placeholder="Введите название рецепта" v-model="name" @input="upperCase()"  required>
          </textarea>
          <span class="counter">{{ 60 - name.length }} символов осталось</span>
        </div> 
        <div class="input-description"> 
        <textarea v-model="description" placeholder="Введите описание рецепта" @input="textareaHeight($event)"
      class="size-textarea" required>
          </textarea>
        </div> 
        <div class="row-inline">
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
          <my-input  type="text" placeholder="Введите количество порций" v-model:value="number_portion" @input="filterNumberPortion" required :class="{ 'error-input': hasError }"></my-input>
          <p v-if="error" class="error-message">{{ error }}</p>
        </div> 
        </div>
        </div>
        <div class="ingredients">
        <h2>Ингредиенты:</h2>
        <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-group">
          <div class="ingredient-name">
          <my-input placeholder="Введите название" v-model:value="ingredients[index].name" @input="upperCaseName(index)" required></my-input> 
          <span class="counter">{{ 30 - ingredient.name.length }} символов осталось</span>
        </div>
          <my-input  type="text" placeholder="Введите количество" v-model:value="ingredients[index].number" @input="filterIngredientNumber(index)" required></my-input>
          <my-input placeholder="Введите ед. измерения" v-model:value="ingredients[index].measure" @input="upperCaseMeasure(index)" required></my-input> 
          <button type="button" @click="removeIngredient(index)" class="remove-btn">Удалить ингредиент</button> 
        </div> 
        <div class="button_recipe"> 
          <button type="button" @click="addIngredient()" class="add-ingredient-btn">Добавить ингредиент</button> 
        </div> 
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
       error: '', 
       hasError: false
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
      if (this.name.length > 60) {
      this.name = this.name.substring(0, 60);
    }
  }
},
    upperCaseName(index) {
      let name = this.ingredients[index].name;
  if (name) {
    if (name.length > 0) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    if (name.length > 30) {
      name = name.substring(0, 30);
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
    if (value === '') {
    this.number_portion = '';
    this.error = '';
    this.hasError = false;
    return; 
  }
  if (value.length > 1) {
    value = value.replace(/^0+/, '');
  }
  // this.number_portion = value;
   const numericValue = parseInt(value, 10);
  
  if (numericValue > 50) {
    this.error = 'Максимальное количество порций: 50';
    this.hasError = true;
  } else {
    this.error = '';
    this.hasError = false;
    this.number_portion = numericValue;
  }
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
    if (this.hasError || this.number_portion > 50) {
    return; 
  }
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
   background-color:#ECECEE;
  background-image: url('@/assets/569.jpg');
  background-size: cover;  
  opacity:0.9; 
  background-position: center; 
  min-height: 100vh; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
} 

.form-container { 
  position: relative;
  background-color: rgba(255, 255, 255, 0.95);  
  padding: 20px; 
  width: 90%;
  border-radius: 12px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  max-width: 900px; 
  display: flex; 
  flex-direction: column; 
  gap: 30px; 
  margin-top: 20px; 
} 
h1 { 
  text-align: center; 
  font-size: 30px; 
  color: #030203;  
  font-weight: 700; 
  margin-bottom: 10px; 
}
.title-recipe {
  background-color: #BACBDB;
  color: white;
  padding: 15px 30px;
  border-radius: 50px;
  display: inline-block;
  margin: 0 auto;
  text-align: center;
}
h2 { 
  text-align: center; 
  font-size: 22px; 
  color: #030203;  
  font-weight: 600; 
   padding-bottom: 20px;
}
.input-main-recipe {
 padding-left: 50px;
  padding-right: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.ingredients {
 padding-top: 40px;
}
.row-inline {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
} 
.row-inline {
  flex: 1;
}

.input-portion {
  flex: 1;
}
.file {
  display: flex;
  flex-direction: column;
   margin-right: 80px;
}

.input-recipe, 
.input-description,
.input-portion
 { 
  display: flex; 
  flex-direction: column; 
  margin-bottom: 2px; 
}

textArea{
  border-radius: 2px; 
  padding: 10px;
  font-size: 16px; 
  resize: none;
  border: 1px solid black;
}

.ingredient-group { 
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 10px;
  flex-wrap: wrap;
} 

.submit-btn { 
  padding: 15px 50px; 
  font-size: 18px; 
  background-color: #BACBDB; 
  color: rgb(0, 0, 0); 
  border: none; 
  cursor: pointer; 
  font-weight: 700; 
  border-radius: 25px; 
  transition: background-color 0.3s ease, transform 0.3s ease; 
    border: 1px solid black;
}
.add-ingredient-btn{ 
  padding: 13px 40px; 
  font-size: 14px; 
  background-color: #87807a; 
  color: rgb(0, 0, 0); 
  border: none; 
  cursor: pointer; 
  font-weight: 700; 
  border-radius: 25px; 
  transition: background-color 0.3s ease, transform 0.3s ease; 
    border: 1px solid black;
}
.add-ingredient-btn:hover { 
   background-color: #534f4b; 
  transform: scale(1.05); 
}
.submit-btn:hover { 
  background-color: #8597a9; 
  transform: scale(1.05); 
}

.remove-btn { 
   width: 120px;
   padding: 4px 20px;
  font-size: 14px; 
  background-color: #E4BAB7; 
  color: rgb(0, 0, 0); 
  border: none; 
  cursor: pointer; 
  border-radius: 5px; 
  transition: background-color 0.3s ease, transform 0.3s ease; 
   font-weight: 650; 
   border: 0.5px solid black;
}

.remove-btn:hover { 
  background-color: #af7672; 
  transform: scale(1.05); 
}

.button_recipe { 
 display: flex; 
  justify-content: flex-end; 
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
  font-size: 14px;
  color: #171717;
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
input,
textarea,
button,
select {
  font-family: 'Arial', sans-serif;
  font-size: 16px;
}
.corner {
  position: absolute;
  border-style: solid;
}

.top-right {
  top: 0;
  right: 0;
  border-width: 0 80px 80px 0;
  border-radius: 3px;
  border-color: transparent #537da4 transparent transparent;

}

.bottom-left {
  bottom: 0;
  left: 0;
  border-width: 80px 0 0 80px;
  border-radius:3px;
  border-color: transparent transparent transparent #537da4;
}
.error-input {
  border: 2px solid red;
  background-color: #fdd7d7;
}
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
@media (max-width: 831px) {
  .ingredient-group { 
  justify-content: center; 
} 
.button_recipe { 
  justify-content: center; 
  margin-bottom: 15px;
  margin-top: 15px;
}
.input-main-recipe {
 padding-left: 20px;
  padding-right: 20px;
  gap: 15px;
}
.ingredients {
 padding-top: 30px;
}
}
@media (max-width: 570px) {
  .ingredient-group { 
  justify-content: center; 
} 
  h1 { 
  font-size: 25px; 
}
.remove-btn { 
   width: 110px;
   padding: 4px 17px;
  font-size: 12px; 
}
.top-right {
  border-width: 0 70px 70px 0;
}

.bottom-left {
  border-width: 70px 0 0 70px;
}
.add-ingredient-btn{ 
  padding: 13px 25px; 
  font-size: 12px; 
}
.button_recipe { 
  justify-content: center; 
  margin-bottom: 15px;
  margin-top: 15px;
}
.submit-btn { 
  padding: 15px 40px; 
  font-size: 16px; 
}
.file {
 margin-right: 0px;
}
input,
textarea,
button,
select {
  font-family: 'Arial', sans-serif;
  font-size: 12px;
}
.input-main-recipe {
 padding-left: 10px;
  padding-right: 10px;
  gap: 15px;
}
.row-inline{
  justify-content: center; 
}
.ingredients {
 padding-top: 20px;
}
h2 { 
  font-size: 18px;  
   padding-bottom: 16px;
}
}
@media (max-width: 345px) {
  .ingredient-group { 
  justify-content: center; 
} 
  h1 { 
  font-size: 22px; 
}
.remove-btn { 
   width: 100px;
   padding: 4px 17px;
  font-size: 12px; 
}
.top-right {
  border-width: 0 50px 50px 0;
}

.bottom-left {
  border-width: 50px 0 0 50px;
}
.add-ingredient-btn{ 
  padding: 13px 15px; 
  font-size: 11px; 
}
.button_recipe { 
  justify-content: center; 
  margin-bottom: 10px;
  margin-top: 10px;
}
.submit-btn { 
  padding: 12px 30px; 
  font-size: 14px; 
}
.file {
 margin-right: 0px;
}
input,
textarea,
button,
select {
  font-family: 'Arial', sans-serif;
  font-size: 11px;
}
.input-main-recipe {
 padding-left: 10px;
  padding-right: 10px;
  gap: 15px;
}
.ingredients {
 padding-top: 15px;
}
h2 { 
  font-size: 16px;  
   padding-bottom: 12px;
}
.counter {
  font-size: 12px;
}
}
</style>