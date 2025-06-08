<template>
  <div class="home">
    <div class="user-info">
      <span class="user-name">
       <i class="fas fa-user-circle user-icon"></i> {{ user ? user.name : 'Загружается...' }}
      </span>
    </div>

    <div>
      <h1>Мои рецепты</h1>
      <div v-if="recipes && recipes.length === 0" class="empty-recipes">
  <p>У вас пока нет рецептов.</p>
  <router-link to="/addRecipe" class="add-link">Добавить рецепт</router-link>
</div>
<div v-else>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'userPage',
  data() {
    return {
      user: null,
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
}
  },

  methods: {
    ...mapActions({
      getUserByUid: 'user/getUserByUid',
      getRecipes: 'user/getRecipesByUId',
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
    await this.getRecipes()
    await this.getUserByUid()
    this.recipes = this.$store.state.user.recipes
    this.user = this.$store.state.user.user
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

.user-info {
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
.user-name {
  font-weight: bold;
  margin-right: 10px;
  font-size: 30px;
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
.empty-recipes {
  text-align: center;
}

.empty-recipes p {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.add-link {
  display: inline-block;
  color: rgb(14, 13, 13);
  text-decoration: none;
  font-weight: bold;
}

.add-link:hover {
   color: #45a049;
}
</style>