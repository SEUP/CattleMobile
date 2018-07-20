<template>
    <Page class="page">

        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Image src="~/images/logo.png" class="logo"></Image>

                <StackLayout class="input-field">
                    <TextField hint="Email" class="input"/>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>

                <StackLayout class="input-field">
                    <TextField hint="Password" class="input"/>
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
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }
</style>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            login: function () {
                this.$router.push('/home')
            },
        }
    }
</script>
