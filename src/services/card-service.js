import api from "./api"
import { CardModel } from "../models/card-model";

export default {
  async list(boardId) {
    var response = await api.get(`cards?boardId=${boardId}`);
    return {
      data: response.data.data.map(d => CardModel.create(d)),
      totalCount: response.data.totalCount
    }
  },
  async register(card) {
    var response = await api.post(`cards`, card);
    return {
      data: CardModel.create(response.data.data)
    };
  }
}