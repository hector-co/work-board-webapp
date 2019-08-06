import boardService from "../../services/board-service"

export default {
  namespaced: true,
  state: {
    board: {
      id: Number,
      title: String
    },
    columns: [],
    adding: false,
    actionColumn: {
      id: Number,
      title: String
    }
  },
  mutations: {
    loadData(state, { board, columns }) {
      state.board = board;
      state.columns = columns;
    },
    startAddingColumn(state) {
      state.adding = true;
      state.actionColumn.id = 0;
      state.actionColumn.title = "New column";
    },
    cancelAddingColumn(state) {
      state.adding = false;
    },
    addColumn(state, column) {
      state.columns.push(column);
    },
    startEditingColumn(state, column) {
      state.adding = false;
      state.actionColumn.id = column.id;
      state.actionColumn.title = column.title;
    },
    cancelEditingColumn(state) {
      state.actionColumn.id = 0;
    },
    editColumn(state, column) {
      var existent = state.columns.find(c => c.id == column.id);
      Object.assign(existent, column);
    },
    deleteColumn(state, columnId) {
      var column = state.columns.find(c => c.id == columnId);
      var index = state.columns.indexOf(column);
      state.columns.splice(index, 1);
    }
  },
  actions: {
    loadData({ commit }, boardId) {
      let board;
      let columns;
      boardService.get(boardId)
        .then(result => { board = result.data })
        .then(() => boardService.listColumns(boardId))
        .then(result => { columns = result.data })
        .then(() => commit('loadData', { board, columns }));
    },
    addColumn({ commit, state }) {
      boardService.addColumn(state.board.id, state.actionColumn)
        .then(result => {
          commit("addColumn", result.data);
          commit("cancelAddingColumn");
        })
    },
    editColumn({ commit, state }) {
      boardService.editColumn(state.board.id, state.actionColumn)
        .then(() => {
          commit("editColumn", state.actionColumn);
          commit("cancelEditingColumn");
        })
    },
    deleteColumn({ commit, state }, columnId) {
      boardService.deleteColumn(state.board.id, columnId)
        .then(commit("deleteColumn", columnId));
    }
  }
}