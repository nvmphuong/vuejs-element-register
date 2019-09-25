import request from '@/utils/request'

const state = {
    isReady: 0,
    data: []
}

const mutations = {
    SET_COUNTRIES: countries => {
        state.data = countries
    },
    SET_READY: isReady => {
        state.isReady = isReady
    }
}

const actions = {
    loadData({ commit }) {
        // Load data only one times
        if (state.isReady) {
            return true
        }
        request.get('https://gist.githubusercontent.com/Goles/3196253/raw/9ca4e7e62ea5ad935bb3580dc0a07d9df033b451/CountryCodes.json').then(data => {
            state.isReady = true
            state.data = data
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
