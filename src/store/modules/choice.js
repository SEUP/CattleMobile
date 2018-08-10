import {axios, BaseURL} from '../../axios'
import router from '../../router'
import * as http from 'http'

const _ = require('lodash')

const state = {
    choices: null,
    unGroupChoice: null,
    breeds: null,
};

const mutations = {
    setChoices: function (state, c) {
        state.unGroupChoice = c;

        state.choices = _.groupBy(state.unGroupChoice, (o) => {
            return o.parent_id
        });
        let breedMaster = _.find(state.unGroupChoice, {choice: "พันธุ์โค"})

        breedMaster.children = state.choices[breedMaster.id]

        breedMaster.children.forEach((c) => {
            c.children = state.choices[c.id];
        })

        let join = [];

        _.each(breedMaster.children, function (p) {
            if (p.children.length > 0) {
                _.each(p.children, function (c) {
                    c.choice = `${p.choice} - ${c.choice}`
                    join.push(c)
                })
            } else {
                join.push(p)
            }
        })

        state.breeds = join;

    }
};

const actions = {

    load: async function (context) {
        console.log('choice/load');
        let result = await axios.get("/api/v1/farmer/cattle-choices",
            {params: {all: true}})
            .then((response) => {
                let choices = response.data
                return choices;
            })
            .catch((error) => {
                console.log(error.stack);
                return null
            })

        context.commit("setChoices", result);
    },
    getChoices: async function (context) {
        if (!context.state.choices) {
            await context.dispatch("load")
        }
        return context.state.choices;
    }
    , getChoicesByType: async function (context, type) {
        console.log('getChoicesByType', type)

        if (type == "พันธุ์โค") {
            return await context.dispatch('getBreedTypes')
        } else {
            await context.dispatch('getChoices');
            let parent = context.state.choices[null]
            let key = _.findKey(parent, {choice: type})
            return context.state.choices[parent[key].id];
        }
    },
    getBreedTypes: async function (context) {
        console.log('getBreedTypes')
        await context.dispatch('getChoices');
        return state.breeds;
    }

};

const getters = {
    getChoiceByID: (state, getters) => (choice_id) => {
        if (choice_id) {
            let choice = _.find(state.unGroupChoice, {id: choice_id})
            return choice;
        }
        return null;
    },
    getChoiceTextByID: (state, getters) => (choice_id) => {
        if (choice_id) {
            let choice = getters.getChoiceByID(choice_id);
            // console.log('getChoiceTextByID', choice, choice_id);
            return choice ? choice.choice : null
        }
        return null;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
