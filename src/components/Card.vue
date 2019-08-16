<template>
  <div :class="classColor">
    <div class="card-body">
      <h5 class="card-title">{{card.title}}</h5>
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
  computed: {
    classColor: function() {
      return `card text-white bg-${this.color} card-board`;
    },
    color: function() {
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
    }
  }
};
</script>