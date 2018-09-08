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
        let res = 0;
        console.log('/api/v1/farmer/cattles/'+form.cattle_id+'/therapy'); 
        let result = await axios.post('/api/v1/farmer/cattles/'+form.cattle_id+'/therapy', form)
          .then((response) => { 
            res =  1;
            alert("เพิ่มข้อมูลการรักษาสำเร็จ"); 
          })
          .catch((error) => {
            console.log(error.response.data); 
            alert(error.response.data); 
          });
         return res;
      },

    read: async function(context, cattle_id){
        let res = 0;
        console.log('/api/v1/farmer/cattles/'+cattle_id+'/therapy'); 
        let result = await axios.get('/api/v1/farmer/cattles/'+cattle_id+'/therapy')
          .then((response) => { 
            res =  response.data; 
            console.log(res); 
          })
          .catch((error) => { 
            alert('เกิดข้อผิดพลาดในการโหลดข้อมูล'); 
          });
        
         return res;
    },

    update: async function(context, form){
     
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
