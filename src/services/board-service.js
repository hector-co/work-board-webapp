import httpClient from '.'

export class BoardService {
  async list() {
    var response = await httpClient.get('boards');
    return response.data;
  }
}