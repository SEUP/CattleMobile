<template>
    <Page class="page">
        <ActionBar title="ระบบบริหารการเลี้ยงโค"></ActionBar>
        <GridLayout rows="200,*">
            <StackLayout row="0" class="user-profile">

                <Image v-if="!user.image_url" src="~/images/profile.jpg" class="avatar"/>
                <Image v-else-if="ValidURL(user.image_url)" :src="user.image_url" class="avatar"/>
                <Image v-else :src="`${$baseUrl}/api/v1/farmer/farmers/${user.id}/avatar`" class="avatar"/>


                <Label class="header" :text="`${user.firstname} ${user.lastname}`"/>
                <Label class="subheader" :text="user.email"/>
            </StackLayout>

            <GridLayout class="grid-btn" row="1" rows="*,*,*" columns="*,*" >

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
            console.log("Home Mounted ")
        },
        methods: {
            ValidURL: function (str) {
                let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
                if (regexp.test(str)) {
                    return true;
                }
                return false;
            },

            listMaleBreed : function () {
                this.$router.push('/malebreed')
            },
            listFemaleBreed : function () {
                this.$router.push('/femalebreed')
            },
            listMeatBreed : function () {
                this.$router.push('/meatbreed')
            },
            listYoungBreed : function () {
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

