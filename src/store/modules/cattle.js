import {axios, BaseURL} from '../../axios'
import router from '../../router'
import * as http from 'http'

const _ = require('lodash')

const state = {
    breedsMale:null,
    cattle:null,
    notificationState:0,
};

const mutations = {
   
};

const actions = {
  getNotificationState: async function(context){
    console.log(state.notificationState);
    return state.notificationState;
  },
  setNotificationState: async function(context){
    if(state.notificationState == 0){
      state.notificationState = 1;
    } 
  }, 
  dataNotification: async function(context,id){ 
        let res = null; 
        console.log("UserId is :"+id);
        let result = await axios.get("/api/v1/farmer/farmers/"+id+"/reports/cattleEvents",
            {params: {all: true}})
            .then((response) => {
              res = response.data  
            })
            .catch((error) => { 
            })
            console.log(res);
           return res; 
  },

  deleteCattle: async function(context,form){
    let res = null; 
    console.log("UserId is :"+form.id);
    let result = await axios.delete("api/v1/farmer/farmer/"+form.farmer_id+"/cattles/"+form.id)
        .then((response) => {
          alert("ลบข้อมูลสำเร็จ");
        })
        .catch((error) => { 
          alert("เกิดข้อผิดพลาดในการลบข้อมูล");
        })
         
  }, 
  choiceLoad: async function(context,id){
    let ui = null;
    let result = await axios.get("/api/v1/farmer/cattle-choices")
    .then((response) => {
      ui = response.data  
    })
    .catch((error) => {
      ui = null;
    })
    
    return ui;

  },
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
      let res = 0;
        let result = await axios.post(`/api/v1/farmer/farmer/115/cattles`, form)
          .then((response) => {
            res = 1;
            alert("บันทึกข้อมูลสำเร็จ"); 
          })
          .catch((error) => {
            context.dispatch("error/setError", error.response.data, {root: true});
            alert(error.response.data); 
          });
          return res;
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
        let res = 0;
        let result = await axios.put('/api/v1/farmer/farmer/'+form.farmer_id+'/cattles/' + form.id, form)
          .then((response) => { 
            res =  1;
            alert("แก้ไขข้อมูลสำเร็จ");
          })
          .catch((error) => {
            console.log(error.response.data);
            //context.dispatch("error/setError", error.response.data, {root: true});
            alert(error.response.data.message);
          
          });
         return res;
      },
      changeType: async function(context, form){
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
      
      wormingSave: async function(context, form){
        alert(form.id); 
        let res = 0;
        let result = await axios.post('/api/v1/farmer/cattles/'+form.id+'/worming', form)
          .then((response) => {
            res = 1;
            alert("บันทึกข้อมูลสำเร็จ"); 
          })
          .catch((error) => { 
            console.log(error.response.data);
            alert(error.response.data); 
          });
          return res;
      },
   
      vaccineSave: async function(context, form){
        alert(form.id); 
        let res = 0;
        let result = await axios.post('/api/v1/farmer/cattles/'+form.id+'/vaccine', form)
          .then((response) => {
            res = 1;
            alert("บันทึกข้อมูลสำเร็จ"); 
          })
          .catch((error) => { 
            console.log(error.response.data);
            alert(error.response.data); 
          });
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
