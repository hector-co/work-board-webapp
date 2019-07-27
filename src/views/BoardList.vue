<template>
  <div class="board-list">
    <h3>Boards</h3>

    <div class="cards-grid">
      <div class="card-column" v-for="board in data" :key="board.id">
        <div v-if="board == editing" class="card bg-light">
          <div class="card-header">
            <input type="text" v-model="editing.title" class="form-control" />
          </div>
          <div class="card-body">
            <input type="text" v-model="editing.description" class="form-control" />
            <div class="text-right mt-2">
              <b-button @click="acceptEditing" size="sm" variant="success" class="mr-1">ok</b-button>
              <b-button @click="cancelEditing" size="sm" variant="danger">cancel</b-button>
            </div>
          </div>
        </div>
        <b-card v-else :header="board.title" bg-variant="light">
          <b-card-text>{{board.description}}</b-card-text>
          <div class="text-right">
            <b-button
              @click="startEditing(board)"
              size="sm"
              variant="secondary"
              class="btn-card mr-1"
            >edit</b-button>
            <b-button size="sm" variant="danger" class="btn-card">close</b-button>
          </div>
        </b-card>
      </div>
      <b-card bg-variant="light" class="text-center">
        <button class="btn btn-primary">Add board</button>
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
      editing: null
    };
  },
  methods: {
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
    }
  },
  computed: {
    ...mapState(["data", "totalCount"])
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

