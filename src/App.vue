<template>
  <nav>
     <div class="menu-icon" @click="toggleMenu">
      <span class="bar"></span>
      <span class="bar"></span>
       <span class="bar"></span>
    </div>
    <div :class="{'active': showMenu}" class="menu">
       <div class="close-btn" @click="toggleMenu">×</div>
    <router-link v-if="!isAuth" to="/" class="nav-link">Вход</router-link>
    <router-link to="/main" class="nav-link">Главная</router-link>
    <router-link v-if="isAuth && !isModerator" to="/userPage" class="nav-link">Моя страница</router-link>
    <router-link v-if="isAuth && !isModerator" to="/addRecipe" class="nav-link">Добавить рецепт</router-link>
    <router-link v-if="isAuth  && !isModerator" to="/favourite" class="nav-link">Избранное</router-link>
    <router-link v-if="isAuth && isModerator" to="/newApplications" class="nav-link">Новые заявки</router-link>
    <router-link v-if="isAuth && isModerator" to="/rejectedApplic" class="nav-link">Отклоненные заявки</router-link>
    <router-link v-if="isAuth" to="/" @click="logout" class="nav-link">Выйти</router-link>
    </div>
  </nav>
  <router-view />
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
   data() {
    return {
      showMenu: false
    };
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
  mounted() {
    const uid = localStorage.getItem('uid')
    uid ? this.$store.commit('auth/setAuth', true) : this.$store.commit('auth/setAuth', false)
  },
  computed: {
    ...mapState({ 
      isAuth: state => state.auth.isAuth
    }),
    isModerator() {
    return localStorage.getItem('role') === 'moderator'
  }
}
}
</script>

<style scoped>
.close-btn {
  display: none;
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 24px;
  cursor: pointer;
  color: white;
}
.menu-icon {
  display: none;
  flex-direction: column;
  cursor: pointer;
}
.bar {
  height: 2px;
  width: 20px;
  background-color: rgb(236, 232, 232);
  margin: 3px;
  transition: 0.3s;
}
.menu {
  display: flex;
  flex-direction: row;
}
.menu.active {
  display: flex; 
}
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:rgb(104, 100, 97); 
  padding: 15px 0;
}
.nav-link {
  font-weight: bold;
  color:rgb(236, 232, 232);
  margin: 0 15px;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 20px;
}
.nav-link:hover {
  color:rgb(186, 179, 174); 
}
.nav-link.router-link-exact-active {
  color:#53a4f6; 
}
@media (max-width: 790px) {
.nav-link {
  margin: 0 10px;
  font-size: 18px;
  text-align: center; 
}
}
 @media (max-width: 615px) {
  .menu-icon {
    display: flex;
    position: absolute;
    left: 4px;
    top: 5px;
   
  }
  
  .menu {
    display: none;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 2px;
    height: 100%;
    width: 40%; 
    background-color: rgb(104, 100, 97);
    z-index: 1;
    padding-top: 50px;
    box-shadow: 2px 0 5px rgba(0,0,0,0.2);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  .menu.active {
    display: flex;
    transform: translateX(0);
  }
  .nav-link {
    padding: 8px;
    margin: 0;
  }
 .close-btn {
    display: block;
  }
}
</style>