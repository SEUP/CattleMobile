<template>
    <Page class="page">
        <ScrollView>
            <StackLayout class="list">
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>

    import {mapState, mapGetters} from 'vuex';

    const _ = require('lodash');

    export default {
        props: {
            choice_id: [String, Object]
        },
        data() {
            return {
                items: null
            };
        },
        computed: {
            ...mapState({
            }),

            ...mapGetters({

            })
        },
        async mounted() {

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
