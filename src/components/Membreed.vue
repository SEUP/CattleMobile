<template>
    <Page class="page">
        <ActionBar class="action-bar" title="พ่อพันธุ์"/>

        <ScrollView>
            <StackLayout class="home-panel">
                <CardView class="card" elevation="10" radius="10" ios:shadowRadius="3">
                    <StackLayout orientation="horizontal">
                        <Label style="padding-left: 10rem;" text="ชื่อวัว" class="defind h3" height="30"/>
                        <Label style="padding-left: 10rem;" text="เบอร์หู" class="defind h3" height="30"/>
                    </StackLayout>
                </CardView>
                <CardView class="card" elevation="10" radius="10" ios:shadowRadius="3">
                    <StackLayout>
                        <StackLayout orientation="horizontal">
                            <Label style="padding-left: 10rem;" text="miku" class="defind h3" height="30"/>
                            <Label style="padding-left: 10rem;" text="BIGTU-44" class="defind h3" height="30"/>
                            <Button text="ค้นหา" class="fa" :text="'fa-eye' | fonticon" @tap="editProfile"/>
                            <Button text="แก้ไข" width="15%" @tap="editProfile"/>
                        </StackLayout>
                    </StackLayout>
                </CardView>
            </StackLayout>
        </ScrollView>

    </Page>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            editProfile: function () {
                this.$router.push('/edit')
            },
        },

    }
</script>

<style scoped>
    .defind {
        width: 33%;
    }
</style>