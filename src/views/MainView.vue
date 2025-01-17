<template>
  <div class="home">
    <h1>Рецепты</h1>
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

</style>

