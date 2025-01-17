<template> 
  <div class="home"> 
    <div class="form-container"> 
      <h1>Новый рецепт</h1> 
      <form @submit.prevent="submitRecipe"> 
        <div class="input-recipe"> 
          <textarea placeholder="Введите название рецепта" v-model="name" required>
          </textarea>
        </div> 
        <div class="input-description"> 
        <textarea v-model="description" placeholder="Введите описание рецепта" required>
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
        <h2>Ингредиенты:</h2>
        <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-group"> 
          <my-input placeholder="Введите название" v-model:value="ingredients[index].name" required></my-input> 
          <my-input placeholder="Введите количество" v-model:value="ingredients[index].number" required></my-input> 
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
      ingredients: [{name: "", number:""}], 
    } 
  }, 
  methods: { 
    ...mapActions({ 
      addRecipe: 'addRecipe/addRecipe', 
    }), 
    onFileChange() { 
      this.photo = this.$refs.photo.files[0]; 
    }, 

    addIngredient() { 
      this.ingredients.push({name:"", number:""}) 
    }, 

    removeIngredient(index) { 
      this.ingredients.splice(index, 1) 
    }, 

    async submitRecipe() { 
      this.addRecipe({ 
        name: this.name, 
        description: this.description, 
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
  margin-top: 20px;
}

.submit { 
  display: flex; 
  justify-content: center; 
}
</style>