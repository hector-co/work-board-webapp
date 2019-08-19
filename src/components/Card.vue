<template>
  <div class="c-card" :data-card-id="card.id">
    <div :class="classColor">
      <div class="card-body">
        <h5 @click="select" class="card-title">{{card.title}}</h5>
      </div>
      <div class="card-footer text-right">
        <div class="container">
          <div class="row">
            <div class="col-sm text-left">{{priorityText}}</div>
            <div class="col-sm text-right">{{card.consumedPoints}}/{{card.estimatedPoints}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { CardModel } from "../models/card-model";

export default {
  name: "Card",
  props: {
    card: CardModel
  },
  methods: {
    select() {
      this.$emit("selected", this.card);
    }
  },
  computed: {
    classColor() {
      return `card text-white bg-${this.color} card-board`;
    },
    color() {
      switch (this.card.color) {
        case 1:
          return "success";
        case 2:
          return "primary";
        case 3:
          return "info";
        case 4:
          return "warning";
        case 5:
          return "danger";
        case 6:
          return "secondary";
      }
      return "";
    },
    priorityText() {
      switch (this.card.priority) {
        case 0:
          return "Low";
        case 1:
          return "Medium";
        case 2:
          return "High";
        default:
          return "none";
      }
    }
  }
};
</script>
<style lang="scss">
.c-card {
  .card-title {
    cursor: pointer;
  }
}
</style>