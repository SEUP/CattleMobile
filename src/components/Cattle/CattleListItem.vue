<template>
    <GridLayout @tap="editForm" class="cattlelist" rows="auto" columns="1*,5*,auto" style="">
           <Image v-if="!cattle.image_url" src="~/images/logo.png" class="thumb img-circle"/>
        	<Image v-if="cattle.image_url"  :src="'http://mct.ict.up.ac.th:10008/'+cattle.image_url" class="thumb img-circle" /> 
           <Image v-else  src="~/images/logo.png" class="thumb img-circle" /> 
        <StackLayout  style="padding-left:9%; padding-top:9%;" class="text" row="0" col="1">
            <Label class="cattlelist-header" style="font-size:18px;" :text="'ชื่อโค: '+checkNull(cattle.name)"/>
            <Label class="cattlelist-header" :text="'เบอร์หู: '+checkNull(cattle.ear_number)"/>
        </StackLayout>
        <Label row="0" col="2" class="fa"
               :text="'fa-chevron-right' | fonticon"/>
              
               </GridLayout>
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
            checkNull(arg){
                if(arg == null){return 'ไม่ระบุ';}
                else {return arg;}
            },
            editForm : function () {
                this.$emit('tap')
            }
        }
    }
</script>

<style scoped>

</style>