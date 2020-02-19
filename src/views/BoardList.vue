<template>
  <div class="board-list">
    <h3>
      Boards
      <small v-if="loading">
        <i>Loading...</i>
      </small>
    </h3>
    <div class="cards-grid">
      <div class="card-column" v-for="board in boards" :key="board.id">
        <div v-if="board.id == actionBoard.id" class="card border-primary">
          <div class="card-body">
            <input
              type="text"
              v-model="actionBoard.title"
              class="form-control form-control-sm mb-1"
              :class="{'is-invalid': $v.actionBoard.title.$error}"
              placeholder="Title"
            />
            <p class="invalid-feedback">Required field</p>
            <input
              type="text"
              v-model="actionBoard.description"
              class="form-control form-control-sm mb-1"
              placeholder="Description"
            />
          </div>
          <div class="card-footer text-right">
            <b-button @click="localUpdate" size="sm" variant="success" class="mr-1">ok</b-button>
            <b-button @click="cancelUpdating" size="sm" variant="danger">cancel</b-button>
          </div>
        </div>
        <div v-else @click="boardDetails(board)" class="card border-primary card-board">
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
        <div v-if="registering" class="card border-primary">
          <div class="card-body">
            <input
              type="text"
              v-model="actionBoard.title"
              class="form-control form-control-sm mb-1"
              :class="{'is-invalid': $v.actionBoard.title.$error}"
              placeholder="Title"
            />
            <p class="invalid-feedback">Required field</p>
            <input
              type="text"
              v-model="actionBoard.description"
              class="form-control form-control-sm mb-1"
              placeholder="Description"
            />
          </div>
          <div class="card-footer text-right">
            <b-button @click="localRegister" size="sm" variant="success" class="mr-1">ok</b-button>
            <b-button @click="cancelRegistering" size="sm" variant="danger">cancel</b-button>
          </div>
        </div>
        <div v-else class="card border-primary bg-light">
          <div class="card-body text-center">
            <button v-if="!loading" @click="startRegistering" class="btn btn-primary">Add board</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  'boards'
);
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'BoardList',
  data() {
    return {
      loading: true,
      registering: false,
      actionBoard: {
        id: 0,
        title: '',
        description: ''
      }
    };
  },
  methods: {
    ...mapActions(['loadData', 'register', 'update']),
    ...mapMutations(['select']),
    startRegistering() {
      this.actionBoard.id = 0;
      this.actionBoard.title = 'New board';
      this.actionBoard.description = '';
      this.registering = true;
    },
    cancelRegistering() {
      this.registering = false;
    },
    async localRegister() {
      this.$v.actionBoard.$touch();
      if (this.$v.actionBoard.$anyError) return;
      await this.register(this.actionBoard);
      this.cancelRegistering();
    },
    startUpdating(board) {
      this.registering = false;
      this.actionBoard.id = board.id;
      this.actionBoard.title = board.title;
      this.actionBoard.description = board.description;
    },
    cancelUpdating() {
      this.actionBoard.id = 0;
    },
    async localUpdate() {
      this.$v.actionBoard.$touch();
      if (this.$v.actionBoard.$anyError) return;
      await this.update(this.actionBoard);
      this.cancelUpdating();
    },
    boardDetails(board) {
      this.select(board);
      this.$router.push({ name: 'boards-details', params: { id: board.id } });
    }
  },
  computed: {
    ...mapState(['boards', 'totalCount'])
  },
  validations: {
    actionBoard: {
      title: { required }
    }
  },
  async created() {
    await this.loadData();
    this.loading = false;
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

