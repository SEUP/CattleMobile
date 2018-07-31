<template>
    <GridLayout @tap="cattleTap" class="cattlelist" rows="auto" columns="1*,5*,auto">
        <Image row="0" col="0" src="~/images/NativeScript-Vue.png"/>
        <StackLayout class="text" row="0" col="1">
            <Label class="cattlelist-header" text="Data 1"/>
            <Label class="cattlelist-header" text="Data 2"/>
            <Label class="cattlelist-header" text="Data 3"/>
        </StackLayout>
        <Label row="0" col="1" class="fa"
               :text="'fa-chevron-right' | fonticon"/></GridLayout>
</template>

<script>
    export default {
        name: "CattleListItem",
        props: {
            cattle: [Object],
        },
        data: () => ({}),
        async create() {

        },
        methods: {
            cattleTap: function () {

            }
        }
    }
</script>

<style scoped>

</style>