import request from '@/utils/request'

const state = {
    ready: 0,
    datas: []
}

const mutations = {
    SET_COUNTRIES: countries => {
        state.datas = countries
    },
    SET_READY: ready => {
        state.ready = ready
    }
}

const actions = {
    loadData({commit}) {
        if (state.ready) {
            return true
        }
        request.get('https://gist.githubusercontent.com/Goles/3196253/raw/9ca4e7e62ea5ad935bb3580dc0a07d9df033b451/CountryCodes.json').then(data => {
            console.log(data)
            commit('SET_COUNTRIES', data)
            commit('SET_READY', 1)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
