<template>
	<Page class="page">
		<ActionBar class="bg-violet" title="การตรวจท้อง">
			<NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
			  <ActionItem  @tap="gotoStep()"  ios.position="right">
            <StackLayout>
                <Label class="dark" text="ถัดไป" row="0" col="0" />
            </StackLayout>
        </ActionItem>
        
		</ActionBar> 
    	 	<ScrollView width="100%" height="100%;" class="bg-wh">
			<StackLayout>
        	<StackLayout class="card">
					<StackLayout class="card-menu bg-violet" orientation="vertical">

      	<StackLayout class="txt-gr" >
							<StackLayout class="gr">
								<Label class="gr-label light" text="วัน/เดือน/ปี" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'check_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.check_date ? $moment(form.check_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</StackLayout>

            
            <StackLayout class="txt-gr" >
							<StackLayout class="gr">
								<Label class="gr-label light" text="ผลการตรวจการผสมพันธุ์" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1"  @tap="setChoice(form,'breeding_result','ผลการตรวจการผสมพันธุ์')" :text="`${getChoiceTextByID(form.breeding_result) || 'ไม่ระบุ'}`" />
						</StackLayout>     

 	          <StackLayout class="txt-gr" v-if="form.breeding_result != '120200' && form.breeding_result != null" >
							<StackLayout class="gr">
								<Label class="gr-label light" text="วันที่ควาดว่าจะคลอด" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form.options,'baby_date_birth')" hint="โปรดกรอกข้อมูล" :text="`${ form.options.baby_date_birth ? $moment(form.options.baby_date_birth).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</StackLayout>


  </StackLayout>
    </StackLayout>

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
			form:{options:{}},
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
                  
		},
		read: async function(){
			  
    },
    gotoStep: async function(){
      if(this.form.breeding_result != '120200'){
            
        this.form.induction_date = this.$moment(this.form.induction_date ).format('YYYY-MM-DD')
        let cattle = await this.$store.dispatch("breeder_female/step1", this.form); 
    
         this.$router.push({ name:'step6',params: {cattle: this.data,form:cattle} })}
         else{
           alert('กรุณาบันทึก เเละผสมพันธุ์ใหม่');
           this.$router.back();
         }
    },
		load(){
            
			  this.data =  this.$route.params.cattle; 
			     this.form = this.$route.params.form;
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
