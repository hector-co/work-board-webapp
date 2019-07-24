<template>
  <div class="board-edit">
    <h3>Boards - Edit</h3>
    <b-form>
      <b-form-group label="Title" label-for="title-input">
        <b-form-input id="title-input" type="text"></b-form-input>
      </b-form-group>
      <b-form-group label="Description" label-for="description-input">
        <b-form-input id="description-input" type="text"></b-form-input>
      </b-form-group>
      <b-form-group label="Columns">
        
      </b-form-group>
    </b-form>
  </div>
</template>
<script>
export default {
  name: "BoardEdit"
};
</script>

