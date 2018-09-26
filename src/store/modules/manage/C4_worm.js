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
        console.log('/api/v1/farmer/cattles/'+form.cattle_id+'/worming'); 
        let result = await axios.post('/api/v1/farmer/cattles/'+form.cattle_id+'/worming', form)
          .then((response) => { 
            res =  1;
            alert("เพิ่มข้อมูลการถ่ายพยาธิสำเร็จ"); 
          })
          .catch((error) => {
            console.log(error.response.data); 
            alert(error.response.data); 
          });
         return res;
      },

    read: async function(context, cattle_id){
        let res = 0;
        console.log('/api/v1/farmer/cattles/'+cattle_id+'/worming'); 
        let result = await axios.get('/api/v1/farmer/cattles/'+cattle_id+'/worming')
          .then((response) => { 
            res =  response.data; 
           
          })
          .catch((error) => { 
            alert('เกิดข้อผิดพลาดในการโหลดข้อมูล'); 
          });
        
         return res;
    },

    update: async function(context, form){
      let res = 0;
      console.log(form);
     let result = await axios.put('/api/v1/farmer/cattles/'+form.cattle_id+'/worming/'+form.id, form)
        .then((response) => { 
          res =  1;
          alert("แก้ไขข้อมูลการถ่ายพยาธิสำเร็จ"); 
        })
        .catch((error) => {
          console.log(error.response.data); 
          alert(error.response.data); 
        });
       return res;
    },

    delete: async function(context, form){
      let res = 0; 
      let result = await axios.delete('/api/v1/farmer/cattles/'+form.cattle_id+'/worming/'+form.id)
        .then((response) => { 
          res =  1;
          alert("ลบข้อมูลการถ่ายพยาธิสำเร็จ"); 
        })
        .catch((error) => {
          console.log(error.response.data); 
          alert(error.response.data); 
        });
       return res;
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
