<template>
    <Page class="page">
        <ActionBar title="ระบบบริหารการเลี้ยงโค"></ActionBar>
        <GridLayout rows="200,*">
            <StackLayout row="0" class="user-profile">
                <Image src="~/images/logo.png" class="avatar"></Image>
                <Label class="header" text="Jane Doe"/>
                <Label class="subheader" text="jane@mail.com"/>
            </StackLayout>

            <GridLayout row="1" rows="*,*" columns="*,*" backgroundColor="green">

                <Button class="main-btn" row="0" col="0" text="พ่อพันธุ์"/>
                <Button class="main-btn" row="0" col="1" text="แม่พันธุ์"/>
                <Button class="main-btn" row="1" col="0" text="โคขุน"/>
                <Button class="main-btn" row="1" col="1" text="โคแรกเกิด"/>

            </GridLayout>
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

    .main-btn {
        background-color: #545454;
        color: white;
        text-align: center;
        font-size: 24em;
        font-weight: bold;
        border: gray 1px solid;
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

