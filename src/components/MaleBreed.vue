<template>
    <Page class="page">
        <ActionBar class="action-bar" title="พ่อพันธุ์"/>

        <ScrollView>
            <ListView for="item in listOfItems">
                <v-template>
                    <GridLayout class="cattlelist" rows="auto" columns="1*,5*,auto">
                        <Image row="0" col="0" src="~/images/NativeScript-Vue.png"/>
                        <StackLayout class="text" row="0" col="1">
                            <Label class="cattlelist-header" :text="item.text"/>
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
    export default {
        data() {
            return {
                listOfItems: [
                    {text: "hello"},
                    {text: "hello"},
                    {text: "hello"},
                    {text: "hello"},
                    {text: 'world'}

                ]
            }
        },
        methods: {
            editProfile: function () {
                this.$router.push('/edit')
            },
        },

    }
</script>

<style scoped>
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