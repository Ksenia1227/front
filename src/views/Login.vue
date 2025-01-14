<template>
  <div class="home">
    <form @submit.prevent="go_login">
      <my-input type="email" placeholder="Введите email" v-model:value="email"></my-input>
      <my-input type="password" placeholder="Введите password" v-model:value="password"></my-input>
      <my-button type="submit">Войти</my-button>
      <span>Нет аккаунта? <a href="/registration">Зарегистрироваться</a></span>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'loginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    async go_login() {
      const formData = {
        email: this.email,
        password: this.password
      }
      await this.login(formData)
    }
  }
}
</script>
<style>
.home {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100svh;
  justify-content: center;
  align-items: center;
}

form {
  display: flex;
  padding: 20px;
  flex-direction: column;
  width: 400px;
  row-gap: 20px;
}
</style>