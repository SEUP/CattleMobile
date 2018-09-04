import {axios, BaseURL} from '../../axios'
import router from '../../router'
import * as http from 'http'

const _ = require('lodash')

const state = {
    breedsMale:null,
    cattle:null,
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
       
      },
      getCattleById: async function (context, form) { 
          let cattle = null;
        let result = await axios.get('/api/v1/farmer/farmer/'+form.id+'/cattles/' + form.param)
          .then(async (response) => {
            cattle = response.data;
          })
          .catch((error) => {
            context.dispatch("error/setError", error.response.data, {root: true});
         
          })
            state.cattle = cattle;
      },
      updateCattle: async function (context, form) {
        let respond = 0;
        let result = await axios.put('/api/v1/farmer/farmer/'+form.farmer_id+'/cattles/' + form.id, form)
          .then((response) => { 
            respond =  1;
          })
          .catch((error) => {
            console.log(error.response.data);
            //context.dispatch("error/setError", error.response.data, {root: true});
            respond =  0;
          });
         return respond;
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
