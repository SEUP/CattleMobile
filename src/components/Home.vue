<template>
    <Page class="page">
        <ActionBar title="ระบบบริหารการเลี้ยงโค"></ActionBar>

        <GridLayout rows="auto, *">
            <StackLayout class="user-profile">
                <Image src="~/images/logo.png" class="avatar"></Image>
                <Label class="header" text="Jane Doe"/>
                <Label class="subheader" text="jane@mail.com"/>
            </StackLayout>
        </GridLayout>

    </Page>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>
    .user-profile {
        height : 200rem;
        background-color : #212121;
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

