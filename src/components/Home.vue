<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Home"/>


        <ScrollView>
            <StackLayout class="home-panel">
                <!-- On Android the card view plugin requires adding an external library
                    therefore it can't be demoed on Playground. You will have to download this project
                    and build it locally to try it on Android -->
                <CardView class="card" elevation="10" radius="10" ios:shadowRadius="3">

                    <StackLayout>

                        <StackLayout orientation="horizontal">
                            <Image verticalAlignment="top" class="image-profile" src="~/images/NativeScript-Vue.png"/>
                            <StackLayout verticalAlignment="middle">
                                <Label  style="padding-left: 10rem;" class="h2" text="First Last Name" />
                                <Label  style="padding-left: 10rem;" class="h2" text="First Last Name" />
                                <Label  style="padding-left: 10rem;" class="h2" text="First Last Name" />
                                <Label  style="padding-left: 10rem;" class="h2" text="First Last Name" />
                                <Label  style="padding-left: 10rem;" class="h2" text="First Last Name" />
                            </StackLayout>
                        </StackLayout>

                        <Button text="แก้ไข"  @tap="editProfile" color="#121258" backgroundColor="#43b883" />


                    </StackLayout>
                </CardView>
                <CardView class="card" elevation="10" radius="10" ios:shadowRadius="3">
                    <StackLayout horizontalAlignment="stretch">
                        <Label style="padding-left: 10rem;" text="รายละเอียด" class="h3" height="30" />
                        <Label style="padding-left: 15rem;" text="ชื่อฟาร์ม :" class="h5" height="50" />
                        <Label style="padding-left: 15rem;" text="จำนวนโคทั้งหมด :" class="h5" height="50" />
                        <Label style="padding-left: 15rem;" text="จำนวนโคพ่อพันธ์ุ :" class="h5" height="50" />
                        <Label style="padding-left: 15rem;" text="จำวนวนโคแม่พันธุ์ :" class="h5" height="50" />
                        <Label style="padding-left: 15rem;" text="จำนวนโคขุน :" class="h5" height="50" />
                        <Label style="padding-left: 15rem;" text="จำนวนลูกโค :" class="h5" height="50" />
                        <Button text="แก้ไข" class="h3" @tap="editFarm" color="#121258" backgroundColor="#43b883"/>
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
            editProfile : function () {
                this.$router.push('/counter')
            },
            editFarm : function () {
                this.$router.push('/hello')
            }
        }
    }
</script>

<style scoped>
    .image-profile {
        margin : 5rem;
        padding : 0 0 0 10rem;
        width : 100rem;
        height: 100rem;
    }
</style>

