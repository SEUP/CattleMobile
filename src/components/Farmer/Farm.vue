<template>
    <Page class="page">
        <ActionBar class="bg-blue"  title="ข้อมูลฟาร์ม">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/>
        </ActionBar>
        <StackLayout>
            <StackLayout style="background: rgba(73, 155, 234, 1);" row="0" class="user-profile">
                <Avatar/>
                <Label class="header" :text="`${user.firstname} ${user.lastname}`"/>
                <Label class="subheader" :text="user.email"/>

                <GridLayout rows="auto" columns="*">
                    <Button row="0" col="0" class="change-image" @tap="editFarm">แก้ไขข้อมูล</Button>
                </GridLayout>

            </StackLayout>

            <StackLayout class="data-form">
                <StackLayout class="data-item">
                    <Label class="label">ชื่อฟาร์ม</Label>
                    <Label class="text" :text="`${farm.name || 'ไม่ระบุ'}`"/>
                </StackLayout>
                <StackLayout class="data-item">
                    <Label class="label">เลขที่ฟาร์ม</Label>
                    <Label class="text" :text="`${farm.farm_issue_id || 'ไม่ระบุ'}`"/>
                </StackLayout>
                <StackLayout class="data-item">
                    <Label class="label">วันที่จดทะเบียน</Label>
                    <Label class="text"
                           :text="`${farm.farm_issue_date ? $moment(farm.farm_issue_date).format('DD MMMM YYYY') : 'ไม่ระบุ'}`"/>
                </StackLayout>
                <StackLayout class="data-item">
                    <Label class="label">ละติจูด,ลองจิจูด</Label>
                    <Label class="text" :text="`${farm.farm_lat || 'ไม่ระบุ'},${farm.farm_lng || 'ไม่ระบุ'}`"/>
                </StackLayout>

            </StackLayout>

        </StackLayout>
    </Page>
</template>

<script>

    import {mapState} from 'vuex'
    import * as applicationSettings from 'tns-core-modules/application-settings'
    import * as imagepicker from "nativescript-imagepicker";
    import * as camera from "nativescript-camera";
    import {Image} from "ui/image";
    import * as imageSource from "tns-core-modules/image-source";
    import * as permissions from "nativescript-permissions";

    const ImageCropper = require("nativescript-imagecropper").ImageCropper;

    import Avatar from "./Avatar"

    export default {
        name: "Farm",
        components: {
            Avatar,
        },
        data() {
            return {}
        },
        computed: {

            ...mapState({
                user: state => state.user.user,
                farm: state => state.user.farm,

            })
        },
        async created() {
                  this.$store.dispatch("mobile/allowBack")
            console.log("Profile created")
        },
        methods: {
            editFarm: async function () {
                this.$router.push('/farm-edit')

            }
        }
    }
</script>

<style scoped>
 .page{
    background: rgba(73, 155, 234, 1);
 }
    .data-form {
        color: white;
        background: rgba(0, 96, 186, 1); 
    }

    .data-item {
        padding: 10rem;
        font-size: 18rem;

        border-bottom-style: solid;
        border-bottom-width: 1rem;
        border-bottom-color: #b6b6b6;

    }

    .data-item > .label {
        font-size: 14rem;
        color: #dfdfdf

    }

    .data-item > .text {
    }

    .user-profile {
        height: auto;
    }

    .logout-btn {
        background-color: #ff3f4e;
        color: white;
        font-weight: bold;
    }

    .avatar {
        border-radius: 50%;
        width: 100rem;
        height: 100rem;
        border-width: 4rem;
        border-color: #48b1ec;
    }

    .change-image {
        width: 50%;
        margin-top: 10rem;
        border-color: white;
        border-width: 5rem;
        border-style: solid;
        background-color: #3d5afe;
        color: white;

    }
</style>