<template>
  <div class="board-edit">
    <h3>Boards - Edit</h3>
    <b-form>
      <b-form-group label="Title" label-for="title-input">
        <b-form-input id="title-input" v-model="title" type="text"></b-form-input>
      </b-form-group>
      <b-form-group label="Description" label-for="description-input">
        <b-form-input id="description-input" v-model="description" type="text"></b-form-input>
      </b-form-group>
      <b-form-group label="Columns"></b-form-group>
      <div class="text-right">
        <b-button variant="primary" @click="save">Save</b-button>&nbsp;
        <b-link to="/boards" class="btn btn-warning">Cancel</b-link>
      </div>
    </b-form>
  </div>
</template>
<script>
import boardService from "../services/board-service";

export default {
  name: "BoardEdit",
  data() {
    return {
      id: 0,
      title: "",
      description: ""
    };
  },
  methods: {
    save() {
      this.$store
        .dispatch("boards/update", {
          id: this.id,
          title: this.title,
          description: this.description
        })
        .then(() => {
          this.$router.push("/boards");
        });
    }
  },
  mounted() {
    boardService.get(this.$route.params.id).then(result => {
      this.id = result.data.id;
      this.title = result.data.title;
      this.description = result.data.description;
    });
  }
};
</script>

