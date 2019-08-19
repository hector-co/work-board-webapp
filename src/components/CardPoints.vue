<template>
  <div class="card-points">
    <div class="card">
      <div class="card-header">Update card points</div>
      <div class="card-body">
        <b-form-group id="label-fieldset" label="Card" label-for="label-input">
          <b-form-input id="label-input" v-model="label" readonly></b-form-input>
        </b-form-group>
        <b-form-group id="consumed-fieldset" label="Consumed points" label-for="consumed-input">
          <b-form-input id="consumed-input" v-model="consumedPoints" type="number"></b-form-input>
        </b-form-group>
        <b-form-group id="estimated-fieldset" label="Estimated points" label-for="estimated-input">
          <b-form-input id="estimated-input" v-model="estimatedPoints" type="number"></b-form-input>
        </b-form-group>
      </div>
      <div class="card-footer text-right">
        <button @click="save" class="btn btn-success mr-1">Update</button>
        <button @click="close" class="btn btn-secondary">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { CardModel } from "../models/card-model";
const { mapActions } = createNamespacedHelpers("boardDetails");

export default {
  name: "CardPoints",
  data() {
    return {
      consumedPoints: Number,
      estimatedPoints: Number
    };
  },
  props: {
    card: CardModel
  },
  computed: {
    label() {
      return `c-${this.card.id} ${this.card.title}`;
    }
  },
  methods: {
    ...mapActions(["updateCardPoints"]),
    save() {
      this.updateCardPoints({
        card: this.card,
        estimatedPoints: this.estimatedPoints,
        consumedPoints: this.consumedPoints
      });
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    }
  },
  created() {
    this.consumedPoints = this.card.consumedPoints;
    this.estimatedPoints = this.card.estimatedPoints;
  }
};
</script>