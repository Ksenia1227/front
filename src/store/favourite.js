import instance from '@/middlewares'


export default {
    name: 'favouritePage',
    state: () => ({
        favourites: null,
    }),
    getters: {
    },
    mutations: {
        setFavourites(state, favourites) {
            state.favourites = favourites
        },
    },
    actions: {
        async getFavourite({ commit }) {
            const favourites = await instance.get('/api/favourites/favourite')
            favourites.data.reverse()
            if (favourites) return commit('setFavourites', favourites.data)
            return
        },
    },
    namespaced: true
}
