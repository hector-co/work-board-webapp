export class CardModel {
  constructor() {
    this.id = 0;
    this.board = null;
    this.column = null;
    this.title = "";
    this.description = "";
    this.color = 1;
    this.priority = 1;
    this.estimatedPoints = 0;
    this.consumedPoints = 0;
    this.done = false;
    this.order = 1;
  }

  static create({ id, board, column, title, description, color, priority, estimatedPoints, consumedPoints, done, order }) {
    var model = new CardModel();
    model.id = id || 0;
    model.board = board;
    model.column = column;
    model.title = title || "";
    model.description = description || "";
    model.color = color || 1;
    model.priority = priority == null ? 1 : priority;
    model.estimatedPoints = estimatedPoints || 0;
    model.consumedPoints = consumedPoints || 0;
    model.done = done || false;
    model.order = order || 1;

    return model;
  }
}