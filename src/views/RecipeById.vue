<template>
  <div class="home">
    <div class="recipe-container">
       <div class="recipe-columns">
        <div class="left-column">
          <div class="home-icon" @click="goBack">
            <i class="fas fa-arrow-left"></i> 
          </div>
      <h1 class="recipe-title">{{ recipes.name }}</h1>
        <div v-if = "res || isModerator" class="recipe-status" :class="statusClass">
          {{ statusText }}
        </div>
          <div class="recipe-image-container">
      <img :src="`${serverUrl}/${recipes.photo}`" alt="Рецепт" class="recipe-image"  />
    </div>
     <div v-if = "res" class="delete" @click="deleteRecipe(recipeId)">
     <h3>Удалить</h3>
     </div>
      <div v-if = "res || isModerator" class="editing" @click="editingRecipe"> <h3>Редактировать</h3>
     </div>
     <div v-if ="isModerator" class="status-buttons">
            <button type="button" @click="changeStatus('approved')" class="approve-btn">Одобрить</button>
            <button type="button" @click="changeStatus('rejected')" class="reject-btn">Отклонить</button>
          </div>
      </div>
       <div class="right-column">
          <div class="heart" @click="addFavourite" v-if="this.recipes.status !== 'rejected' && this.recipes.status !== 'pending' && !isModerator">
    <i :class="favourite ? 'fas fa-heart' : 'far fa-heart'"></i>
</div>
      <h3 class="ingredients-title">Ингредиенты:</h3>
    <div class="ingredients-container">
  <div class="ingredient-card" v-for="ingredient in originalIngredients" :key="ingredient.id">
    <div class="ingredient-line">
    <div class="ingredient-name">{{ ingredient.name }}</div>
    <div class="ingredient-info">{{ ingredient.number }} {{ ingredient.measure }}</div>
    </div>
  </div>
</div>
  <div class="recipe-portion-wrapper">
  <h2 class="recipe-portion">Количество порций:</h2>
  <button class="portion-btn" @click="decreasePortion"><i class="fas fa-minus"></i></button>
  <h2 class="recipe-number-portion">{{ recipes.number_portion }}</h2>
 <button class="portion-btn" @click="increasePortion"><i class="fas fa-plus"></i></button>
</div>
<h3 class="description-title">Описание</h3>
<div class = "description-card">
      <p class="recipe-description">{{ recipes.description }}</p>
      </div>
     </div>
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
      originalPortion: 1,
      originalIngredients: [],
      status:null
      };
  },
  computed: {
    ...mapState('recipeById', ['res', 'recipes', 'ingredients']), 
    isModerator() {
    return localStorage.getItem('role') === 'moderator'
  },
  statusText() {
  switch (this.recipes.status) {
    case 'pending': return 'Ожидание';
    case 'rejected': return 'Отклонено';
    case 'approved': return 'Одобрено';
    default: return this.recipes.status || '';
  }
},
    statusClass() {
      return {
        'status-pending': this.recipes.status === 'pending',
        'status-rejected': this.recipes.status === 'rejected',
        'status-approved': this.recipes.status === 'approved'
      };
    }
  },
  methods: {
    ...mapActions({
      getRecipeById: 'recipeById/getRecipesById',
      getIngredientsById: 'recipeById/getIngredientById',
      getFavouriteByUId: 'recipeById/getFavouriteByUId',
      addFavouriteByUId: 'recipeById/addFavouriteByUId',
      deleteRecipe: 'recipeById/deleteRecipe',
      getSravnenie: 'recipeById/sravnenie',
      updateStatus: 'recipeById/updateStatus'
    }),
     goBack() {
      this.$router.go(-1); 
    },
     editingRecipe() {
      this.$router.push({ path: `/editingRecipe/${this.recipeId}` });
    },
    async addFavourite() {
        await this.addFavouriteByUId(this.recipeId); 
        this.favourite = !this.favourite; 
    },
    increasePortion() {
    if (this.recipes.number_portion < 50) {
      this.recipes.number_portion += 1;
      this.updateIngredientAmounts();
    }
  },
  decreasePortion() {
    if (this.recipes.number_portion > 1) {
      this.recipes.number_portion -= 1;
      this.updateIngredientAmounts();
    }
  },
  async changeStatus(status) {
      this.updateStatus({
      recipeId: this.recipes.id,
      status: status
       })
    },
  updateIngredientAmounts() {
  this.originalIngredients = this.ingredients.map((ingredient) => {
  const ratio = ingredient.number /this.originalPortion;
  const newValue = (this.recipes.number_portion * ratio);
  const newNumber = Number.isInteger(newValue)
  ? newValue
  : +newValue.toFixed(2);
  return {
      ...ingredient,
      number: newNumber
    };
});
  },
  },
  async mounted() {
    this.recipeId = this.$route.params.id;
    await this.getRecipeById(this.recipeId);
    await this.getIngredientsById(this.recipeId);
    await this.getFavouriteByUId(this.recipeId);
    await this.getSravnenie();
    this.favourite = this.$store.state.recipeById.favourite;
    this.originalPortion = this.recipes.number_portion;
  this.originalIngredients = JSON.parse(JSON.stringify(this.ingredients));
  },
};
</script>

