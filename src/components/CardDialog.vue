<template>
  <div class="card-add">
    <div class="card">
      <div class="card-header">{{actionLabel}} card</div>
      <div class="card-body">
        <b-form-group id="code-fieldset" v-if="isEdit" label="Code" label-for="code-input">
          <b-form-input id="code-input" v-model="code" readonly></b-form-input>
        </b-form-group>
        <b-form-group id="title-fieldset" label="Title" label-for="title-input">
          <b-form-input id="title-input" v-model="title"></b-form-input>
        </b-form-group>
        <b-form-group id="description-fieldset" label="Description" label-for="description-input">
          <b-form-textarea id="description-input" v-model="description"></b-form-textarea>
        </b-form-group>
        <b-form-group id="color-fieldset" label="Color" label-for="color-input">
          <b-container>
            <b-row>
              <b-col>
                <button
                  @click="setColor(1)"
                  class="btn btn-sm btn-success card-color w-100"
                >{{color==1?"X":"&nbsp;"}}</button>
              </b-col>
              <b-col>
                <button
                  @click="setColor(2)"
                  class="btn btn-sm btn-primary card-color w-100"
                >{{color==2?"X":"&nbsp;"}}</button>
              </b-col>
              <b-col>
                <button
                  @click="setColor(3)"
                  class="btn btn-sm btn-info card-color w-100"
                >{{color==3?"X":"&nbsp;"}}</button>
              </b-col>
              <b-col>
                <button
                  @click="setColor(4)"
                  class="btn btn-sm btn-warning card-color w-100"
                >{{color==4?"X":"&nbsp;"}}</button>
              </b-col>
              <b-col>
                <button
                  @click="setColor(5)"
                  class="btn btn-sm btn-danger card-color w-100"
                >{{color==5?"X":"&nbsp;"}}</button>
              </b-col>
              <b-col>
                <button
                  @click="setColor(6)"
                  class="btn btn-sm btn-secondary card-color w-100"
                >{{color==6?"X":"&nbsp;"}}</button>
              </b-col>
            </b-row>
          </b-container>
        </b-form-group>
        <b-form-group id="priority-fieldset" label="Priority" label-for="priority-input">
          <b-form-select v-model="priority">
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
          </b-form-select>
        </b-form-group>
        <b-form-group id="estimated-fieldset" label="Estimated points" label-for="estimated-input">
          <b-form-input id="estimated-input" v-model="estimatedPoints" type="number"></b-form-input>
        </b-form-group>
      </div>
      <div class="card-footer text-right">
        <button @click="save" class="btn btn-success mr-1">{{actionLabel}}</button>
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
  name: "CardAdd",
  data() {
    return {
      title: String,
      description: String,
      color: Number,
      priority: Number,
      estimatedPoints: Number
    };
  },
  props: {
    card: CardModel
  },
  methods: {
    ...mapActions(["addCard", "editCard"]),
    setColor(newColor) {
      this.color = newColor;
    },
    save() {
      if (!this.isEdit) {
        this.addCard({
          ...this.$data,
          boardId: this.card.board.id,
          columnId: this.card.column ? this.card.column.id : null
        });
      } else {
        this.editCard({
          id: this.card.id,
          ...this.$data,
          columnId: this.card.column ? this.card.column.id : null
        });
      }
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    }
  },
  computed: {
    code() {
      return `c-${this.card.id}`;
    },
    isEdit() {
      return this.card.id > 0;
    },
    actionLabel() {
      return this.isEdit ? "Update" : "Add";
    }
  },
  created() {
    this.card = this.card || new CardModel();
    this.title = this.card.title;
    this.description = this.card.description;
    this.color = this.card.color;
    this.priority = this.card.priority;
    this.estimatedPoints = this.card.estimatedPoints;
  }
};
</script>
<style lang="scss">
button.card-color {
  font-weight: bold;
}
</style>
