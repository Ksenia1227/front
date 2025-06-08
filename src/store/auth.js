import router from '@/router'
import instance from '@/middlewares'

const checkStatuses = (status) => {
    switch (status) {
        case 400:
            window.alert('Проблема от клиента.')
            return false
        case 403:
            window.alert('Пользователь не авторизован')
            return false
        case 404:
            window.alert('Пользователь не найден.')
            return false
        case 409:
            window.alert('Этот email уже используется. Попробуйте другой')
            return false
        case 401:
            window.alert('Неверный пароль. Попробуйте снова.')
            return false
        case 500:
            window.alert('Произошла ошибка на сервере. Попробуйте позже.')
            return false
        default:
            return true
    }
}

export default {
    name: 'auth',
    state: () => ({
        isAuth: false
    }),
    getters: {
    },
    mutations: {
        setAuth(state, isAuth) {
            state.isAuth = isAuth
        }
    },
    actions: {
        async register(_, { email, password, name }) {
            const response = await fetch(`${process.env.VUE_APP_SERVER}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    email,
                    password,
                    name
                })
            })
            if (!checkStatuses(response.status)) return
            window.alert('Вы успешно зарегистрированы!')
            router.push('/')
            return
        },
        async login({ commit }, { email, password }) {
            const response = await fetch(`${process.env.VUE_APP_SERVER}/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            if (!checkStatuses(response.status)) return
            const result = await response.json()
            commit('setAuth', true)
            localStorage.setItem('accessToken', result.accessToken)
            localStorage.setItem('refreshToken', result.refreshToken)
            localStorage.setItem('uid', result.uid)
            localStorage.setItem('role', result.role)
            router.push('/main')
            return
        },
        logout({ commit }) {
            commit('setAuth', false)
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('uid')
            localStorage.removeItem('role')
            router.push('/')
        },
        async changeAccess() {
            const response = await instance.post('/api/auth/change-access', {}, {
                headers: {
                    'x-refresh-token': localStorage.getItem('refreshToken')
                }
            })
            if (!checkStatuses(response.status)) return
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            return
        }
    },
    namespaced: true
}