<style scoped>
.home {
   background-image: url('@/assets/569.jpg');
  background-size: cover;  
  background-position: center;  
  min-height: 100vh;  
  display: flex;  
  justify-content: center;  
  align-items: center;
  padding: 50px;
}
.recipe-columns {
 display: flex;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
}

.left-column {
  position: relative; 
  width: 90%;
  /* min-width: 400px; */
  max-width: 680px;  
  border-radius: 12px;  
  background-color: #f9f9f9; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
  display: flex;  
  flex-direction: column;  
  padding: 30px;
   align-items: center;
}

.right-column {
  position: relative; 
  width: 90%;
  max-width: 700px;  
  border-radius: 12px;  
  background-color: #f9f9f9; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
  display: flex;  
  flex-direction: column;  
  padding: 30px;

}
.recipe-image-container {
  text-align: center;
  margin: 20px 0;
}
.recipe-image {
  max-width: 90%;
  height: auto;
  border-radius: 8px;
}
.home-icon { 
  position: absolute; 
  top: 20px; 
  left: 20px; 
  font-size: 25px; 
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

.recipe-status {
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
}

.status-pending {
  background-color: #FFF3CD;
  color: #856404;
}

.status-rejected {
  background-color: #F8D7DA;
  color: #721C24;
}

.status-approved {
  background-color: #D4EDDA;
  color: #155724;
}
.recipe-title{
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px; 
  margin-top: 12px; 
  background-color: #BACBDB;
  color: rgb(0, 0, 0);
  padding: 5px 20px;
  border-radius: 50px;
  display: inline-block;
  margin: 10 auto;
  text-align: center;
}

.bottom-left {
  bottom: 0;
  left: 0;
  border-width: 80px 0 0 80px;
  border-radius:3px;
  border-color: transparent transparent transparent #537da4;
}
.ingredients-title {
  font-size: 30px;
  font-weight: bold;
  background-color: #BACBDB;
  color: rgb(0, 0, 0);
  padding: 5px 20px;
  border-radius: 50px;
  display: inline-block;
  margin: 0 auto;
  text-align: center;
}

.recipe-portion-wrapper{
  display: flex;
  gap: 10px;
  margin-top: 20px; 
  margin-bottom: 20px; 
  justify-content: center; 
  align-items: center; 
}

.description-title {
  font-size: 22px;
  font-weight: bold;
  background-color: #BACBDB;
  color: rgb(0, 0, 0);
  padding: 5px 20px;
  border-radius: 50px;
  display: inline-block;
  margin: 0 auto;
  text-align: center;
}
.ingredient-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 6px 11px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 0.5px solid black;
}
.ingredient-name {
  font-weight: bold;
  font-size: 17px;
  color: #121212;
  margin-bottom: 8px;
}

