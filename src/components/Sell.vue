<template>
    <Page class="page">
        <ActionBar title="การจำหน่ายโค">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="back" />
        </ActionBar>
        
        <TabView :selectedIndex="selectedIndex">
            <TabViewItem title="จำหน่าย">

                <ListView for="cattle in cattles">
                    <v-template>
                         <GridLayout v-if="cattle.sale.sale_price != null" @tap="editCattle(cattle)" class="cattlelist" rows="auto" columns="1*,5*,auto" style="">
                            <Image v-if="!cattle.image_url" src="~/images/logo.png" class="thumb img-circle"/>
                                <Image v-if="cattle.image_url"  :src="'http://mct.ict.up.ac.th:10008/'+cattle.image_url" class="thumb img-circle" /> 
                            <Image v-else  src="~/images/logo.png" class="thumb img-circle" /> 
                            <StackLayout  style="padding-left:9%; padding-top:9%;" class="text" row="0" col="1">
                                <Label class="cattlelist-header" style="font-size:18px;" :text="'ชื่อโค: '+checkNull(cattle.name)"/>
                                <Label   :text="'เบอร์หู: '+checkNull(cattle.ear_number)"/>
                                 <Label   :text="'จำนวนวันที่เลี้ยง : '+totalDay(cattle) + ' วัน'"/>
                                  <Label  :text="'ราคาที่จำหน่าย : '+ checkNull(cattle.sale.sale_price) + ' บาท'"/>
                            </StackLayout>
                            <Label row="0" col="2" class="fa"
                                :text="'fa-chevron-right' | fonticon"/>
                         </GridLayout>
                    </v-template>
                </ListView>


            </TabViewItem>
            <TabViewItem title="ทำลาย">
 
                <ListView for="cattle in cattles">
                    <v-template>
                        <GridLayout v-if="cattle.sale.sale_price == null" @tap="editCattle(cattle)" class="cattlelist" rows="auto" columns="1*,5*,auto" style="">
                            <Image v-if="!cattle.image_url" src="~/images/logo.png" class="thumb img-circle"/>
                                <Image v-if="cattle.image_url"  :src="'http://mct.ict.up.ac.th:10008/'+cattle.image_url" class="thumb img-circle" /> 
                            <Image v-else  src="~/images/logo.png" class="thumb img-circle" /> 
                            <StackLayout  style="padding-left:9%; padding-top:9%;" class="text" row="0" col="1">
                                <Label class="cattlelist-header" style="font-size:18px;" :text="'ชื่อโค: '+checkNull(cattle.name)"/>
                                <Label  :text="'เบอร์หู: '+checkNull(cattle.ear_number)"/>
                                 <Label   :text="'จำนวนวันที่เลี้ยง: '+totalDay(cattle) + ' วัน'"/> 
                            </StackLayout>
                            <Label row="0" col="2" class="fa"
                                :text="'fa-chevron-right' | fonticon"/>
                         </GridLayout>
                    </v-template>  
                </ListView>


            </TabViewItem>
        </TabView>

    </Page>
</template>
<script> 
    import {
        mapState
    } from 'vuex' 
    import {
        Image
    } from "ui/image";
    import CattleListItem from "./Cattle/CattleListItem"

    export default {
        components: {
            CattleListItem: CattleListItem
        },
        data() {
            return {

                cattles: null,
            }
        },
        computed: {

            ...mapState({
                user: state => state.user.user,
                choices: state => state.choice.choices,
                breedSell: state => state.cattle.breedSell,
            })
        },
         created() {
            this.$store.dispatch("mobile/allowBack", 'home') 

            this.load();
        },
        methods: {
 checkNull(arg){
                if(arg == null){return 'ไม่ระบุ';}
                else {return arg;}
            },
            	breederMale: async function () {
             
									let preData = await this.$store.dispatch("cattle/read", this.user.id);
                                    this.cattles = preData.data;
                                    console.log(this.cattles );
                                    
                                },
                	load() {
 
									this.breederMale();
								},
            totalDay : function(cattle) {

        let dateDiff  = 0
        if(cattle.birth || cattle.buy_date == null){
          let birthDate = this.$moment(cattle.birth_date)
          let saleDate = this.$moment(cattle.sale.sale_date)

          dateDiff = birthDate.diff(saleDate,'day')


        }else {
          let buyDate = this.$moment(cattle.buy_date)
          let saleDate = this.$moment(cattle.sale.sale_date)

          dateDiff = buyDate.diff(saleDate,'day')

        }
        return dateDiff ? Math.abs(dateDiff) : 0
      },
           /* breederMale: async function () { 
                 let sellMale =  this.$store.dispatch('cattle/loadSell', this.user.id)
                    this.cattles = this.breedSell;

                },*/
                editProfile: function () {

                },
                back: async function () {

                        this.$router.back()
                    },
                    addForm: function () {

                    },
                    editCattle: async function(cattle) {
                        let res = 0;
                        confirm({
                            title: "เมนู",
                            message: "ยกเลิกการจำหน่าย",
                            okButtonText: "ตกลง",
                            cancelButtonText: "ยกเลิก"
                        }).then(result => {
                            if (result) {
                                let sellMale = this.$store.dispatch('cattle/backSell', cattle)
                           this.load(); 
                           this.$router.push('/home');
                            }
                        });

                    }
        },

    }
</script>

<style scoped>
    .page {
        background-color: white;
    }

    .cattlelist {
        padding: 10em;
        margin: 10em;
    }

    .cattlelist-header {
        font-size: 18em;
        font-weight: bold;
    }

    .cattlelist>.text {
        margin-left: 40rem;
    }

    .defind {
        width: 33%;
    }
</style>