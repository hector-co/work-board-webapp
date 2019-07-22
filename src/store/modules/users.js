import httpClient from '../../services'
import { UserService } from '../../services'

let userService = new UserService(httpClient)

export default {
  namespaced: true,
  state: {
    users: [],
    totalCount: 0
  },
  mutations: {
    setUsers(state, { data, totalCount }) {
      state.users = data
      state.totalCount = totalCount;
    }
  },
  actions: {
    getUsers({ commit }) {
      userService.list()
        .then(result => commit('serUsers', result));
    }
  }
}
