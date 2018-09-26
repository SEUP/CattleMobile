<template>
    <Page class="page" actionBarHidden="true">
        <ActionBar title="ระบบบริหารการเลี้ยงโค"></ActionBar>

        <FlexboxLayout class="page">
            <Image src="~/images/login.png" class="logo" />
            <StackLayout class="form">
                <StackLayout class="input-field">
                    <TextField v-model="form.username" hint="ชื่อผู้ใช้" class="input fw" />
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>

                <StackLayout class="input-field">
                    <TextField v-model="form.password" hint="รหัสผ่าน" secure="true" class="input fw" />
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <Button android:drawableLeft="@drawable/icon" text="เข้าสู่ระบบ" @tap="login" class="btn fw" />
            </StackLayout>
            <StackLayout orientation="horizontal">1.0.1

            </StackLayout>
            <Label text="Version 1.0.1"></Label>
        </FlexboxLayout>

    </Page>
</template>

<style scoped>
    .fa {
        font-family: FontAwesome;
    }

    .btn {
        border-radius: 50%;
        color: #1E90FF;
        background: white;

    }

    .page {
        background: #1E90FF;
    }

    .home-panel {
        vertical-align: center;
        font-size: 20rem;
        margin: 20rem;
    }

    .logo {
        width: 100%;

    }

    .page {
        align-items: center;
        flex-direction: column;

    }

    .input {
        placeholder-color: white;
        color: white;
    }

    .form {
        margin-left: 30rem;
        margin-right: 30rem;
        flex-grow: 2;
        vertical-align: middle;
    }
</style>
<script>
    const applicationSettings = require("application-settings");


    export default { 
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                }
            }
        },
     
        async created() {
            
 
              this.$store.dispatch("mobile/screenLock")

            console.log("Login/created/", applicationSettings.getString('token', null))
            if (applicationSettings.getString('token', null)) {
                this.$store.dispatch("user/reLogin")
                let result = await this.loadInitialData();

                if (result) {
                    this.goHome();
                }

            }
        },
        methods: {
           
            async loadInitialData() {
                let result = await this.$store.dispatch("user/getUser");
                let farm = await this.$store.dispatch('user/getFarm')
                let choices = await this.$store.dispatch('choice/load')
                let breedMale = await this.$store.dispatch('cattle/load', result.id)
               
                return result;
            },

            login: async function () {
                    console.log("LOGIN");
                    let result = await this.$store.dispatch("user/login", this.form);

                    if (result) {
                        let user = await this.loadInitialData()
                        if (user) {

                            this.goHome();
                        } else {
                            alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
                        }
                    } else {
                        alert({
                            title: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
                            message: "กรุณาตรวจสอบ ชื่อผู้ใช้ หรือ รหัสผ่าน",
                            okButtonText: "ลองอีกครั้ง"
                        });
                    }

                },
                goHome: async function () {
                    console.log('GOHOME'); 
                    this.$router.replace('/home')
                }
        }
    }
</script>