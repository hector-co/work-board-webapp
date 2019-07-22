<template>
  <div class="board-list">
    <table>
      <tr v-for="board in data" :key="board.id">
        <td>{{board.id}}</td>
        <td>{{board.title}}</td>
      </tr>
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
