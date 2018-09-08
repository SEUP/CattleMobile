import {axios, BaseURL} from '../../../axios'
import router from '../../../router'
import * as http from 'http'

const _ = require('lodash')

const state = {

};

const mutations = {
   
};

const actions = {

    
    create: async function(context, form){
        
      },

    read: async function(context, form){

    },

    update: async function(context, form){
        let res = 0;
        let result = await axios.put('/api/v1/farmer/cattles/'+form.id+'/type', form)
          .then((response) => { 
            res =  1;
            alert("แก้ไขข้อมูลสำเร็จ");
          })
          .catch((error) => {
            console.log(error.response.data); 
            alert(error.response.data); 
          });
         return res;
    },

    delete: async function(context, form){
        
    },
   
 
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
