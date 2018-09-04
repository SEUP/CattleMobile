<template>
    <Page  class="page">
        <ActionBar title="แก้ไขพ่อพันธ์ุ">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/>
            <ActionItem ios.systemIcon="3" @tap="update" android.systemIcon="ic_menu_save" ios.position="right"/>
            <ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel"/>
        </ActionBar>
        <StackLayout  class="bg" orientation="vertical"> 
                <Button text="การจัดการ" style="background-color:#284677; color:white;" @tap="gotoManage" />
                 <ScrollView sdkExampleTitle sdkToggleNavButton style="margin-top:2%; height:100%;">
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
                                <TextField :text="monthOld()" width='50%' hint="อายุ(เดือน)"/>
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
        name: "CattleEditForm",
        props: {
            cattle: [Object],
        },
         data() {
            return {
                x:"Start",
                form: {}, 
                formTo:{},
            }
        },
         created() {
            this.breederMale();
        },  computed: {
    ...mapGetters({
      getChoiceTextByID: "choice/getChoiceTextByID"
    }),
    ...mapState({
      user: state => state.user.user
    })
  },
        methods: {
            gotoManage(){
                let data_cattle_send = {
                    id: this.form.id,
                    type: this.form.cattle_type,
                }
                 this.$router.push({ name:'manage_cattle',params: {cattle: data_cattle_send} })
               
            },

             monthOld(){ 
               return this.$moment().diff(this.form.birth_date, 'month')%12;
            },

            yearOld(){ 
               return this.$moment().diff(this.form.birth_date, 'years');;
            },
            breederMale: function () {
                this.form =  this.$route.params.cattle; 
            },
            cattleTap: function () {

            },
            update: async function(){
                     this.deleteData();
                  let farmer = await this.$store.dispatch("cattle/updateCattle", this.form);
              
                  if (farmer == 1) {  
                        let data = await this.$store.dispatch("cattle/load", this.form.farmer_id);
                        this.$router.go(-1);
                }
            },
            deleteData(){
                delete this.form.updated_at;
                delete this.form.created_at;
                 delete this.form.options;
                delete this.form.fertilization;
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
    }
</script>

<style scoped>
.page {
  background-color: white;
}
    .wh{color:white;}
</style>