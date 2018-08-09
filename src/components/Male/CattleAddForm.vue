<template>
    <Page class="page">
        <ActionBar title="เพิ่มพ่อพันธ์ุ">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/>

            <ActionItem ios.systemIcon="3" @tap="save" android.systemIcon="ic_menu_save" ios.position="right"/>
            <ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel"/>
        </ActionBar>

        <StackLayout class="form">
            <StackLayout class="form-item">
                <TextField v-model="form.name" hint="ชื่อโค"/>
            </StackLayout>
            <StackLayout class="form-item">
                <TextField v-model="form.ear_number" hint="เบอร์หู"/>
            </StackLayout>
            <GridLayout rows="auto" columns="*,auto" class="form-item" @tap="setDate(form,'birth_date')">
                <Label :text="`${ form.birth_date ? $moment(form.birth_date).format('DD MMMM YYYY') : 'วันเกิด'}`"/>

                <Label row="0" col="1" class="fa"
                       :text="'fa-chevron-right' | fonticon"/>
            </GridLayout>

            <GridLayout rows="auto" columns="*,auto" class="form-item" @tap="setChoice(form,'sex','พันธ์ุโค')">
                <Label row="0" column="0"
                       :text="`เพศโค : ${getChoiceTextByID(form.sex) || 'ไม่ระบุ'}`"/>
                <Label row="0" col="1" class="fa"
                       :text="'fa-chevron-right' | fonticon"/>
            </GridLayout>
        </StackLayout>

    </Page>
</template>

<script>

    import DatePickerModal from "../Modal/DatePickerModal";
    import Choice from "../Modal/Choice"
    import {mapGetters} from 'vuex'

    export default {
        name: "CattleAddForm",
        props: {
            cattle: [Object],
        },
        data() {
            return {
                form: {}
            }
        },
        async create() {

        },
        computed: {
            ...mapGetters({
                getChoiceTextByID: 'choice/getChoiceTextByID'
            })
        },
        methods: {

            setChoice: async function (parent, key, to) {
                console.log('setChoice')
                let options = {
                    fullscreen: true,
                    animated: true,
                    context: {
                        propsData: {
                            choice_id: parent[key],
                            to: to,
                        }
                    }
                }
                let result = await this.$showModal(Choice, options)
                this.$set(parent, key, result);
                console.log('setChoice', parent[key]);
            },
            setDate: async function (parent, key) {
                console.log('setDate')
                let result = await this.$showModal(DatePickerModal)
                this.$set(parent, key, result);
                console.log('setDate', parent[key]);
                console.log(this.form.birth_date)

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