<template>
  <div class="board-list">
    <h3>Boards</h3>

    <div class="cards-grid">
      <div class="card-column" v-for="board in boards" :key="board.id">
        <div v-if="board.id == actionBoard.id" class="card bg-primary">
          <div class="card-body">
            <input
              type="text"
              v-model="actionBoard.title"
              class="form-control form-control-sm mb-1"
              placeholder="Title"
            />
            <input
              type="text"
              v-model="actionBoard.description"
              class="form-control form-control-sm mb-1"
              placeholder="Description"
            />
          </div>
          <div class="card-footer text-right">
            <b-button @click="update" size="sm" variant="success" class="mr-1">ok</b-button>
            <b-button @click="cancelUpdating" size="sm" variant="danger">cancel</b-button>
          </div>
        </div>
        <div v-else @click="boardDetails(board)" class="card text-white bg-primary card-board">
          <div class="card-body">
            <h5 class="card-title">{{board.title}}</h5>
            <p class="card-text">{{board.description}}</p>
          </div>
          <div class="card-footer text-right">
            <button @click.stop="startUpdating(board)" class="btn btn-success btn-sm btn-card">edit</button>
          </div>
        </div>
      </div>
      <div class="card-column">
        <div v-if="registering" class="card bg-light border-primary">
          <div class="card-body">
            <input
              type="text"
              v-model="actionBoard.title"
              class="form-control form-control-sm mb-1"
              placeholder="Title"
            />
            <input
              type="text"
              v-model="actionBoard.description"
              class="form-control form-control-sm mb-1"
              placeholder="Description"
            />
          </div>
          <div class="card-footer text-right">
            <b-button @click="register" size="sm" variant="success" class="mr-1">ok</b-button>
            <b-button @click="cancelRegistering" size="sm" variant="danger">cancel</b-button>
          </div>
        </div>
        <div v-else class="card bg-light">
          <div class="card-body text-center">
            <button @click="startRegistering" class="btn btn-primary">Add board</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "boards"
);

export default {
  name: "BoardList",
  methods: {
    ...mapMutations([
      "startRegistering",
      "cancelRegistering",
      "startUpdating",
      "cancelUpdating"
    ]),
    ...mapActions(["loadData", "register", "update"]),
    boardDetails(board) {
      this.$router.push({ name: "boards-details", params: { id: board.id } });
    }
  },
  computed: {
    ...mapState(["boards", "totalCount", "registering", "actionBoard"])
  },
  created() {
    return this.loadData();
  }
};
</script>
<style lang="scss">
.board-list {
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    height: 100%;

    .card-column {
      display: flex;

      .card {
        width: 100%;

        .card-body {
          min-height: 110px;
        }
      }

      .card-board {
        cursor: pointer;
      }

      .btn-card {
        visibility: hidden;
      }

      &:hover {
        .btn-card {
          visibility: visible;
        }
      }
    }
  }
}
</style>

