export class UserService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async list() {
    var response = await this.httpClient.get('users');
    return response.data;
  }
}
