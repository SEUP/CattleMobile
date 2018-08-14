<template>
    <Page class="page">
        <ActionBar title="แก้ไขข้อมูลส่วนตัว">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/>

            <ActionItem ios.systemIcon="3" @tap="save" android.systemIcon="ic_menu_save" ios.position="right"/>
            <ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel"/>
        </ActionBar>
        <ScrollView>
            <StackLayout class="form">
                <StackLayout height="40"
                             style="background-color: #9e9e9e; color:white; font-size: 24px; font-weight: bold ">
                    <Label text="ข้อมูลส่วนตัว"/>
                </StackLayout>
                <StackLayout class="form-item">
                    <TextField v-model="form.firstname" hint="ชื่อ"/>
                </StackLayout>
                <StackLayout class="form-item">
                    <TextField v-model="form.lastname" hint="นามสกุล"/>
                </StackLayout>
                <StackLayout class="form-item">
                    <TextField v-model="form.personal_id" hint="รหัสประจำตัวประชาชน"/>
                </StackLayout>
                <StackLayout class="form-item">
                    <TextField v-model="form.phone_number" hint="เบอร์โทรศัพท์"/>
                </StackLayout>
                <StackLayout class="form-item">
                    <TextField v-model="form.house_address" hint="ที่อยู่"/>
                </StackLayout>
                <StackLayout class="form-item">
                    <TextField v-model="form.phone_number" hint="เบอร์โทรศัพท์"/>
                </StackLayout>

                <GridLayout rows="auto" columns="*,auto" class="form-item" @tap="selectProvince">
                    <Label row="0" column="0"
                           :text="`จังหวัด ${getProvinceNameByCode(form.house_province) || ''}`"/>
                    <Label row="0" col="1" class="fa"
                           :text="'fa-chevron-right' | fonticon"/>
                </GridLayout>

                <GridLayout rows="auto" columns="*,auto" class="form-item" @tap="selectAmphur">
                    <Label row="0" column="0"
                           :text="`อำเภอ ${getAmphurNameByCode(form.house_province,form.house_amphur) || ''}`"/>
                    <Label row="0" col="1" class="fa"
                           :text="'fa-chevron-right' | fonticon"/>
                </GridLayout>

                <GridLayout rows="auto" columns="*,auto" class="form-item" @tap="selectDistrict">
                    <Label row="0" column="0"
                           :text="`ตำบล ${getDistrictNameByCode(form.house_province,form.house_amphur,form.house_district) || ''}`"/>
                    <Label row="0" col="1" class="fa"
                           :text="'fa-chevron-right' | fonticon"/>
                </GridLayout>

                <StackLayout height="40"
                             style="background-color: #9e9e9e; color:white; font-size: 24px; font-weight: bold ">
                    <Label text="ข้อมูลการเข้าใช้งาน"/>
                </StackLayout>
                <StackLayout class="form-item">
                    <TextField v-model="form.email" hint="อีเมลล์"/>
                </StackLayout>
                <StackLayout class="form-item">
                    <TextField v-model="form.username" hint="ชื่อผู้ใช้"/>
                </StackLayout>
                <StackLayout class="form-item">
                    <TextField v-model="form.password" hint="รหัสผ่าน"/>
                </StackLayout>
                <StackLayout class="form-item">
                    <TextField v-model="form.password_confirmation" hint="ยืนนยันรหัสผ่าน"/>
                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>

    import {mapState, mapGetters} from 'vuex'
    import Province from "../Modal/Province"

    export default {
        name: "Profile",
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
            }),

            ...mapGetters({
                getProvinceNameByCode: 'district/getProvinceNameByCode',
                getAmphurNameByCode: 'district/getAmphurNameByCode',
                getDistrictNameByCode: 'district/getDistrictNameByCode',

            })
        },
        mounted() {
            console.log("Edit Profile")
            this.form = JSON.parse(JSON.stringify(this.user));
            // console.log("USER FORM : ", this.form)
        },
        methods: {
            save: async function () {
                let result = await this.$store.dispatch('user/updateUser', this.form);
                console.log(result);
                this.$router.go(-1);
            },
            selectDistrict: async function () {
                console.log('selectDistrict')
                let options = {
                    fullscreen: true,
                    animated: true,
                    context: {
                        propsData: {
                            province_id: this.form.house_province,
                            amphur_id: this.form.house_amphur,
                            district_id: this.form.house_district,
                            type: "district",
                        }
                    }
                }

                let district = await this.$showModal(Province, options)
                if (district && district.district_id != this.form.house_district) {
                    this.form.house_district = district.district_id;
                }

            },
            selectAmphur: async function () {
                console.log('selectAmphur')
                let options = {
                    fullscreen: true,
                    animated: true,
                    context: {
                        propsData: {
                            province_id: this.form.house_province,
                            amphur_id: this.form.house_amphur,
                            type: "amphur",
                        }
                    }
                }
                let amphur = await this.$showModal(Province, options)
                if (amphur && amphur.amphur_id != this.form.house_amphur) {
                    this.form.house_amphur = amphur.amphur_id
                    this.form.house_district = null;
                }
            },
            selectProvince: async function () {
                console.log('selectProvince')
                let options = {
                    fullscreen: true,
                    animated: true,
                    context: {
                        propsData: {
                            province_id: this.form.house_province,
                            type: "province",
                        }

                    }
                }
                let province = await this.$showModal(Province, options)
                if (province && province.province_id != this.form.house_province) {
                    this.form.house_province = province.province_id
                    this.form.house_amphur = null
                    this.form.house_district = null;
                }
            }
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