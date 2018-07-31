<template>
    <Page>
        <ActionBar title="แก้ไขข้อมูล">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/>

            <ActionItem ios.systemIcon="3" @tap="" android.systemIcon="ic_menu_save" ios.position="right"/>
            <ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel"/>
        </ActionBar>
        <StackLayout class="form">

        </StackLayout>
    </Page>
</template>

<script>
    export default {
        name: "CattleListItem",
        props: {
            cattle: [Object],
        },
        data: () => ({}),
        async create() {

        },
        methods: {
            cattleTap: function () {

            }
        }
    }
</script>

<style scoped>

</style>