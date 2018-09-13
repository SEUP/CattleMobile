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

    read: async function(context, id){
      let res = {};
      let result = await axios.get('/api/v1/farmer/cattles/'+id+'/femalebreed')
        .then((response) => {
          res = response.data; 
      })
        .catch((error) => {console.log('เกิดข้อผิดพลาด');});  
       return res; 
    },

    update: async function(context, form){
     
    },

    delete: async function(context, form){
        
    }, 
   
    step1: async function(context, form){
      let res = {};
        let result = await axios.post('/api/v1/farmer/cattles/'+form.cattle_id+'/femalebreed', form)
          .then((response) => {alert("สำเร็จ ไปยังขั้นตอนต่อไป"); })
          .catch((error) => {console.log('เกิดข้อผิดพลาด');}); 

          let resultx = await axios.get('/api/v1/farmer/cattles/'+form.cattle_id+'/femalebreed/create')
          .then((response) => { 
            res = response.data;
            console.log('data is load success!!!');
          })
          .catch((error) => {
            console.log('Data is not load !!!!');
          });
          console.log(res);
         return res; 
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
