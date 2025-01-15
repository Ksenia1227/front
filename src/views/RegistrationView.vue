<template>
  <div class="home">
  <div class="form-container">
  <h1>Регистрация</h1>
    <form @submit.prevent="go_register">
      <my-input type="email" placeholder="Введите email" v-model:value="email"></my-input>
      <my-input type="password" placeholder="Введите password" v-model:value="password"></my-input>
      <my-input placeholder="Введите name" v-model:value="name"></my-input>
      <my-button type="submit" class="signin-button">Регистрация</my-button>
      <span>Уже есть аккаунт? <a href="/" class="signin-link">Войти</a></span>
    </form>
  </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RegistrationPage',
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

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/background.jpg'); 
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding: 20px;
}

.form-container {
  background-color: rgba(223, 223, 223, 0.95); 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(1, 1, 1, 0.2);
  width: 400px;
  row-gap: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
}
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 30px;
  margin-bottom: 20px;
}
span {
  text-align: center;
}

.signin-button {
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

.signin-button:hover {
  background-color:rgb(20, 75, 23); 
  transform: scale(1.05); 
}
.signin-link {
  color:rgb(6, 6, 6);
  font-weight: bold;
  text-decoration: none;
}

.signin-link:hover {
  text-decoration: underline;
}
</style>