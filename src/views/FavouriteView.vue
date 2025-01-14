<template>
  <div class="recipes-page">
    <h1>Рецепты</h1>
    <div class="recipes-list">
     <router-link
        v-for="favourite in favourites"
        :key="favourite.recipesId.id"
        :to="`/recipeById/${favourite.recipesId.id}`"
      >
      <cardRecipe 
        :name="favourite.recipesId.name" 
        :photo="`${serverUrl}/${favourite.recipesId.photo}`" 
      ></cardRecipe>
      </router-link>    
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'favouritePage',
    data() {
        return {
            favourites: [],
            serverUrl:process.env.VUE_APP_SERVER
        }
    },
    methods: {
        ...mapActions({
            getFavourite: 'favourite/getFavourite',
        }),
    },
    async mounted() {
      await this.getFavourite()
      this.favourites = this.$store.state.favourite.favourites
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
