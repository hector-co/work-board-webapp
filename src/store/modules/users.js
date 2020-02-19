import userService from "../../services/user-service"

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
    async asyncgetUsers({ commit }) {
      const result = await userService.list();
      commit("serUsers", result);
    }
  }
}
