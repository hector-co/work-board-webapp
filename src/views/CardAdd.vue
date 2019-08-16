<template>
  <div class="card-add">
    <div class="card">
      <div class="card-header">Add card</div>
      <div class="card-body">
        <b-form-group id="title-fieldset" label="Title" label-for="title-input">
          <b-form-input id="title-input" v-model="card.title" trim></b-form-input>
        </b-form-group>
        <b-form-group id="description-fieldset" label="Description" label-for="description-input">
          <b-form-input id="description-input" v-model="card.description" trim></b-form-input>
        </b-form-group>
        <b-form-group id="color-fieldset" label="Color" label-for="color-input">
          <b-container>
            <b-row>
              <b-col>
                <button
                  @click="setColor(1)"
                  class="btn btn-sm btn-success card-color w-100"
                >{{card.color==1?"X":"&nbsp;"}}</button>
              </b-col>
              <b-col>
                <button
                  @click="setColor(2)"
                  class="btn btn-sm btn-primary card-color w-100"
                >{{card.color==2?"X":"&nbsp;"}}</button>
              </b-col>
              <b-col>
                <button
                  @click="setColor(3)"
                  class="btn btn-sm btn-info card-color w-100"
                >{{card.color==3?"X":"&nbsp;"}}</button>
              </b-col>
              <b-col>
                <button
                  @click="setColor(4)"
                  class="btn btn-sm btn-warning card-color w-100"
                >{{card.color==4?"X":"&nbsp;"}}</button>
              </b-col>
              <b-col>
                <button
                  @click="setColor(5)"
                  class="btn btn-sm btn-danger card-color w-100"
                >{{card.color==5?"X":"&nbsp;"}}</button>
              </b-col>
              <b-col>
                <button
                  @click="setColor(6)"
                  class="btn btn-sm btn-secondary card-color w-100"
                >{{card.color==6?"X":"&nbsp;"}}</button>
              </b-col>
            </b-row>
          </b-container>
        </b-form-group>
        <b-form-group id="priority-fieldset" label="Priority" label-for="priority-input">
          <b-form-select v-model="card.priority">
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
          </b-form-select>
        </b-form-group>
        <b-form-group id="estimated-fieldset" label="Estimated points" label-for="estimated-input">
          <b-form-input id="estimated-input" v-model="card.estimatedPoints" type="number" trim></b-form-input>
        </b-form-group>
      </div>
      <div class="card-footer text-right">
        <button @click="save" class="btn btn-success mr-1">Add</button>
        <button @click="close" class="btn btn-secondary">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("boardDetails");

export default {
  name: "CardAdd",
  data() {
    return {
      card: {
        boardId: 0,
        columnId: null,
        title: "",
        description: "",
        color: 1,
        priority: 1,
        estimatedPoints: 1
      }
    };
  },
  props: {
    boardId: Number,
    columnId: null
  },
  methods: {
    ...mapActions(["addCard"]),
    setColor(newColor) {
      this.card.color = newColor;
    },
    save() {
      this.card.boardId = this.boardId;
      this.card.columnId = this.columnId;
      this.addCard(this.card);
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss">
button.card-color {
  font-weight: bold;
}
</style>