.ingredient-info {
  font-size: 16px;
  color: #2a2a2a;
}
.ingredients-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
  margin-bottom: 15px;
  margin-top: 20px;
}
.ingredient-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.description-card {
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  border: 0.5px solid black;
  max-height: 250px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
  margin-top: 15px;
}

.status-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
}

.status-buttons button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.approve-btn {
  background-color: #92ba92;
  color: #2d5e2d;
}

.reject-btn {
  background-color: #d06868;
  color: #973333;
}

.status-buttons button:hover {
  opacity: 0.8;
}
@media (max-width: 1200px) {
  .recipe-title{
  font-size: 25px;
}
.recipe-image-container {
  margin: 16px 0;
}
.home-icon { 
  top: 16px; 
  left: 16px; 
  font-size: 20px; 
}
.heart { 
  top: 16px; 
  right: 26px; 
  font-size: 30px;  
}
.left-column{
  padding: 20px;
   /* min-width: 200px; */
}
.ingredients-title {
  font-size: 24px;
}
.recipe-columns {
  gap: 30px;
}
.home{
  padding: 35px;
}
}
@media (max-width: 950px){
  .recipe-columns {
    flex-direction: column;
    align-items: center;
  }
  .recipe-title{
  font-size: 20px;
}
.recipe-image-container {
  margin: 13px 0;
}
.home-icon { 
  top: 15px; 
  left: 15px; 
}
.heart { 
  top: 15px; 
  right: 26px; 
  font-size: 26px;  
}
.left-column{
  padding: 16px; 
   /* min-width: 100px; */
}
.ingredients-title {
  font-size: 19px;
}
.recipe-columns {
  gap: 26px;
}
.home{
  padding: 15px;
}
.ingredient-name {
  font-size: 13px;
  margin-bottom: 6px;
}

.ingredient-info {
  font-size: 12px;
}
.recipe-portion{
  font-size: 18px;
}
.description-title {
  font-size: 19px;
}
.portion-btn{
  font-size: 16px;
}
.recipe-number-portion{
  font-size: 18px;
}
.description-card {
  padding: 12px 16px;
  margin-top: 12px;
}
.delete, .editing{
  font-size: 16px;
}
}
@media (max-width: 400px){
  .recipe-title{
  font-size: 14px;
  margin: 10px;
}
.recipe-image-container {
  margin: 10px 0;
}
.home-icon { 
  top: 10px; 
  left: 15px; 
  font-size: 16px;
}
.heart { 
  top: 11px; 
  right: 15px; 
  font-size: 23px;  
}
.left-column{
  padding: 10px;
   /* min-width: 50px; */
}
.right-column{
  padding: 11px;
}
.ingredients-title {
  font-size: 16px;
}
.recipe-columns {
  gap: 23px;
}
.home{
  padding: 12px;
}
.ingredient-name {
  font-size: 11px;
  margin-bottom: 6px;
}

.ingredient-info {
  font-size: 11px;
}
.recipe-portion{
  font-size: 16px;
}
.description-title {
  font-size: 16px;
}
.portion-btn{
  font-size: 14px;
}
.recipe-number-portion{
  font-size: 16px;
}
.description-card {
  padding: 12px 16px;
  margin-top: 12px;
}
.recipe-description{
  font-size: 14px;
}
.recipe-portion-wrapper{
  margin: 8px;
}
.recipe-status {
  padding: 5px 13px;
  font-size: 10px;
}
.delete,.editing{
  font-size: 12px;
}
.status-buttons{
margin-top: 16px;
}
.status-buttons button {
  padding: 8px 12px;
font-size: 12px;
}
}
</style>