<template>
  <div class="home">
    <div class="form-container">
      <h1>Вход</h1>
      <form @submit.prevent="go_login">
        <my-input type="email" placeholder="Введите email" v-model:value="email"></my-input>
        <my-input type="password" placeholder="Введите password" v-model:value="password"></my-input>
        <my-button type="submit" class="login-button">Войти</my-button>
        <span class="register-text">Нет аккаунта? <a href="/registration" class="register-link">Зарегистрироваться</a></span>
      </form>
    </div>
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
<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('@/assets/background.jpg');
  background-size: cover; 
}

.form-container {
  background-color: rgba(223, 223, 223, 0.95); 
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(1, 1, 1, 0.2);
  width: 100%;
  max-width: 400px; 
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 30px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
}

.login-button {
  background-color:rgb(40, 165, 42); 
  color: white; 
  font-size: 16px;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.login-button:hover {
  background-color:rgb(20, 75, 23); 
  transform: scale(1.05); 
}

.register-text {
  text-align: center;
  font-size: 16px;
  color: #333;
}

.register-link {
  color:rgb(6, 6, 6);
  font-weight: bold;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>