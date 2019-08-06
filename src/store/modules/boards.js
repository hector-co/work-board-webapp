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
    totalCount: 0,
    registering: false,
    actionBoard: {
      id: 0,
      title: "",
      description: ""
    },
    editingBoardId: 0
  },
  mutations: {
    loadData(state, { data, totalCount }) {
      state.boards = data;
      state.totalCount = totalCount;
    },
    startRegistering(state) {
      state.actionBoard.id = 0;
      state.actionBoard.title = "New board";
      state.actionBoard.description = "";
      state.registering = true;
    },
    cancelRegistering(state) {
      state.registering = false;
    },
    register(state, board) {
      state.boards.push(board);
    },
    startUpdating(state, { id, title, description }) {
      state.registering = false;
      Object.assign(state.actionBoard, { id, title, description });
    },
    cancelUpdating(state) {
      state.actionBoard.id = 0;
    },
    update(state, board) {
      var existing = state.boards.find(b => b.id == board.id);
      Object.assign(existing, board);
    },
    select(state, board) {
      Object.assign(state.selectedBoard, board);
    },
    addColumn(state, board) {
      state.selectedBoard.columns.push(board);
    },
    editColumn(state, board) {
      var column = state.selectedBoard.columns.find(c => c.id == board.id);
      Object.assign(column, board);
    },
    deleteColumn(state, boardId) {
      var column = state.selectedBoard.columns.find(c => c.id == boardId);
      var index = state.selectedBoard.columns.indexOf(column);
      state.selectedBoard.columns.splice(index, 1);
    }
  },
  actions: {
    loadData({ commit }, ) {
      boardService.list()
        .then(result => commit("loadData", result))
    },
    register({ commit, state }) {
      boardService.register(state.actionBoard)
        .then(result => {
          commit("register", result.data);
          commit("cancelRegistering");
        })
    },
    update({ commit, state }) {
      var board = state.actionBoard;
      boardService.update(board.id, board)
        .then(() => {
          commit("update", board);
          commit("cancelUpdating");
        })
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
        .then(commit("deleteColumn", columnId));
    }
  }
}