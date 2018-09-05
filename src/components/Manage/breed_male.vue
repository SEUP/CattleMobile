<template>
	<Page class="page">
		<ActionBar title="การจัดการ">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
			<ActionItem ios.systemIcon="3" @tap="update" android.systemIcon="ic_menu_save" ios.position="right" />
			<ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel" />
		</ActionBar> 
		<StackLayout orientation="vertical" width="100%" height="100%" backgroundColor="white">
			<TextField v-model="form.cattle_type" hint="Enter text..." />
		</StackLayout>
	</Page>
</template>

<script>
export default {
    data() {
        return {
			form:{},
			data:{}
		};
    },created() {
		
		this.load();
	},methods:{
		preData(){
			this.form.id = this.data.id;
		},
		update: async function(){
				this.preData();
				alert(this.form.id);
                //  let farmer = await this.$store.dispatch("cattle/changeType", this.form); 
                  
		},
			 load(){
            
			  this.data =  this.$route.params.cattle; 
			  	alert(this.data.id);
        }
	}
};
</script>

<style>
</style>
