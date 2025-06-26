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
  border-radius: 10px; 
  width: 100%; 
  max-width: 350px; 
  margin: 16px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
}

.recipe-card:hover {
  transform: translateY(-8px); 
}

.recipe-image {
  width: 100%;
  height: 250px; 
  object-fit: cover; 
  border-radius: 8px; 
}

h3 {
  margin-top: 12px;
  font-size: 1.4em; 
  font-weight: 600; 
  color: #030203;
  line-height: 1.4; 
  margin: 0;
  text-align: center; 
}
@media (max-width: 1170px) {
  .recipe-card {
  width: 100%; 
  max-width: 330px; 
  margin: 14px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
}

.recipe-image {
  width: 100%;
  height: 230px; 
  object-fit: cover; 
  border-radius: 8px; 
}

h3 {
  margin-top: 10px;
  font-size: 1.2em; 
}
}
@media (max-width: 370px) {
  .recipe-card {
  width: 90%; 
  max-width: 280px; 
}

.recipe-image {
  height: 210px; 
}

h3 {
  margin-top: 9px;
  font-size: 14px; 
}
}
@media (max-width: 270px) {
  .recipe-card {
  width: 90%; 
  max-width: 280px; 
}

.recipe-image {
  height: 210px; 
}

h3 {
  display: none;
}
}
</style>