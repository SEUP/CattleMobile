<template>
   <StackLayout>
        <Image v-if="!user.image_url" src="~/images/profile.jpg" class="avatar"/>
        <Image v-else-if="ValidURL(user.image_url)" :src="user.image_url" class="avatar"/>
        <Image v-else :src="userImage" class="avatar"/>
   </StackLayout>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Avatar",
        computed: {
            ...mapState({
                user: state => state.user.user,
                userImage: state => state.user.userImage,
            })
        },
        async mounted() {
            console.log("Home Mounted ")
            await this.$store.dispatch("user/downloadAvatar")
        },
        methods: {
            ValidURL: function (str) {
                let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
                if (regexp.test(str)) {
                    return true;
                }
                return false;
            },
        }
    }
</script>

<style scoped>

</style>