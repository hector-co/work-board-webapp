import { BoardService } from '../../services'

let boardService = new BoardService()

export default {
  namespaced: true,
  state: {
    data: [],
    totalCount: 0
  },
  mutations: {
    setData(store, { data, totalCount }) {
      store.data = data;
      store.totalCount = totalCount;
    }
  },
  actions: {
    loadData({ commit }) {
      boardService.list()
        .then(result => commit('setData', result))
    }
  }
}