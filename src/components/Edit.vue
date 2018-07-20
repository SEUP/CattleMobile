<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Edit"/>

        <ScrollView>
            <StackLayout class="home-panel">
                <CardView class="card" elevation="10" radius="10" ios:shadowRadius="3">
                    <StackLayout horizontalAlignment="stretch">
                        <Label style="padding-left: 10rem;" text="รายละเอียด" class="h3" height="30" />
                        <Label style="padding-left: 15rem;" text="ชื่อฟาร์ม :" class="h5" height="50" />
                        <Label style="padding-left: 15rem;" text="จำนวนโคทั้งหมด :" class="h5" height="50" />
                        <Label style="padding-left: 15rem;" text="จำนวนโคพ่อพันธ์ุ :" class="h5" height="50" />
                        <Label style="padding-left: 15rem;" text="จำวนวนโคแม่พันธุ์ :" class="h5" height="50" />
                        <Label style="padding-left: 15rem;" text="จำนวนโคขุน :" class="h5" height="50" />
                        <Label style="padding-left: 15rem;" text="จำนวนลูกโค :" class="h5" height="50" />

                        <StackLayout orientation="horizontal" >
                        <Button text="ตกลง" class="h3" @tap="Yeser" color="#121258" backgroundColor="#43b883" width="50%"/>
                            <Button text="ยกเลิก" class="h3" @tap="Noway" color="#121258" width="50%"/>
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
        methods : {
            Yeser : function () {
                this.$router.push('/home')
            },
            Noway : function () {
                this.$router.push('/home')
            },
        }
    }
</script>

<style scoped>

</style>