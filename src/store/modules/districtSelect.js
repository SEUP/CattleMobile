import {axios} from '../../axios'

const _ = require('lodash');

const state = {
    provinces: []

};

const mutations = {
    setProvinces: function (state, provinces) {
        state.provinces = provinces;
    }

};

const actions = {
    getProvinces: async function (context) {
        let result = await axios.get("/api/v1/provinces", {params: {all: true}})
            .then((response) => {
                context.commit("setProvinces", response.data);
                return response.data;
            })
            .catch((error) => {
                return null
            })
        return result
    }
};

const getters = {

    getProvinceByCode: (state) => (province_id) => {

        if (province_id) {
            let province = _.find(state.provinces, {province_id: province_id})
            return province;
        }
        return null;
    },

    getProvinceNameByCode: (state, getters) => (province_id) => {
        let province = getters.getProvinceByCode(province_id);
        return province ? province.province_name : null;
    },

    getAmphurByCode: (state, getters) => (province_id, amphur_id) => {

        if (province_id && amphur_id) {
            let province = getters.getProvinceByCode(province_id);
            let amphur = _.find(province.amphurs, {amphur_id: amphur_id})
            return amphur;
        }
        return null;
    },

    getAmphurNameByCode: (state, getters) => (province_id, amphur_id) => {
        let amphur = getters.getAmphurByCode(province_id, amphur_id)
        return amphur ? amphur.amphur_name : null;
    },

    getDistrictByCode: (state, getters) => (province_id, amphur_id, district_id) => {

        if (province_id && amphur_id && district_id) {
            let amphur = getters.getAmphurByCode(province_id, amphur_id)
            let district = _.find(amphur.districts, {district_id: district_id});
            return district
        }
        return null;
    },

    getDistrictNameByCode: (state, getters) => (province_id, amphur_id, district_id) => {
        let district = getters.getDistrictByCode(province_id, amphur_id, district_id)
        return district ? district.district_name : null;
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
