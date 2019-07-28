import boardService from "../../services/board-service"

export default {
  namespaced: true,
  state: {
    boards: [],
    selectedBoard: {
      id: 0,
      title: "",
      columns: []
    },
    totalCount: 0
  },
  mutations: {
    setData(state, { data, totalCount }) {
      state.boards = data;
      state.totalCount = totalCount;
    },
    register(state, data) {
      state.boards.push(data)
    },
    update(state, data) {
      var board = state.boards.find(b => b.id == data.id);
      Object.assign(board, data);
    },
    select(state, data) {
      Object.assign(state.selectedBoard, data);
    },
    addColumn(state, data) {
      state.selectedBoard.columns.push(data);
    },
    editColumn(state, data) {
      var column = state.selectedBoard.columns.find(c => c.id == data.id);
      Object.assign(column, data);
    },
    deleteColumn(state, id) {
      var column = state.selectedBoard.columns.find(c => c.id == id);
      var index = state.selectedBoard.columns.indexOf(column);
      state.selectedBoard.columns.splice(index, 1);
    }
  },
  actions: {
    loadData({ commit }, ) {
      boardService.list()
        .then(result => commit("setData", result))
    },
    register(store, board) {
      boardService.register(board)
        .then(result => {
          store.commit("register", result.data)
        })
    },
    update({ commit }, board) {
      boardService.update(board.id, board)
        .then(() => commit("update", board))
    },
    select({ commit }, boardId) {
      var selected = {};
      boardService.get(boardId)
        .then(result => selected = result.data)
        .then(() => {
          boardService.listColumns(boardId)
            .then(result => selected.columns = result.data)
            .then(() => commit("select", selected))
        });
    },
    addColumn({ commit, state }, column) {
      boardService.addColumn(state.selectedBoard.id, column)
        .then(result => {
          commit("addColumn", result.data);
        })
    },
    editColumn({ commit, state }, column) {
      boardService.editColumn(state.selectedBoard.id, column)
        .then(() => commit("editColumn", column))
    },
    deleteColumn({ commit, state }, columnId) {
      boardService.deleteColumn(state.selectedBoard.id, columnId)
        .then(commit('deleteColumn', columnId));
    }
  }
}