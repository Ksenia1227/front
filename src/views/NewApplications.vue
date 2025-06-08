<template>
    <div class="home">
      <div class="moderator-info">
        Страница модератора
      </div>
  
      <div>
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
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    name: 'moderatorPage',
    data() {
      return {
        recipes: null,
        serverUrl: process.env.VUE_APP_SERVER,
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
  },
    },
  
    methods: {
      ...mapActions({
        getRecipes: 'moderator/getPendingRecipes',
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
      await this.getRecipes(),
      this.recipes = this.$store.state.moderator.recipes
    }
  }
  </script>
  
  <style scoped>
  .home {
    align-items: center;
    padding: 10px;
    background-color:rgb(122, 122, 122);
    background-position: center;
    background-image: url('@/assets/569.jpg');
    min-height: 100vh;
  }
  
  .moderator-info {
    display: flex;
    align-items: center;
    justify-content: flex-start; 
    width: auto; 
    padding: 10px 20px;
    background-color: rgba(255, 255, 255); 
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px; 
  }

  
  h1 {
    text-align: center;
    font-size: 36px;
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