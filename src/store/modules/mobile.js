import {topmost} from "ui/frame";
import {AndroidApplication} from "application";
import router from '../../router';
const state = {

};

const mutations = {
   
};

const actions = {

    
    screenLock:async function(context){
        var orientationModule = require("nativescript-screen-orientation");
        orientationModule.setCurrentOrientation("portrait", function () {
            console.log("Lock portrait screen!!");
        });
      },

      blockBack:async function(){
        let activity = AndroidApplication.startActivity ||
        AndroidApplication.foregroundActivity ||
        topmost().android.currentActivity ||
        topmost().android.activity;

        activity.onBackPressed = function() {
            console.log('Block back button!!');
        }
      },

      allowBack:async function(path){
        let activity = AndroidApplication.startActivity ||
        AndroidApplication.foregroundActivity ||
        topmost().android.currentActivity ||
        topmost().android.activity;

        activity.onBackPressed = function() {
            router.push('/'+path)
        }
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
