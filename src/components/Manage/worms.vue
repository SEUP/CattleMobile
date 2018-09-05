<template>
	<Page class="page">
		<ActionBar title="การจัดการ">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
			<ActionItem ios.systemIcon="3" @tap="update" android.systemIcon="ic_menu_save" ios.position="right" />
			<ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel" />
		</ActionBar> 
		<StackLayout orientation="vertical" width="100%" height="100%" backgroundColor="white">
			 <GridLayout style="height:150px;"   rows="auto" columns="*,auto" class="form-item" @tap="setDate(form,'worming_date')">
               <Label style="color:black; font-size:20px;" :text="`${ form.worming_date ? $moment(form.worming_date).format('DD MMMM YYYY') : 'วันเกิด'}`"/>
               </GridLayout>
			 <Label style="color:black; font-size:20px;" text="เลือกผู้ทำ"/>
		<ListPicker :items="doc" v-model="i_doc" />
			<Label style="color:black; font-size:20px;" text="เลือกวัคซีน"/>
	 	<ListPicker :items="vac" v-model="i_vac" />
		</StackLayout>
	</Page>
</template>

<script>
import DatePickerModal from "../Modal/DatePickerModal";
export default {
    data() {
        return {
			i_vac:null,
			i_doc:null,
			vac:["พยาธิตัวกลม", "พยาธิใบไม้","พยาธิไส้เดือน", "พยาธิตัวแบน","อื่นๆ"],
			doc:["เจ้าหน้าที่", "ทำเอง","อื่นๆ"],
			form:{},
		};
	},
	methods:{
		chooseDoc(){
		 
			let result = this.i_doc;
  	 		let type = "";
     
        if (result == 0) {
          type = "080100";
        }
        if (result == 1) {
          type = "080200";
        }
        if (result == 2) {
          type = "080300";
        } 
	 
		this.form.maker = type;
		},

		chooseVac(){
		let type = "";
		let result = this.i_vac;

       
        if (result == 0) {
          type = "070100";
        }
        if (result == 1) {
          type = "070200";
		}
		if (result == 2) {
          type = "070300";
        }
        if (result == 3) {
          type = "070400";
		}
		 if (result == 3) {
          type = "070500";
        } 
		this.form.worming_type = type;
		},
		update: async function(){
			this.chooseDoc();
			this.chooseVac(); 
			let y =  this.$route.params.cattle;
				this.form.id = y.id;
			   let vac = await this.$store.dispatch("cattle/wormingSave", this.form);
			if (vac == 1) { 
				this.$router.go(-1);
			}
		},
		setDate: async function(parent, key) {
      console.log("setDate");
      let result = await this.$showModal(DatePickerModal);
	  this.$set(parent, key, result); 
	  alert(this.form.worming_date);
    }
	}
};
</script>

<style>
</style>
