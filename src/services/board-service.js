import api from "./api"

export default {
  async get(id) {
    var response = await api.get(`boards/${id}`);
    return response.data;
  },
  async list(includeClosed) {
    var url = includeClosed ? `boards?state[in]=0,1` : `boards?state=0`;
    var response = await api.get(url);
    return response.data;
  },
  async register(board) {
    var response = await api.post(`boards`, board);
    return response.data;
  },
  async update(id, board) {
    await api.put(`boards/${id}`, board);
  },
  async close(id) {
    await api.post(`boards/${id}/close`);
  },
  async reOpen(id) {
    await api.post(`boards/${id}/re-open`);
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
  async deleteColumn(id, columnId) {
    await api.delete(`boards/${id}/columns/${columnId}`);
  }
}
