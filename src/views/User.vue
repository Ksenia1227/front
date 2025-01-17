<template>
  <div class="home">
    <div class="user-info">
      <span class="user-name">
       <i class="fas fa-user-circle user-icon"></i> {{ user ? user.name : 'Загружается...' }}
      </span>
    </div>

    <div>
      <h1>Мои рецепты</h1>
      <div class="recipes-list">
        <router-link
          v-for="recipe in recipes"
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
    }
  },
  methods: {
    ...mapActions({
      getUserByUid: 'user/getUserByUid',
      getRecipes: 'user/getRecipesByUId',
    }),
  },
  async mounted() {
    await this.getRecipes()
    await this.getUserByUid()
    this.recipes = this.$store.state.user.recipes
    this.user = this.$store.state.user.user
  },
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
</style>