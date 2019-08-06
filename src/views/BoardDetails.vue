<template>
  <div class="board-details">
    <h3>{{board.title}}</h3>
    <button @click="startAddingColumn" class="btn btn-primary mb-3 mr-1">Add column</button>
    <button @click="showModal" class="btn btn-success mb-3">Add card</button>

    <div class="card-group">
      <div v-for="column of columns" :key="column.id" class="card card-column">
        <div v-if="column.id == actionColumn.id" class="card-header column-editing">
          <input type="text" v-model="actionColumn.title" class="form-control form-control-sm" />
          <div class="btn-options text-right">
            <b-button @click="editColumn" size="sm" variant="success" class="mr-1">ok</b-button>
            <b-button @click="cancelEditingColumn" size="sm" variant="danger">cancel</b-button>
          </div>
        </div>
        <div v-else class="card-header">
          {{column.title}}
          <div class="btn-options edit text-right">
            <b-button
              @click="startEditingColumn(column)"
              size="sm"
              variant="success"
              class="mr-1"
            >edit</b-button>
            <b-button @click="deleteColumn(column.id)" size="sm" variant="danger">delete</b-button>
          </div>
        </div>
        <div class="card-body">
          <div class="text-center">
            <button class="btn btn-info card-add">Add card</button>
          </div>
        </div>
      </div>
      <div v-if="adding" class="card card-column">
        <div class="card-header column-editing">
          <input type="text" v-model="actionColumn.title" class="form-control form-control-sm" />
          <div class="btn-options text-right">
            <b-button @click="addColumn" size="sm" variant="success" class="mr-1">ok</b-button>
            <b-button @click="cancelAddingColumn" size="sm" variant="danger">cancel</b-button>
          </div>
        </div>
        <div class="card-body"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "boardColumns"
);

import CardAdd from "./CardAdd";

export default {
  name: "BoardDetails",
  methods: {
    ...mapMutations([
      "startAddingColumn",
      "cancelAddingColumn",
      "startEditingColumn",
      "cancelEditingColumn"
    ]),
    ...mapActions(["loadData", "addColumn", "editColumn", "deleteColumn"]),
    showModal() {
      this.$modal.show(
        CardAdd,
        {
          text: "This text is passed as a property"
        },
        {
          height: "auto"
        },
        {
          "before-close": event => {
            console.log("this will be called before the modal closes", event);
          }
        }
      );
    }
  },
  computed: {
    ...mapState(["board", "columns", "adding", "actionColumn"])
  },
  created() {
    this.loadData(this.$route.params.id);
  }
};
</script>
<style lang="scss" >
.board-details {
  .card-column {
    max-width: 300px;

    .card-header {
      &.column-editing {
        padding-top: 0.5275rem;
        padding-bottom: 0.5275rem;
      }

      .btn-options {
        position: absolute;

        &.edit {
          display: none;
        }
      }

      &:hover .btn-options.edit {
        display: block;
      }
    }

    .card-body {
      .card-add {
        visibility: hidden;
      }

      &:hover .card-add {
        visibility: visible;
      }
    }
  }
}
</style>


