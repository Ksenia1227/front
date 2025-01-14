<template>
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
    name: 'mainPage',
    data() {
        return {
            recipes: [],
            serverUrl:process.env.VUE_APP_SERVER
        }
    },
    methods: {
        ...mapActions({
            getRecipes: 'recipe/getRecipes',
        }),
    },
    async mounted() {
      await this.getRecipes()
      this.recipes = this.$store.state.recipe.recipes
    }
}
</script>
<style scoped>
.recipes-page {
  padding: 20px;
  background-color: #f9f9f9;
}

h1 {
  font-size: 2em;
  text-align: center;
  margin-bottom: 20px;
}

.recipes-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
</style>
