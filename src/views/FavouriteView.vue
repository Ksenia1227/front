<template>
  <div class="home">
    <div v-if="favourites.length === 0" class="favourites-message">
      У вас пока нет избранного
    </div>
    <div v-else class="recipes-list">
      <router-link
        v-for="favourite in favourites"
        :key="favourite.recipesId.id"
        :to="`/recipeById/${favourite.recipesId.id}`"
        class="recipe-card-link"
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
.home {
  padding: 20px;
  background-color:rgb(252, 227, 227);
  background-image: url('@/assets/569.jpg');
  background-position: center;
  min-height: 100vh;
}


.recipes-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.recipe-card-link {
  text-decoration: none;
}
.favourites-message {
  text-align: center;
  font-size: 50px;
}
</style>
