export class BoardService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async list() {
    var response = await this.httpClient.get('boards');
    return response.data;
  }
}