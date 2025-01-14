<template>
  <div class="recipe-card">
    <img :src="photo" :alt="`Photo of ${name}`" class="recipe-image" />
    <div class="recipe-info">
      <h3>{{ name }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cardRecipe',
  props: {
    name: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.recipe-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px;
  padding: 16px;
  text-align: center;
  background-color: #fff;
}

.recipe-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.recipe-info {
  margin-top: 10px;
}

h3 {
  font-size: 1.2em;
  color: #333;
}
</style>