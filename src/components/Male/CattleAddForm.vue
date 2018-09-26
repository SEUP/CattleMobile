<template>
    <Page class="page">
        <ActionBar style="background-color:#00ace6; color:white;" title="เพิ่มพ่อพันธ์ุ">  
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/> 
            <ActionItem ios.systemIcon="3" @tap="saveBreedsMale" android.systemIcon="ic_menu_save" ios.position="right"/> 
        </ActionBar>
          <StackLayout  class="bg" orientation="vertical"> 
               
                 <ScrollView sdkExampleTitle sdkToggleNavButton style="margin-top:2%; height:100%;">
                    	<StackLayout>  
                       <StackLayout class="card">
					<StackLayout class="card-menu " style="background-color:#6A5ACD;" orientation="vertical">
            
					 <Label text="ข้อมูลโค" class="f30 dark" /> 

						 <StackLayout class="txt-gr"  > 
							<StackLayout class="gr" >
								<Label class="gr-label light" text="ชื่อ" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.name"   class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</StackLayout> 

              <StackLayout class="txt-gr" > 
							<StackLayout class="gr"> 
								<Label class="gr-label light" text="เบอร์หู" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.ear_number" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</StackLayout> 

                        <StackLayout class="txt-gr" >
							<StackLayout class="gr">
								<Label class="gr-label light" text="วันเกิด" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'birth_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.birth_date ? $moment(form.birth_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</StackLayout>

                <StackLayout class="txt-gr" >
                                <StackLayout class="gr">
                                    <Label class="gr-label light" text="อายุ" row="0" col="0" />
                                </StackLayout>

                                <GridLayout columns="*, *" rows="*, *">  
                                <TextField v-model="old.year" :text="ageChange(old)" class="gr-text" row="0" col="0" hint="0 ปี" />
                                 <Label class="gr-label bg-white light" style="background-color:#E6E6FA;" text="ปี" row="0" col="1" />
                                 </GridLayout>
                                 <GridLayout columns="*, *" rows="*, *">  
                                 <TextField v-model="old.month"  :text="ageChange(old)" class="gr-text" row="0" col="0" hint="0 เดือน" /> 
                                  <Label class="gr-label bg-white light" style="background-color:#E6E6FA;" text="เดือน" row="0" col="1" />
                           </GridLayout>

                            </StackLayout>

                        
                        <StackLayout class="txt-gr" >
							<StackLayout class="gr">
								<Label class="gr-label light" text="วันที่ซื้อ" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'buy_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.buy_date ? $moment(form.buy_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</StackLayout>

                        <StackLayout class="txt-gr" >
							<StackLayout class="gr">
								<Label class="gr-label light" text="พันธุ์โค" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1"  @tap="setChoice(form,'cattle_breeding','พันธุ์โค')" :text="`${getChoiceTextByID(form.cattle_breeding) || 'ไม่ระบุ'}`" />
						</StackLayout>

                        <StackLayout class="txt-gr" >
							<StackLayout class="gr">
								<Label class="gr-label light" text="พันธุ์โค" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1"  @tap="setChoice(form,'cattle_source','แหล่งที่มา')" :text="`${getChoiceTextByID(form.cattle_source) || 'ไม่ระบุ'}`" />
						</StackLayout>
					</StackLayout>
                   </StackLayout>
  
                	</StackLayout>
                 </ScrollView>
           </StackLayout>

    </Page>
</template>

<script>
import DatePickerModal from "../Modal/DatePickerModal";
import Choice from "../Modal/Choice";
import { mapGetters, mapState } from "vuex";

export default {
  name: "CattleAddForm",
  props: {
    cattle: [Object]
  },
  data() {
    return {
      form: {},
       old:{year:0,month:0},
      tre: null
    };
  },
  async create() {      this.$store.dispatch("mobile/allowBack",'malebreed')
   this.yearOld();
        this.monthOld();
  },
  computed: {
    ...mapGetters({
      getChoiceTextByID: "choice/getChoiceTextByID"
    }),
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
        
         monthOld() {
                     this.old.month =  this.$moment().diff(this.form.birth_date, 'month') % 12;
                },

                yearOld() {
                    this.old.year =  this.$moment().diff(this.form.birth_date, 'years');;
                },
            ageChange: async function (age) {
       if(this.form.birth_date != null){
        let today = this.$moment();
      
        today.subtract(parseInt(age.year), 'years');
        today.subtract(parseInt(age.month), 'months'); 
        console.log(parseInt(age.year+'/'+age.month));
        this.form.birth_date = today.format("YYYY-MM-DD")
          }
        return age;
      },
         
    saveBreedsMale: async function() {
      this.form.farmer_id = this.user.id;
      this.form.cattle_status = "010100";
      this.form.cattle_type = "020100";
      this.form.cattle_sex = "030100";
      let farmer = await this.$store.dispatch("cattle/createCattle", this.form);
      this.tre = farmer;
      if (farmer == 1) {
        let data = await this.$store.dispatch("cattle/load", this.user.id);
      }
      this.goBack();
    },
    goBack() {
      this.$router.go(-1);
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
      console.log(this.form.birth_date); 
        this.yearOld();
        this.monthOld();
    }
  }
};
</script>

<style scoped>
.page {
  background-color: white;
}

.form-item {
  margin: 5rem 0rem 5rem 0rem;
  font-size: 18rem;
  color: black;
}

.form-item > label {
  padding-bottom: 15rem;
  border-bottom-width: 1rem;
  border-bottom-color: #9e9e9e;
  border-bottom-style: solid;
}
</style>