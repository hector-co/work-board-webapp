<template>
  <div class="board-details">
    <h3>{{board.title}}</h3>
    <button @click="startAddingColumn" class="btn btn-primary mb-3">Add column</button>

    <div class="card-group">
      <div v-for="column of board.columns" :key="column.id" class="card card-column">
        <div v-if="column.id == editingColumn.id" class="card-header column-editing">
          <input type="text" v-model="editingColumn.title" class="form-control form-control-sm" />
          <div class="btn-options text-right">
            <b-button @click="acceptEditingColumn" size="sm" variant="success" class="mr-1">ok</b-button>
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
            <b-button @click="deleteColumn(column)" size="sm" variant="danger">delete</b-button>
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
          <input type="text" v-model="newColumnTitle" class="form-control form-control-sm" />
          <div class="btn-options text-right">
            <b-button @click="acceptAddingColumn" size="sm" variant="success" class="mr-1">ok</b-button>
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
const { mapState } = createNamespacedHelpers("boards");

export default {
  name: "BoardDetails",
  data() {
    return {
      adding: false,
      newColumnTitle: "",
      editingColumn: {}
    };
  },
  methods: {
    startAddingColumn() {
      this.adding = true;
      this.newColumnTitle = "New column";
    },
    cancelAddingColumn() {
      this.adding = false;
      this.newColumnTitle = "";
    },
    acceptAddingColumn() {
      this.$store
        .dispatch("boards/addColumn", { title: this.newColumnTitle })
        .then(() => this.cancelAddingColumn());
    },
    startEditingColumn(column) {
      this.editingColumn = Object.assign({}, column);
    },
    cancelEditingColumn() {
      this.editingColumn = {};
    },
    acceptEditingColumn() {
      this.$store
        .dispatch("boards/editColumn", this.editingColumn)
        .then(() => this.cancelEditingColumn());
    },
    deleteColumn(column) {
      this.$store.dispatch("boards/deleteColumn", column.id);
    }
  },
  computed: {
    ...mapState({
      board: "selectedBoard"
    })
  },
  created() {
    this.$store.dispatch("boards/select", this.$route.params.id);
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


