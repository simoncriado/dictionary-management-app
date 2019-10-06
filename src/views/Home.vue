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
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 50px;
  border-style: solid;
  border-color: rgb(110, 17, 17);
  border-width: 20px;
}
</style>
