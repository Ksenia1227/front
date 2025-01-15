<template>
  <div class="recipe-container">
    <div class="recipe-header">
    <div v-html="logOutIcon" class="home-icon" @click="goBack" ></div>
    <div class="heart" @click="addFavourite">
        <i :class="favourite ? 'fas fa-heart' : 'far fa-heart'"></i>
      </div>


      <h1 class="recipe-title">{{ recipes.name }}</h1>
      <div class="ingredients-section">
      <h3 class="ingredients-title">Ингредиенты:</h3>
      <ul class="ingredients-list">
        <li class="ingredient-item" v-for="ingredient in ingredients" :key="ingredient.id">
          {{ ingredient.name }} - {{ ingredient.number }}
        </li>
      </ul>
    </div>
      <p class="recipe-description">{{ recipes.description }}</p>
    <div class="recipe-image-container">
      <img :src="`${serverUrl}/${recipes.photo}`" alt="Рецепт" class="recipe-image"  />
    </div>
     <div v-if = "res" class="delete" @click="deleteRecipe(recipeId)">
     <h3>Удалить </h3>
     </div>
      <div v-if = "res" class="editing" @click="editingRecipe"> <h3>Редактировать</h3>
     </div>
     </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import feather from 'feather-icons';
import { mapState } from 'vuex';

export default {
  name: 'recipeById',
  data() {
    return {
      serverUrl: process.env.VUE_APP_SERVER,
      logOutIcon: feather.icons['log-out'].toSvg(),
      favourite: null,
      };
  },
  computed: {
    ...mapState('recipeById', ['res', 'recipes', 'ingredients']), 
  },
  methods: {
    ...mapActions({
      getRecipeById: 'recipeById/getRecipesById',
      getIngredientsById: 'recipeById/getIngredientById',
      getFavouriteByUId: 'recipeById/getFavouriteByUId',
      addFavouriteByUId: 'recipeById/addFavouriteByUId',
      deleteRecipe: 'recipeById/deleteRecipe',
      getUserByUid: 'recipeById/getUserByUid',
      getSravnenie: 'recipeById/sravnenie',
    }),
     goBack() {
      this.$router.go(-1); 
    },
     editingRecipe() {
      console.log(this.recipeId)
      this.$router.push({ path: `/editingRecipe/${this.recipeId}` });
    },
    async addFavourite() {
        await this.addFavouriteByUId(this.recipeId); 
        this.favourite = !this.favourite; 
    },
  },
  async mounted() {
    this.recipeId = this.$route.params.id;
    await this.getRecipeById(this.recipeId);
    await this.getIngredientsById(this.recipeId);
    await this.getFavouriteByUId(this.recipeId);
    await this.getUserByUid(); 
    await this.getSravnenie();
    this.favourite = this.$store.state.recipeById.favourite;

  },
};
</script>

<style scoped>
.recipe-container {
  background-image: url('@/assets/789.jpg');
  background-color: rgba(73, 73, 73, 0.8);   
  opacity: 0.9;  
  background-size: cover;  
  background-position: center;  
  min-height: 100vh;  
  display: flex;  
  justify-content: center;  
  align-items: center;
}

.recipe-header {
  position: relative; 
  text-align: center;
  width: 900px;  
  border-radius: 12px;  
  background-color: #f9f9f9; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
  display: flex;  
  flex-direction: column;  
  padding: 20px;
}

.home-icon { 
  position: absolute; 
  top: 20px; 
  left: 10px; 
  width: 40px;  
  height: 40px;  
}

.heart {
  position: absolute; 
  top: 20px; 
  right: 30px; 
  font-size: 35px;  
  cursor: pointer;
}

.heart i {
  color: red;
}

.ingredients-title {
  font-size: 22px;
  margin-right: 10px;
  font-weight: bold;
}

.ingredients-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.ingredient-item {
  font-size: 20px;
}

.recipe-description {
  text-align: justify; 
  font-size: 20px;
  margin: 20px 10px; 
}

.recipe-image-container {
  text-align: center;
  margin: 20px 0;
}

.recipe-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.delete, .editing {
  cursor: pointer;
  text-align: center;
   font-size: 20px;
}
.recipe-title {
  font-size: 40px;
  margin-right: 10px;
  font-weight: bold;
}
</style>