import api from "./api"
import { CardModel } from "../models/card-model";

export default {
  async list(boardId) {
    var response = await api.get(`cards?boardId=${boardId}&sort=order`);
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
  },
  async update(card) {
    await api.put(`cards/${card.id}`, card);
  },
  async move(cardId, columnId, order) {
    await api.post(`cards/${cardId}/move`, { columnId, order });
  },
  async updatePoints(cardId, estimatedPoints, consumedPoints) {
    await api.post(`cards/${cardId}/points`, { estimatedPoints, consumedPoints });
  }
}