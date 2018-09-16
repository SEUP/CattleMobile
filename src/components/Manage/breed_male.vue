<template>
	<Page class="page">
		<ActionBar title="การจัดการ">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
			<ActionItem ios.systemIcon="3" @tap="create" android.systemIcon="ic_menu_save" ios.position="right" />
		</ActionBar> 
    	 	<ScrollView width="100%" height="100%;" class="bg-wh">
			<StackLayout>

				<StackLayout class="card">
					<StackLayout class="card-menu bg-violet" orientation="vertical">
					 <Label text="การผสมพันธุ์" class="f30 dark" />
						<GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
							<StackLayout class="gr">
								<Label class="gr-label light" text="วัน/เดือน/ปี" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'breeding_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.breeding_date ? $moment(form.breeding_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</GridLayout>

					 	 <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
							<StackLayout class="gr">
								<Label class="gr-label light" text="น้ำเชื้อ" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1"  @tap="setChoice(form,'breed_type','การให้น้ำเชื้อ')" :text="`${getChoiceTextByID(form.breed_type) || 'ไม่ระบุ'}`" />
						</GridLayout>

            <GridLayout v-if="form.breed_type == '240200'" class="txt-gr" columns="*, 2*" rows="2*, 3*">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ผู้ทำ" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1"  @tap="setChoice(form,'maker','ผู้ทำ')" :text="`${getChoiceTextByID(form.maker) || 'ไม่ระบุ'}`" />
						</GridLayout>
 

					</StackLayout>
	 
					  <ListView class="list-group" for="list in listData" style="height:1250px">
					<v-template>
						<FlexboxLayout flexDirection="row" class="list-group-item">
							<Label  :text="`${getChoiceTextByID(list.breed_type) || 'ไม่ระบุ'}`" class="list-group-item-heading" style="width: 60%" />
							<Label  :text="$moment(list.breeding_date).format('DD-MM-YYYY')" class="list-group-item-heading" style="font-size:16px; width: 60%" />
						</FlexboxLayout>
					</v-template>
				</ListView>
				</StackLayout> 
			</StackLayout>
		</ScrollView>

    
	</Page> 
</template>

<script>
import DatePickerModal from "../Modal/DatePickerModal";
import Choice from "../Modal/Choice";
import { mapGetters, mapState } from "vuex";
export default {
    data() {
        return {
					listData:[],
			form:{},
			data:{}
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
			this.form.breeding_date = this.$moment(this.form.breeding_date ).format('YYYY-MM-DD')
			let farmer = await this.$store.dispatch("breeder_male/create", this.form);
      if (farmer == 1) {
        let data = await this.$store.dispatch(
          "cattle/load",
          this.data.farmer_id
        );
      this.read();
      }
                  
		},
		read: async function(){
			let preData= await this.$store.dispatch("breeder_male/read", this.data.id);
					this.listData = preData.data; 
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
