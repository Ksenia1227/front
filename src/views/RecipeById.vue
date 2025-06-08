<template>
  <div class="home">
    <div class="recipe-header">
    <div class="home-icon" @click="goBack">
  <i class="fas fa-arrow-left"></i> 
</div>
<div class="heart" @click="addFavourite" v-if="this.recipes.status !== 'rejected' && this.recipes.status !== 'pending' && !isModerator">
    <i :class="favourite ? 'fas fa-heart' : 'far fa-heart'"></i>
</div>

      <div class="title-status-wrapper">
      <h1 class="recipe-title">{{ recipes.name }}</h1>
        <div v-if = "res || isModerator" class="recipe-status" :class="statusClass">
          {{ statusText }}
        </div>
      </div>
      <div>
      <h3 class="ingredients-title">Ингредиенты:</h3>
      <ul class="ingredients-list">
        <li class="ingredient-item" v-for="ingredient in originalIngredients" :key="ingredient.id">
          {{ ingredient.name }} - {{ ingredient.number }} - {{ ingredient.measure }} 
        </li>
      </ul>
    </div>
  <div class="recipe-portion-wrapper">
  <button class="portion-btn" @click="decreasePortion"><i class="fas fa-minus"></i></button>
  <h2 class="recipe-portion">Количество порций: {{ recipes.number_portion }}</h2>
 <button class="portion-btn" @click="increasePortion"><i class="fas fa-plus"></i></button>
</div>
      <p class="recipe-description">{{ recipes.description }}</p>
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
  background-color:rgb(255, 228, 228);
  background-image: url('@/assets/569.jpg');
  background-size: cover;  
  background-position: center;  
  min-height: 100vh;  
  display: flex;  
  justify-content: center;  
  align-items: center;
  padding: 10px;
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
  padding: 30px;
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
  text-align: center; 
  font-size: 20px;
  margin: 20px 10px; 
}

.recipe-image-container {
  text-align: center;
  margin: 20px 0;
}

.recipe-image {
  max-width: 80%;
  height: auto;
  border-radius: 8px;
}

.delete, .editing {
  cursor: pointer;
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px; 
}
.recipe-title,
.recipe-portion {
  font-size: 37px;
  margin-right: 10px;
  font-weight: bold;
  margin-bottom: 30px; 
  margin-top: 30px; 
}
.recipe-portion-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.portion-btn {
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;
}
.title-status-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
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
.status-buttons {
  display: flex;
  gap: 10px;
  margin: 20px 0;
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
  background-color: #4CAF50;
  color: white;
}

.reject-btn {
  background-color: #F44336;
  color: white;
}

.status-buttons button:hover {
  opacity: 0.8;
}

</style>