<template>
  <div class="board-list">
    <h3>Boards</h3>
    <table class="table b-table table-striped table-hover">
      <thead>
        <tr>
          <th width="75px">Code</th>
          <th>Title</th>
          <th width="150px"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="board in data" :key="board.id">
          <td>{{board.id}}</td>
          <td>{{board.title}}</td>
          <td>
            <b-button size="sm">
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("boards");

export default {
  name: "BoardList",
  computed: {
    ...mapState(["data", "totalCount"])
  },
  created() {
    this.$store.dispatch("boards/loadData");
  }
};
</script>
