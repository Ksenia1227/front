<template>
  <div class="home">
    <div v-if="favourites.length === 0" class="favourites-message">
      У вас пока нет избранного
    </div>
    <div v-else class="recipes-list">
      <router-link
        v-for="favourite in paginatedFavourites"
        :key="favourite.recipesId.id"
        :to="`/recipeById/${favourite.recipesId.id}`"
        class="recipe-card-link"
      >
      <cardRecipe 
        :name="favourite.recipesId.name" 
        :photo="`${serverUrl}/${favourite.recipesId.photo}`" 
      ></cardRecipe>
      </router-link>    
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
    name: 'favouritePage',
    data() {
        return {
            favourites: [],
            serverUrl:process.env.VUE_APP_SERVER,
            numberPage: 1,
            size: 6,
        }
    },
    computed:{
      paginatedFavourites(){
      if (!this.favourites) return []
      const start = (this.numberPage - 1) * this.size;
    const end = start + this.size
    return this.favourites.slice(start, end)
},
pageCount(){
      return this.favourites ?Math.ceil(this.favourites.length/this.size):0;
}
  },
    methods: {
        ...mapActions({
            getFavourite: 'favourite/getFavourite',
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
