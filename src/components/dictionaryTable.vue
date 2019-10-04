<template>
  <div>
    <div class="review">
      <div v-for="(dictionary, index) in dictionaries" :key="index">
        <h2>
          {{dictionary.title}}
          <button
            v-if="edit == true"
            v-on:click="deleteDictionary(index)"
            class="button"
          >
            <img class="cross" src="../assets/icon-02-512.png" alt="red cross" />
          </button>
        </h2>
        <table class="table">
          <thead>
            <tr>
              <th>Domain</th>
              <th>Range</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, i) in dictionary.values" :key="i">
              <td v-if="edit == false">{{value.domain}}</td>
              <td v-else>
                <input class="edit" v-model="value.domain" />
              </td>
              <td v-if="edit == false">{{value.range}}</td>
              <td v-else>
                <input class="edit" v-model="value.range" />
              </td>
              <!-- <button
                v-if="disabled && edit == true"
                v-on:click="disabled = !disabled"
                class="button"
              >
                <img class="cross" src="../assets/31-512.png" alt="edit icon" />
              </button>-->
              <button
                v-if="edit == true"
                class="button"
                v-on:click="postChange({value, index, i}), (disabled = !disabled)"
              >
                <img class="cross" src="../assets/images.png" alt="green check" />
              </button>
              <button v-if="edit == true" v-on:click="deleteRow({index, i})" class="button">
                <img class="cross" src="../assets/icon-02-512.png" alt="red cross" />
              </button>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="edit == true">
      <h2>Add new domain to an existing dictionary</h2>
      <table class="tableInput">
        <tbody>
          <td>
            <select class="dropdown" @input="setSelected">
              <option value="Dictinaries" selected>Click HERE to select a dictionary</option>
              <option
                v-for="(dictionary, index) in dictionaries"
                :key="index"
                :value="index"
              >{{dictionary.title}}</option>
            </select>
          </td>
          <td>
            <input v-model="inputDomain" placeholder="Add new domain..." />
          </td>
          <td>
            <input v-model="inputRange" placeholder="Add new range..." />
          </td>
          <button v-on:click="addRow({select, inputDomain, inputRange}), reset()" class="button">
            <img
              class="cross"
              src="../assets/229-2295480_plus-sign-icon-button-green-approved-check-add.png"
              alt="green check"
            />
          </button>
        </tbody>
      </table>
    </div>
    <div v-if="edit == true">
      <h2>Create a new dictionary</h2>
      <table class="tableInput">
        <tbody>
          <td>
            <input v-model="newTitle" placeholder="Add new title..." />
          </td>
          <td>
            <input v-model="newDomain" placeholder="Add new domain..." />
          </td>
          <td>
            <input v-model="newRange" placeholder="Add new range..." />
          </td>
          <button
            v-on:click="createDictionary({newTitle, newDomain, newRange}), reset()"
            class="button"
          >
            <img
              class="cross"
              src="../assets/229-2295480_plus-sign-icon-button-green-approved-check-add.png"
              alt="green check"
            />
          </button>
        </tbody>
      </table>
    </div>
    <div class="footer">
      <p>Click here to see all the editing options!</p>
      <button v-on:click="edit = !edit">
        <img src="../assets/31-512.png" alt="edit icon" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      newTitle: "",
      newDomain: "",
      newRange: "",
      inputDomain: "",
      inputRange: "",
      select: null,
      disabled: true,
      edit: false
    };
  },
  computed: {
    ...mapGetters(["dictionaries"])
  },
  methods: {
    setSelected(value) {
      this.select = value.target.value;
    },
    ...mapMutations(["deleteRow"]),
    ...mapMutations(["addRow"]),
    ...mapMutations(["postChange"]),
    ...mapMutations(["createDictionary"]),
    ...mapMutations(["deleteDictionary"]),
    reset() {
      this.inputDomain = "";
      this.inputRange = "";
      this.newTitle = "";
      this.newDomain = "";
      this.newRange = "";
    }
  }
};
</script>

<style>
input {
  text-align: center;
}
h2 {
  padding-top: 30px;
}
.review {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.table {
  border-collapse: collapse;
}
.edit {
  width: 125px;
}
.tableInput {
  margin: auto;
  border-collapse: collapse;
}
.dropdown {
  margin: 5px;
}
td,
th {
  border-style: solid;
  height: 40px;
  width: 128px;
  text-align: center;
}
.button {
  margin-left: 10px;
  height: 30px;
}
.cross {
  padding-top: 15px;
  height: 30px;
}
.footer {
  padding-top: 30px;
}
.footer img {
  height: 50px;
  width: 50px;
}
</style>