<template>
    <Page class="page">
        <ActionBar style="background-color:#00ace6; color:white;" title="เพิ่มแม่พันธ์ุ">  
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/> 
            <ActionItem ios.systemIcon="3" @tap="saveBreedsMale" android.systemIcon="ic_menu_save" ios.position="right"/>
            <ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel"/>
        </ActionBar>
         <StackLayout  class="bg" orientation="vertical"> 
               
                 <ScrollView sdkExampleTitle sdkToggleNavButton style="margin-top:2%; height:100%;">
                    	<StackLayout> 
                       <StackLayout class="card">
					<StackLayout class="card-menu " style="background-color:#6A5ACD;" orientation="vertical">
					 <Label text="ข้อมูลโค" class="f30 dark" /> 
						 <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="ชื่อ" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.name" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</GridLayout> 

                         <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="เบอร์หู" row="0" col="0" />
							</StackLayout>
							<TextField v-model="form.ear_number" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</GridLayout>

                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
							<StackLayout class="gr">
								<Label class="gr-label light" text="วันเกิด" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'birth_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.birth_date ? $moment(form.birth_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</GridLayout>

                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*"> 
							<StackLayout class="gr">
								<Label class="gr-label light" text="อายุ" row="0" col="0" />
							</StackLayout>
							<TextField  :text="yearOld()+'ปี'+' '+monthOld()+'เดือน'" class="gr-text" row="0" col="1"  hint="โปรดกรอกข้อมูล" />
						</GridLayout>

                        
                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
							<StackLayout class="gr">
								<Label class="gr-label light" text="วันที่ซื้อ" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1" @tap="setDate(form,'buy_date')" hint="โปรดกรอกข้อมูล" :text="`${ form.buy_date ? $moment(form.buy_date).format('DD MMMM YYYY') : 'โปรดกรอกข้อมูล'}`" />
						</GridLayout>

                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
							<StackLayout class="gr">
								<Label class="gr-label light" text="พันธุ์โค" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1"  @tap="setChoice(form,'cattle_breeding','พันธุ์โค')" :text="`${getChoiceTextByID(form.cattle_breeding) || 'ไม่ระบุ'}`" />
						</GridLayout>

                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
							<StackLayout class="gr">
								<Label class="gr-label light" text="พันธุ์โค" row="0" col="0" />
							</StackLayout>
							<TextField class="gr-text" row="0" col="1"  @tap="setChoice(form,'cattle_source','แหล่งที่มา')" :text="`${getChoiceTextByID(form.cattle_source) || 'ไม่ระบุ'}`" />
						</GridLayout>
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
      tre: null
    };
  },
  async create() {},
  computed: {
    ...mapGetters({
      getChoiceTextByID: "choice/getChoiceTextByID"
    }),
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
         monthOld(){ 
               return this.$moment().diff(this.form.birth_date, 'month')%12;
            },

            yearOld(){ 
               return this.$moment().diff(this.form.birth_date, 'years');;
            },
    saveBreedsMale: async function() {
      this.form.farmer_id = this.user.id;
      this.form.cattle_status = "010100";
      this.form.cattle_type = "020200";
      this.form.cattle_sex = "030100";
      let farmer = await this.$store.dispatch("cattle/createCattle", this.form);
      this.tre = farmer;
      if (farmer == 1) {
        let data = await this.$store.dispatch("cattle/load", this.user.id);
      }
      this.goBack();
    },
    goBack() {
      this.$router.push("/femalebreed");
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
      console.log(this.form.buy_date);
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