<template>
  <div class="board-details">
    <h3>{{board.title}}</h3>
    <button @click="startAddingColumn" class="btn btn-primary mb-3 mr-1">Add column</button>
    <button @click="showCardAdd(null)" class="btn btn-success mb-3">Add card</button>

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
          <div
            v-for="card of column.cards"
            :key="card.id"
            class="card text-white bg-info card-board"
          >
            <div class="card-body">
              <h5 class="card-title">{{card.title}}</h5>
            </div>
          </div>
          <div class="text-center">
            <button @click="showCardAdd(column.id)" class="btn btn-info card-add">Add card</button>
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
const { mapState, mapActions } = createNamespacedHelpers("boardDetails");

import CardAdd from "./CardAdd";

export default {
  name: "BoardDetails",
  data() {
    return {
      boardId: Number,
      adding: false,
      actionColumn: {
        id: Number,
        title: String
      }
    };
  },
  methods: {
    ...mapActions(["loadData", "editColumn", "deleteColumn"]),
    startAddingColumn() {
      this.adding = true;
      this.actionColumn.id = 0;
      this.actionColumn.title = "New column";
    },
    cancelAddingColumn() {
      this.adding = false;
    },
    addColumn() {
      this.$store
        .dispatch("boardDetails/addColumn", this.actionColumn)
        .then(() => this.cancelAddingColumn());
    },
    startEditingColumn(column) {
      this.adding = false;
      this.actionColumn.id = column.id;
      this.actionColumn.title = column.title;
    },
    cancelEditingColumn() {
      this.actionColumn.id = 0;
    },
    editColumn() {
      this.$store
        .dispatch("boardDetails/editColumn", this.actionColumn)
        .then(() => this.cancelEditingColumn());
    },
    showCardAdd(columnId) {
      this.$modal.show(
        CardAdd,
        {
          boardId: this.boardId,
          columnId
        },
        {
          height: "auto"
        }
      );
    }
  },
  computed: {
    ...mapState(["board", "columns"])
  },
  created() {
    this.boardId = this.$route.params.id;
    return this.loadData(this.boardId);
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


