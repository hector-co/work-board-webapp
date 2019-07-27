import api from './api'

export default {
  async list() {
    var response = await api.get('users');
    return response.data;
  }
}
