<template>
    <Page class="page">
        <ActionBar title="การจำหน่ายโค">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="back"/> 
        </ActionBar>

        <ScrollView>
         <ListView for="cattle in cattles.data">
                <v-template >
                    <CattleListItem  @tap="editCattle(cattle)" :cattle="cattle"/>
                </v-template>
            </ListView>
            
        </ScrollView>
    </Page>
</template>
<script>
    import {mapState} from 'vuex'
    import {Image} from "ui/image";
    import CattleListItem from "./Cattle/CattleListItem"

    export default {
        components : {
            CattleListItem : CattleListItem
        },
        data() {
            return {
                 
                cattles: null,
            }
        },  computed: {
             
            ...mapState({
                user: state => state.user.user,
                choices: state => state.choice.choices,
                breedSell: state => state.cattle.breedSell,
            })
        },
         created() {
                   this.$store.dispatch("mobile/allowBack",'home')
              let sellMale =  this.$store.dispatch('cattle/loadSell', this.user.id)
        
            this.breederMale();
        },
        methods: {
            breederMale: async function(){ 
              
               this.cattles = this.breedSell;
              
            },
            editProfile: function () {
               
            },
            back: async function () {

                this.$router.back()
            },
            addForm : function () {
        
            },
            editCattle :function(cattle){
                let res = 0;
                confirm({
                title: "เมนู",
                message: "ยกเลิกการจำหน่าย",
                okButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก"
                }).then(result => {
                    if(result){
                         let sellMale =  this.$store.dispatch('cattle/backSell',cattle)
                        let load =  this.$store.dispatch('cattle/loadSell', this.user.id)
                        this.cattles = this.breedSell;
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

    .cattlelist > .text {
        margin-left: 40rem;
    }

    .defind {
        width: 33%;
    }
</style>