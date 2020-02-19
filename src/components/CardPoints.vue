<template>
  <div class="card-points">
    <div class="card">
      <div class="card-header">Update card points</div>
      <div class="card-body">
        <b-form-group id="label-fieldset" label="Card" label-for="label-input">
          <b-form-input id="label-input" v-model="label" readonly></b-form-input>
        </b-form-group>
        <b-form-group id="consumed-fieldset" label="Consumed points" label-for="consumed-input">
          <input
            id="consumed-input"
            type="number"
            v-model="consumedPoints"
            class="form-control"
            :class="{'is-invalid': $v.consumedPoints.$error}"
          />
          <p class="invalid-feedback">Required field</p>
        </b-form-group>
        <b-form-group id="estimated-fieldset" label="Estimated points" label-for="estimated-input">
          <input
            id="estimated-input"
            type="number"
            v-model="estimatedPoints"
            class="form-control"
            :class="{'is-invalid': $v.estimatedPoints.$error}"
          />
          <p class="invalid-feedback">Required field</p>
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
import { required, minValue } from "vuelidate/lib/validators";

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
    async save() {
      this.$v.$touch();
      if (this.$v.$anyError) return;
      await this.updateCardPoints({
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
  validations: {
    consumedPoints: { required, minValue: minValue(0) },
    estimatedPoints: { required, minValue: minValue(0) }
  },
  created() {
    this.consumedPoints = this.card.consumedPoints;
    this.estimatedPoints = this.card.estimatedPoints;
  }
};
</script>