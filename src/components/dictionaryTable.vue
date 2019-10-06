<template>
  <div>
    <div class="review">
      <p
        v-if="edit == true"
      >(To edit the text cells click on the small edit button and confirm with the green check. To save all other changes click the big green check at the bottom)</p>
      <!-- Creating tables for the review -->
      <div v-for="(dictionary, index) in dictionaries" :key="index">
        <h2>
          {{dictionary.title}}
          <!-- Button to delete one dictionary based on index -->
          <button v-if="edit == true" v-on:click="deleteDictionary(index)" class="button">
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
            <!-- Looping through all values to display data in the tables, inside are all edition options (delete one row, edit one row) -->
            <tr v-for="(value, i) in dictionary.values" :key="i">
              <td v-if="disabled == false">{{value.domain}}</td>
              <td v-else class="background">
                <input class="edit" v-model="value.domain" />
              </td>
              <td v-if="disabled == false">{{value.range}}</td>
              <td v-else class="background">
                <input class="edit" v-model="value.range" />
              </td>
              <!-- Here I would like to have just one edit/save button... but as I use index and i to save the changes I need the buttons to be insede the for-loop -->
              <!-- The next two buttons are to edit and save changes in the rows -->
              <button
                v-if="disabled == false && edit == true"
                v-on:click="disabled = !disabled"
                class="button"
              >
                <img class="cross" src="../assets/31-512.png" alt="edit icon" />
              </button>
              <button
                v-if="edit == true && disabled == true"
                class="button"
                v-on:click="postChange({value, index, i}), (disabled = !disabled)"
              >
                <img class="cross" src="../assets/images.png" alt="green check" />
              </button>
              <!-- Button to delete one single row based on index (which dictionary it is) and i (a single row) -->
              <button v-if="edit == true" v-on:click="deleteRow({index, i})" class="button">
                <img class="cross" src="../assets/icon-02-512.png" alt="red cross" />
              </button>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Adding new rows to an existing dictionary (this will update itself if we create a new dictionary) -->
    <div v-if="edit == true">
      <h2>Add new domain to an existing dictionary</h2>
      <table class="tableInput">
        <tbody>
          <td>
            <!-- Here we call the function setSelected to know to which dictionary we want to add a row -->
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
          <!-- We add a row to a specific dictionary with the new domain and range. After that we reset the text inputs to be empty again -->
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
    <!-- Here we create a new dictionary with the dictionary name and first domain/range. To add further rows we will use the function above (add row) -->
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
    <!-- Here we activate/deactivate the editing interface based on the true/false "edit" data -->
    <div class="footer">
      <p v-if="edit == false">Click here to see all the editing options!</p>
      <p v-else>Click here to save the changes!</p>
      <button class="btn" v-if="edit == false" v-on:click="edit = !edit">
        <img src="../assets/31-512.png" alt="edit icon" />
      </button>
      <button class="btn" v-else v-on:click="edit = !edit">
        <img src="../assets/images.png" alt="green check" />
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
      disabled: false,
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
.background {
  background-color: rgb(134, 194, 134);
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
button:focus {
  outline: none;
}
</style>