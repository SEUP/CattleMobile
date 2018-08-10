<template>
    <Page class="page">
        <ScrollView>
            <StackLayout class="list">
                <GridLayout @tap="closeModal(choice.id)" roww="*" columns="*,auto"
                            class="list-item"
                            v-for="choice in choices">
                    <Label row="0" col="0" textWrap=true :text="choice.choice"/>
                    <Label v-if="choice.id == choice_id" row="0" col="1" textWrap=true class="fa green"
                           :text="'fa-check' | fonticon"/>
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>

    import {mapState, mapGetters} from 'vuex';

    const _ = require('lodash');

    export default {
        props: {
            to: String,
            choice_id: [String, Object],
        },
        data() {
            return {
                choices: [],
            };
        },
        computed: {
            ...mapState({
            }),

            ...mapGetters({

            })
        },
        async mounted() {
            let choices = await this.$store.dispatch('choice/getChoicesByType', this.to)
            this.choices = choices
        },
        methods: {
            closeModal: function (item) {
                this.$modal.close(item)
            }
        }
    };
</script>

<style scoped>

    .green {
        color: green;
    }

    .page {
        padding-left: 10rem;
        padding-right: 10rem;
    }

    .list {
        margin-left: 10rem;
        margin-right: 10rem;
    }

    .list-item {
        border-bottom-color: #9e9e9e;
        border-bottom-width: 1rem;
        border-bottom-style: solid;
        padding-top: 15rem;
        padding-bottom: 15rem;
        font-size: 20rem;

    }
</style>
