<template>
  <div class="board-list">
    <h3>Boards</h3>

    <div class="cards-grid">
      <div class="card-column" v-for="board in boards" :key="board.id">
        <div v-if="board == editing" class="card bg-primary">
          <div class="card-body">
            <input type="text" v-model="editing.title" class="form-control" placeholder="Title" />
            <input
              type="text"
              v-model="editing.description"
              class="form-control"
              placeholder="Description"
            />
            <div class="text-right mt-2">
              <b-button @click="acceptEditing" size="sm" variant="success" class="mr-1">ok</b-button>
              <b-button @click="cancelEditing" size="sm" variant="danger">cancel</b-button>
            </div>
          </div>
        </div>
        <b-card
          @click="boardDetails(board)"
          v-else
          bg-variant="primary"
          text-variant="white"
          class="card-board"
          :title="board.title"
        >
          <b-card-text>{{board.description}}</b-card-text>
          <div class="text-right">
            <b-button
              @click="startEditing(board)"
              size="sm"
              variant="success"
              class="btn-card mr-1"
            >edit</b-button>
            <!-- <b-button size="sm" variant="danger" class="btn-card">close</b-button> -->
          </div>
        </b-card>
      </div>
      <div v-if="adding" class="card bg-light border-primary">
        <div class="card-body">
          <input type="text" v-model="newBoard.title" class="form-control" placeholder="Title" />
          <input
            type="text"
            v-model="newBoard.description"
            class="form-control"
            placeholder="Description"
          />
          <div class="text-right mt-2">
            <b-button @click="acceptAdding" size="sm" variant="success" class="mr-1">ok</b-button>
            <b-button @click="cancelAdding" size="sm" variant="danger">cancel</b-button>
          </div>
        </div>
      </div>
      <b-card v-else bg-variant="light" class="text-center" border-variant="primary">
        <button @click="startAdding" class="btn btn-primary">Add board</button>
      </b-card>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("boards");

export default {
  name: "BoardList",
  data() {
    return {
      adding: false,
      newBoard: null,
      editing: null
    };
  },
  methods: {
    startAdding() {
      this.adding = true;
      this.newBoard = {
        title: "New board",
        description: ""
      };
    },
    cancelAdding() {
      this.adding = false;
      this.newBoard = null;
    },
    acceptAdding() {
      this.$store.dispatch("boards/register", this.newBoard).then(() => {
        this.cancelAdding();
      });
    },
    startEditing(board) {
      this.editing = board;
    },
    cancelEditing() {
      this.editing = null;
    },
    acceptEditing() {
      this.$store
        .dispatch("boards/update", this.editing)
        .then(() => (this.editing = null));
    },
    boardDetails(board) {
      this.$router.push({ name: "boards-details", params: { id: board.id } });
    }
  },
  computed: {
    ...mapState(["boards", "totalCount"])
  },
  created() {
    this.$store.dispatch("boards/loadData");
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

