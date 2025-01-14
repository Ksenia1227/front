<template>
  <div class="home">
    <form @submit.prevent="go_register">
      <my-input type="email" placeholder="Введите email" v-model:value="email"></my-input>
      <my-input type="password" placeholder="Введите password" v-model:value="password"></my-input>
      <my-input placeholder="Введите name" v-model:value="name"></my-input>
      <my-button type="submit">Регистрация</my-button>
      <span>Уже есть аккаунт? <a href="/">Войти</a></span>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'registrationPage',
  data() {
    return {
      email: '',
      password: '',
      name: ''
    }
  },
  methods: {
    ...mapActions({
      register: 'auth/register'
    }),
    async go_register() {
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }
      await this.register(formData)
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