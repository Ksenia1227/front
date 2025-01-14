import axios from "axios"
// используется для выполнения HTTP-запросов. 
// В нем настроены экземпляр instance с базовым URL и обработчики для перехвата запросов и ответов.(как интерцепторы)
import store from '@/store'

const instance = axios.create({
    baseURL: process.env.VUE_APP_SERVER,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})
// Перехватчик запросов
instance.interceptors.request.use(
    // перехватчик для всех исходящих запросов.
    function (config) {
        // config - это объект, который содержит все настройки и параметры, используемые при выполнении HTTP-запроса
        config.headers['x-access-token'] = localStorage.getItem('accessToken')
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log('error auth', error.response.status);
        if (error.response.status == 403 && !error.config._retry) {
            // retry (повторный запрос), _retry - это флаг, который обычно добавляется к конфигурации запроса, чтобы пометить запрос как "повторённый". 
            // Это предотвращает дальнейшие попытки повторного запроса, если они уже были сделаны.
            await store.dispatch('auth/changeAccess')
            // dispatch — это метод, который используется для вызова действий
            const _request = error.config
            _request._retry = true
            _request.headers['retry'] = true
            return instance(_request)
        }
        return Promise.reject(error)
    }
)

export default instance