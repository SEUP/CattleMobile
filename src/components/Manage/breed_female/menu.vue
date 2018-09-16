<template>
	<Page class="page">
		<ActionBar title="การจัดการ">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
		</ActionBar> 
    	 	<ScrollView width="100%" height="100%;" class="bg-wh">
			<StackLayout>
        <Button text="เพิ่มข้อมูลการผสมพันธุ์" @tap="gotoBreeder()"/>
         <ListView class="list-group" for="list in listData" style="height:1250px">
					<v-template>
						<FlexboxLayout flexDirection="row" class="list-group-item">
							<Label  :text="`${getChoiceTextByID(list.breed_type) || 'ไม่ระบุ'}`" class="list-group-item-heading" style="width: 60%" />
							<Label  :text="$moment(list.breeding_date).format('DD-MM-YYYY')" class="list-group-item-heading" style="font-size:16px; width: 60%" />
						</FlexboxLayout>
					</v-template>
				</ListView>
			</StackLayout>
		</ScrollView>

    
	</Page> 
</template>

<script>
import DatePickerModal from "../../Modal/DatePickerModal";
import Choice from "../../Modal/Choice";
import { mapGetters, mapState } from "vuex";
export default {
    data() {
        return { 
			form:{},
      data:{},
      listData:{},
		};
    },created() {
		
		this.load();
	},
	 computed: {
    ...mapGetters({
      getChoiceTextByID: "choice/getChoiceTextByID"
    }),    
    ...mapState({
      user: state => state.user.user
    })
  },
	methods:{
	
		create: async function(){ 
                  
		},
	    read: async function(){
			let preData= await this.$store.dispatch("breeder_female/read", this.data.id);
					this.listData = preData.data; 
		},
    gotoBreeder(){
      this.$router.push({ name:'step1',params: {cattle: this.data} }) 
    },
		load(){
            
			  this.data =  this.$route.params.cattle; 
				this.form.cattle_id = this.data.id;
				this.read();
		},
		setChoice: async function(parent, key, to) {
      console.log("setChoice");
      let options = {
        fullscreen: true,
        animated: true,
        context: {
          propsData: {
            choice_id: parent[key] ? parent[key] : null,
            to: to,
            remark: parent.options ? parent.options[key] : null
          }
        }
      };
      console.log("setChoice", options);
      let result = await this.$showModal(Choice, options);
      this.$set(parent, key, result.id);
      if (result.remark) {
        if (!parent.options) {
          this.$set(parent, "options", {});
        }
        this.$set(parent.options, key, result.remark);
      } else {
        if (!parent.options) {
          this.$set(parent, "options", {});
        }
        delete parent.options[key];
      }
      console.log("setChoice", parent[key]);
    },
    setDate: async function(parent, key) {
      console.log("setDate");
      let result = await this.$showModal(DatePickerModal);
      this.$set(parent, key, result);
      console.log("setDate", parent[key]); 
    } 
  },
    
};
</script>

<style>
</style>
