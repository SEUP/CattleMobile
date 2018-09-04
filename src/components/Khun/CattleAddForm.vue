<template>
    <Page class="page">
        <ActionBar style="background-color:#00ace6; color:white;" title="เพิ่มโคขุน">  
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/> 
            <ActionItem ios.systemIcon="3" @tap="saveBreedsMale" android.systemIcon="ic_menu_save" ios.position="right"/>
            <ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel"/>
        </ActionBar>
           <StackLayout  class="bg" orientation="vertical"> 
                 <ScrollView sdkExampleTitle sdkToggleNavButton style="margin-top:5%; height:100%;">
				<GridLayout rows="auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto">

                    <WrapLayout row="0" style="padding:5%;" orientation="horizontal" height="100">
						<WrapLayout style="  padding:8%; background-color:#6600cc; color:white;  width:100%; height:100%;" orientation="horizontal"> 
						 
								<Label style="margin-top:10%; font-size:20px;" text="ชื่อโค" />
								<TextField v-model="form.name" style="margin-top:-6%; width:100%;" hint="โปรดระบุชื่อโค" /> 
						 
						</WrapLayout>
					</WrapLayout>

                     <WrapLayout row="1" style="padding:5%;" orientation="horizontal" height="100">
						<WrapLayout style="  padding:8%; background-color:#009933; color:white;  width:100%; height:100%;" orientation="horizontal"> 
						 
								<Label style="margin-top:10%; font-size:20px;" text="เบอร์หู" />
								<TextField v-model="form.ear_number" style="margin-top:-6%; width:100%;" hint="โปรดระบุเบอร์หู" /> 
						 
						</WrapLayout>
					</WrapLayout>

                    <WrapLayout row="2" style="padding:5%;" orientation="horizontal" height="100">
						<WrapLayout style="  padding:8%; background-color:#009999; color:white;  width:100%; height:100%;" orientation="horizontal"> 
						    <GridLayout   rows="auto" columns="*,auto" class="form-item" @tap="setDate(form,'birth_date')">
                                <Label style="color:white;" :text="`${ form.birth_date ? $moment(form.birth_date).format('DD MMMM YYYY') : 'วันเกิด'}`"/>

                                <Label row="0" col="1" class="fa" :text="'fa-chevron-right' | fonticon"/>
                            </GridLayout> 	
                        </WrapLayout>
					</WrapLayout>

                    <WrapLayout row="3" style="padding:5%;" orientation="horizontal" height="100">
						<WrapLayout style="  padding:8%; background-color:#a34600; color:white;  width:100%; height:100%;" orientation="horizontal"> 
                        <WrapLayout style="margin-top:10%; font-size:20px; color:white" orientation="vertical"> 
                             	<Label  text="อายุ" />
                        </WrapLayout>
                        <WrapLayout orientation="vertical"> 
                            <TextField :text="yearOld()" width='50%' hint="อายุ(ปี)"/>
                                <TextField :text="monthOld()" w width='50%' hint="อายุ(เดือน)"/>
                        </WrapLayout>
        
						
						</WrapLayout>
					</WrapLayout>

                    <WrapLayout row="4" style="padding:5%;" orientation="horizontal" height="100">
						<WrapLayout style="  padding:8%; background-color:#660066; color:white;  width:100%; height:100%;" orientation="horizontal"> 
						    <GridLayout   rows="auto" columns="*,auto" class="form-item" @tap="setDate(form,'buy_date')">
                                <Label style="color:white;" :text="`${ form.buy_date ? $moment(form.buy_date).format('DD MMMM YYYY') : 'วันที่ซื้อ'}`"/>

                                <Label row="0" col="1" class="fa" :text="'fa-chevron-right' | fonticon"/>
                            </GridLayout> 	
                        </WrapLayout>
					</WrapLayout>

                    <WrapLayout row="5" style="padding:5%;" orientation="horizontal" height="100">
						<WrapLayout style="  padding:8%; background-color:#07198e; color:white;  width:100%; height:100%;" orientation="horizontal"> 
                            <GridLayout  rows="auto" columns="*,auto" class="form-item"  @tap="setChoice(form,'cattle_breeding','พันธุ์โค')">
                            
                            <Label style="color:white;" row="0" column="0" :text="`พันธุ์โค : ${getChoiceTextByID(form.cattle_breeding) || 'ไม่ระบุ'}`"/>
                        
                        </GridLayout>
						</WrapLayout>
					</WrapLayout>

                    <WrapLayout row="6" style="padding:5%;" orientation="horizontal" height="100">
						<WrapLayout style="  padding:8%; background-color:#271a30; color:white;  width:100%; height:100%;" orientation="horizontal"> 
                              <GridLayout rows="auto" columns="*,auto" class="form-item" @tap="setChoice(form,'cattle_source','แหล่งที่มา')">
                                <Label style="color:white;" row="0" column="0" :text="`แหล่งที่มา : ${getChoiceTextByID(form.cattle_source) || 'ไม่ระบุ'}`"/>
                    
                            </GridLayout>
						</WrapLayout>
					</WrapLayout>

                     <WrapLayout row="7" style="padding:5%;" orientation="horizontal" height="100">
						
					</WrapLayout>

				</GridLayout>
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
      this.form.cattle_type = "020300";
      this.form.cattle_sex = "030100";
      let farmer = await this.$store.dispatch("cattle/createCattle", this.form);
      this.tre = farmer;
      if (farmer == 1) {
        let data = await this.$store.dispatch("cattle/load", this.user.id);
      }
      this.goBack();
    },
    goBack() {
      this.$router.push("/meatbreed");
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