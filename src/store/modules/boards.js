import boardService from "../../services/board-service"

export default {
  namespaced: true,
  state: {
    boards: [],
    selected: {
      id: Number,
      title: String
    },
    totalCount: 0
  },
  actions: {
    async loadData({ commit }, ) {
      const result = await boardService.list();
      commit("loadData", result);
    },
    async register({ commit }, board) {
      const result = await boardService.register(board);
      commit("register", result.data);
    },
    async update({ commit }, board) {
      await boardService.update(board.id, board);
      commit("update", board);
    }
  },
  mutations: {
    select(state, board) {
      state.selected = board;
    },
    loadData(state, { data, totalCount }) {
      state.boards = data;
      state.totalCount = totalCount;
    },
    register(state, board) {
      state.boards.push(board);
    },
    update(state, board) {
      var existent = state.boards.find(b => b.id == board.id);
      Object.assign(existent, board);
    }
  }
}