<template>
  <div class="add-recipe-page">
    <h2>Добавить новый рецепт</h2>
    <form @submit.prevent="submitRecipe">

      <!-- Поле для названия рецепта -->
      <my-input placeholder="Введите название рецепта" v-model:value="name" required ></my-input>
      
      <!-- Поле для описания рецепта -->
       <my-input placeholder="Введите описание рецепта" v-model:value="description" required></my-input>

      <!-- Поле для загрузки фото -->
      <input 
        type="file"
        ref="photo"
        @change="onFileChange"
        accept="image/*"
        required
      />

<!-- Динамическое добавление ингредиентов -->
      <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-group">
        <my-input placeholder="Введите название ингредиента" v-model:value="ingredients[index].name" required></my-input>
        <my-input placeholder="Введите количество ингредиента" v-model:value="ingredients[index].number" required></my-input>
        <button type="button" @click="removeIngredient(index)">Удалить ингредиент</button>
      </div>
        <button type="button" @click="addIngredient()">Добавить ингредиент</button>

      <div>
      <h3>Сохраненнные данные</h3>
      <pre>{{ingredients}}</pre>
      </div>

      <!-- Кнопка отправки формы -->
      <my-button type="submit">Добавить рецепт</my-button>
    </form>
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
      photo: this.photo })
    }
  }
}
</script>

<style scoped>
.add-recipe-page {
  padding: 20px;
}

.ingredient-group {
  display: flex;
  margin-bottom: 10px;
}

.ingredient-group my-input {
  margin-right: 10px;
}

button {
  padding: 10px 20px;
  background-color:rgb(152, 25, 52);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color:rgb(69, 90, 160);
}
</style>