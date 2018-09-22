<template>
    <Page class="page">
        <ActionBar class="bg-blue" title="แก้ไขข้อมูลส่วนตัว">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)" />
    
            <ActionItem ios.systemIcon="3" @tap="save" android.systemIcon="ic_menu_save" ios.position="right" />
        </ActionBar>
    
        <ScrollView>
            <StackLayout>
    
                <StackLayout class="card">
                    <StackLayout class="card-menu bg-blue" style=" " orientation="vertical">
    
                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="ชื่อ" row="0" col="0" />
                            </StackLayout>
                            <TextField v-model="form.firstname" hint="ชื่อ" class="gr-text" row="0" col="1" />
                        </GridLayout>
    
                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="นามสกุล" row="0" col="0" />
                            </StackLayout>
                            <TextField v-model="form.lastname" hint="นามสกุล" class="gr-text" row="0" col="1" />
                        </GridLayout>
    
                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="รหัสประจำตัวประชาชน" row="0" col="0" />
                            </StackLayout>
                            <TextField v-model="form.personal_id" hint="รหัสประจำตัวประชาชน" class="gr-text" row="0" col="1" />
                        </GridLayout>
    
                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="เบอร์โทรศัพท์" row="0" col="0" />
                            </StackLayout>
                            <TextField v-model="form.phone_number" hint="เบอร์โทรศัพท์" class="gr-text" row="0" col="1" />
                        </GridLayout>
    
                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="ที่อยู่" row="0" col="0" />
                            </StackLayout>
                            <TextField v-model="form.house_address" hint="ที่อยู่" class="gr-text" row="0" col="1" />
                        </GridLayout>
    
                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="เบอร์โทรศัพท์" row="0" col="0" />
                            </StackLayout>
                            <TextField v-model="form.phone_number" hint="เบอร์โทรศัพท์" class="gr-text" row="0" col="1" />
                        </GridLayout>
    
                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="จังหวัด" row="0" col="0" />
                            </StackLayout>
                            <TextField @tap="selectProvince" :text="`จังหวัด ${getProvinceNameByCode(form.house_province) || ''}`" class="gr-text" row="0" col="1" />
                        </GridLayout>
    
                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="อำเภอ" row="0" col="0" />
                            </StackLayout>
                            <TextField @tap="selectAmphur" :text="`อำเภอ ${getAmphurNameByCode(form.house_province,form.house_amphur) || ''}`" class="gr-text" row="0" col="1" />
                        </GridLayout>
    
                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="ตำบล" row="0" col="0" />
                            </StackLayout>
                            <TextField @tap="selectDistrict" :text="`ตำบล ${getDistrictNameByCode(form.house_province,form.house_amphur,form.house_district) || ''}`" class="gr-text" row="0" col="1" />
                        </GridLayout>
    
    
                    </StackLayout>
                </StackLayout>
    
                <StackLayout class="card">
                    <StackLayout class="card-menu bg-blue" style=" " orientation="vertical">
    
                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="อีเมลล์" row="0" col="0" />
                            </StackLayout>
                            <TextField v-model="form.email" hint="อีเมลล์" class="gr-text" row="0" col="1" />
                        </GridLayout>

                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="ชื่อผู้ใช้" row="0" col="0" />
                            </StackLayout>
                            <TextField v-model="form.username" hint="ชื่อผู้ใช้"  class="gr-text" row="0" col="1" />
                        </GridLayout>

                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="รหัสผ่าน" row="0" col="0" />
                            </StackLayout>
                            <TextField v-model="form.password" hint="รหัสผ่าน" class="gr-text" row="0" col="1" />
                        </GridLayout>

                        <GridLayout class="txt-gr" columns="*, 2*" rows="2*, 3*">
                            <StackLayout class="gr">
                                <Label class="gr-label light" text="ยืนนยันรหัสผ่าน" row="0" col="0" />
                            </StackLayout>
                            <TextField v-model="form.password_confirmation" hint="ยืนนยันรหัสผ่าน" class="gr-text" row="0" col="1" />
                        </GridLayout>

                    </StackLayout>
                </StackLayout>
    
    
    
    

            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import {
        mapState,
        mapGetters
    } from 'vuex'
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
                  this.$store.dispatch("mobile/allowBack")
            console.log("Edit Profile")
            this.form = JSON.parse(JSON.stringify(this.user));
            // console.log("USER FORM : ", this.form)
        },
        methods: {
            save: async function() {
                let result = await this.$store.dispatch('user/updateUser', this.form);
                console.log(result);
                this.$router.go(-1);
            },
            selectDistrict: async function() {
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
            selectAmphur: async function() {
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
            selectProvince: async function() {
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
    
    .form-item>Label {
        padding-bottom: 15rem;
        border-bottom-width: 1rem;
        border-bottom-color: #9e9e9e;
        border-bottom-style: solid;
    }
</style>