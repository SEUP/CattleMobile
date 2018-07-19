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
                this.$router.push('/edit')
            },
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

