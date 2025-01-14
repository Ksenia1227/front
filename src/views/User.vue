<template>
  <div class="user-page">
    <div class="user-info">
      <span class="user-name">{{ user ? user.name : 'Загружается...' }}</span>
    </div>
  </div>

  <div class="recipes-page">
    <h1>Рецепты</h1>
    <div class="recipes-list">
     <router-link
        v-for="recipe in recipes"
        :key="recipe.id"
        :to="`/recipeById/${recipe.id}`"
      >
      <cardRecipe 
        :name="recipe.name" 
        :photo="`${serverUrl}/${recipe.photo}`" 
      ></cardRecipe>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'userPage',
  data() {
    return {
      user:null,
       recipes: null,
       serverUrl:process.env.VUE_APP_SERVER
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
      this.user=this.$store.state.user.user
    },
}
</script>

<style scoped>

.recipes-page {
  padding: 20px;
  background-color: #f9f9f9;
}
.recipes-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.user-page {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.user-info {
  font-size: 24px;
}

.user-name {
  font-weight: bold;
  align-items: center;
}
.add-recipe-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.add-recipe-btn:hover {
  background-color: #45a049;
}
</style>