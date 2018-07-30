<template>
    <Page class="page">
        <ActionBar title="ระบบบริหารการเลี้ยงโค"></ActionBar>
        <GridLayout rows="200,*">
            <StackLayout row="0" class="user-profile">

                <Avatar/>


                <Label class="header" :text="`${user.firstname} ${user.lastname}`"/>
                <Label class="subheader" :text="user.email"/>
            </StackLayout>

            <GridLayout class="grid-btn" row="1" rows="*,*,*" columns="*,*">

                <Button @tap="listMaleBreed" class="main-btn" row="0" col="0" text="พ่อพันธุ์"/>
                <Button @tap="listFemaleBreed" class="main-btn" row="0" col="1" text="แม่พันธุ์"/>
                <Button @tap="listMeatBreed" class="main-btn" row="1" col="0" text="โคขุน"/>
                <Button @tap="listYoungBreed" class="main-btn" row="1" col="1" text="โคแรกเกิด"/>
                <Button @tap="listProfile" class="main-btn" row="2" col="0" text="ข้อมูลส่วนตัว"/>
                <Button @tap="listFarm" class="main-btn" row="2" col="1" text="ข้อมูลฟาร์ม"/>


            </GridLayout>
        </GridLayout>
    </Page>
</template>

<script>

    import {mapState} from 'vuex'
    import Avatar from "./Farmer/Avatar";

    export default {
        components: {Avatar},
        data() {
            return {}
        },
        computed: {
            ...mapState({
                user: state => state.user.user,
                userImage: state => state.user.userImage,
            })
        },
        async created() {
            await this.$store.dispatch("district/getProvinces")

        },
        async mounted() {
            console.log("Home Mounted ")
            await this.$store.dispatch("user/downloadAvatar")
        },
        methods: {


            listMaleBreed: function () {
                this.$router.push('/malebreed')
            },
            listFemaleBreed: function () {
                this.$router.push('/femalebreed')
            },
            listMeatBreed: function () {
                this.$router.push('/meatbreed')
            },
            listYoungBreed: function () {
                this.$router.push('/youngbreed')
            },
            listProfile: function () {
                this.$router.push('/profile')
            },
            listFarm: function () {
                this.$router.push('/farm')
            },
        }
    }
</script>

<style scoped>

    .grid-btn {
        padding-left: 10rem;
        padding-right: 10rem;
    }

    .main-btn {
        background-color: #545454;
        color: white;
        text-align: center;
        font-size: 24em;
        font-weight: bold;
    }
</style>

