<template>
	<Page class="page">
		<ActionBar title="การจัดการ">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
			<ActionItem ios.systemIcon="3" @tap="update" android.systemIcon="ic_menu_save" ios.position="right" /> 
		</ActionBar> 
    	 	<ScrollView width="100%" height="100%;" class="bg-wh">
			<StackLayout>

				<StackLayout class="card">
					<StackLayout class="card-menu bg-violet" orientation="vertical">
					 <Label text="ข้อมูลเเรกเกิด" class="f30 dark" />
						<GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
							<StackLayout class="gr">
								<Label class="gr-label light" text="วัน/เดือน/ปี" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'start_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.start_date ? $moment(form.start_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</GridLayout>

            			<GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="น้ำหนัก" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.start_weight" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</GridLayout>

						<GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="ความยาวลำตัว" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.start_length" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</GridLayout>


						<GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="รอบอก" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.start_chest" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</GridLayout>


						<GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="ความสูง" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.start_height" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</GridLayout>

					</StackLayout>
				</StackLayout> 

					<StackLayout class="card">
					<StackLayout class="card-menu bg-violet" orientation="vertical">
					 <Label text="ข้อมูลเมื่อหย่านม" class="f30 dark" />
						<GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
							<StackLayout class="gr">
								<Label class="gr-label light" text="วัน/เดือน/ปี" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'end_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.end_date ? $moment(form.end_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</GridLayout>

            			<GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="น้ำหนัก" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.end_weight" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</GridLayout>

						<GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="ความยาวลำตัว" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.end_length" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</GridLayout>


						<GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="รอบอก" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.end_chest" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</GridLayout>


						<GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="ความสูง" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.end_height" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</GridLayout>

					</StackLayout>
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
	
		update: async function(){
		//	this.form.breeding_date = this.$moment(this.form.breeding_date ).format('YYYY-MM-DD')
			let farmer = await this.$store.dispatch("milk/update", this.form);
      if (farmer == 1) {
      this.read();
      }
                  
		},
		read: async function(){
			let preData= await this.$store.dispatch("milk/read", this.data.id);
					this.form = preData.data[0]; 
		},
			 load(){
			  this.data =  this.$route.params.cattle; 
				//this.form.cattle_id = this.data.id;
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
