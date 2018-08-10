<template>
    <Page class="page">
        <ScrollView>
            <StackLayout class="list">
                <GridLayout @tap="closeModal(choice)" rows="*" columns="*,auto"
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
    const dialogs = require('tns-core-modules/ui/dialogs')

    const _ = require('lodash');

    export default {
        props: {
            to: String,
            choice_id: [String, Object],
            remark : [String,Object],
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
            console.log("Choice Mounted")
            console.log(this.remark);
            let choices = await this.$store.dispatch('choice/getChoicesByType', this.to)
            this.choices = choices
        },
        methods: {
            closeModal: async function (item) {

                if(item.options && item.options.has_text == true) {

                    prompt({
                        title: item.choice,
                        message: "โปรดระบุ",
                        okButtonText: "OK",
                        cancelButtonText: "Cancel",
                        defaultText: this.remark,
                        inputType: dialogs.inputType.text
                    }).then(result => {
                        console.log(`Dialog result: ${result.result}, text: ${result.text}`)

                        if(result.result){
                            this.$modal.close({
                                id : item.id,
                                remark : result.text
                            })
                        }
                    });


                }else {
                    this.$modal.close({
                        id : item.id
                    });
                }
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
