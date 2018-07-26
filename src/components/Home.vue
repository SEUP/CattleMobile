<template>
    <Page class="page">
        <ActionBar title="ระบบบริหารการเลี้ยงโค"></ActionBar>
        <GridLayout rows="200,*">
            <StackLayout row="0" class="user-profile">
                <Image :src="`${$baseUrl}/api/v1/farmer/farmers/${user.id}/avatar`" class="avatar"></Image>
                <Label class="header" :text="`${user.firstname} ${user.lastname}`"/>
                <Label class="subheader" :text="user.email"/>
            </StackLayout>

            <GridLayout class="grid-btn" row="1" rows="*,*,*" columns="*,*" backgroundColor="#212121">

                <Button @tap="listMalebreed" class="main-btn" row="0" col="0" text="พ่อพันธุ์"/>
                <Button @tap="listFemalebreed" class="main-btn" row="0" col="1" text="แม่พันธุ์"/>
                <Button @tap="listMeatbreed" class="main-btn" row="1" col="0" text="โคขุน"/>
                <Button @tap="listYoungbreed" class="main-btn" row="1" col="1" text="โคแรกเกิด"/>
                <Button @tap="listProfile" class="main-btn" row="2" col="0" text="ข้อมูลส่วนตัว"/>
                <Button @tap="listFarm" class="main-btn" row="2" col="1" text="ข้อมูลฟาร์ม"/>


            </GridLayout>
        </GridLayout>
    </Page>
</template>

<script>

    import {mapState} from 'vuex'

    export default {
        data() {
            return {}
        },
        computed : {
            ...mapState({
                user : state => state.user.user,
            })
        },
        created() {

        },
        mounted() {
            console.log("HOME",this.user)
        },
        methods: {
            listMalebreed : function () {
                this.$router.push('/malebreed')
            },
            listFemalebreed : function () {
                this.$router.push('/femalebreed')
            },
            listMeatbreed : function () {
                this.$router.push('/meatbreed')
            },
            listYoungbreed : function () {
                this.$router.push('/youngbreed')
            },
            listProfile : function () {
                this.$router.push('/profile')
            },
            listFarm : function () {
                this.$router.push('/farm')
            },
        }
    }
</script>

<style scoped>

    ActionBar {
        background-color: #212121;
        color: white;
    }

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

    .user-profile {
        height: 200rem;
        background-color: #212121;
        padding-top: 10rem;
    }

    .user-profile .header {
        color: white;
        font-size: 24rem;
        font-weight: bold;
        text-align: center;
    }

    .user-profile .subheader {
        color: white;
        font-size: 16rem;
        font-weight: bold;
        text-align: center;
    }

    .avatar {
        border-radius: 50%;
        width: 100rem;
        height: 100rem;
        border-width: 4rem;
        border-color: #48b1ec;
    }
</style>

