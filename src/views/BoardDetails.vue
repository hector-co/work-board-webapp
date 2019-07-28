<template>
  <div class="board-details">
    <h3>{{title}}</h3>
    <button @click="startAddingColumn" class="btn btn-primary mb-3">Add column</button>

    <div class="card-group">
      <div v-for="column of columns" :key="column.id" class="card card-column">
        <div v-if="column.id == editingColumn.id" class="card-header column-editing">
          <input type="text" v-model="editingColumn.title" />
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
        <div class="card-body"></div>
      </div>
      <div v-if="adding" class="card card-column">
        <div class="card-body">
          <input type="text" v-model="newColumnTitle" class="form-control" />
          <div class="text-center mt-2">
            <b-button @click="acceptAddingColumn" size="sm" variant="success" class="mr-1">ok</b-button>
            <b-button @click="cancelAddingColumn" size="sm" variant="danger">cancel</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import boardService from "../services/board-service";

export default {
  name: "BoardDetails",
  data() {
    return {
      id: 0,
      title: "",
      columns: [],
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
    acceptAddingColumn() {
      boardService
        .addColumn(this.id, { title: this.newColumnTitle })
        .then(() => {
          this.columns.push({
            title: this.newColumnTitle
          });
          this.cancelAddingColumn();
          this.loadColumns();
        });
    },
    cancelAddingColumn() {
      this.adding = false;
      this.newColumnTitle = "";
    },
    startEditingColumn(column) {
      this.editingColumn = Object.assign({}, column);
    },
    cancelEditingColumn() {
      this.editingColumn = {};
    },
    acceptEditingColumn() {
      boardService.editColumn(this.id, this.editingColumn).then(() => {
        this.loadColumns();
      });
      this.cancelEditingColumn();
    },
    deleteColumn(column) {
      boardService.deleteColumn(this.id, column).then(() => {
        this.loadColumns();
      });
    },
    loadColumns() {
      boardService.listColumns(this.id).then(result => {
        this.columns = result.data;
      });
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    boardService.get(this.id).then(result => {
      this.title = result.data.title;
    });
    this.loadColumns();
  }
};
</script>
<style lang="scss" >
.board-details {
  .card-column {
    max-width: 300px;

    .card-header {
      &.column-editing {
        padding-bottom: 0.4rem;
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
  }
}
</style>


