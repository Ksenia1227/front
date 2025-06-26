<template>
  <div class="home">
    <div v-if="recipes.length > 0" >
    <div class="recipes-list">
      <router-link
        v-for="(recipe, index) in paginatedRecipes"
        :key="recipe.id"
        :to="`/recipeById/${recipe.id}`"
        class="recipe-card-link"
        :style="getRotationStyle(index)"
      >
      <div class = "icon"  :style="getPinPositionStyle(index)">
        <i class="fas fa-map-pin"></i> 
      </div>
        <cardRecipe 
          :name="recipe.name" 
          :photo="`${serverUrl}/${recipe.photo}`" 
        ></cardRecipe>
      </router-link>
    </div>
    <div class="pagination">
  <button 
    @click="prevPage" 
    :disabled="numberPage === 1"
  >
    Назад
  </button>

  <button 
    v-for="page in pageCount" 
    :key="page" 
    @click="numberPage = page"
    :class="{ active: page === numberPage }"
  >
    {{ page }}
  </button>

  <button 
    @click="nextPage" 
    :disabled="numberPage === pageCount"
  >
    Вперёд
  </button>
</div>
</div>
<div v-else class="loading-text">
      <p>Загружается...</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import feather from 'feather-icons';

export default {
    name: 'mainPage',
    data() {
        return {
            recipes: [],
            serverUrl:process.env.VUE_APP_SERVER,
            numberPage: 1,
            size: 9,
            pinIcon: feather.icons['map-pin'].toSvg(),
        }
    },
    computed:{
    paginatedRecipes(){
      if (!this.recipes) return []
      const start = (this.numberPage - 1) * this.size;
    const end = start + this.size
    return this.recipes.slice(start, end)
},
pageCount(){
      return this.recipes ?Math.ceil(this.recipes.length/this.size):0;
}
  },
    methods: {
        ...mapActions({
          getApprovedRecipes: 'recipe/getApprovedRecipes',
        }),
        nextPage(){
      if (this.numberPage < this.pageCount) {
    this.numberPage++;
  }
      },
      prevPage() {
  if (this.numberPage > 1) {
    this.numberPage--;
  }
  },
      getRotationStyle(index) {
    const angles = [4, -2, 3, -4, 2,-3]; 
    const angle = angles[index % angles.length];
    return {
      transform: `rotate(${angle}deg)`,
      transition: 'transform 0.3s',
    };
  },
  getPinPositionStyle(index) {
  const isEven = index % 2 === 0;
  return {
    position: 'absolute',
    top: '6px',
    fontSize: '25px',
    color: isEven ? 'rgb(87, 83, 83)': 'rgb(47, 110, 168)',
    left: '26px',
    // left: isEven ? '26px' : 'auto',
    // right: isEven ? 'auto' : '26px',
    pointerEvents: 'none',
    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))',
  };
}
    },
    async mounted() {
      await this.getApprovedRecipes()
      this.recipes = this.$store.state.recipe.recipes
    }
}
</script>

<style scoped>

.home {
  padding: 20px;
  background-color:rgb(252, 227, 227);
  background-image: url('@/assets/569.jpg'); 
  background-position: center;
  min-height: 100vh;
}

h1 { 
  text-align: center; 
  font-size: 50px;  
  text-align: center;
  font-weight: 700; 
  margin-bottom: 30px; 
}

.recipes-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center; 
  gap: 20px;
}
.recipe-card-link {
  text-decoration: none;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  gap: 8px;
  flex-wrap: wrap;
}

.pagination button {
  padding: 8px 12px;
  border: none;
  background-color: #f8f8f8;
  color: #1a1a1a;
  border-radius: 3px;
  font-weight: 500;
  font-size: 13px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  min-width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination button.active {
  background-color: #537da4;
  color: white;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  transform: scale(1.05);
}
.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none !important;
}
.loading-text{
  justify-content: center;
  align-items: center;
   text-align: center;
   font-size: 25px;
  color: #111111;
}
@media (max-width: 1100px) {
h1 { 
  font-size: 40px;  
  font-weight: 700; 
  margin-bottom: 23px; 
}
.recipes-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center; 
  gap: 20px;
}
.pagination {
  margin: 35px 0;
  gap: 6px;
}

.pagination button {
  padding: 6px 10px;
  font-size: 13px;
  min-width: 35px;
}
@media (max-width: 770px) {
h1 { 
  font-size: 35px;  
  font-weight: 700; 
  margin-bottom: 20px; 
}
.recipes-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center; 
  gap: 15px; 
  padding: 0 15px; 
}
.pagination {
  margin: 20px 0;
  gap: 6px;
}

.pagination button {
  padding: 6px 10px;
  font-size: 13px;
  min-width: 35px;
}
.recipe-card-link{
   width: 100%; 
    max-width: 350px; 
}
.loading-text{
  font-size: 14px;
}
}
}
</style>

