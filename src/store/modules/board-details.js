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
    async loadData({ commit }, boardId) {
      let board;
      let columns;
      let cards;

      board = (await boardService.get(boardId)).data;
      columns = (await boardService.listColumns(boardId)).data;
      cards = (await cardsService.list(boardId)).data;

      columns.forEach(column => {
        column.cards = cards.filter(c => c.column.id == column.id);
      });

      commit('loadData', { board, columns, cards });
    },
    async addColumn({ commit, state }, column) {
      const result = await boardService.addColumn(state.board.id, column);
      commit("addColumn", result.data);
    },
    async editColumn({ commit, state }, column) {
      await boardService.editColumn(state.board.id, column);
      commit("editColumn", column);
    },
    async deleteColumn({ commit, state }, columnId) {
      await boardService.deleteColumn(state.board.id, columnId);
      commit("deleteColumn", columnId);
    },
    async addCard({ commit }, card) {
      const result = await cardsService.register(card);
      commit("addCard", result.data);
    },
    async editCard({ commit }, card) {
      await cardsService.update(card);
      commit("editCard", card);
    },
    async moveCard({ commit }, { cardId, sourceColumnId, targetColumnId, order }) {
      await cardsService.move(cardId, targetColumnId, order);
      commit("moveCard", { cardId, sourceColumnId, targetColumnId, order });
    },
    async updateCardPoints({ commit }, { card, estimatedPoints, consumedPoints }) {
      await cardsService.updatePoints(card.id, estimatedPoints, consumedPoints);
      commit("updateCardPoints", { card, estimatedPoints, consumedPoints });
    }
  },
  mutations: {
    loadData(state, { board, columns }) {
      state.board = board;
      state.columns = columns;
    },
    addColumn(state, column) {
      column.cards = [];
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
    },
    editCard(state, card) {
      var column = state.columns.find(c => c.id == card.columnId);
      var actualCard = column.cards.find(c => c.id == card.id);
      actualCard.title = card.title;
      actualCard.description = card.description;
      actualCard.color = card.color;
      actualCard.priority = parseInt(card.priority);
      actualCard.estimatedPoints = card.estimatedPoints;
    },
    moveCard(state, { cardId, sourceColumnId, targetColumnId }) {
      if (sourceColumnId == targetColumnId) return;
      var targetColumn = state.columns.find(c => c.id == targetColumnId);
      var card = targetColumn.cards.find(c => c.id == cardId);
      card.column = targetColumn;
    },
    updateCardPoints(state, { card, estimatedPoints, consumedPoints }) {
      card.estimatedPoints = estimatedPoints;
      card.consumedPoints = consumedPoints;
    }
  }
}