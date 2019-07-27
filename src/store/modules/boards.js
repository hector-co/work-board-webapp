import boardService from '../../services/board-service'

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
    },
    updateBoard(store, data) {
      var board = store.data.find(b => b.id == data.id);
      Object.assign(board, data);
    }
  },
  actions: {
    loadData({ commit }, ) {
      boardService.list()
        .then(result => commit('setData', result))
    },
    update({ commit }, board) {
      boardService.update(board.id, board)
        .then(() => commit('updateBoard', board))
    }
  }
}