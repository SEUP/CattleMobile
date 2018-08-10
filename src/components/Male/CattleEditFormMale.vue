<template>
    <Page class="page">
        <ActionBar title="แก้ไขพ่อพันธ์ุ">
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.go(-1)"/>

            <ActionItem ios.systemIcon="3" @tap="save" android.systemIcon="ic_menu_save" ios.position="right"/>
            <ActionItem @tap="$router.go(-1)" ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel"/>
        </ActionBar>
        <stackLayout>

        </stackLayout>
    </Page>
</template>

<script>
    export default {
        name: "CattleEditForm",
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