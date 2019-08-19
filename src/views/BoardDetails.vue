<template>
  <div class="board-details">
    <h3>{{board.title}}</h3>
    <button @click="startAddingColumn" class="btn btn-primary mb-3 mr-1">Add column</button>
    <button v-if="columns.length" @click="showCardAdd(null)" class="btn btn-success mb-3">Add card</button>

    <div class="card-group">
      <div v-for="column of columns" :key="column.id" class="card card-column">
        <div v-if="column.id == actionColumn.id" class="card-header column-editing">
          <input
            type="text"
            v-model="actionColumn.title"
            class="form-control form-control-sm"
            :class="{'is-invalid': $v.actionColumn.title.$error}"
          />
          <p class="invalid-feedback">Required field</p>
          <div class="btn-options text-right">
            <b-button @click="localEditColumn" size="sm" variant="success" class="mr-1">ok</b-button>
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
        <div class="card-body" :data-column-id="column.id">
          <div class="draggable-container">
            <draggable v-model="column.cards" group="cards" @end="endDrag">
              <card
                v-for="card of column.cards"
                :key="card.id"
                :card="card"
                @selected="showCardEdit(card)"
                @pointsSelected="showCardPoints(card)"
              ></card>
            </draggable>
            <div class="text-center">
              <button @click="showCardAdd(column.id)" class="btn btn-info card-add">Add card</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="adding" class="card card-column">
        <div class="card-header column-editing">
          <input
            type="text"
            v-model="actionColumn.title"
            class="form-control form-control-sm"
            :class="{'is-invalid': $v.actionColumn.title.$error}"
          />
          <p class="invalid-feedback">Required field</p>
          <div class="btn-options text-right">
            <b-button @click="localAddColumn" size="sm" variant="success" class="mr-1">ok</b-button>
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
import { required } from "vuelidate/lib/validators";

import CardDialog from "../components/CardDialog";
import CardPoints from "../components/CardPoints";
import Card from "../components/Card";
import { CardModel } from "../models/card-model";

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
    ...mapActions([
      "loadData",
      "addColumn",
      "editColumn",
      "deleteColumn",
      "moveCard"
    ]),
    startAddingColumn() {
      this.adding = true;
      this.actionColumn.id = 0;
      this.actionColumn.title = "New column";
    },
    cancelAddingColumn() {
      this.adding = false;
    },
    localAddColumn() {
      this.$v.actionColumn.$touch();
      if (this.$v.actionColumn.$anyError) return;
      this.addColumn(this.actionColumn).then(this.cancelAddingColumn);
    },
    startEditingColumn(column) {
      this.adding = false;
      this.actionColumn.id = column.id;
      this.actionColumn.title = column.title;
    },
    cancelEditingColumn() {
      this.actionColumn.id = 0;
    },
    localEditColumn() {
      this.$v.actionColumn.$touch();
      if (this.$v.actionColumn.$anyError) return;
      this.editColumn(this.actionColumn).then(this.cancelEditingColumn);
    },
    showCardAdd(columnId) {
      this.$modal.show(
        CardDialog,
        {
          card: CardModel.create({
            board: { id: this.boardId },
            column: columnId ? { id: columnId } : null
          })
        },
        {
          height: "auto"
        }
      );
    },
    showCardEdit(card) {
      this.$modal.show(
        CardDialog,
        {
          boardId: this.boardId,
          card
        },
        {
          height: "auto"
        }
      );
    },
    showCardPoints(card) {
      this.$modal.show(
        CardPoints,
        {
          card
        },
        {
          height: "auto"
        }
      );
    },
    endDrag(event) {
      var cardId = parseInt(event.item.getAttribute("data-card-id"));
      var sourceColumnId = parseInt(
        event.from.parentNode.parentNode.getAttribute("data-column-id")
      );
      var targetColumnId = parseInt(
        event.to.parentNode.parentNode.getAttribute("data-column-id")
      );
      var order = event.newIndex + 1;

      this.moveCard({ cardId, sourceColumnId, targetColumnId, order });
    }
  },
  computed: {
    ...mapState(["board", "columns"])
  },
  components: {
    card: Card
  },
  validations: {
    actionColumn: {
      title: { required }
    }
  },
  created() {
    this.boardId = parseInt(this.$route.params.id);
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

    .draggable-container {
      height: 100%;
      & > div {
        height: 100%;
      }
    }

    .card-board {
      margin-bottom: 10px;
    }
  }
}
</style>
