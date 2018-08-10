import {axios, BaseURL} from '../../axios'
import router from '../../router'
import * as http from 'http'

const _ = require('lodash')

const state = {
    choices: null,
    unGroupChoice: null,
};

const mutations = {
    setChoices: function (state, c) {
        state.unGroupChoice = c;
        state.choices = _.groupBy(c, (o) => {
            return o.parent_id
        });
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
        await context.dispatch('getChoices');
        let c = context.state.choices;
        let master = context.state.choices[null]
        let key = _.findKey(master, {choice: "พันธุ์โค"})
        let parent = context.state.choices[null][key]

        parent.children = c[parent.id]
        _.each(parent.children, function (p) {
            p.children = c[p.id]
        })

        let join = [];

        _.each(parent.children, function (p) {
            if (p.children.length > 0) {
                _.each(p.children, function (c) {
                    c.choice = `${p.choice} - ${c.choice}`
                    join.push(c)
                })
            } else {
                join.push(p)
            }
        })
        return join;
    }

};

const getters = {
    getChoiceByID: (state, getters) => (choice_id) => {
        if (choice_id) {
            let choice = _.find(state.unGroupChoice, {id : choice_id})
            return choice;
        }
        return null;
    },
    getChoiceTextByID: (state, getters) => (choice_id) => {
        if (choice_id) {
            let choice = getters.getChoiceByID(choice_id);
            console.log('getChoiceTextByID', choice, choice_id);
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
