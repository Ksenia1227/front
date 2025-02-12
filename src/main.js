import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components/UI'
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/styles.css';

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})
// Проходит по каждому компоненту из массива components и регистрирует их глобально с использованием app.component. 
// Это позволяет использовать эти компоненты в любом другом компоненте без необходимости их локального импорта.

app.use(store).use(router).mount('#app')
// Инициализируются Vuex хранилище и маршрутизатор
// приложение привязано к элементу с id="app", то есть в DOM, где будет отображаться ваше приложение
