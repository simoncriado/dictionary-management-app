import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    domain: "",
    range: "",
    dictionaries: [
      {
        title: "Colors",
        values: [
          { domain: "stone grey", range: "dark grey" },
          { domain: "midnight black", range: "black" },
          { domain: "mystic silver", range: "silver" }
        ]
      },
      {
        title: "Vehicles",
        values: [
          { domain: "kawasaki", range: "motorbike" },
          { domain: "ferrari", range: "car" },
          { domain: "airbus", range: "plane" }
        ]
      }
    ]
  },
  mutations: {
    deleteRow(state, payload) {
      //Index showing which ditionary to target, i saying which value we want to delete and 1 saying how many values we want to delete
      state.dictionaries[payload.index].values.splice(payload.i, 1)
    },
    deleteDictionary(state, payload) {
      state.dictionaries.splice(payload, 1)
    },
    postChange(state, payload) {
      //We change the existing value of a row with the new inputs
      state.dictionaries[payload.index].values[payload.i] = { domain: payload.value.domain, range: payload.value.range }
    },
    addRow(state, payload) {
      //Checking if any input is empty, if yes the alert will be shown
      if (payload.select == null || payload.inputDomain == "" || payload.inputRange == "") {
        return alert("Please insert some data!")
      }
      //Changing value of found to true if duplicates, forks, cycles or chains happening
      let found = false;
      state.dictionaries[payload.select].values.forEach(value => {
        if (value.domain.toLowerCase() == payload.inputDomain.toLowerCase() || value.domain.toLowerCase() == payload.inputRange.toLowerCase() || value.range.toLowerCase() == payload.inputDomain.toLowerCase()) {
          found = true;
        }
      })
      //If found is TRUE the alert will be shown
      if (found) {
        return alert("This data already exists!")
      }
      //Otherwise the new data will be added to the dictionary
      state.dictionaries[payload.select].values.push({ domain: payload.inputDomain, range: payload.inputRange })
    },
    createDictionary(state, payload) {
      //In values we get the new domain and range
      let values = []
      values.push({ domain: payload.newDomain, range: payload.newRange })
      //Checking for empty inputs
      if (payload.newTitle == "" || payload.newDomain == "" || payload.newRange == "") {
        return alert("Please insert some data!")
      }
      //Looping through all dictionaries to check if title already exists
      let found = false;
      state.dictionaries.forEach(dictionary => {
        if (dictionary.title.toLowerCase() == payload.newTitle.toLowerCase()) {
          found = true;
        }
      })
      if (found) {
        return alert("This dictionary already exists!")
      }
      state.dictionaries.push({ title: payload.newTitle, values: values })
    },
  },
  actions: {

  },
  getters: {
    dictionaries: state => state.dictionaries
  }
})
