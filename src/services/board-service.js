import api from "./api"

export default {
  async get(id) {
    var response = await api.get(`boards/${id}`);
    return response.data;
  },
  async list() {
    var response = await api.get("boards");
    return response.data;
  },
  async register(board) {
    var response = await api.post(`boards`, board);
    return response.data;
  },
  async update(id, board) {
    await api.put(`boards/${id}`, board);
  },
  async listColumns(id) {
    var response = await api.get(`boards/${id}/columns`);
    return response.data;
  },
  async addColumn(id, column) {
    var response = await api.post(`boards/${id}/columns`, column)
    return response.data;
  },
  async editColumn(id, column) {
    await api.put(`boards/${id}/columns/${column.id}`, column);
  },
  async deleteColumn(id, column) {
    await api.delete(`boards/${id}/columns/${column.id}`);
  }
}
