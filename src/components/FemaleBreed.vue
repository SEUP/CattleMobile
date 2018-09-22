<template>
    <Page class="page">
        <ActionBar title="แม่พันธุ์">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="back"/>
            <ActionItem @tap="addForm" ios.systemIcon="1" android.systemIcon="ic_input_add"/>
        </ActionBar>

        <ScrollView>
         <ListView for="cattle in cattles.data">
                <v-template >
                    <CattleListItem v-if="cattle.cattle_type == '020200'"  @tap="editCattle(cattle)" :cattle="cattle"/>
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
                choices: state => state.choice.choices,
                breedsMale: state => state.cattle.breedsMale,
            })
        },
         created() {
                   this.$store.dispatch("mobile/allowBack",'home')
            this.breederMale();
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
                this.$router.push('/cattle/female/add')
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