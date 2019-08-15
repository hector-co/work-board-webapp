import api from "./api"

export default {
  async list(boardId) {
    var response = await api.get(`cards?boardId=${boardId}`);
    return response.data;
  },
  async register(card) {
    var response = await api.post(`cards`, card);
    return response.data;
  }
}