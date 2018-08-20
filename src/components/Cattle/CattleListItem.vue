<template>
    <GridLayout @tap="editForm" class="cattlelist" rows="auto" columns="1*,5*,auto">
        
        	<Image  :src="'http://mct.ict.up.ac.th:10008/'+cattle.image_url" class="thumb img-circle" /> 
        <StackLayout class="text" row="0" col="1">
            <Label class="cattlelist-header" :text="cattle.name"/>
            <Label class="cattlelist-header" :text="cattle.ear_number"/>
        </StackLayout>
        <Label row="0" col="2" class="fa"
               :text="'fa-chevron-right' | fonticon"/></GridLayout>
</template>

<script>

    import router from "../../router"

    export default {
        name: "CattleListItem",
        props: {
            cattle: [Object],
        },
        data: () => ({}),
        async create() {

        },
        methods: {
            editForm : function () {
                this.$emit('tap')
            }
        }
    }
</script>

<style scoped>

</style>