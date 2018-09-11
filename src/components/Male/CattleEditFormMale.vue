<template>
    <Page  class="page">
        <ActionBar title="แก้ไข">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/>
            <ActionItem ios.systemIcon="3" @tap="update" android.systemIcon="ic_menu_save" ios.position="right"/>
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
                    <Button text="การจัดการ" class="circle" style="background-color:white; color:#284677;" @tap="gotoManage" />

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
                    farmer_id:this.form.farmer_id
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