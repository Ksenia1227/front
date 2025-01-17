<template>
  <nav>
    <router-link v-if="!isAuth" to="/" class="nav-link">Вход</router-link>
    <router-link to="/main" class="nav-link">Главная</router-link>
    <router-link v-if="isAuth" to="/userPage" class="nav-link">Моя страница</router-link>
    <router-link v-if="isAuth" to="/addRecipe" class="nav-link">Добавить рецепт</router-link>
    <router-link v-if="isAuth" to="/favourite" class="nav-link">Избранное</router-link>
    <router-link v-if="isAuth" to="/" @click="logout" class="nav-link">Выйти</router-link>
  </nav>
  <router-view />
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    })
  },
  mounted() {
    const uid = localStorage.getItem('uid')
    uid ? this.$store.commit('auth/setAuth', true) : this.$store.commit('auth/setAuth', false)
  },
  computed: {
    ...mapState({ 
      isAuth: state => state.auth.isAuth
    })
  }
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:rgb(83, 67, 58); 
  padding: 15px 0;
}

.nav-link {
  font-weight: bold;
  color:rgb(236, 232, 232);
  margin: 0 15px;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 18px;
}

.nav-link:hover {
  color:rgb(208, 197, 173); 
}

.nav-link.router-link-exact-active {
  color:rgb(54, 206, 100); 
}
</style>