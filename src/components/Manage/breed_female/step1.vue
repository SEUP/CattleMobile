<template>
	<Page class="page">
		<ActionBar class="bg-violet" title="การเหนี่ยวนำ" style="color:white;">
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
								<Label class="gr-label light" text="การเหนี่ยวนำ" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1"  @tap="setChoice(form,'induction','การเหนี่ยวนำการเป็นสัด')" :text="`${getChoiceTextByID(form.induction) || 'ไม่ระบุ'}`" />
						</StackLayout>
 	                    
                         <StackLayout v-if="form.induction == '270100'"  class="txt-gr"  > 
							<StackLayout class="gr">
								<Label class="gr-label light" text="วิธีใช่เหนี่ยวนำ" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.options.induction" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</StackLayout>
                        
                        <StackLayout v-if="form.induction == '270100'" class="txt-gr"  >
							<StackLayout class="gr">
								<Label class="gr-label light" text="วัน/เดือน/ปี" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'induction_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.induction_date ? $moment(form.induction_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
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
			form:{options:{},},
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
       // this.form.pregnancy_status = 2;
     
       
        this.form.induction_date = this.$moment(this.form.induction_date ).format('YYYY-MM-DD')
        let cattle = await this.$store.dispatch("breeder_female/step1", this.form); 
    
         this.$router.push({ name:'step2',params: {cattle: this.data,form:cattle} })
  
     
    },
		load(){
          
              this.data =  this.$route.params.cattle; 
         
              this.form.cattle_id = this.data.id; 
			 
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
