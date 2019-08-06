import boardService from "../../services/board-service"

export default {
  namespaced: true,
  state: {
    boards: [],
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
      var existent = state.boards.find(b => b.id == board.id);
      Object.assign(existent, board);
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
    }
  }
}