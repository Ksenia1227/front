<template>
  <div class="home">
    <h1>Рецепты</h1>
    <div class="recipes-list">
      <router-link
        v-for="recipe in paginatedRecipes"
        :key="recipe.id"
        :to="`/recipeById/${recipe.id}`"
        class="recipe-card-link"
      >
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
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'mainPage',
    data() {
        return {
            recipes: [],
            serverUrl:process.env.VUE_APP_SERVER,
            numberPage: 1,
            size: 6,
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
}
.recipe-card-link {
  text-decoration: none;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}
.pagination button {
  padding: 5px 10px;
  border: none;
  background-color: #eee;
  cursor: pointer;
}
.pagination button.active {
  background-color: #333;
  color: white;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>

