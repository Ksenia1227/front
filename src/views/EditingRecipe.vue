<template>
  <div class="recipe-container">
    <div class="recipe-header">
      <div v-html="logOutIcon" class="home-icon" @click="goBack"></div>
      <form @submit.prevent="submitRecipe">
        <div v-if="recipes && ingredients && recipes.name && ingredients.length" class="head">
          <my-input v-model:value="recipes.name"></my-input>
          <my-input v-model:value="recipes.description"></my-input>

          <input
            type="file"
            ref="photo"
            @change="onFileChange"
            accept="image/*"
          />

          <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-group">
            <my-input v-model:value="ingredient.name"></my-input>
            <my-input v-model:value="ingredient.number"></my-input>
            <button type="button" @click="deleteIngredient(ingredient.id, index)">Удалить ингредиент</button>
          </div>

          <button type="button" @click="addIngredient()">Добавить ингредиент</button>
          <my-button type="submit">Добавить изменения</my-button>
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
        await this.deleteIngredientById(id);
        this.ingredients.splice(index, 1);
  },
  onFileChange() {
      this.photo = this.$refs.photo.files[0];
    },
   addIngredient() {
      this.ingredients.push({name:"", number:""})
    },
  async submitRecipe() {
    console.log("VVVVVVV")
      console.log(this.recipes.photo)
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
.recipe-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.head {
  padding: 20px;
}
.recipe-header {
  position: relative;
  text-align: center;
  margin-bottom: 20px;
}
.home-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px; 
  height: 40px; 
}
.ingredient-group {
  display: flex;
  margin-bottom: 10px;
}

</style>