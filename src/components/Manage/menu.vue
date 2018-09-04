<template>
 <Page class="page">
        <ActionBar title="การจัดการ">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/>
            <ActionItem ios.systemIcon="3" @tap="update" android.systemIcon="ic_menu_save" ios.position="right"/>
            <ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel"/>
        </ActionBar>
        <StackLayout  class="bg" orientation="vertical"> 
 
    <Button text="เปลี่ยนประเภทโค" @tap="onButtonTap" />
    <Button text="การผสม" @tap="onButtonTap" />
    <Button text="การฉัดวัคซีน" @tap="onButtonTap" />
    <Button text="ถ่ายพยาธิ" @tap="onButtonTap" />
    <Button text="การรักษา" @tap="onButtonTap" />
    <Button text="การจำหน่าย" @tap="onButtonTap" />
    <Button v-if="data.type == '020300'" text="การขุน" @tap="onButtonTap" />
    <Button v-if="data.type == '020400'" text="การอย่านม" @tap="onButtonTap" />


        </StackLayout>
 </Page>
</template>

<script>
export default {
      props: {
            cattle: [Object],
        },
    data() {
	    return {
            data:{},
	    };
    },created() {
        this.load();
    },methods:{
        load(){
              this.data =  this.$route.params.cattle; 
        }
    }
}
</script>

<style>
.page,.bg{
    background-color:white;
}
</style>