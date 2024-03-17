import {getToken, setToken} from '@/utils/auth'

const state = {
    token: getToken()
}

const mutations = {
    SET_TOKEN: (state, token) => {
        setToken(token)
        state.token = token
    }
}

const actions = {
    setToken({commit}, token) {
        commit('SET_TOKEN', token)
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
