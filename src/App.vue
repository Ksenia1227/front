<template>
  <nav>
    <router-link v-if="!isAuth" to="/">Вход</router-link> |
    <router-link to="/main">Главная</router-link> |
    <router-link to="/userPage">Моя страница</router-link> |
    <router-link v-if="isAuth" to="/addRecipe">Добавить рецепт</router-link> |
    <router-link v-if="isAuth" to="/favourite">Избранное</router-link> |
    <router-link v-if="isAuth" to="/" @click="logout()">Выйти</router-link> 
  </nav>
  <router-view />
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      // функция позволяет вам маппировать (привязывать) действия из хранилища (store) Vuex к методам компонента Vue
      logout: 'auth/logout'
    })
  },
  mounted() {
    const uid = localStorage.getItem('uid')
    uid ? this.$store.commit('auth/setAuth', true) : this.$store.commit('auth/setAuth', false)
  },
  computed: {
    ...mapState({ 
      // функция позволяет маппировать (привязывать) состояние из хранилища (store) Vuex в вычисляемые свойства вашего компонента Vue
      isAuth: state => state.auth.isAuth
    })
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
