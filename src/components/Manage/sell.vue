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
					 <Label text="การจำหน่าย" class="f30 dark" />
						<GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
							<StackLayout class="gr">
								<Label class="gr-label light" text="วัน/เดือน/ปี" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'sale_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.sale_date ? $moment(form.sale_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</GridLayout>

							<GridLayout  class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="จำนวนวันที่เลี้ยง" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" :text="date()"  hint="โปรดกรอกข้อมูล" />
						</GridLayout>

					 	 <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
							<StackLayout class="gr">
								<Label class="gr-label light" text="หมายเหตุ" row="0" col="0" />
							</StackLayout> 
							<TextField class="gr-text" row="0" col="1"  @tap="setChoice(form,'sale_note','หมายเหตุการจำหน่าย')" :text="`${getChoiceTextByID(form.sale_note) || 'ไม่ระบุ'}`" />
						</GridLayout>

						<GridLayout v-if="form.sale_note == '220100'" class="txt-gr" columns="*, 2*" rows="2*, 3*">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ช่องทางการจำหน่าย" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1"  @tap="setChoice(form,'sale_chanel','ช่องทางการจำหน่าย')" :text="`${getChoiceTextByID(form.sale_chanel) || 'ไม่ระบุ'}`" />
						</GridLayout>

							<GridLayout v-if="form.sale_note == '220100'"  class="txt-gr" columns="*, 2*" rows="2*, 3*">
							<StackLayout class="gr">
								<Label class="gr-label light" text="ลักษณะการจำหน่าย" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1"  @tap="setChoice(form,'sale_characteristics','ลักษณะการจำหน่าย')" :text="`${getChoiceTextByID(form.sale_characteristics) || 'ไม่ระบุ'}`" />
						</GridLayout>

						  <GridLayout v-if="form.sale_note == '220100'"  class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="น้ำหนัก" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.length_sale" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</GridLayout>

				

						  <GridLayout v-if="form.sale_note == '220100'"  class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="ราคา" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.sale_price" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</GridLayout>
 
 

					</StackLayout>
	 
					  <ListView class="list-group" for="list in listData" style="height:1250px">
					<v-template>
						<FlexboxLayout flexDirection="row" class="list-group-item">
							<Label  :text="`${getChoiceTextByID(list.sale_characteristics) || 'ไม่ระบุ'}`" class="list-group-item-heading" style="width: 60%" />
							<Label  :text="$moment(list.sale_characteristics).format('DD-MM-YYYY')" class="list-group-item-heading" style="font-size:16px; width: 60%" />
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
		//	this.form.breeding_date = this.$moment(this.form.breeding_date ).format('YYYY-MM-DD')
		this.form.options = {
                "sale_note": "",
                "sale_chanel": "",
                "weight_sale": this.form.options.length_sale,
                "scrap_grades": "",
                "sale_characteristics": ""
            }
		let farmer = await this.$store.dispatch("sell/create", this.form);
     	 if (farmer == 1) {
			  let data = await this.$store.dispatch(   "cattle/load",  this.data.farmer_id );
			  this.$router.push('/home') }
                  
		},
		read: async function(){
			let preData= await this.$store.dispatch("sell/read", this.data.id);
					this.listData = preData.data; 
		},

		date(){
			let birthDate = this.$moment(this.data.birth_date)
      let saleDate = this.$moment(this.form.sale_date)
			 
			let dateDiff = birthDate.diff(saleDate,'day')
			return dateDiff;
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
