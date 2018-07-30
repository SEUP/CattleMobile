<template>
    <Page class="page">
        <StackLayout>
            <DatePicker v-model="selectedDate"/>
            <Button text="OK" @tap="closeModal(selectedDate)"/>
        </StackLayout>
    </Page>
</template>

<script>

    import {mapState, mapGetters} from 'vuex';

    const _ = require('lodash');

    export default {
        props: {
            value: [String]
        },
        data() {
            return {
                selectedDate: new Date(),
            };
        },
        computed: {},
        async mounted() {
            if(this.value){
                this.selectedDate = new Date(this.value);
            }
        },
        methods: {
            closeModal: function (selectedDate) {
                this.$modal.close(selectedDate)
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
