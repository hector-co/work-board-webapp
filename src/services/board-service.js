import api from './api'

export default {
  async get(id) {
    var response = await api.get(`boards/${id}`);
    return response.data;
  },
  async list() {
    var response = await api.get('boards');
    return response.data;
  },
  async register(board) {
    await api.post(`boards`, board);
  },
  async update(id, board) {
    await api.put(`boards/${id}`, board);
  }
}
