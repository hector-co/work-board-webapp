import boardService from "../../services/board-service"
import cardsService from "../../services/card-service"

export default {
  namespaced: true,
  state: {
    board: {
      id: Number,
      title: String
    },
    columns: []
  },
  actions: {
    loadData({ commit }, boardId) {
      let board;
      let columns;
      let cards;
      boardService.get(boardId)
        .then(result => { board = result.data })
        .then(() => boardService.listColumns(boardId))
        .then(result => { columns = result.data })
        .then(() => cardsService.list(boardId))
        .then(result => { cards = result.data })
        .then(() => {
          columns.forEach(column => {
            column.cards = cards.filter(c => c.column.id == column.id);
          });
        })
        .then(() => commit('loadData', { board, columns, cards }));
    },
    async addColumn({ commit, state }, column) {
      const result = await boardService.addColumn(state.board.id, column);
      commit("addColumn", result.data);
    },
    async editColumn({ commit, state }, column) {
      await boardService.editColumn(state.board.id, column);
      commit("editColumn", column);
    },
    deleteColumn({ commit, state }, columnId) {
      boardService.deleteColumn(state.board.id, columnId)
        .then(commit("deleteColumn", columnId));
    },
    addCard({ commit }, card) {
      cardsService.register(card)
        .then(result => commit("addCard", result.data));
    }
  },
  mutations: {
    loadData(state, { board, columns }) {
      state.board = board;
      state.columns = columns;
    },
    addColumn(state, column) {
      state.columns.push(column);
    },
    editColumn(state, column) {
      var existent = state.columns.find(c => c.id == column.id);
      Object.assign(existent, column);
    },
    deleteColumn(state, columnId) {
      var column = state.columns.find(c => c.id == columnId);
      var index = state.columns.indexOf(column);
      state.columns.splice(index, 1);
    },
    addCard(state, card) {
      var column = state.columns.find(c => c.id == card.column.id);
      column.cards.push(card);
    }
  }
}