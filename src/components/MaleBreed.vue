<template>
    <Page class="page">
        <ActionBar title="พ่อพันธุ์">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="back"/>
        </ActionBar>

        <ScrollView>
            <ListView for="item in listOfItems">
                <v-template>
                    <GridLayout class="cattlelist" rows="auto" columns="1*,5*,auto">
                        <Image row="0" col="0" src="~/images/NativeScript-Vue.png"/>
                        <StackLayout class="text" row="0" col="1">
                            <Label class="cattlelist-header" :text="item.text"/>
                            <Label class="cattlelist-header" :text="item.text"/>
                        </StackLayout>
                        <Label row="0" col="2" class="cattlelist-header" text=">"/>
                    </GridLayout>
                </v-template>
            </ListView>
        </ScrollView>
    </Page>
</template>
<script>
    import {mapState} from 'vuex'
    import * as app from "tns-core-modules/application";
    import * as imagepicker from "nativescript-imagepicker";
    import * as camera from "nativescript-camera";
    import {Image} from "ui/image";
    import * as imageSource from "tns-core-modules/image-source";
    import * as permissions from "nativescript-permissions";

    export default {
        data() {
            return {
                listOfItems: [
                    {text: "Eiei"},
                    {text: "No.15"},
                    {text: "hello"},
                    {text: "hello"},
                    {text: 'world'}

                ],
            }
        },
        methods: {
            editProfile: function () {
                this.$router.push('/edit')
            },
            back: async function () {

                this.$router.back()
            },
        },

    }
</script>

<style scoped>
    .page {
        background-color: white;
    }
    .cattlelist {
        padding: 10em;
        margin: 10em;
    }
    .cattlelist-header {
        font-size: 18em;
        font-weight: bold;
    }

    .cattlelist > .text {
        margin-left: 40rem;
    }

    .defind {
        width: 33%;
    }
</style>