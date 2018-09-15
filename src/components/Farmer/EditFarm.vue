<template>
    <Page class="page">
        <ActionBar class="bg-blue"  title="แก้ไขข้อมูลฟาร์ม">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/>

            <ActionItem ios.systemIcon="3" @tap="save" android.systemIcon="ic_menu_save" ios.position="right"/> 
        </ActionBar>

        <ScrollView>
            <StackLayout>

        <StackLayout class="card">
                    <StackLayout class="card-menu bg-blue" style=" " orientation="vertical">

                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="ชื่อฟาร์ม" row="0" col="0" />
                            </StackLayout>
                            <TextField v-model="form.name" hint="ชื่อฟาร์ม" class="gr-text" row="0" col="1" />
                        </GridLayout>

                         <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="เลขจดทะบเียน" row="0" col="0" />
                            </StackLayout>
                            <TextField v-model="form.farm_issue_id" hint="เลขจดทะบเียน" class="gr-text" row="0" col="1" />
                        </GridLayout>

                         <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="วันที่จดทะเบียน" row="0" col="0" />
                            </StackLayout>
                            <TextField @tap="setDate(form,'farm_issue_date')"  :text="`${ form.farm_issue_date ? $moment(form.farm_issue_date).format('DD MMMM YYYY') : 'วันที่จดทะเบียน'}`" class="gr-text" row="0" col="1" />
                        </GridLayout>

                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="ละติจูด" row="0" col="0" />
                            </StackLayout>
                            <TextField v-model="form.farm_lat" hint="ละติจูด" class="gr-text" row="0" col="1" />
                        </GridLayout>

                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="ลองจิจูด" row="0" col="0" />
                            </StackLayout> 
                            <TextField  v-model="form.farm_lng" hint="ลองจิจูด" class="gr-text" row="0" col="1" />
                        </GridLayout>

                    </StackLayout>
        </StackLayout>
            </StackLayout>
        </ScrollView>
  
    </Page>
</template>

<script>

    import {mapState, mapGetters} from 'vuex'
    import Province from "../Modal/Province"
    import DatePickerModal from "../Modal/DatePickerModal"

    export default {
        name: "EditFarm",
        components: {},
        data() {
            return {
                form: {},
                listOfItems: [1, 2, 3, 4, 5, 6]
            }
        },
        computed: {
            ...mapState({
                user: state => state.user.user,
                farm: state => state.user.farm,
            }),

            ...mapGetters({})
        },
        mounted() {
            console.log("Edit Profile")
            this.form = JSON.parse(JSON.stringify(this.farm));
            // console.log("USER FORM : ", this.form)
        },
        methods: {
            setDate: async function (parent, key) {
                console.log('setDate')
                let result = await this.$showModal(DatePickerModal)
                parent[key] = result;
                console.log(result);
            },
            save: async function () {
                console.log(this.form.id)
                let result = await this.$store.dispatch('user/updateFarm', this.form);
                // console.log(result);
                this.$router.go(-1);
            },
        }
    }
</script>

<style scoped>
    .page {
        background-color: white;
    }

    .form {
        padding: 10rem;
    }

    .form-item {
        margin: 5rem 0rem 5rem 0rem;
        font-size: 18rem;
        color: black;
    }

    .form-item > Label {
        padding-bottom: 15rem;
        border-bottom-width: 1rem;
        border-bottom-color: #9e9e9e;
        border-bottom-style: solid;
    }
</style>