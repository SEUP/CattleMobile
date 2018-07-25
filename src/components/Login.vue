<template>
    <Page class="page" actionBarHidden="true">
        <ActionBar title="ระบบบริหารการเลี้ยงโค"></ActionBar>

        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Image src="~/images/logo.png" class="logo"></Image>

                <StackLayout class="input-field">
                    <TextField v-model="form.username" hint="Username" class="input"/>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>

                <StackLayout class="input-field">
                    <TextField v-model="form.password" hint="Password" secure="true" class="input"/>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>
                <Button text="Log In" @tap="login" color="#121258" backgroundColor="#43b883"/>
            </StackLayout>
            <StackLayout orientation="horizontal">
                <Label text="Don’t have an account?"/>
                <Label color="blue" text="Sign up" @tap="login"/>
            </StackLayout>
        </FlexboxLayout>

    </Page>
</template>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20rem;
        margin: 20rem;
    }

    .logo {
        width: 150rem;
        margin-bottom: 50rem;
    }

    .page {
        align-items: center;
        flex-direction: column;
    }

    .form {
        margin-left: 30rem;
        margin-right: 30rem;
        flex-grow: 2;
        vertical-align: middle;
    }
</style>
<script>
    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                }
            }
        },
        methods: {
            login: function () {
                console.log("LOGIN");
                this.$http.post('/api/v1/farmer/login', this.form)
                    .then((r) => {
                        let applicationSettings = require("application-settings");
                        applicationSettings.setString("token", r.data.token);
                        this.$http.defaults.headers.common['Authorization'] = `Bearer ${applicationSettings.getString('token')}`;
                        this.$router.push('/home')
                    })
            },
        }
    }
</script>
