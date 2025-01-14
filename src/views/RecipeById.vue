<template>
  <div class="recipe-container">
    <div class="recipe-header">
    <div v-html="logOutIcon" class="home-icon" @click="goBack" ></div>

    <div class="heart" @click="addFavourite">
  {{ favourite ? 'Добавлено' : 'Добавить' }}
     </div>
<div>
      <h3>Сохраненнные данные</h3>
      <pre>{{favourite}}</pre>
      </div>
    <h1 class="recipe-title">Рецепт</h1>
      <h1 class="recipe-title">{{ recipes.name }}</h1>
      <p class="recipe-description">{{ recipes.description }}</p>
    </div>

     <div class="ingredients-section">
      <h3 class="ingredients-title">Ингредиенты:</h3>
      <ul class="ingredients-list">
        <li class="ingredient-item" v-for="ingredient in ingredients" :key="ingredient.id">
          {{ ingredient.name }} - {{ ingredient.number }}
        </li>
      </ul>
    </div>

    <div class="recipe-image-container">
      <img :src="`${serverUrl}/${recipes.photo}`" alt="Рецепт" class="recipe-image"  />
    </div>
     <div v-if = "res" class="delete" @click="deleteRecipe(recipeId)">
     <h3>Удалить </h3>
     </div>
      <div v-if = "res" class="editing" @click="editingRecipe"> <h3>Редактировать</h3>
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
.heart{
  position: absolute;
  top: 10px;
  right: 10px;
  width: 50px; 
  height: 50px; 
}
.recipe-title {
  font-size: 36px;
  font-weight: bold;
  color: #333;
}

.recipe-description {
  font-size: 18px;
  color: #555;
  margin-top: 10px;
  line-height: 1.5;
}

.recipe-image-container {
  text-align: center;
  margin: 20px 0;
}

.recipe-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.ingredients-section {
  margin-top: 30px;
}

.ingredients-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.ingredients-list {
  list-style-type: none;
  padding: 0;
}

.ingredient-item {
  font-size: 18px;
  color: #666;
  margin-bottom: 8px;
}
</style>