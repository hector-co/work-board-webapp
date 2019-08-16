export class CardModel {
  constructor() {
    this.id = 0;
    this.board = null;
    this.column = null;
    this.title = "";
    this.description = "";
    this.color = 1;
    this.priority = 2;
    this.estimatedPoints = 0;
    this.consumedPoints = 0;
    this.done = false;
    this.order = 1;
  }

  static create({ id, board, column, title, description, color, priority, estimatedPoints, consumedPoints, done, order }) {
    var model = new CardModel();
    model.id = id;
    model.board = board;
    model.column = column;
    model.title = title;
    model.description = description;
    model.color = color;
    model.priority = priority;
    model.estimatedPoints = estimatedPoints;
    model.consumedPoints = consumedPoints;
    model.done = done;
    model.order = order;

    return model;
  }
}