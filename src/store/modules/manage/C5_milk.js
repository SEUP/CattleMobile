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

    read: async function(context, cattle_id){
        let res = 0;
        console.log('/api/v1/farmer/cattles/'+cattle_id+'/birth'); 
        let result = await axios.get('/api/v1/farmer/cattles/'+cattle_id+'/birth')
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
        let res = 0;
        console.log('/api/v1/farmer/cattles/'+form.cattle_id+'/birth/'+form.id); 
        let result = await axios.put('/api/v1/farmer/cattles/'+form.cattle_id+'/birth/'+form.id,form)
          .then((response) => { 
            alert('บันทึกข้อมูลสำเร็จ');
          })
          .catch((error) => { 
            alert('เกิดข้อผิดพลาดในการโหลดข้อมูล'); 
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
