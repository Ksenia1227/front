<template>
  <div class="home">
    <div class="form-container">
      <div class="header-image">
        <img src="@/assets/menu.png" alt="Авторизация"  class="logo-image">
        <h1 class="image-title">Авторизация</h1>
      </div>
      <div class="form-form">
      <form @submit.prevent="go_login">
        <my-input type="email" placeholder="Введите email" v-model:value="email"></my-input>
        <my-input type="password" placeholder="Введите password" v-model:value="password"></my-input>
        <my-button type="submit" class="login-button">Войти</my-button>
        <span class="register-text">Нет аккаунта? <a href="/registration" class="register-link">Зарегистрироваться</a></span>
      </form>
    </div>
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
  background-color: #949494;
  background-image: url('@/assets/569.jpg');
  padding: 0px;
  margin: 0px;
}

.form-container {
  background-color: white;
  padding: 0px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 650px;
  margin: 20px;
}
.form-form {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 650px;
}

.header-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.logo-image {
  width: 100%;
  max-width: 650px;
  border-radius: 10px;
  object-fit: contain;
  opacity: 0.75;
}
.image-title {
  position: absolute; 
  top: 50%; 
  left: 23%; 
  transform: translate(-50%, -50%); 
  color: white; 
  font-size: 40px; 
  font-weight: bold; 
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-button {
  background-color: #BACBDB;
  color: rgb(0, 0, 0);
  font-weight: 600;
  border: none;
  padding: 10px 80px; 
  border-radius: 30px; 
  font-size: 20px;
  cursor: pointer;
  width: auto; 
  margin: 10px auto 0; 
  display: inline-block; 
  min-width: 100px; 
  text-align: center;
   border: 1px solid black;
}

.login-button:hover {
  background-color: #8597a9;
  transform: scale(1.05); 
}

.register-text {
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
  color: #0f0f0f;
}

.register-link {
  color: #131313;
  font-weight: 600;
  font-size: 20px;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
@media (max-width: 580px) {
   .image-title {
    font-size: 32px;
  }
  .register-text {
  font-size: 18px;
}
.register-link {
  font-size: 18px;
}
.login-button {
  font-size: 18px;
  min-width: 50px; 
}
}
@media (max-width: 470px) {
   .image-title {
    font-size: 22px;
  }
  .login-button {
  font-size: 14px;
  min-width: 50px; 
  padding: 10px 60px; 
}
.register-text {
    margin-top: 6px;
  font-size: 16px;
}

.register-link {
  font-size: 16px;
}
}
@media (max-width: 350px) {
   .image-title {
    font-size: 18px;
  }
  .login-button {
  font-size: 12px;
  min-width: 50px; 
  padding: 10px 40px; 
}
.register-text {
  margin-top: 5px;
  font-size: 14px;
}
.register-link {
  font-size: 14px;
}
form{
  gap:10px;
}
}
</style>