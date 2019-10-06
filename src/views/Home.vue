<template>
  <div class="home">
    <h1>Dictionaries Review</h1>
    <dictionaryTable></dictionaryTable>
  </div>
</template>

<script>
import dictionaryTable from "../components/dictionaryTable.vue";

export default {
  components: {
    dictionaryTable
  }
};
</script>
<style>
.home {
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
  max-width: 750px;
  margin: auto;
}
</style>
