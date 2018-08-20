import {axios, BaseURL} from '../../axios'
import router from '../../router'
import * as http from 'http'

const _ = require('lodash')

const state = {
    breedsMale:null,
};

const mutations = {
   
};

const actions = {

    load: async function (context,id) {
        console.log('breeder/load');
        let breeders = null; 
        let result = await axios.get("/api/v1/farmer/farmer/"+id+"/cattles",
            {params: {all: true}})
            .then((response) => {
                breeders = response.data  
            })
            .catch((error) => {
                breeders = null;
            })

            state.breedsMale =  breeders;
           //state.breedsMale =  "id = "+id;
       
    },
    createCattle: async function (context, form) { 
        let result = await axios.post(`/api/v1/farmer/farmer/115/cattles`, form)
          .then((response) => {
            return "OK";
          })
          .catch((error) => {
            context.dispatch("error/setError", error.response.data, {root: true});
            return "error"
          });
       
      }
   
};

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
