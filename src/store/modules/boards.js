import boardService from "../../services/board-service"

export default {
  namespaced: true,
  state: {
    includeClosedBoards: false,
    boards: [],
    prevSelectedId: Number,
    selected: {
      id: Number,
      title: String
    },
    totalCount: Number
  },
  actions: {
    async loadData({ commit }, includeClosedBoards) {
      const result = await boardService.list(includeClosedBoards);
      commit("loadData", { data: result.data, totalCount: result.totalCount, includeClosedBoards });
    },
    async register({ commit }, board) {
      const result = await boardService.register(board);
      commit("register", result.data);
    },
    async update({ commit }, board) {
      await boardService.update(board.id, board);
      commit("update", board);
    },
    async close({ commit }, board) {
      await boardService.close(board.id);
      commit("close", board);
    },
    async reOpen({ commit }, board) {
      await boardService.reOpen(board.id);
      commit("reOpen", board);
    },
  },
  mutations: {
    select(state, board) {
      state.prevSelectedId = state.selected.id;
      state.selected = board;
    },
    loadData(state, { data, totalCount, includeClosedBoards }) {
      state.boards = data;
      state.totalCount = totalCount;
      state.includeClosedBoards = includeClosedBoards;
    },
    register(state, board) {
      state.boards.push(board);
    },
    update(state, board) {
      var existent = state.boards.find(b => b.id == board.id);
      Object.assign(existent, board);
    },
    close(state, board) {
      if (!state.includeClosedBoards) {
        var index = state.boards.indexOf(board);
        if (index < 0) return;
        state.boards.splice(index, 1);
      } else {
        var existent = state.boards.find(b => b.id == board.id);
        existent.state = 1;
      }
    },
    reOpen(state, board) {
      var existent = state.boards.find(b => b.id == board.id);
      existent.state = 0;
    }
  }
}