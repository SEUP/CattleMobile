<template>
    <Page class="page"    >    
        <ActionBar title="พ่อพันธุ์">
              <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="back"/>
            <ActionItem @tap="addForm" ios.systemIcon="1" android.systemIcon="ic_input_add"/>
        </ActionBar>

        <ScrollView> 
         <ListView for="cattle in datas ">
                <v-template >
                    <CattleListItem   @tap="editCattle(cattle)" :cattle="cattle"/>
                </v-template>
            </ListView>
            
        </ScrollView>
    </Page> 
</template>
<script>
    import {mapState} from 'vuex'
    import {Image} from "ui/image";
    import CattleListItem from "./Cattle/CattleListItem"

        import * as application from "application";
        import * as platform from "platform";
        import * as utils from "utils/utils";

    export default {
        components : {
            CattleListItem : CattleListItem
        },
        data() {
            return {
                datas:{},
                    l :require('lodash'),
                cattles: null,
            }
        },  computed: {
             
            ...mapState({
                choices: state => state.choice.choices,
                breedsMale: state => state.cattle.breedsMale,
            })
        },
         created() {
            this.$store.dispatch("mobile/allowBack",'home')
            this.breederMale();

       
           let tmp_data  = this.l.filter(this.cattles.data,function(item){
                    try {
                    return item.cattle_type.indexOf('020100')>-1;
                    } catch (error) {
                        return null;
                    }
             
                }) 
             
        
            this.datas = tmp_data;

         
        },
        methods: { 
              
            breederMale: async function(){ 
               this.cattles = this.breedsMale;
         
              
            },
            editProfile: function () {
                this.$router.push('/edit')
            },
            back: async function () {

                this.$router.back()
            },
            addForm : function () {
                this.$router.push('/cattle/male/add')
            },
            editCattle :function(cattles){
               // this.$router.push('/cattle/male/edit')
                this.$router.push({ name:'male_edit',params: {cattle: cattles} })
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

    .cattlelist > .text {
        margin-left: 40rem;
    }

    .defind {
        width: 33%;
    }
</style>